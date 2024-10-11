import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({business}) {
  // console.log(business.imgUrl);
  const router = useRouter();
  const {user} = useUser();
  const onDelete = ()=>{
    Alert.alert('Do You Want to Delete?', "This action cannot be reverted back", [
      {
        text:'Cancel',
        style:'cancel'
      },
      {
        text:'Delete',
        style:'destructive',
        onPress:()=>deleteBusiness()
      }
    ])
  }

  const deleteBusiness = async()=>{
    console.log("Business Deleted");
    await deleteDoc(doc(db, 'BusinessList', business.id))
    router.back();
    ToastAndroid.show('Business Dleted', ToastAndroid.LONG)
  }
  
  return (
    <View>
      <View style={{
        position: 'absolute',
        zIndex: 10,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'100%',
        padding:20,
        marginTop: 20,
      }}>
      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="white" />
      </TouchableOpacity>
      
      <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image source={{uri: business.imgUrl}}
      style={{
        width: '100%',
        height: 340
      }}
      />

      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        marginTop:-20,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
      <View style={{
        padding:20,
        marginTop:-20,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
        <Text
          style={{
            fontSize: 26,
          }}
        >{business.name}
        </Text>
        <Text
        style={{
          fontSize: 18
        }}
        >{business.address}</Text>
      </View>
      {user.primaryEmailAddress.emailAddress == business.userEmail && < TouchableOpacity onPress={()=>onDelete()}>
        <Ionicons name="trash" size={24} color="red" />

      </TouchableOpacity>}
        </View>
    </View>
  )
}