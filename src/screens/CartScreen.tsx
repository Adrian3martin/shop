import React, { useEffect, useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, Image, FlatList, ListRenderItemInfo, TouchableOpacity} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native'
import Core from '../core'
import IProduct from '../interfaces/Product'
import Product from '../components/ProductSmall'
import { addToCart, removeFromCart } from '../redux/cart/cartActions';
import { connect } from 'react-redux';



interface CartScreenProps {
  products: IProduct[];
  addToCart: (item: IProduct) => void;
  removeFromCart: (itemId: number) => void;
}

const mapStateToProps = (state: any) => ({
  products: state.cart.items,
});

const mapDispatchToProps = {
  addToCart,
  removeFromCart
};

const CartScreen : React.FC<CartScreenProps> = (props : any) => {
    const {navigation,  products, removeFromCart } = props;
    
    const [price, setPrice] = useState(0);

    useLayoutEffect(() => {
      navigation.setOptions({
          title: "Cart",
      });
    },[])

    useEffect(() => {
        console.log('Loading Cart Screen')
        //Is mounted helps us avoid memory leaks for unfinished async operations 
        var isMounted = true;
        
        //Creating a reusable return object to simplify logic
        var finished = () => {
          isMounted = false;
        }
        

        let value = products?.reduce((sum : number, item : IProduct) => sum + item.minimumPrice, 0)
        console.log(`Price is ${value}`)
        setPrice(value);
        //Asynchronous operations
        // let asyncSetup = async() => {
        //     //Load products in this category
        //     let shortened = await store.loadProducts(categoryId, productSize);
        //     if(isMounted){
        //       setProducts(shortened);
        //     }
        // }
            
        // asyncSetup();
        // setProducts([...products])
        console.log(price);

        return finished;

    },[products]);

    const onRemovePress = (key: string) => {
      //Adding item to the cart
      if(key == undefined){
        return false
      }
      
      //Remove product from cart using key in case multiple products have the same product id
      removeFromCart(key);
    
      return true;
    }
    
    const onPurchasePress = () => {
        console.log("Your products were purchased");
        return true;
    }

    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <FlatList<IProduct>
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.productList}
              numColumns={1}
              data={products}
              renderItem={({item} : ListRenderItemInfo<IProduct>) => (
                <Product key={item.key}
                  productKey={item.key}
                  productId={item.id}
                  name={item.name}
                  onRemovePress={onRemovePress}
                  image={item.image.sizes[0].url}
                  minimumPriceString={item.minimumPriceString}
                />
              )}
              keyExtractor={item => item.key}
          />
  
        </View>
        <View style={styles.priceContainer}>
            <Text style={styles.priceDetail}>Shipping : $0.00</Text>
            <Text style={styles.priceDetail}>Tax and Fees : $15.30</Text>
            <Text style={styles.priceTotal}>Total Price : ${(price + (15.30)).toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => onPurchasePress()}>
            <Text style={styles.purchaseText}>Buy Now with</Text>
            <Image 
                style={{height: 45, width : 45}}
                source={require('../assets/images/apple-pay.png')}/>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    body : {
      flex: 1,
    },
    head : {
      height: 200,
      backgroundColor: 'black'
    },
    container : {
      backgroundColor: 'rgb(201 230 228)',
      flex: 3,
      marginBottom: 10
    },
    priceContainer : {
        flex : 1,
        backgroundColor: '#e0dede',
        padding: 10,
        alignItems: 'flex-end'
    },
    priceDetail : {
        fontSize: 18,
        fontWeight:'300',
        color: '#000'
    },
    priceTotal : {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center'

    },
    products : {
      flex: 1,
    },
    productList : {
    //   backgroundColor: 'rgb(201 230 228)',
      backgroundColor: '#d2d2d2',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10
    },
    title: {
      color: 'black',
      backgroundColor: 'green',
      fontSize : 18,
      textAlign: 'center'
    },
    button : {
        backgroundColor : 'green',
        margin : 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    purchaseText : {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

