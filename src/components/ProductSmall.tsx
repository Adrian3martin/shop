import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';

interface ProductSmallProps {
    productKey : string,
    productId : number,
    name: string,
    // onPress: Function,
    image : string,
    minimumPriceString: string,
    onRemovePress: Function
}
const ProductSmall  : React.FC<ProductSmallProps>= (props) => {
    const { productKey, productId, name,  image, minimumPriceString, onRemovePress } = props;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{uri : image}}
                />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.price}>{minimumPriceString}</Text>
            </View>
            <View style={styles.priceContainer}>
                <TouchableOpacity onPress={() => onRemovePress(productKey)}>
                    <Image source={require('../assets/images/remove.png')} style={styles.remove}/>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#fff',
        // borderWidth : 1,
        // borderColor: '#fff',
        marginBottom: 10,
        borderRadius: 2,
        flexDirection:'row',
        width: '100%',
    },
    title : {
        // color: '#FFF',
        fontSize: 12,
        fontWeight: '300',
        textAlign:'left',
        paddingTop: 10,
        flex: 1,
        flexWrap: 'wrap'
    },
    descriptionContainer : {
        flex: 1
    },
    imageContainer : {
        backgroundColor: '#fff',
        margin: 10
    },
    image : {
        height: 35,
        width: 35,
    },
    priceContainer : {
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    remove : {
        height: 20,
        width: 20,
        margin: 10,
        alignSelf:'flex-end'
    },
    tag : {
        // height: 25,
        // width: 25,
        fontWeight: '500',
        color: 'red',
        alignSelf: 'flex-end',
        fontSize: 14,
        margin: 10,
    },
    price : {
        fontWeight:'bold',
        color: 'rgb(18 83 81)',
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10,
        // marginRight: 5,
    }
});

export default ProductSmall;