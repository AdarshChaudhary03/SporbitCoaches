import {
    ActivityIndicator,
    // Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import * as React from 'react';
  import {launchImageLibrary} from 'react-native-image-picker';
  import {useContext, useState} from 'react';
  import Man from '../../../assets/icons/profile/edit/man-user 2.svg';
  import Woman from '../../../assets/icons/profile/edit/woman 2.svg';
  import Header from '../constants/Header';
import DatePicker from 'react-native-datepicker';
import { Avatar } from 'react-native-elements';
import { heightToDP, widthToDP } from '../../utils/utils';
import { updateCoach } from '../../utils/setters';
 import firebaseSetup from '../../utils/setup';

 const { auth, storage } =  firebaseSetup();

  export const uploadUserProfileImage = async (image, type) => {
    let photoURL = '';
    const RNFS = require('react-native-fs');
    const profileImage = storage().ref(
      'users/' + auth().currentUser.uid + '/profileImage.png',
    );
    const imagePath = `${RNFS.DocumentDirectoryPath}/temp.png`;
    //console.log('type ',type);
  
    if (type === 'url') {
      const imageUrl = decodeURI(image);
      await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: imagePath,
      })
        .promise.then(() => {})
        .catch(() => {});
  
      await profileImage.putFile(imagePath);
      photoURL = await profileImage.getDownloadURL();
    }
  
    if (type === 'base64') {
      await RNFS.writeFile(imagePath, image, 'base64');
      await profileImage.putFile(imagePath);
      photoURL = await profileImage.getDownloadURL();
    }
    setUser(prevUser => ({
        ...prevUser,
        photoURL: photoURL,
    }));
  };
  


  const EditProfileScreen = ({navigation, route}) => {
//    const {user, updateUserContext} = useContext(AppContext);

    const { user, setUser } = route.params;

    console.log('userinEditProfile',user);

    const [userName, setUserName] = useState(user.displayName);
    const [userImage, setUserImage] = useState(user.photoURL);
    const [userBirthday, setUserBirthday] = useState(user.birthday);
    const [userBirthdayEdit, setUserBirthdayEdit] = useState(false);
    const [userGender, setUserGender] = useState(user.gender);
    // const [googleLogin, setGoogleLogin] = useState(false);
    const [userEmail, setUserEmail] = useState(user.email);
    // const [facebookLogin, setFacebookLogin] = useState(false);
    const [err, setErr] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [activity, setActivity] = useState(false);

    const onSubmitPressed = async () => {
      if (!userName || !userEmail || !userGender) {
        setErr('Please fill all fields.');
        return false;
      }
      if (!emailValid) {
        setErr('Invalid Email Address.');
        return false;
      }
      if (userBirthday > new Date()) {
        setErr('Incorrect Date of Birth.');
        return false;
      }
      setErr('');
      setActivity(true);
      const userUpdate = {};
      userUpdate.displayName = userName;
      userUpdate.birthday = userBirthday;
      userUpdate.gender = userGender;
      userUpdate.email = userEmail;
      await updateCoach(userUpdate,user.uid);
      setUser(prevUser => ({
          ...prevUser,
          gender: userGender,
          birthday: userBirthday,
          email: userEmail,
          displayName: userName
      }));
        return true;
    };
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header text={'Profile'} navigation={navigation}/>
        <ScrollView>
          <View style={styles.footer}>
            <View style={styles.image}>
              <Avatar
                rounded
                size={widthToDP('33%')}
                title={user.displayName}
                source={{
                  uri:userImage ? userImage : 'avatar',
                }}
              />
  
              <View style={styles.imageEditButtonBox}>
                <TouchableOpacity
                  style={styles.imageEditButton}
                  onPress={() => {
                    launchImageLibrary(
                      {mediaType: 'photo', includeBase64: true},
                      async (response) => {
                        const {error, didCancel, uri, base64} = response;
                        if (didCancel) {
                          //console.log('User cancelled image picker');
                        } else if (error) {
                          //console.log('ImagePicker Error: ', error);
                        } else {
                          setUserImage(uri);
                          await uploadUserProfileImage(base64, 'base64');
                        }
                     },
                   );
                  }}>
                  <Text style={styles.imageEditButtonText}>EDIT</Text>
                </TouchableOpacity>
              </View>
            </View>
  
            {/*<View style={styles.socialMedia}>*/}
            {/*  <View style={styles.socialMediaButton}>*/}
            {/*    <GoogleButton />*/}
            {/*  </View>*/}
            {/*  <View style={styles.socialMediaButton}>*/}
            {/*    <FacebookButton />*/}
            {/*  </View>*/}
            {/*</View>*/}
  
            <View style={styles.userDetails}>
              <View style={styles.userDetailsTab}>
                <Text style={styles.userDetailsText}>NAME</Text>
                <TextInput
                  style={styles.userDetailsTextInput}
                  value={userName}
                  autoCapitalize={'words'}
                  onChangeText={(text) => setUserName(text)}
                  underlineColorAndroid="#707070"
                  placeholder="Enter your Name"
                />
              </View>
              <View style={styles.userDetailsTab}>
                <Text style={styles.userDetailsText}>DATE OF BIRTH</Text>
                {userBirthdayEdit ? (
                  <View style={styles.datePicker}>
                    <DatePicker
                      timeZoneOffsetInMinutes={330}
                      mode={'date'}
                      date={userBirthday}
                      onDateChange={setUserBirthday}
                    />
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setUserBirthdayEdit(false)}>
                      <Text style={styles.datePickerText}>CONFIRM</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => setUserBirthdayEdit(true)}>
                    <TextInput
                      editable={false}
                      style={styles.userDetailsTextInput}
                      value={userBirthday ? userBirthday
                         : ''}
                      underlineColorAndroid="#707070"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.userDetailsTab}>
                <Text style={styles.userDetailsText}>GENDER</Text>
                <View style={styles.genderPicker}>
                  <TouchableOpacity
                    onPress={() => {
                      setUserGender('Female');
                    }}
                    style={
                      userGender === 'Female'
                        ? styles.activeGenderPickerOption
                        : styles.genderPickerOption
                    }>
                    <Woman />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setUserGender('Male');
                    }}
                    style={
                      userGender === 'Male'
                        ? styles.activeGenderPickerOption
                        : styles.genderPickerOption
                    }>
                    <Man />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.userDetailsTab}>
                <Text style={styles.userDetailsText}>PHONE</Text>
                <TextInput
                  editable={false}
                  style={styles.userDetailsTextInput}
                  value={user.phoneNumber}
                  underlineColorAndroid="#707070"
                  placeholder=""
                  keyboardType={'email-address'}
                />
              </View>
              <View style={styles.userDetailsTab}>
                <Text style={styles.userDetailsText}>EMAIL</Text>
                <View style={styles.userEmail}>
                  <TextInput
                    editable={true}
                    style={styles.userDetailsTextInput}
                    value={userEmail}
                    onChangeText={(text) => {
                      const re =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (re.test(text)) {
                        setEmailValid(true);
                      } else {
                        setEmailValid(false);
                      }
                      setUserEmail(text);
                    }}
                    placeholder="Enter your Email"
                    keyboardType={'email-address'}
                  />
                  {!userEmail ? null : emailValid ? (
                    <Text>{'\u2713'}</Text>
                  ) : (
                    <Text>{'\u274c'}</Text>
                  )}
                </View>
              </View>
            </View>
            <Text style={styles.err}>{err}</Text>
            {activity ? (
              <ActivityIndicator animating={activity} size={50} color="#ff6362" />
            ) : (
              <TouchableOpacity
                disabled={activity}
                style={styles.updateButton}
                onPress={() => {
                  onSubmitPressed().then((success) => {
                    if (success) {
                      navigation.goBack();
                    }
                  });
                }}>
                <Text style={styles.updateText}>SAVE CHANGES</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  export default EditProfileScreen;
  const styles = StyleSheet.create({
    footer: {
      backgroundColor: '#f5f5f5',
      borderRadius: 30,
      width: widthToDP('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: heightToDP('8%'),
    },
    heading: {
      backgroundColor: 'rgba(56, 56, 56, 1)',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: heightToDP('2%'),
      width: widthToDP('100%'),
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
      fontFamily: 'Gilroy-SemiBold',
      fontWeight: 'bold',
      fontSize: heightToDP('3%'),
      color: '#E0E0E0',
    },
    backIcon: {
      width: widthToDP('5%'),
      height: heightToDP('3%'),
    },
  
    image: {
      backgroundColor: '#fff',
      height: widthToDP('33%'),
      width: widthToDP('33%'),
      borderRadius: widthToDP('16.5%'),
      marginTop: 30,
      marginBottom: 5,
      overflow: 'hidden',
    },
    profileImage: {
      height: widthToDP('33%'),
      width: widthToDP('33%'),
      borderRadius: widthToDP('16.5%'),
    },
    imageEditButtonBox: {
      justifyContent: 'center',
      alignItems: 'center',
      height: widthToDP('6.6%'),
      width: widthToDP('33%'),
      marginTop: '-20%',
    },
    imageEditButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#707070',
      height: '100%',
      width: '100%',
      marginBottom: 0,
      opacity: 0.7,
    },
    imageEditButtonBlank: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      marginTop: '-20%',
      width: '100%',
    },
    imageEditButtonText: {
      color: '#fff',
      fontSize: 12,
      fontFamily: 'Gilroy-SemiBold',
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    userEmail: {
      flexDirection: 'row',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#707070',
    },
    socialMedia: {
      width: '80%',
      flexDirection: 'row',
      marginVertical: 10,
    },
    socialMediaButton: {
      backgroundColor: '#fff',
      height: 40,
      width: '48%',
      marginHorizontal: '1%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      borderRadius: 20,
    },
    FacebookButton: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    FacebookIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginHorizontal: widthToDP('1%'),
    },
    FacebookButtonText: {
      color: '#292929',
      fontSize: widthToDP('2.5%'),
      fontFamily: 'Gilroy-SemiBold',
      letterSpacing: 2,
    },
    userDetails: {
      width: '80%',
    },
    userDetailsTab: {
      marginVertical: 10,
    },
    userDetailsText: {
      color: '#292929',
      fontSize: 12,
      fontFamily: 'Gilroy-SemiBold',
      letterSpacing: 2,
    },
    userDetailsTextInput: {
      color: '#292929',
      fontSize: 20,
      fontFamily: 'Gilroy-Regular',
      letterSpacing: 2,
      flex: 1,
    },
    datePicker: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    datePickerButton: {
      backgroundColor: '#ff6362',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      elevation: 5,
    },
    datePickerText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Gilroy-SemiBold',
      letterSpacing: 2,
    },
    genderPicker: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    genderImage: {},
    genderPickerOption: {
      width: widthToDP('20%'),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#b7b7b7',
      borderRadius: widthToDP('5%'),
      marginHorizontal: widthToDP('5%'),
      paddingVertical: heightToDP('0.5%'),
      backgroundColor: '#fff',
    },
    activeGenderPickerOption: {
      width: widthToDP('20%'),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      borderWidth: 2,
      borderColor: '#ff5959',
      borderRadius: widthToDP('5%'),
      marginHorizontal: widthToDP('5%'),
      paddingVertical: heightToDP('0.5%'),
      backgroundColor: '#fff',
    },
    genderPickerText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Gilroy-SemiBold',
      letterSpacing: 2,
    },
  
    updateButton: {
      backgroundColor: '#ff6362',
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 30,
      margin: 40,
    },
    updateText: {
      fontSize: 20,
      color: '#fff',
      fontFamily: 'Gilroy-SemiBold',
      letterSpacing: 2,
    },
  });
  