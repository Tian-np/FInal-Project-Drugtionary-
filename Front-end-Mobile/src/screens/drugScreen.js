import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { auth } from "../../firebase.js";

const DrugScreen = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = route.params;
  const axios = require("axios");

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.1.7:5000/api/drugs");
      const json = await response.json();
      setData(json);
      const response2 = await fetch(`http://192.168.1.7:5000/api/user/${auth.currentUser.email}`)
      const json2 = await response2.json();;
      setUser(json2)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  const addDrug = () => {
    user.drugs.push(id)
    const User = {
      drugs: user.drugs,
    };
    axios.put(`http://192.168.1.7:5000/api/user/${user._id}`, User);
  }

  return (
    <View style={{ flex: 1, margin: 20, backgroundColor: "#F9F8FF" }}>
      {
        data.filter(item => item._id == id).map((item, key) => {
          return (
            <View key={key} style={{ flex: 2, backgroundColor: "#F9F8FF",shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,
            
            elevation: 22,padding: 20, }}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  paddingTop: 20,
                }}
              >
                <Text style={{ fontSize: 24 }}>{item.name.geneticName}</Text>
              </View>
              <View style={{ width: "100%", paddingTop: 25 }}>
                <Text style={{ fontSize: 16, padding: 5 }}>ชื่อยา: {item.name.geneticName}</Text>
                <Text style={{ fontSize: 16, padding: 5 }}>
                  สรรพคุณ: {item.detail}
                </Text>
                <Text style={{ fontSize: 16, padding: 5 }}>
                  จำนวนครั้งในการรับประทาน: 3 ครั้ง / หลังอาหาร
                </Text>
                <Text style={{ fontSize: 16, padding: 5 }}>
                  จำนวนเม็ดต่อการรับประทาน: 1 เม็ด / ครั้ง
                </Text>
                <Text style={{ fontSize: 16, padding: 5 }}>
                  ข้อควรระวัง: หากมีภาวะการทำงานของตับผิดปกติ
                  ต้องปรึกษาแพทย์ก่อนใช้ยาเสมอ
                  ห้ามใช้ยากับคนที่แพ้ยาพาราเซตามอลเด็ดขาด อาการแพ้ยา ได้แก่
                  ผื่นขึ้น แน่นหน้าอก หายใจไม่ออก ห้ามใช้ยาหมดอายุ
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
                    <View style={{ flex: 0.1 }} />
                    <TouchableOpacity style={{flex: 2,
                        backgroundColor: "red",
                        padding: 5,
                        alignItems: "center",
                        height: "40%",
                        borderBottomLeftRadius: 10,}}
                        onPress={() => navigation.navigate("drugsScreen")}
                      >
                    <View
                    >
                        <Text style={{ color: "black" }}>ยกเลิก</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{ flex: 0.1 }} />
                    <TouchableOpacity style={{flex: 2,
                        backgroundColor: "lightgreen",
                        padding: 5,
                        alignItems: "center",
                        height: "40%",
                        borderBottomRightRadius: 10,}}
                        onPress={() => addDrug()}
                      >
                    <View
                    >
                        <Text style={{ color: "black" }}>เพิ่มยา</Text>
                    </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default DrugScreen;
