import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./compoments/Task";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    saveData();
  }, [tasks]);

  const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      let temp = await AsyncStorage.getItem("@storage_Key");
      if (temp != null) {
        setTasks(JSON.parse(temp));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const AddTask = () => {
    Keyboard.dismiss();
    if (newTask == null) return;
    setTasks([...tasks, { name: newTask, done: false }]);
    setNewTask(null);
  };

  const removeTodo = (index) => {
    let CopyLi = [...tasks];
    CopyLi.splice(index, 1);
    // console.log("Old:", tasks, " New: ", CopyLi);
    setTasks(CopyLi);
  };

  const changeCheck = (index) => {
    tasks[index].done = !tasks[index].done;
    let CopyLi = [...tasks];
    tasks[index].done == true
      ? CopyLi.push(CopyLi.splice(index, 1)[0])
      : CopyLi.unshift(CopyLi.splice(index, 1)[0]);
    // console.log(CopyLi);
    setTasks(CopyLi);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>TO-DO LIST</Text>

        <ScrollView style={styles.items}>
          {tasks.length ? (
            tasks.map((item, index) => {
              return (
                <Task
                  key={index}
                  text={item.name}
                  onDelete={() => removeTodo(index)}
                  onCheck={() => changeCheck(index)}
                  check={item.done}
                />
              );
            })
          ) : (
            <Text
              style={{
                fontSize: 20,
                color: "#C0C0C0",
                alignSelf: "center",
                paddingTop: 40,
              }}
            >
              Nothing To-Do
            </Text>
          )}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Add a new Task"}
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />

        <TouchableOpacity onPress={() => AddTask()}>
          <View style={styles.btnWrapper}>
            <Text style={styles.btnIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  items: {
    marginTop: 30,
    height: "78%",
  },
  inputWrapper: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    bottom: 0,
    paddingVertical: 10,
    borderTopColor: "#EDEDED",
    borderTopWidth: 2,
    backgroundColor: "#E8EAED",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "70%",
    fontSize: 16,
    elevation: 1,
  },
  btnWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnIcon: {
    fontSize: 30,
    transform: [{ translateY: -2 }],
    color: "#A4A4A4",
  },
});
