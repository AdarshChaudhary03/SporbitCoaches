import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { heightToDP, widthToDP } from '../../utils/utils';
import BackButton from '../../../assets/icons/header/backButton.svg';

const Header = ({text, backPressed, navigation}) => {

  //console.log(navigation);

  return (
    <View style={styles.heading}>
      <View style={styles.headingIcon}>
  {navigation ?  <View style={styles.backButton}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <BackButton />
            </TouchableOpacity>
          </View> : null}
      </View>
      <Text style={styles.headingText}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  heading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: widthToDP('100%'),
    backgroundColor: 'rgba(28, 38, 87, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
    zIndex: 1000,
  },
  backButton: {
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('4%'),
  },
  headingIcon: {
    position: 'absolute',
    left: 0,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: heightToDP('3%'),
    color: '#E0E0E0',
    fontFamily: 'Gilroy-SemiBold',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
});
