import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../constants/colors";

export default function ProgressLoader(): React.ReactElement {
  return (
    <View style={styles.btnContainer}>
      <Progress.CircleSnail color={"white"} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.onBoardingBtn,
    height: 50,
    borderRadius: 5,
    width: "100%",
    marginVertical: 20,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        overflow: "hidden",
        elevation: 4,
      },
    }),
  },
});
