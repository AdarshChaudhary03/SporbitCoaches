import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
//import { firebase } from '@react-native-firebase/auth';
import RootStackScreen from './src/screens/rootScreen/rootStackScreen';
import HomeStackScreen from './src/screens/rootScreen/homeStackScreen';
import firebaseSetup from './src/utils/setup';
import InvalidCoachLogin from './src/screens/rootScreen/invalidCoachLogin';
const {firestore, storage, auth} = firebaseSetup();

const App = () => {
  const [ user, setUser ] = useState();
  const [initialRoute, setInitialRoute] = useState('BottomTab');

const fetchUser = async () => {
  let cancel = false;
  await auth().onAuthStateChanged( async (user) => {
    if(user){
      let data = {};
      const querySnapshot = await firestore().collection('coaches')
      .where('phoneNumber','==',user.phoneNumber)
      .get();
      for await (const documentSnapshot of querySnapshot.docs){
          data = documentSnapshot.data();
      }
      if (cancel) return;
      setUser(data);
    }
    else{
      setUser(null);
    }
    return () => {
      cancel = true;
    }
  })
}

  useEffect(() => {
    fetchUser();
  },[]);

  if(!user){
    return <RootStackScreen/>
  }

  if(!user.phoneNumber){
    return <InvalidCoachLogin/>
  }

  if(user.phoneNumber){
    return <HomeStackScreen user={user}/>
  }


//  return (
//    <Provider store={store}>
//      { !user ? <RootStackScreen user={user}/> : <HomeStackScreen user={user}/>}
//    </Provider>
//  );
};

export default App;
