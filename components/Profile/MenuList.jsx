import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'

export default function MenuList() {
    const menuList = [
        {
            id:1,
            name: 'Add Business',
            icon: require('./../../assets/images/add.png')
        },
        {
            id:2,
            name: 'My Business',
            icon: require('./../../assets/images/business-and-trade.png')
        },
        {
            id:3,
            name: 'Share App',
            icon: require('./../../assets/images/share_1.png')
        },
        {
            id:4,
            name: 'Logout',
            icon: require('./../../assets/images/logout.png')
        },
    ]
  return (
    <View style={{
        marginTop:50
    }}>
      <FlatList
        numColumns={2}
        data={menuList}
        renderItem={({item, index})=>(
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                flex:1,
                padding:10,
                borderRadius:15,
                borderWidth:1,
                margin:10,
                backgroundColor:'white',
                borderColor: Colors.PRIMARY
            }}>
                <Image source={item.icon}
                    style={{
                        width:50,
                        height:50
                    }}
                />

                <Text style={{
                    fontSize:16,
                    flex:1
                }}>{item.name}</Text>
            </View>
        )}
      />

      <Text style={{
        textAlign:'center',
        marginTop:100,
        color: Colors.GRAY
      }}>Developed By skillzee @ 2024</Text>
    </View>
  )
}