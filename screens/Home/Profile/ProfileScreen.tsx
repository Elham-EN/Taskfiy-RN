import React from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Icon } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import OptionMenu from "./OptionMenu";

export default function ProfileScreen(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
      <View style={{ flex: 1, marginHorizontal: width / 12 }}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.mainSection}>
          <View style={styles.avatarSection}>
            <Avatar.Image
              size={120}
              source={require("../../../assets/images/placeholder.jpg")}
            />
            <View style={styles.avatarSectionTextContainer}>
              <Text style={styles.avatarSectionTextName}>Mike Tyson</Text>
              <Text style={styles.avatarSectionTextEmail}>Miketsyon@gmail.com</Text>
            </View>
          </View>
          <View style={styles.menuSection}>
            <OptionMenu>
              <FontAwesome name="edit" size={18} color={"black"} />
              <Text style={styles.mentionOptionText}>Edit Profile</Text>
            </OptionMenu>
            <OptionMenu>
              <MaterialIcons name="notifications-none" size={22} color={"black"} />
              <Text style={styles.mentionOptionText}>Notification</Text>
            </OptionMenu>
            <OptionMenu>
              <Ionicons name="color-palette-outline" size={22} color={"black"} />
              <Text style={styles.mentionOptionText}>Theme & Color</Text>
            </OptionMenu>
            <OptionMenu>
              <MaterialIcons name="logout" size={22} color={"red"} />
              <Text style={[styles.mentionOptionText, { color: "red" }]}>Logout</Text>
            </OptionMenu>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5dc",
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
  },
  mainSection: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSectionTextContainer: {
    flexDirection: "column",
    marginTop: 12,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarSectionTextName: {
    fontSize: 22,
    fontWeight: "600",
  },
  avatarSectionTextEmail: {
    fontSize: 16,
  },
  menuSection: {
    flex: 2,
    flexDirection: "column",
    gap: 16,
  },

  mentionOptionText: {
    fontSize: 18,
  },
});
