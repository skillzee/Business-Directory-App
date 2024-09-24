import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { Image } from 'react-native';

export default function Slider() {

    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        getSliderList();
    }, []);

    const getSliderList = async () => {
        setSliderList([]);
        const q = query(collection(db, 'Slider'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(prev => [...prev, doc.data()]);
        });
    };

    const renderItem = ({ item }) => (
        <View>
            <Image 
                source={{ uri: item.imageUrl }} 
                style={{
                    width: 300,
                    height: 150,
                    borderRadius:15,
                    marginRight:15
                }} 
            />
        </View>
    );

    return (
        <View>
            <Text style={{
                fontSize: 20,
                paddingLeft:20,
                paddingTop:20,
                marginBottom:5
            }}>
                #Special For You
            </Text>
            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{paddingLeft: 20}}
                data={sliderList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}
