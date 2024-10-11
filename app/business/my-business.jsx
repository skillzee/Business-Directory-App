import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import BusinessListCard from '../../components/Explore/BusinessListCard';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function MyBusiness() {


    const {user} = useUser();
    const [businessList, setBusinessList] = useState([]);

    const [laoding, setLoading] = useState(false)

    const navigation = useNavigation();

    const getUserBusiness = async()=>{
        setLoading(true);
        setBusinessList([])
        const q = query(collection(db, 'BusinessList'), where('userEmail', '==', user.primaryEmailAddress.emailAddress))

        const querySnapShot = await getDocs(q)

        querySnapShot.forEach((doc)=>{
            // console.log(doc.data());
            setBusinessList(prev=>[...prev, {id: doc.id, ...doc.data()}])
        })
        setLoading(false);
    }

    useEffect(()=>{
        user&&getUserBusiness()
        navigation.setOptions({
          headerShown: true,
          headerTitle: "My Business",
          headerStyle:{
            backgroundColor: Colors.PRIMARY
          }
        })
    }, [user])


  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontSize: 30
      }}>My Business</Text>


      <FlatList
        data={businessList}
        onRefresh={getUserBusiness}
        refreshing={laoding}
        renderItem={({item, index})=>(
            <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  )
}