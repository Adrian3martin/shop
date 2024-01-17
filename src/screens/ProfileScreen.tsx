import React, { useState, useLayoutEffect } from 'react';
import {View, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import {CameraOptions, launchCamera, ImagePickerResponse} from 'react-native-image-picker'

interface ProfileScreenProps {
    //Any custom props would go here
}

const ProfileScreen : React.FC<ProfileScreenProps>= (props: any) => {
    const { navigation } = props;
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [photoUri, setPhoto] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile",
        });
    },[])

    const onPhotoPress = () => {
        //Setup our options for the camera. 
        //Goal here is to get a medium res selfie and display as a profile photo
        const options : CameraOptions = {
            maxHeight: 800,
            maxWidth: 800,
            mediaType: 'photo',
            quality: 0.5,
            cameraType: 'front',
            includeBase64 : false,
            saveToPhotos: false,
            presentationStyle: 'popover'
          };
      

          //Using the react-native-image-picker library to take a photo of the user
          launchCamera(options, (response : ImagePickerResponse) => {
            console.log('Took Photo')
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return false;
            } 
            
            if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
                return false;
            }
            
            //Success. Getting the image here to display to the user
            let img : string | undefined = response.assets?.at(0)?.uri;
            console.log(response.assets?.at(0));
            if(img != undefined){
                setPhoto(img);
            }
            return true;
          });
    }

    const onFirstChange = (value : string) => {
        setFirstName(value);
    }

    const onLastChange = (value : string) => {
        setLastName(value);
    }
   
    const completePress = () => {
        //To Do: This is where you would do error checking and validation.
        //We're going to skip that part and let them in
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            {(photoUri == null || photoUri == "") ?
             <Text style={styles.title}>Click Below to Create a Profile Photo</Text>
             :
             <Text style={styles.titleSuccess}>Photo Updated Successfully!</Text>
            }
            
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={onPhotoPress} style={styles.photoContainer}>
                    {photoUri == null || photoUri == "" ? //Show the default icon until they take a photo
                        <Image style={styles.profileBlank} source={ require('../assets/images/profile.png')}/>
                        :
                        <Image style={styles.profileFull} source={{uri : photoUri}}/>
                    }
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView style={styles.nameContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onFirstChange}
                    placeholder="First Name"
                    value={firstName}
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onLastChange}
                    placeholder="Last Name"
                    value={lastName}
                    placeholderTextColor="gray"
                />
                <TouchableOpacity 
                    style={styles.done} 
                    onPress={() => completePress()}>
                    <Text style={styles.doneText}>Create Profile</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      
    },
    title : {
        fontWeight: '300',
        textAlign: 'center',
        margin : 10,
    },
    titleSuccess : {
        fontWeight: '300',
        textAlign: 'center',
        margin : 10,
        color: 'green'
    },
    nameContainer : {
      flex: 2
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
      },
    profileContainer : {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    photoContainer : {
        borderWidth: 1,
        borderColor : 'rgb(201 230 228)',
        backgroundColor: 'white',
        borderRadius: 100,
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    profileBlank : {
        height: 175,
        width : 175,
    },
    profileFull : {
        height: 200,
        width : 200,
    },
    done : {
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
    doneText : {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },


})

export default ProfileScreen;