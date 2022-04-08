import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Forward from '../../../../assets/icons/courses/forward.svg';
import { heightToDP, widthToDP } from '../../../utils/utils';
import Header from '../../constants/Header';
import { useNavigation } from '@react-navigation/native';

const HelpAndSupport = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header text={'Help and Support'} />
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() =>{
            console.log('enterddddddddd');
            navigation.navigate('FAQ');
          }
          }>
          <Text style={styles.itemRowTextMain}>FAQs</Text>
          <Forward />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() =>
            navigation.navigate('CustomerSupport')
          }>
          <Text style={styles.itemRowTextMain}>Customer Support</Text>
          <Forward />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() =>
            navigation.navigate('PrivacyPolicy')
          }>
          <Text style={styles.itemRowTextMain}>Privacy Policy</Text>
          <Forward />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() =>
            navigation.navigate('RefundPolicy')
          }>
          <Text style={styles.itemRowTextMain}>Refund Policy</Text>
          <Forward />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() =>
            navigation.navigate('TermsAndConditions')
          }>
          <Text style={styles.itemRowTextMain}>Terms And Conditions</Text>
          <Forward />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  itemRow: {
    paddingVertical: heightToDP('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('5%'),
    flexDirection: 'row',
  },
  itemRowTextMain: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: heightToDP('1%'),
  },
  itemRowTextSub: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    color: '#777777',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  body: {
    paddingTop: heightToDP('8%'),
  },
  heading: {
    backgroundColor: 'rgba(56, 56, 56, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
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
    fontFamily: 'Gilroy-Regular',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
});
