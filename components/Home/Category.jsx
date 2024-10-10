import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import CtaegoryItem from './CtaegoryItem'
import { useRouter } from 'expo-router'

export default function Category({explore =false, onCategorySelect}) {

    const [categoryList, setCategoryList] = useState([])
    const router = useRouter();

    useEffect(()=>{
        getCategoryList()
    }, [])

    const getCategoryList = async()=>{
        setCategoryList([])
        const q = query(collection(db, 'Category'))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) =>{
            setCategoryList(prev=>[...prev, doc.data()])
        })
    }

    const onCategoryPresshandler = (category) =>{
        if(!explore){
            router.push('/businesslist/'+category.name)
        }else{
            onCategorySelect(category.name);
        }
    }

    return (
        <View>
            {!explore && <View style={{
                padding:20,
                display:'flex',
                flexDirection: 'row',
                justifyContent:'space-between',
                marginTop: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                }}>Category
                </Text>
                <Text style={{color: Colors.PRIMARY

                }}>View All</Text>
            </View>}

            <FlatList
                horizontal={true}
                style={{
                    marginLeft:20,
                }}
                showsHorizontalScrollIndicator={false}
                data={categoryList}
                renderItem={({item, index})=>{
                    return <CtaegoryItem category={item} key={index}
                    onCategoryPress={(category)=>{
                        onCategoryPresshandler(category)
                        
                    }}
                    />
                }}
            />
        </View>
    )
}
