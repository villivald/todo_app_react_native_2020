import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'
import DoubleClick from 'react-native-double-tap'
import Header from './components/Header'
import Footer from './components/Footer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

const firebaseApp =  firebase.initializeApp(firebaseConfig);
let firbaseDb = firebaseApp.database();

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: [],
      isAddMode: false,
      shouldShow: true,
    }
  }

  componentDidMount(){
    // start listening for firebase updates
    this.listenForTasks();
  }

  listenForTasks() {
    firbaseDb.ref('todos').on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          id: child.val().id,
          value: child.val().value,
          _key: child.key
        });
      });
  
      this.setState({
        taskList: tasks
      });
    });
  }

  addTask(taskTitle) {
    firbaseDb.ref('todos').push({ id: Math.random().toString(), value: taskTitle })
    this.cancelAddHandler()
  }

  removeHandler(goalKey) {
    firbaseDb.ref('todos/' + goalKey).remove()
  }

  cancelAddHandler() {
    this.setState({ isAddMode: false })
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'stretch',
        }}
      >
        <Header />
        <ScrollView style={styles.screen}>
          <GoalInput
            visible={this.state.isAddMode}
            onAddTask={(taskTitle) => {this.addTask(taskTitle)}}
            onCancel={() => this.cancelAddHandler}
          />
          <FlatList
            data={this.state.taskList}
            renderItem={(itemData) => (
              <GoalItem
                id={itemData.item._key}
                onDelete={this.removeHandler}
                title={itemData.item.value}
              />
            )}
          />
          <TouchableHighlight
            onPress={() => this.setState({ isAddMode: true })}
            style={styles.button}
            activeOpacity={0.6}
            underlayColor={'#30C4C9'}
          >
            <AntDesign name="plussquareo" size={64} color="#3B828F" />
          </TouchableHighlight>
          {this.state.shouldShow ? (
            <View style={styles.tipsContainer}>
              <DoubleClick doubleTap={() => this.setState({ shouldShow: !this.state.shouldShow })}>
                <View style={styles.tips}>
                  <Text style={styles.tipList}>
                    <AntDesign name="infocirlceo" size={24} color="black" /> Tips
                  </Text>
                  <Text style={styles.tip}>
                    Press the cross{' '}
                    <AntDesign name="plussquareo" size={24} color="black" />{' '}
                    button above to add new tasks
                  </Text>
                  <Text style={styles.tip}>
                    Tap on task to complete{' '}
                    <MaterialCommunityIcons
                      name="gesture-tap"
                      size={24}
                      color="black"
                    />
                  </Text>
                  <Text style={styles.tip}>
                    Long press to delete task{' '}
                    <MaterialCommunityIcons
                      name="gesture-tap-hold"
                      size={24}
                      color="black"
                    />
                  </Text>
                  <Text style={styles.tip}>
                    Double tap to hide tips{' '}
                    <MaterialCommunityIcons
                      name="gesture-double-tap"
                      size={24}
                      color="black"
                    />
                  </Text>
                </View>
              </DoubleClick>
            </View>
          ) : null}
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '75%',
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: '#E4E1DB',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  tips: {
    padding: 10,
  },
  tipList: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
  tip: {
    marginBottom: 10,
    fontSize: 15,
  },
  tipsContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#F5F5F5',
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    marginLeft: 15,
    width: 260,
  },
})
