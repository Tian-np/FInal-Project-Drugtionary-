import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { auth } from "../../firebase.js";
import { Switch } from "react-native-switch";


const ScheduleScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [drug, setDrug] = useState([]);

  var moment = require('moment');

  const getData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.7:5000/api/schedule/${auth.currentUser.uid}`
      );
      const json = await response.json();
      setData(json);
      const response2 = await fetch(
        `http://192.168.1.7:5000/api/drug`
      );
      const json2 = await response.json();
      setDrug(json2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);



  return (
    <View
      style={{
        flex: 1,
        margin: 7,
        backgroundColor: "#F9F8FF",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
        padding: 20,
      }}
    >
      <SafeAreaView style={{ width: "100%"}}>
        <ScrollView>
          {data.map((item,key) => {
            return (<View
              style={{
                flex: 3,
                justifyContent: "center",
                width: "100%",
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  backgroundColor: "white",
                  width: "100%",
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    width: "80%",
                  }}
                >
                  
                  <View style={{ flex: 2, paddingRight: 10}} key={key}>
                    <Text style={{ color: "black", fontSize: 15 }}>
                      เวลา: {moment(item.date).format('LT')} 
                    </Text>
                    <Text style={{ color: "black", fontSize: 15 }}>
                      ยา: {item.drugName} 
                    </Text>
                    <Text style={{ color: "black", fontSize: 15 }}>
                      {item.detail.beforeMeal ? (<Text>ทานก่อนอาหาร</Text>) : (<Text>ทานหลังอาหาร</Text>) }
                    </Text>
                    <Text style={{ color: "black", fontSize: 15 }}>
                      ทาน: {item.detail.dose } เม็ด
                    </Text>
                  </View>
                  <View
                  >
                    <Switch value={item.enable} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>)
          })}
        </ScrollView>
      </SafeAreaView>
      <View style={{ flex: 0.1 }} />
    </View>
  );
};

export default ScheduleScreen;
