import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';

export default function BusinessId() {

    const {businessid} = useLocalSearchParams();
    const [businessdetail, setBusinessDetail] = useState([])
    const [loading, setLoading] = useState(false); // Fixed typo here

    const getBusinessDetailById = async()=> {
        setLoading(true);
        const docRef = doc(db, "BusinessList", businessid)
        const docSnap = await getDoc(docRef);
        setBusinessDetail(docSnap.data());
        setLoading(false);
    }

    useEffect(()=> {
        getBusinessDetailById();
    }, [])

    return (
        <ScrollView>
            {loading ? <ActivityIndicator
            size={'large'}
            color={Colors.PRIMARY}
            style={{
                marginTop:'70%'
            }}
            /> :
            <View>
                {/* intro */}
                <Intro business={businessdetail}/>
                {/* Action Buttons */}
                <ActionButton business={businessdetail}/>
                {/* About Section */}
                <About business={businessdetail}/>
            </View>
            }
        </ScrollView>
    )
}
