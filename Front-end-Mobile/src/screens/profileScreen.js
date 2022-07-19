import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase.js";



const ProfileScreen = ({navigation}) => {
  
  const [textSeach, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`http://192.168.1.7:5000/api/user/${auth.currentUser.email}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log(data)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={{ flexDirection: "column", flex: 1, backgroundColor: "#F9F8FF" }}
    >
      <View
        style={{
          flex: 2.5,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          borderBottomColor: "black",
          borderBottomWidth: 0.5,
        }}
      >
        <View style={{ flex: 2, paddingLeft: 10, justifyContent: "center",paddingTop:10,paddingBottom:10 }}>
          <Image
            style={{ width: null , height: "40%",flex: 1,
            }}
            source={{
              uri: "https://img.lovepik.com/original_origin_pic/18/04/28/c893d9cbbd4a7ce23b2a102d47399519.png_wh860.png",
            }}
          />
          <Button title="Switch Image" />
        </View>
        <View style={{ flex: 0.1 }} />
        <View
          style={{
            flex: 2,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize:16 }}>ชื่อ : {data.name}</Text>
          <Text style={{ fontSize:16 }}>นามสกุล : {data.lastname}</Text>
          <Text style={{ fontSize:16 }}>อายุ : {data.age} ปี</Text>
          <Text style={{ fontSize:16 }}>เพศ : {data.gender} </Text>
          <Text style={{ fontSize:16 }}>วันเกิด : XX/XX/XX</Text>
        </View>

        <View style={{ flex: 0.1 }} />
      </View>
      <View
        style={{
          flex: 2,
          padding: 15,
          borderBottomColor: "black",
          borderBottomWidth: 0.5,
        }}
      >
        <Text style={{ paddingLeft: 15,fontSize:24 }}>ยาที่กำลังรับประทาน</Text>
        <View
        style={{
          flex: 2,
          justifyContent: "center",alignItems: "center", marginLeft: 20, width: "90%" 
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("detailProfileScreen")}
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
            width: "100%",
            padding: 10,
            margin: 12,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
        >
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
                flex: 1,
                paddingRight: 10,
                borderRightWidth: 0.5,
                borderRightColor: "black",
              }}
            >
              <Image
                style={{ width: "70%", height: undefined, aspectRatio: 1 }}
                source={{
                  uri: "https://www.khaophuket.com/photo/listing/2016/1482804944_1.jpg",
                }}
              />
            </View>
            <View style={{ flex: 0.1 }} />
            <View style={{ flex: 2, paddingRight: 10 }}>
              <Text style={{ color: "black", fontSize: 15 }}>ยา: พารา</Text>
              <Text style={{ color: "black", fontSize: 15 }}>
                สรรพคุณ: ลดไข้
              </Text>
              <Text style={{ color: "black", fontSize: 15 }}>
                วิธีการรับประทาน: 2 เม็ด/ครั้ง
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      </View>
      <View style={{ flex: 2.5, padding: 5 }}>
        <Text style={{ paddingLeft: 10,fontSize:24 }}>คนไข้ในการดูแล</Text>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            margin: 20,
            width:"90%"
          }}
        >
          <TouchableOpacity
          onPress={() => navigation.navigate("detailProfileScreen")}
            style={{
              flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
            width: "100%",
            padding: 10,
            margin: 12,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
            }}
            
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ flex: 1, paddingRight: 10,borderRightWidth:0.5,borderRightColor:"black" }}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem-person-blue.svg/1024px-Emblem-person-blue.svg.png",
                  }}
                />
              </View>
              <View style={{ flex: 0.1 }} />
              <View style={{ flex: 2, paddingRight: 10 }}>
                <Text style={{ color: "black",fontSize:15 }}>นายนภัทร ติดดอย</Text>
                <Text style={{ color: "black",fontSize:15 }}>อายุ: 21 เพศ: ชาย</Text>
                <Text style={{ color: "black",fontSize:15 }}>
                  อาการ: หวาดผวากับพื้นที่สูง
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
