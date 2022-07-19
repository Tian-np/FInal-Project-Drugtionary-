import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import {
  GiftedChat,
  Actions,
  ActionsProps,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "../../env";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';

const BOT_USER = {
  _id: 2,
  name: "Health Bot",
  avatar:
    "https://previews.123rf.com/images/iulika1/iulika11909/iulika1190900021/129697389-medical-worker-health-professional-avatar-medical-staff-doctor-icon-isolated-on-white-background-vec.jpg",
};

class botScreen extends Component {
  state = {
    loading: false,
    drugData: [],
    pic:null,
    messages: [
      {
        _id: 1,
        text: "อับดุล ถามได้ตอบได้",
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
  };

  componentDidMount() {
    fetch("http://192.168.1.7:5000/api/drugs")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: true,
          drugData: responseJson,
        });
      })
      .catch((error) => console.log(error)); //to catch the errors if any

    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({pics: result.uri})
      let msg = {
        _id: this.state.messages.length + 1,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
        image: result.uri,
      };
  
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, [msg]),
      }));
    }
  };

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    let filterDrugs = this.state.drugData.filter((drug) => {
      return drug.name.geneticName.indexOf(text.substr(0, 20)) !== -1;
    });
    this.sendBotResponse(
      filterDrugs[0].name.geneticName,
      filterDrugs[0].images[0]
    );
  }

  onQuickReply(quickReply) {
    let message = quickReply[0].value;
    let filterDrugs = this.state.drugData.filter((drug) => {
      return drug.name.geneticName.indexOf(message.substr(0, 20)) !== -1;
    });
    let sendmsg = filterDrugs[0].detail;

    let msg = {
      _id: this.state.messages.length + 1,
      text: sendmsg,
      createdAt: new Date(),
      user: {
        _id: 2,
      },
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  sendBotResponse(text, img) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
      image: img,
      quickReplies: {
        type: "radio",
        keepIt: true,
        values: [
          {
            title: "ข้อมูลทั่วไป",
            value: text,
          },
        ],
      },
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff"}}>
        <GiftedChat
          textInputStyle={styles.composer}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          user={{
            _id: 1,
          }}
          renderSend={(props) => (
            <View
              style={{ flexDirection: "row", alignItems: "center", height: 60, }}
            >
              <TouchableOpacity  onPress={() => this.pickImage()}>
                <Icon size={30} name="picture"/>
              </TouchableOpacity>
              <Send {...props}>
                <View style={styles.btnSend}>
                <Icon2 size={30} name="ios-send"/>
                </View>
              </Send>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  composer: {
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    fontSize: 16,
  },
  btnSend: {
    height: 40,
    width: 40,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 50,
  },
});

export default botScreen;
