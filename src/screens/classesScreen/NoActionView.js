import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { heightToDP, widthToDP } from "../../utils/utils";

const NoActionView = props => {
    return (
        <View style={styles.container}>
        <View style={styles.homeworkView}>
          <Text style={styles.tabHeaderText}>Task Completed</Text>
        </View>
        <View style={styles.homework}>
          <Text>No Task pending for today.</Text>
        </View>
      </View>
  
    );
}

const styles = StyleSheet.create({
container: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    marginBottom: widthToDP('7%'),
    marginTop: heightToDP('5%'),
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
    overflow: 'hidden',
    height: heightToDP('25%')
},
homeworkView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabHeaderText: {
    fontSize: widthToDP('6.5%'),
    fontFamily: 'Gilroy-SemiBold',
    justifyContent: 'center'
  },
  homework: {
    paddingBottom: heightToDP('5%'),
    paddingTop: heightToDP('5%'),
    marginTop: heightToDP('5%'),
    flexDirection:'row',
    justifyContent: 'center'
  },
})

export default NoActionView;