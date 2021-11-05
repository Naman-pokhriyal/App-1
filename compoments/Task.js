import React from "react";
import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
} from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <CheckBox
          value={props.check}
          onValueChange={props.onCheck}
          style={[
            { textDecorationLine: "line-through", checkedColor: "#666" },
            styles.square,
          ]}
        />
        <Text
          style={[
            styles.itemText,
            props.check ? styles.checked : styles.unchecked,
          ]}
        >
          {props.text}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onDelete} style={styles.itemRight}>
        <Text style={styles.minus}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    marginRight: 10,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  itemText: {
    maxWidth: "80%",
    fontSize: 16,
  },
  checked: { textDecorationLine: "line-through" },
  unchecked: { textDecorationLine: "none" },
  itemRight: {
    width: 25,
    height: 25,
    borderColor: "#f94355",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#ff2848",
    justifyContent: "center",
    alignItems: "center",
  },
  minus: {
    fontSize: 35,
    color: "#fff",
    transform: [{ translateY: -3 }],
  },
});

export default Task;
