import { View, Text, Image, Touchable } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'

export default function CtaegoryItem({ category,onCategoryPress }) {
    // console.log(category.icon);

    return (
        <TouchableOpacity onPress={()=>onCategoryPress(category)}>
            <View style={{padding:15,
                backgroundColor: Colors.CATEGORY,
                borderRadius: 99,
                marginRight: 15,
            }}>


                <Image source={{ uri: category.icon }}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </View>
            <Text style={{
                fontSize:12,
                textAlign:'center',
                marginTop:5
            }}>{category.name}</Text>
        </TouchableOpacity>
    )
}