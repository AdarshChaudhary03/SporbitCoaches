import Toast from 'react-native-simple-toast';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as React from 'react';
import firebaseSetup from '../../utils/setup';
import { heightToDP, widthToDP } from '../../utils/utils';
const {auth} = firebaseSetup();

const SignOut = () => {

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity
      style={styles.signOut}
      onPress={() => {
        signOut().then(() => {
          Toast.show('You are logged out.');
        });
      }}>
      <Text style={styles.signOutText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

export default SignOut;

const styles = StyleSheet.create({
  signOut: {
    backgroundColor: '#FF5959',
    paddingVertical: heightToDP('1.1%'),
    paddingHorizontal: widthToDP('17%'),
    margin: 40,
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
  },
  signOutText: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
});
