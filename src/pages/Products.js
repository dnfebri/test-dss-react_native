import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {  useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

const Products = ({ navigation }) => {
  const [categoty, setCategory] = useState([])
  const [selectCategoty, setSelectCategoty] = useState('')
  const [isLoading, setLoading] = useState(true);
  const [listProducts, setListProducts] = useState([]);

  const getCategoty = async() => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const json = await response.json();
      setCategory(json);
    } catch (error) {
      console.error('error getCategoty = ', error);
    }
  }

  const getProducts = async(category , sort = 0,) => {
    setLoading(true);
    let url = "https://dummyjson.com/products";
    if (category) {
      url = `https://dummyjson.com/products/category/${category}`
    }
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (sort === 1) {
        const getValue = ({ price }) => +price || 0;
        const data = json.products.sort((a, b) => (a.price > b.price ? 1 : -1));
        return setListProducts(data);
      }
      if (sort === 2) {
        const getValue = ({ price }) => -price || 0;
        const data = json.products.sort((a, b) => (a.price > b.price ? -1 : 1));
        return setListProducts(data);
      }
      setListProducts(json.products);
    } catch (error) {
      console.error('error = ', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts(selectCategoty);
    getCategoty();
  }, []);
  
  return (
    <View>
      <View style={{padding:8, width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
        <SelectDropdown
          defaultValue={"pilih..."}
          defaultValueByIndex={null}
          buttonStyle={{backgroundColor:"#fff", marginHorizontal:3, flex: 1}}
          search={true}
          defaultButtonText={"Pilih Categoty"}
          searchPlaceHolder={"search..."}
          data={["Pilih Categoty", ...categoty]}
          onSelect={(selectedItem, index) => {
            if (index == 0) {
              setSelectCategoty("")
              getProducts()
            } else {
              getProducts(selectedItem)
              setSelectCategoty(selectedItem)
            }
            console.log("selectedItem, index", selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        <SelectDropdown
          buttonStyle={{backgroundColor:"#fff", marginHorizontal:3, flex: 1}}
          defaultButtonText={"Sort Price"}
          data={["Sort Price", "Low -> Highl", "High -> Low"]}
          onSelect={(selectedItem, index) => {
            getProducts(selectCategoty, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
      <ScrollView>
        <View style={style.viewWrapper}>
          <View style={style.viewData}>
            { isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center', minHeight:"100%" }} /> : 
              listProducts.map((row, index)=>(
                <TouchableOpacity title={`Go to Details ${row.id}`} key={index} onPress={() => {
                  navigation.navigate('ProductDetail', {
                    itemId: row.id,
                  });
                }}>
                  <View style={style.viewList}>
                    <View>
                      <Image source={{uri:row.thumbnail}} style={style.thumbnail}/>
                    </View>
                    <View style={style.thumbnailtText}>
                      <Text style={{fontWeight: 'bold', color:"black"}}>{row.title}</Text>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{color: "#000"}}>Description : </Text>
                        <Text numberOfLines={1} style={{width:200, color:"#000"}} >{row.description.substring(0, 20)}...</Text>
                      </View>
                      <Text style={{color: "#000"}}>Price : {row.price}</Text>
                      <Text style={{color: "#000"}}>Stock : {row.stock}</Text>
                      <Text style={{color: "#000"}}>Category : {row.category}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  viewData:{
    flexDirection: "column",
    marginTop:5,
    marginBottom:100
  },
  viewList: {
    // flex:1,
    marginVertical:5,
    marginHorizontal:3,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    
  },
  thumbnail: {
    width:130,
    height:89
  },
  thumbnailtText: {
    color: 'black',
    marginHorizontal:15,
  }
});

export default Products