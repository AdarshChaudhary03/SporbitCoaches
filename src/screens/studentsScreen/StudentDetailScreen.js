import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import * as React from 'react';
  import Man from '../../../assets/icons/profile/edit/man-user 2.svg';
  import Woman from '../../../assets/icons/profile/edit/woman 2.svg';
  import Header from '../constants/Header';
import { Avatar } from 'react-native-elements';
import { heightToDP, widthToDP } from '../../utils/utils';
import { getClassHistory, getPlayer } from '../../utils/getters';
import EmptyList from '../classesScreen/EmptyList';
import ClassHistoryTable from './ClassHistoryTable';

  const StudentDetailScreen = ({navigation, route}) => {

    const { user } = route.params;
    const [ classHistory, setClassHistory ] = React.useState([]);
    const [ player, setPlayer ] = React.useState();


    const fetchDetails = async () => {
        await getClassHistory(user.item.academy.id,user.item.uid).then(classHistory => {
            setClassHistory(classHistory);
        })
        .then(async () => {
            await getPlayer(user.item.playerID).then(player => {
                setPlayer(player);
            })
        })    
    }

    React.useEffect(() => {
        fetchDetails();
    },[]);


    return (
        <View>
        <Header text={'Students'} navigation={navigation}/>
        <ScrollView>
          <View style={styles.footer}>
            <View style={styles.image}>
              <Avatar
                rounded
                size={widthToDP('33%')}
                title={user.item.playerName.split(' ')
                .map((n, index) => {
                  if (index < 2) {
                    return n[0];
                  }
                })
                .join('')}
                source={{
                  uri: player ? (player.photoURL ?  player.photoURL : 'avatar') : 'avatar',
                }}
              />
              </View>

            <View style={styles.userDetails}>
              <View style={styles.userDetailsTab1}>
                  <View>
                  <Text style={styles.userDetailsText}>NAME</Text>
                <Text style={styles.userDetailsTextInput}>{user.item.playerName}</Text>
                  </View>
                  <View>
                  <Text style={styles.userDetailsText}>GENDER</Text>
                   { player ? (player.gender==='Male' ? <Man /> : <Woman/>) : null }
                  </View>
              </View>
              <View style={styles.userDetailsTab1}>
                  <View>
                <Text style={styles.userDetailsText}>DATE OF BIRTH</Text>
                    <Text style={styles.userDetailsTextInput}>
                        { player ? (player.birthday.toDate().toString().substring(4,16)) : null}
                    </Text>
                  </View>
              </View>
              <View style={styles.userDetailsTab}>
                <Text style={styles.userDetailsText}>EMAIL</Text>
                <View style={styles.userDetailsText}>
                <Text style={styles.userDetailsTextInput}>{'test@gmail.com'}</Text>
                </View>
              </View>
              <View style={styles.userDetailsTab1}>
                  <View>
                <Text style={styles.userDetailsText}>Total Classes</Text>
                <View style={styles.userDetailsText}>
                <Text style={styles.userDetailsTextInput}>{user.item.classes}</Text>
                </View>
                </View>
                <View>
                <Text style={styles.userDetailsText}>Classes remaining</Text>
                <View style={styles.userDetailsText}>
                <Text style={styles.userDetailsTextInput}>{user.item.classes - user.item.attendance}</Text>
                </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.header}>
        <Text style={styles.headerText}>S. No.</Text>    
        <Text style={styles.headerText}>Date</Text>    
        <Text style={styles.headerText}>Attendance</Text>    
        </View>   
        <FlatList
        data={classHistory}
        renderItem={ClassHistoryTable}
        ListEmptyComponent={EmptyList}
        keyExtractor={classHistory => classHistory.classDate.toString()}
        />
        </View>
    );
  };
  export default StudentDetailScreen;
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: heightToDP('1%'),
        marginTop: heightToDP('1%'),
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: heightToDP('2%'),
        color: '#000',
        fontFamily: 'Gilroy-SemiBold',            
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
    userDetailsTab1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
      },
      userDetailsText: {
      color: '#292929',
      fontSize: 12,
      fontFamily: 'Gilroy-SemiBold',
      letterSpacing: 2,
    },
    userDetailsTextInput: {
      color: '#292929',
      fontSize: 16,
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
  