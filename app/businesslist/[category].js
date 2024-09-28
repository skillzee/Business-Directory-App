import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FireBaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [BusinessList, setBusinessList] = useState([]);

  const [loading, setLoading] =useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setLoading(true)
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);

    const businessArray = [];
    querySnapshot.forEach((doc) => {
      businessArray.push(doc.data());
    });
    setBusinessList(businessArray);
    setLoading(false)
  };

  return (
    <View>

        {BusinessList.length>0 && loading == false?
      <FlatList 
      onRefresh={getBusinessList}
      refreshing={loading}
      data={BusinessList}
      renderItem={({item,index}) =>(
        <BusinessListCard 
        business = {item}
        key={index}
        />
      )}
      />:
      loading?<ActivityIndicator
        size={'large'}
        color={Colors.PRIMARY}
        marginTop="60%"
      />:
      <Text style={{
        fontSize: 20,
        color: Colors.GRAY,
        textAlign: 'center',
        marginTop:'50%'
      }}>
        No Business Found for this Categogry
    </Text>}
    </View>
  );
}
