import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Intro({business}) {
  // console.log(business.imgUrl);
  const router = useRouter();
  
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
        padding:20,
        marginTop:-20,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
        <Text
          style={{
            fontSize: 26
          }}
        >{business.name}
        </Text>
        <Text
        style={{
          fontSize: 18
        }}
        >{business.address}</Text>
      </View>

    </View>
  )
}