import React from 'react';
import IProduct from '../interfaces/Product'
const Core = () => {

    const 
    apiKey : string = '76b99147dd61464cb77bd62fb3e5ee41',
    host : string = 'https://api2.shop.com',
    locale : string = 'en_US',
    publisherId : string = 'TEST',
    america : string = `${host}/AffiliatePublisherNetwork/v2/`;

    const endpoint = (type : string, section?  : string) => {
        section = (section) ? section : '';
        return `${america}${type}?publisherId=${publisherId}&locale=${locale}&${section}`;
    }
    const endpointExample = () => {
        console.log(endpoint('categories'));
        console.log(endpoint('products','categoryId=1-234'));
        console.log(endpoint('sites'));
        console.log(endpoint('product','productId=12345'));
    }

    const get = async(url : string) => {
        try{
            const res = await fetch(url,{
                method: 'GET',
                headers : new Headers({
                    'Accept' : 'application/json',
                    'Api_key' : apiKey,
                })
            });
            
            let data = await res.json();
            return data;
        }catch(err){
            errs(err);
            return null;
        }
    }

    const loadCategories = async(limit: number) => {
        try{
            let url = endpoint('categories');
            let data = await get(url);
            let shortened = data.categories?.splice(0,limit);
            return shortened;
        }
        catch (ex : any){
            errs(ex);
        }

        return [];
    }

    const loadProducts = async(categoryId : string, limit : number) => {
        try{
            let url = endpoint('products', `categoryId=${categoryId}`);
            let data = await get(url);
            let items = data.products?.splice(0,limit);
            // let shortened : IProduct[] = [];
            // items.forEach((i : IProduct) => {
            //     let p : IProduct = {...i};
            //     p.image = i.image.sizes[0].url;
            //     shortened.push(p);
            // })

            return items;
        }
        catch (ex : any){
            errs(ex);
        }

        return [];
    }

    const loadProduct = async(productId : string) => {
        try{
            let url = endpoint('product', `productId=${productId}`);
            let data  = await get(url);
            
            return data.product;
        }
        catch(ex : any){
            errs(ex);
        }

        return null;
    }

    const errs = (ex : any ) => {
        //Do any error handling here. 
        console.log("Error in Core.");
        console.log(ex);
    }
    

    return {
        loadProduct,
        loadCategories,
        loadProducts
    }
}

export default Core;