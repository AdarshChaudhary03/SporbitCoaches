import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { heightToDP, widthToDP } from "../../utils/utils";

const EmptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyListTextA}>Uh-oh! This looks empty</Text>
        <Text style={styles.emptyListTextB}>
        </Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    emptyList: {
        alignItems: 'center',
//        height: heightToDP('50%'),
        justifyContent: 'center',
        marginTop: '10%'
      },
      emptyListTextA: {
        fontSize: widthToDP('5%'),
        marginVertical: 5,
        fontFamily: 'Gilroy-SemiBold',
        letterSpacing: 2,
      },
      emptyListTextB: {
        fontSize: widthToDP('3%'),
        marginVertical: 5,
        fontFamily: 'Gilroy-SemiBold',
        letterSpacing: 2,
      },
  })

  export default EmptyList;