//Creating a reusable interface that can be shared between components and maintainable
interface Product {
    key: string,
    name : string,
    minimumPrice : number
    minimumPriceString : string,
    maximuPrice: string,
    maximumPriceString : string,
    brand : string,
    shortDescription : string,
    image : {
        caption : string,
        sizes : [{
            height : string,
            width: string,
            url : string
        }]
    },
    id : number,
    referralUrl: string
}
    

export default Product;