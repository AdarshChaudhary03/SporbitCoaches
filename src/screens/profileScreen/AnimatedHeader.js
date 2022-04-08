import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import * as React from 'react';
import { heightToDP, widthToDP } from '../../utils/utils';
import { useNavigation } from '@react-navigation/native';

const AnimatedHeader = (props) => {

  const navigation = useNavigation();

  const { coach } = props;
  console.log('navigation2',navigation);
    return (
    <View style={styles.headerProfile}>
      <View style={styles.image}>
        <Avatar
          rounded
          overlayContainerStyle={styles.avatarContainer}
          size={widthToDP('18%')}
          title={coach.displayName ? coach.displayName.split(' ')
          .map((n, index) => {
            if (index < 2) {
              return n[0];
            }
          })
          .join(''): 'Default'}
          source={{
            uri: 'avatar',
          }}
        />
      </View>
      <View style={styles.profileBrief}>
        <Text style={styles.nameText}>{coach.displayName}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfileScreen');
          }}>
          <Text style={styles.editButtonText}>Show Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnimatedHeader;
const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: widthToDP('18%'),
    width: widthToDP('18%'),
    // borderRadius: widthToDP('10%'),
  },
  headerProfile: {
    alignItems: 'center',
    flexDirection: 'row',
    width: widthToDP('100%'),
    backgroundColor: '#fff',
    paddingHorizontal: heightToDP('2%'),
    marginTop: 5,
    marginBottom: 5,
    height: heightToDP('15%')
  },
  profileBrief: {
    paddingHorizontal: heightToDP('2%'),
    justifyContent: 'center',
  },
  nameText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
    color: '#707070',
  },
  emailText: {
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    color: '#707070',
  },
  editButtonText: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    color: '#FF5959',
  },
  avatarContainer: {
    backgroundColor: '#ff5959',
  },
});
