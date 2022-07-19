import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

const DrugScreen = ({ navigation }) => {
  const [textSeach, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.1.7:5000/api/drugs");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function onChangeSearch(text) {
    setSearch(text.substr(0, 20));
  }

  let filterDrugs = data.filter((item) => {
    return item.name.geneticName.indexOf(textSeach) !== -1;
  });

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#F9F8FF" }}
    >
      <View style={{ flex: 1, alignItems: "center", margin: 20, width: "90%" }}>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            width: "100%",
          }}
          onChangeText={(text) => onChangeSearch(text)}
          value={textSeach}
          placeholder="Seach"
        />
        <View style={{ flex: 1, alignItems: "flex-end", width: "100%" }}>
          <Text>เพิ่มยาใหม่</Text>
        </View>

        <SafeAreaView style={{ flex: 10, width: "100%" }}>
          <ScrollView>
            {textSeach != "" &&
              filterDrugs.map((item, key) => {
                return (
                  <View
                    style={{
                      flex: 3,
                      justifyContent: "center",
                      width: "100%",
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                    }}
                    key={key}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("drugScreen", { id: item._id })
                      }
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        backgroundColor: "white",
                        width: "100%",
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "white",
                        marginBottom: 10,
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
                            style={{
                              width: "70%",
                              height: undefined,
                              aspectRatio: 1,
                            }}
                            source={{
                              uri: item.images[0],
                            }}
                          />
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={{ flex: 2, paddingRight: 10 }}>
                          <Text style={{ color: "black", fontSize: 15 }}>
                            ยา: {item.name.geneticName}
                          </Text>
                          <Text style={{ color: "black", fontSize: 15 }}>
                            สรรพคุณ: {item.detail}
                          </Text>
                          <Text style={{ color: "black", fontSize: 15 }}>
                            วิธีการรับประทาน: 2 เม็ด/ครั้ง
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}

            {textSeach == "" &&
              data.map((item, key) => {
                return (
                  <View
                    style={{
                      flex: 3,
                      justifyContent: "center",
                      width: "100%",
                      padding: 10,
                    }}
                    key={key}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("drugScreen", { id: item._id })
                      }
                      style={{
                        flex: 1,
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
                            style={{
                              width: "70%",
                              height: undefined,
                              aspectRatio: 1,
                            }}
                            source={{
                              uri: item.images[0],
                            }}
                          />
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={{ flex: 2, paddingRight: 10 }}>
                          <Text style={{ color: "black", fontSize: 15 }}>
                            ยา: {item.name.geneticName}
                          </Text>
                          <Text style={{ color: "black", fontSize: 15 }}>
                            สรรพคุณ: {item.detail.substring(0, 100)}...
                          </Text>
                          <Text style={{ color: "black", fontSize: 15 }}>
                            วิธีการรับประทาน: 2 เม็ด/ครั้ง
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default DrugScreen;
