import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';

interface ProductProps {
    productId : number,
    name: string,
    onPress: Function,
    image : string,
    minimumPriceString: string,
    onAddPress: Function
}
const Product  : React.FC<ProductProps>= (props) => {
    const { productId, name, onPress, image, minimumPriceString, onAddPress } = props;

    return (
        <TouchableOpacity onPress={()=> onPress(name, productId)}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri : image}}
                    />
                </View>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.priceContainer}>
                    <TouchableOpacity onPress={() => onAddPress(productId)}>
                        <Text style={styles.tag}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.price}>{minimumPriceString}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'rgba(92, 189, 187, 1.00)',
        marginBottom: 10,
        borderRadius: 2,
        flexDirection:'row',
        width: '100%',
    },
    title : {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '400',
        textAlign:'left',
        padding: 10,
        flex: 1,
        flexWrap: 'wrap'
    },
    imageContainer : {
        backgroundColor: '#fff',
        margin: 10
    },
    image : {
        height: 100,
        width: 100,
    },
    priceContainer : {
        flexDirection:'column',
        justifyContent: 'space-between'
    },
    tag : {
        height: 25,
        width: 25,
        fontWeight: '500',
        backgroundColor: 'rgb(204 186 85)',
        alignSelf: 'flex-end',
        fontSize: 20,
        textAlign:'center'
    },
    price : {
        fontWeight:'bold',
        color: 'rgb(18 83 81)',
        fontSize: 12,
        marginBottom: 5,
        marginRight: 5,
    }
});

export default Product;