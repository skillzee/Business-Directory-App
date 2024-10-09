import { View, Text, TextInput, Button, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { useUser } from '@clerk/clerk-expo';
import Toast from 'react-native-toast-message';


export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setuserInput] = useState();
    const { user } = useUser();

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business.id)

        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                Comment: userInput,
                userName: user.fullName,
                userImange: user.imageUrl,
                userEmail: user.primaryEmailAddress.emailAddress
            })
        })

        ToastAndroid.show('Comment Added SuccessFully !', ToastAndroid.BOTTOM)
        // Toast.show({
        //     type: 'success',
        //     text1: 'Comment Added SuccessFully !',
        //     position:'bottom'

        // })


    }

    return (
        <View style={{
            padding: 20,
            backgroundColor: 'white'
        }}>
            <Text style={{
                fontSize: 20,
            }}>Reviews</Text>

            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder='Write your comment'
                    numberOfLines={4}
                    onChangeText={(value) => setuserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top'
                    }}
                />

                <TouchableOpacity
                    disabled={!userInput}
                    onPress={() => onSubmit()}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6,
                        marginTop: 10
                    }}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>

            {/* Display Previous Reviews */}

            <View>
                {business?.reviews?.map((item, index) => (


                    <View style={{
                        display:'flex',
                        flexDirection:'row',
                        gap:10,
                        alignItems:'center',
                        padding:10,
                        borderWidth:1,
                        borderColor:Colors.GRAY,
                        borderRadius:15,
                        marginTop:10
                    }}>
                        <Image source={{ uri: item.userImange }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 99
                            }}
                        />
                        <View style={{
                            display:'flex',
                            gap:5
                        }}> 
                            <Text>{item.userName}</Text>
                            <Rating 
                            imageSize={20}
                            ratingCount={item.rating}
                            style={{
                                alignItems:'flex-start'
                            }}
                            />
                            <Text>{item.Comment}</Text>
                        </View>
                    </View>
                ))}
            </View>


        </View>
    )
}