import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { CreateTaskModalScreenProp } from "../../../types/navigationTypes";

export default function CreatTaskModalScreen({
  navigation,
}: CreateTaskModalScreenProp): React.ReactElement {
  const { width } = useWindowDimensions();

  const handleModalCancel = () => {
    navigation.goBack();
  };

  const handleModalDone = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: ({ tintColor }) => (
        <Pressable onPress={handleModalCancel}>
          <Text style={{ color: "red", fontWeight: "600" }}>Cancel</Text>
        </Pressable>
      ),
      headerRight: ({ tintColor }) => (
        <Pressable onPress={handleModalDone}>
          <Text style={{ color: tintColor, fontWeight: "600" }}>Done</Text>
        </Pressable>
      ),
    });
    console.log("Navigation");
  }, [navigation]);

  return (
    <ScrollView style={[styles.container]}>
      <View style={{ marginHorizontal: width / 12 }}>
        <Text>Creat Task Modal Screen</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5dc",
    flex: 1,
    paddingTop: 16,
  },
});
