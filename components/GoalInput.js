import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const GoalInput = (props) => {
  const [task, setTask] = useState('')
  const handleTask = (enteredText) => {
    setTask(enteredText)
  }
  const addHandler = () => {
    props.onAddTask(task)
    setTask('')
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new task..."
          style={styles.input}
          onChangeText={handleTask}
          value={task}
        />
        <View style={styles.buttonLine}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={'#30C4C9'}
            onPress={props.onCancel}
          >
            <View>
              <MaterialIcons name="close" size={54} color="#e54b4b" />
              <Text>CLOSE</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={'#30C4C9'}
            onPress={addHandler}
          >
            <View>
              <MaterialIcons name="add" size={54} color="#3B828F" />
              <Text>ADD</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: '#333',
    borderRadius: 5,
    borderWidth: 1,
    padding: 20,
    marginBottom: 10,
  },
  buttonLine: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
})

export default GoalInput
