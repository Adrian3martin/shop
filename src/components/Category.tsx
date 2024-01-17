import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface CategoryProps {
    categoryId : string,
    name: string,
    onPress: Function
}

const Category  : React.FC<CategoryProps>= (props) => {
    const { categoryId, name, onPress } = props;

    return (
        <TouchableOpacity style={styles.container} key={categoryId} onPress={()=> onPress(name, categoryId)}>
            <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 20,
        backgroundColor: 'gray',
        margin: 15,
    },
    title : {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '300',
        textAlign:'center',
    }
});

export default Category;