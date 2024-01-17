import React, { useEffect, useState, useLayoutEffect } from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import Category from '../components/Category'
import ICategory from '../interfaces/category'
import Core from '../core'

interface HomeScreenProps {
  //Any custom props would go here
}

const HomeScreen: React.FC<HomeScreenProps> = (props : any) => {

  const {navigation} = props;
  const [categories, setCategories] = useState<ICategory[]>([]);
  const categorySize : number = 20;
  
  const store = Core();

  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Welcome",
    });
  },[])

 
  useEffect(() => {
    var isMounted = true;
    var finished = () => {
      isMounted = false;
    }
    
    if(categories.length > 0){
      return finished
    }

    //Load Categories
    let asyncSetup = async() => {
      let shortened = await store.loadCategories(categorySize);
      if(isMounted){
        setCategories(shortened);
      }
      console.log('Categories loaded');
    }
      
    asyncSetup();
       
    return finished;

  },[]);


  const onCategoryPress = (name: string, categoryId: string) => {
    if(name == ""){
      return false
    }
    if(categoryId == "" || categoryId == undefined){
      return false
    }

    navigation.navigate('Products', { name , categoryId });

    return true;
  }

  return (
  <View style={styles.body}>
    <View style={styles.head}>
      <Image 
        style={styles.mast} 
        source={require('../assets/images/shop.png')}
        resizeMode='contain'
      />
    </View>
    <Text style={styles.caption}>Browse our wonderful list of products by selecting a category below!</Text>
    <View style={styles.container}>
      <ScrollView style={styles.categories}>
        {categories?.map(category => (
          <Category key={category.id}
            categoryId={category.id}
            name={category.name}
            onPress={onCategoryPress}
          />
        ))}
      </ScrollView>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  body : {
    flex: 1,
  },
  head : {
    height: 150,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center',
    padding : 10
  },
  mast : {
    width : 300,
    height: 53
    
  },
  caption : {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    padding: 20
  },
  container : {
    flex: 1,
    backgroundColor: 'rgb(201 230 228)',
    
  },
  categories : {
    flex: 1,
  },
  title: {
    color: 'black',
    backgroundColor: 'green',
    fontSize : 18,
    textAlign: 'center'

  }
});

export default HomeScreen;
