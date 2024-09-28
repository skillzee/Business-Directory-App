import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDoc, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import { FlatList } from 'react-native'
import PopularBusinessCard from './PopularBusinessCard'

export default function PopularBusiness() {



    const [businessList, setBusinessList] = useState([])

    useEffect(() => {
        getBusinessList()
    }, [])

    const getBusinessList = async () => {
        setBusinessList([]);
        const q = query(collection(db, "BusinessList"), limit(10))
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev => [...prev, doc.data()])
        })
    }

    return (
        <View>
            <View style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                }}>Popular Business
                </Text>
                <Text style={{
                    color: Colors.PRIMARY

                }}>View All</Text>
            </View>

            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={businessList}
                renderItem={({item,index})=>(
                    <PopularBusinessCard
                    business={item}
                    key={index}
                    />
                )}
                
            />
        </View>
    )
}