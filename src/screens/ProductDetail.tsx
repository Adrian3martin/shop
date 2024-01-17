import React, { useLayoutEffect, useState } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Button, TouchableOpacity} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native'
import IProduct from '../interfaces/Product';
import { addToCart, removeFromCart } from '../redux/cart/cartActions';
import { connect} from 'react-redux';
import CartIcon from '../components/CartIcon';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface ProductDetailProps {
    cartItems: IProduct[],
    addToCart: (item: IProduct) => void;
    removeFromCart: (itemId: number) => void;
}

const mapStateToProps = (state: any) => ({
    cartItems: state.cart.items,
});

const mapDispatchToProps = {
    addToCart,
    removeFromCart,
};

const ProductDetail: React.FC<ProductDetailProps> = (props : any) => {
    const {navigation, addToCart, removeFromCart, cartItems} = props;
    const route: RouteProp<{params: {product : IProduct}},'params'> = useRoute();

    const [product, setProduct] = useState<IProduct>({...route.params?.product}); 
    


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Shop",
            headerRight: () => (
                <CartIcon indicator={cartItems.length} onPress={onCartPress}/>
            )
        });
    },[cartItems])

    const onPurchasePress = () => {
        //To Do: Purchase this item only, now.
        console.log(product.id);
        return true;
    }

    const onAddPress = () => {
        //Add item to Cart
        let newProduct = {...product, key : uuidv4()};
        addToCart(newProduct);
        return true;
    }

    const onCartPress = () => {
        //Navigate to Cart
        navigation.navigate('CartScreen');
    }
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{product.image.caption}</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{uri  : product.image.sizes[product.image.sizes.length - 1].url}}
                />
            </View>
            <Text style={{textAlign: 'center', fontWeight: '500', fontSize: 18}}>Product Description</Text>
            <Text style={styles.description}>{product.shortDescription}</Text>
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => onAddPress()}>
                <Text style={styles.purchaseText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => onPurchasePress()}>
                <Text style={styles.purchaseText}>Buy Now for {product.minimumPriceString}</Text>
                <Image 
                    style={{height: 45, width : 45}}
                    source={require('../assets/images/apple-pay.png')}/>
            </TouchableOpacity>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems : 'center',
        margin: 10,
    },
    image : {
        height: 350,
        width: 350,
    },
    title : {
        padding: 10,
        fontSize: 14,
        color: '#fff',
        fontWeight: '400',
        textAlign: 'center',
        backgroundColor: 'rgba(92, 189, 187, 1.00)'
    },
    description : {
        fontSize: 14,
        margin: 15
    },
    addButton : {
        backgroundColor : 'orange',
        margin : 15
    },
    button : {
        backgroundColor : 'black',
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

