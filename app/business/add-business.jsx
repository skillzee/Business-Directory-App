import { View, Text, Image, TextInput, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {db, storage} from './../../configs/FireBaseConfig'
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';


export default function AddBusiness() {


    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([])
    const {user} = useUser()

    const [name, setName] = useState();
    const [address, setAdress] = useState();
    const [conatct, setconatct] = useState();
    const [website, setwebsite] = useState();
    const [about, setabout] = useState();
    const [category, setcategory] = useState();
    const [loading, setLoading] = useState(false);


    const GetCategoryList = async()=>{
        setCategoryList([])
        const q = query(collection(db, 'Category'));
        const snapShot = await getDocs(q);
        snapShot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev, {
                label:(doc.data()).name,
                value:(doc.data()).name
            }])
            
        })
    }


    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        })
        GetCategoryList()
    }, [])

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        setImage(result.assets[0].uri)
        console.log(result);

    }


    const onAddNewBusiness= async()=>{
        setLoading(true)
        
        try {
            const fileName = Date.now().toString()+".jpg";
            const resp = await fetch(image);
            const blob = await resp.blob();
            const imageRef = ref(storage, 'business-app/'+fileName);
            
            const snapShot = await uploadBytes(imageRef, blob);
            console.log("File Uploaded...");
    
            const downloadUrl = await getDownloadURL(imageRef);
            console.log(downloadUrl);
    
            await saveBusinessDetail(downloadUrl);
    
            ToastAndroid.show('New Business Added...', ToastAndroid.LONG);
        } catch (error) {
            console.error("Error uploading or saving business:", error);
        } finally {
            setLoading(false);
        }
    }

    const saveBusinessDetail = async(imageUrl)=>{
        await setDoc(doc(db, 'BusinessList', Date.now().toString()),{
            name: name,
            address: address,
            conatct: conatct,
            about: about,
            website: website,
            category: category,
            username: user.fullName,
            userEmail: user.primaryEmailAddress.emailAddress,
            userImage: user.imageUrl,
            imgUrl: imageUrl
        })

        // setLoading(false);
        ToastAndroid.show('New Business Added...', ToastAndroid.LONG)
    }

    return (
        <ScrollView style={{
            padding: 20
        }}>
            <Text style={{
                fontSize: 25
            }}>Add New Business</Text>

            <Text
                style={{
                    color: Colors.GRAY
                }}>Fill all details in order to add a new business</Text>

            <TouchableOpacity style={{
                marginTop: 20
            }}
                onPress={() => onImagePick()}
            >
                {!image ? <Image source={require('../../assets/images/placeholder.png')} style={{
                    width: 100,
                    height: 100
                }} />
                    :
                    <Image source={{ uri: image }} style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15
                    }} />
                }
            </TouchableOpacity>

            <View>
                <TextInput
                    placeholder='Name'
                    onChangeText={(v)=>setName(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }}
                />
                <TextInput
                    placeholder='Address'
                    onChangeText={(v)=>setAdress(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }}
                />
                <TextInput
                    placeholder='Contact'
                    onChangeText={(v)=>setconatct(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }}
                />
                <TextInput
                    placeholder='WebSite'
                    onChangeText={(v)=>setwebsite(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }}
                />
                <TextInput
                    multiline
                    numberOfLines={5}
                    placeholder='About'
                    onChangeText={(v)=>setabout(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        height: 100
                    }}
                />


                <View style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                }}>
                    <RNPickerSelect
                        onValueChange={(value) => setcategory(value)
                            
                        }
                        items={categoryList}
                    />
                </View>
            </View>


            <TouchableOpacity
                disabled={loading}
             style={{
                padding:15,
                backgroundColor:Colors.PRIMARY,
                borderRadius:5,
                marginTop:20
            }}
            onPress={()=>onAddNewBusiness()}
            >
            { loading? <ActivityIndicator size={'large'} color={'white'}/>:
               <Text style={{
                    textAlign:'center',
                    color:'white'
                }}>Add New Business</Text>
            }   
            </TouchableOpacity>

            <View style={{
                height: 50
            }}>

            </View>

        </ScrollView>
    )
}