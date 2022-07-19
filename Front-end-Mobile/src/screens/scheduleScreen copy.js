import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";

const ScheduleScreen = () => {
  const [isEnabled0, setIsEnabled0] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch0 = () => setIsEnabled0((previousState) => !previousState);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  return (
    <View
      style={{ flexDirection: "column", flex: 1, backgroundColor: "#F9F8FF" }}
    >
      <View style={{ alignItems: 'center',paddingTop:20}}><Text style={{ fontSize:18 }}>ตารางนัดหมาย</Text></View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 2, padding: 10, justifyContent: "center" }}>
          <Text style={{ fontSize:32 }}>8.30 น.</Text>
          <Text style={{ fontSize:16 }}>Amlodipine</Text>
          <Text style={{ fontSize:16 }}>หลังอาหาร</Text>
          <Text style={{ fontSize:16 }}>ครั้งละ 2 เม็ด</Text>
          <Text style={{ fontSize:16 }}>เช้า เที่ยง เย็น</Text>
          <Text style={{ fontSize:16 }}>ทุกวัน</Text>
        </View>
        <View style={{ flex: 0.1 }} />
        <View
          style={{
            flex: 2,
            padding: 10,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled0 ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch0}
            value={isEnabled0}
          />
          <Image
            style={{ width: "70%", height: "50%" }}
            source={{
              uri: "https://s.isanook.com/he/0/ud/6/30289/pills.jpg",
            }}
          />
        </View>

        <View style={{ flex: 0.1 }} />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 2, padding: 10, justifyContent: "center" }}>
          <Text style={{ fontSize:32 }}>12.00 น.</Text>
          <Text style={{ fontSize:16 }}>Amlodipine</Text>
          <Text style={{ fontSize:16 }}>หลังอาหาร</Text>
          <Text style={{ fontSize:16 }}>ครั้งละ 2 เม็ด</Text>
          <Text style={{ fontSize:16 }}>เช้า เที่ยง เย็น</Text>
          <Text style={{ fontSize:16 }}>ทุกวัน</Text>
        </View>
        <View style={{ flex: 0.1 }} />
        <View
          style={{
            flex: 2,
            padding: 10,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
          <Image
            style={{ width: "70%", height: "50%" }}
            source={{
              uri: "https://www.vejthani.com/wp-content/uploads/2018/04/Page-12-13-All-About-Medicine-e1567420226769.jpg",
            }}
          />
        </View>

        <View style={{ flex: 0.1 }} />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 2, padding: 10, justifyContent: "center" }}>
          <Text style={{ fontSize:32 }}>15.30 น.</Text>
          <Text style={{ fontSize:16 }}>Amlodipine</Text>
          <Text style={{ fontSize:16 }}>หลังอาหาร</Text>
          <Text style={{ fontSize:16 }}>ครั้งละ 2 เม็ด</Text>
          <Text style={{ fontSize:16 }}>เช้า เที่ยง เย็น</Text>
          <Text style={{ fontSize:16 }}>ทุกวัน</Text>
        </View>
        <View style={{ flex: 0.1 }} />
        <View
          style={{
            flex: 2,
            padding: 10,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
          <Image
            style={{ width: "70%", height: "50%" }}
            source={{
              uri: "https://siamrath.co.th/files/styles/1140/public/img/20190108/8e09acb2e2c5681365e727dbdbf701cd59ed5bc0f5b802956bafb53b315bd090.JPG?itok=pels43eU",
            }}
          />
        </View>

        <View style={{ flex: 0.1 }} />
      </View>
    </View>
  );
};

export default ScheduleScreen;
