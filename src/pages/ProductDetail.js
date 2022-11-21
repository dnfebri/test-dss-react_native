import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImageSlider } from "react-native-image-slider-banner";

const ProductsDetail = ({ route }) => {
  const { itemId } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [slideImg, setSlideImg] = useState([])
  const [product, setProduct] = useState({});

  const getProduct = async() => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${itemId}`);
      const json = await response.json();
      setProduct(json);
      const images = json.images
      setSlideImg([])
      images.map((image) => {
        setSlideImg(values => ([...values, {img: image}]))
      }) 
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct()
  },[])
  
  return (
    <View style={styles.card}>
      {
        isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding:21 }} /> : (
          <View>
            <ImageSlider 
                data={slideImg}
                autoPlay={false}
                // onItemChanged={(item) => console.log("item", item)}
                closeIconColor="#fff"
            />
            <View style={styles.contant}>
              <Text
                style={styles.title}
              >
                {product.title}
              </Text>
              <Text style={{color: "#000"}}>{product.description}</Text>
              <View style={{flexDirection: "row", marginVertical: 5, justifyContent:"space-between"}}>
                <View style={{flexDirection: "row"}}>
                  <Text style={{color: "#000"}}>price : </Text>
                  <Text style={{fontWeight: "bold", color: "#000"}}>{product.price}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={{color: "#000"}}>Category : {product.category}</Text>
                </View>
              </View>
              <View style={{flexDirection: "row", marginVertical: 5, justifyContent:"space-between"}}>
                <View style={{flexDirection: "row"}}>
                  <Text style={{color: "#000"}}>Rating : </Text>
                  <Text style={{color: "#000"}}>{product.rating}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  <Text style={{color: "#000"}}>stock : {product.stock}</Text>
                </View>
              </View>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default ProductsDetail

const styles = StyleSheet.create({
  card:{
    marginVertical:5,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:10,
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
  contant: {
    marginHorizontal:8,
    marginVertical:10,
  },
  title: {
    marginVertical:5,
    fontSize:25,
    fontWeight: "bold",
    color: '#000',
  }
})