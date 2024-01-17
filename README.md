# MA Test Project

This project is designed to be easy to read as a simple mobile React Native project.


#Import Files
The project has a total of 5 screens 
`ProfileScreen, HomScreen, ProductScreen, ProductDetail, CartScreen`;

4 Reusable Components
`CartIcon, Category, Product, ProductSmall`

2 Reusable Interfaces
`category, product`

1 Action/Reducer to manage cart state throughout the app
`cart`

1 Core file to mange api and other core functions in the future
`core`

# Installation
To install this application once you have the ipa, simply follow the instructions on this page [How to install an .ipa](https://medium.com/@itskaranzzz/how-to-install-ipa-file-directly-to-iphones-tabs-without-using-laptop-desktop-e645c36125d2)

But pasting here to highlight the important part  

iTunes: This method doesn’t require any other software apart it to install iOS app(.ipa) to mobile device, just follow below steps and your good to use the app from your device:
iTunes > App Library > drag and drop .ipa file > Install > Sync

Note: On a windows system you need to download iTunes first to install an .ipa further on mobile device.

Xcode : Using xcode is the simplest way to install .ipa file is what I feel, if you have xcode installed on your Mac by just following below easy steps the app will be ready to explore:
Xcode > cmd+shift+2 > devices > drag and drop .ipa file

I've found the `Xcode > cmd+shift+2` method to be easier on a mac.

# Application Flow 

Once your installed, you'll be asked to provide a profile picture, first and last name. Neither are required, but only serve to resolve the native functionality requirement of the request.

After that, you'll be sent to the HomeScreen where you can view a simple, calm design that lists all categories from the shop API. 

Each are clickable and will take you to the ProductsScreen where you'll get a list of max 20 products to view in more detail or add to your cart. If you click the image or title you'll get the ProductDetail screen, and if you click the plus button you'll see the product has been added to your cart by the indicator on the cart icon (header right) being updated.

If you choose to go to the Product Detail page, you'll see a simple page highlighting a larger image of the product, a description of the product, another method to add the item cart, or buy now using Apple Pay (not yet implemented);

If you do decide to go to the cart by clicking the cart icon in the top right, you'll be taken to a page that highlights all the products you've added throughout the various screens, and a breakdown of how much it will cost. Tax is set to ~$15 for testing purposes. You can remove any product but the other buttons are for visual appeal.

# Desirable Next Steps

To enhace this product I would incorporate a theme that make changing colors, and font sizes more consistent. Also, incorporate the profile details throughout the application. Currently we do not store the profile details and you would ultimately be sent back to the ProfileScreen after completely killing the app and restarting.

I would then start building out jest to build unit tests for each component within the project to ensure reliabilty. 

# Limitations

This project was built with IOS (Iphone) in mind, and not Ipad or Android. However, it is built in React Native as that would allow for this in future the pipeline. 

Profile data isn't saved, and purchases aren't made in this version.


