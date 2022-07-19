import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{ flexDirection: "column", flex: 1, backgroundColor: "#F9F8FF" }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flex: 2, padding: 10 }}>
          <Text style={{ fontSize: 18 }}>นัดหมายที่กำลังจะถึง</Text>
        </View>
        <View style={{ flex: 0.1 }} />
        <View style={{ flex: 1.8, padding: 10, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
            <Text style={{ color: "blue" }}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.1 }} />
      </View>

      <View
        style={{
          flex: 2,
          backgroundColor: "#0083CD",
          margin: 20,
          borderRadius: 15,
          alignContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,

          elevation: 16,
        }}
      >
        <Text
          style={{ margin: 30, fontSize: 40,color: 'white', marginBottom: 5, marginTop: 10 }}
        >
          18:00 น.
        </Text>
        <Text style={{ paddingLeft: 20,color: 'white', fontSize: 20 }}>
          - Nurofren รับประทาน 2 เม็ด หลังอาหาร{" "}
        </Text>
        <Text style={{ paddingLeft: 20,color: 'white', fontSize: 20 }}>
          - Cemal รับประทาน 1 เม็ด หลังอาหาร{" "}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flex: 2, padding: 10 }}>
          <Text style={{ fontSize: 18 }}>ยาของฉัน</Text>
        </View>
        <View style={{ flex: 0.1 }} />
        <View style={{ flex: 2, padding: 10, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Drug")}>
            <Text style={{ color: "blue" }}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.1 }} />
      </View>

      <View
        style={{
          flex: 2,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          marginLeft: 20,
          width: "90%",
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

      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
          width: "90%",
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
                  uri: "https://s.isanook.com/he/0/rp/rc/w700h366/yacxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2hlLzAvdWQvMC8zNDczL2lzdG9ja18wMDAwMjc0NDM4NTdfbWVkaXVtLmpwZw==.jpg",
                }}
              />
            </View>
            <View style={{ flex: 0.1 }} />
            <View style={{ flex: 2, paddingRight: 10 }}>
              <Text style={{ color: "black", fontSize: 15 }}>
                ยา: คุมกำเนิด
              </Text>
              <Text style={{ color: "black", fontSize: 15 }}>
                สรรพคุณ: คุมกำเนิด
              </Text>
              <Text style={{ color: "black", fontSize: 15 }}>
                วิธีการรับประทาน: 1 เม็ด/ครั้ง
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
