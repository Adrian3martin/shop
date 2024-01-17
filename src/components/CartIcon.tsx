import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
const cartImage = require('../assets/images/cart.png')

interface CartIconProps {
    indicator : number,
    onPress: Function
}

const CartIcon : React.FC<CartIconProps> = ({ indicator, onPress }) => {
    return (
        <TouchableOpacity style={styles.rightIcon} onPress={() => onPress()}>
            <Image
                style={{height: 30, width : 30}}
                source={cartImage}
            />
            <View style={styles.indicatorContainer}>
                <Text style={styles.indicator}>{indicator}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    rightIcon : {
        position: 'relative'
    },
    indicatorContainer : {
        backgroundColor: 'orange',
        position: 'absolute',
        top: -5,
        right : -5,
        padding: 2,
        borderRadius: 20,
    },
    indicator : {
        color: '#000',
        fontSize: 12,
        fontWeight: '500'
    }
});

export default CartIcon;