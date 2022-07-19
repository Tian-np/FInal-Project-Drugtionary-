import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const DetailProfileScreen = ({ navigation }) => {
  const [text, onChangeText] = React.useState("Seach");

  return (
    <View style={{ flex: 1, margin: 20, backgroundColor: "#F9F8FF",shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    
    elevation: 22,padding: 20, }}>
      <View
        style={{ flex: 1, width: "100%", alignItems: "center", paddingTop: 20, }}
      >
        <Text style={{ fontSize: 24 }}>คนไข้ในการดูแล</Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          width: "100%",
          padding: 10,
        }}
      >
        <Image
          style={{ width: "30%", height: "100%" }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem-person-blue.svg/1024px-Emblem-person-blue.svg.png",
          }}
        />
      </View>
      <View style={{ width: "100%", paddingTop: 25 }}>
        <Text style={{ fontSize:16,padding: 5, }}>นายนภัทร ติดดอย</Text>
        <Text style={{ fontSize:16,padding: 5, }}>อายุ: 21 เพศ: ชาย</Text>
        <Text style={{ fontSize:16,padding: 5, }}>กรุ๊ปเลือด: B+</Text>
        <Text style={{ fontSize:16,padding: 5, }}>น้ำหนัก: 50 ส่วนสูง: 180</Text>
        <Text style={{ fontSize:16,padding: 5, }}>
          อาการ: หวาดผวากับพื้นที่สูง โดยเฉพาะดอยเขาต่างๆ
        </Text>
      </View>
      <View style={{ flex: 3, width: "100%", paddingTop: 20 }}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <View
              style={{
                flex: 2,
                backgroundColor: "red",
                padding: 10,
                alignItems: "center",
                height: "30%",
                borderBottomLeftRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("profileScreen")}
              >
                <Text style={{ color: "black", alignItems: "center" }}>
                  ย้อนกลับ
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.1 }} />
            <View
              style={{
                flex: 2,
                backgroundColor: "lightgreen",
                padding: 10,
                alignItems: "center",
                height: "30%",
                borderBottomRightRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("profileScreen")}
              >
                <Text style={{ color: "black" }}>ลบคนไข้ออกจากการดูแล</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailProfileScreen;
