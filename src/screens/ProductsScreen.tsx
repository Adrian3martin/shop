import React, { useEffect, useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, ListRenderItemInfo} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native'
import Core from '../core'
import IProduct from '../interfaces/Product'
import Product from '../components/Product'
import { addToCart, removeFromCart } from '../redux/cart/cartActions';
import CartIcon from '../components/CartIcon';
import { connect, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface ProductListProps {
  cartItems: IProduct[];
  addToCart: (item: IProduct) => void;
  removeFromCart: (itemId: number) => void;
}

const mapStateToProps = (state: any) => ({
  cartItems: state.cart.items,
});

const mapDispatchToProps = {
  addToCart,
  removeFromCart
};

const ProductsScreen : React.FC<ProductListProps> = (props : any) => {
    const {navigation, addToCart, cartItems } = props;
    const route: RouteProp<{params: {name : string, categoryId: string}},'params'> = useRoute();
    
    const [products, setProducts] = useState<IProduct[]>([]); 
    const productSize : number = 20;
    
    const store = Core();

    const name = route.params?.name;
    const categoryId = route.params?.categoryId;


    useLayoutEffect(() => {
      navigation.setOptions({
          title: name,
          headerRight: () => (
              <CartIcon indicator={cartItems.length} onPress={onCartPress}/>
          )
      });
    },[cartItems])

    useEffect(() => {
        //Is mounted helps us avoid memory leaks for unfinished async operations 
        var isMounted = true;
        
        //Creating a reusable return object to simplify logic
        var finished = () => {
          isMounted = false;
        }
        
        if(products.length > 0){
          return finished
        }

        console.log('Products loading')

        //Asynchronous operations
        let asyncSetup = async() => {
            //Load products in this category
            let shortened = await store.loadProducts(categoryId, productSize);
            shortened.forEach((s: IProduct) => {
              s.key = uuidv4();
            });

            console.log(shortened[0].key);

            if(isMounted){
              setProducts(shortened);
            }
        }
            
        asyncSetup();

        return finished;

    },[products]);

    const onCartPress = () => {
      //Navigate to page
      navigation.navigate('CartScreen');
      return true;
    }

    const onProductPress = (name : string, productId: number) => {
      //Let's take them to the Product detail page to learn more
      if(productId == undefined){
          return false
      }
  
      //Find the product they clicked by id
      let product = products.filter(p => p.id == productId)[0]
      console.log(productId);

      //Navigate to page
      navigation.navigate('ProductDetail', { product });
      return true;
    }

    const onAddPress = (productId: number) => {
      //Adding item to the cart
      if(productId == undefined){
        return false
      }

      //Find the product to add and add it to our app store for access throughout the application
      let product = products.filter(p => p.id == productId)[0];
      let newProduct = {...product, key : uuidv4()};
      addToCart(newProduct);
      
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
                  productId={item.id}
                  name={item.name}
                  onPress={onProductPress}
                  onAddPress={onAddPress}
                  image={item.image.sizes[0].url}
                  minimumPriceString={item.minimumPriceString}
                />
              )}
              keyExtractor={item => item.id.toString()}
          />
        </View>
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
      flex: 1,
      backgroundColor: 'white',
    },
    products : {
      flex: 1,
    },
    productList : {
      backgroundColor: 'rgb(201 230 228)',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10
    },
    title: {
      color: 'black',
      backgroundColor: 'green',
      fontSize : 18,
      textAlign: 'center'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);

