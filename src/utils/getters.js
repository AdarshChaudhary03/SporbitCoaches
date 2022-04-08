import { batch } from 'react-redux';
import firebaseSetup from './setup';

const {firestore, auth} = firebaseSetup();
const user = auth().currentUser;


export const getStudents = async (academyID) => {
    let data = [];
    const querySnapshot = await firestore().collection(`academies/${academyID}/students`)
    .where('status','==','Registered')
    .get();
    for await (const documentSnapshot of querySnapshot.docs) {
        //console.log(documentSnapshot.data());
      data.push(documentSnapshot.data());
    }    
    return data;
}

export const getMedia = async (academyID, sportID) => {
    let data = [];
    console.log('academyID',academyID);
    console.log('sportID',sportID);
    const querySnapshot = await firestore().collection(`academies/${academyID}/media`)
    .where('sportID','==',sportID)
    .get();
    for await (const documentSnapshot of querySnapshot.docs) {
        //console.log(documentSnapshot.data());
      data.push(documentSnapshot.data());
    }    
    return data;
}

export const getCurriculum = async (academyID, sportID) => {
    let data = [];
    const querySnapshot = await firestore().collection(`academies/${academyID}/curriculum`)
    .where('sportID','==',sportID)
    .get();
    for await (const documentSnapshot of querySnapshot.docs) {
        //console.log(documentSnapshot.data());
      data.push(documentSnapshot.data());
    }    
    return data;
}


export const getStudentsByDate = async (academyID, dateString) => {
    let data = [];
    const now = new Date(dateString);
    const dateFrom = new Date(new Date(new Date(now).setDate(now.getDate() - 1)).setHours(23,59,59));
    const dateTo = new Date(new Date(dateFrom).setDate(dateFrom.getDate() + 1));
    const querySnapshot = await firestore().collection(`academies/${academyID}/students`)
    .where('status','==','Registered')
    .where('nextClass','>',dateFrom)
    .where('nextClass','<=',dateTo)
.get();
    for await (const documentSnapshot of querySnapshot.docs) {
      data.push(documentSnapshot.data());
    }    
    return data;
}

export const getStudentsByBatch = async (academyID, dateString, batchID) => {
    let data = [];
    const now = new Date(dateString);
    const dateFrom = new Date(new Date(new Date(now).setDate(now.getDate() - 1)).setHours(23,59,59));
    const dateTo = new Date(new Date(dateFrom).setDate(dateFrom.getDate() + 1));
    const querySnapshot = await firestore().collection(`academies/${academyID}/students`)
    .where('status','==','Registered')
    .where('nextClass','>',dateFrom)
    .where('nextClass','<=',dateTo)
    .where('batch','==',batchID)
.get();
    for await (const documentSnapshot of querySnapshot.docs) {
      data.push(documentSnapshot.data());
    }    
    return data;
}

export const getClassHistory = async (academyID, studentID) => {
    let data = [];
    const querySnapshot = await firestore().collection(`academies/${academyID}/students/${studentID}/classHistory`)
    .get();
    for await (const documentSnapshot of querySnapshot.docs){
        data.push(documentSnapshot.data());
    }
    return data;
}

export const getBatch = async (academyID,batchID) => {
    let data = {};
    await firestore().collection(`academies/${academyID}/batches`)
    .doc(batchID)
    .get()
    .then((docSnapshot) => {
        if(docSnapshot.exists){
           data = docSnapshot.data();
           data.uid = batchID;            
//           ////console.log(data);
        }
    });
    ////console.log(data);
    return data;
}


export const getPlayer = async (playerID) => {
    let data = {};
    await firestore().collection(`players`)
    .doc(playerID)
    .get()
    .then((docSnapshot) => {
        if(docSnapshot.exists){
           data = docSnapshot.data();
           data.uid = playerID;            
        }
    });
    return data;
}


export const getNextClass = async (academyID, batchID) => {
    let data = {};
    let newDate = '';
    let currentDate = new Date();
    await firestore()
    .collection(`academies/${academyID}/batches`)
    .doc(batchID)
    .get()
    .then((docSnapshot) => {
        data = docSnapshot.data();
        let currentweek = currentDate.toString().split(" ")[0];
        let nextWeekIndex = (data.days.indexOf(currentweek)===data.days.length-1) ? 0 : data.days.indexOf(currentweek)+1;
        let dateFindFlag = false;
        while(!dateFindFlag){
        currentDate.setDate(currentDate.getDate()+1);
        if(currentDate.toString().split(' ')[0]===data.days[nextWeekIndex]){
        dateFindFlag = true;
        }
        }
        
        currentDate.setHours('00');
        currentDate.setMinutes('00');
        currentDate.setSeconds('00');
//        ////console.log(currentDate.toString());        
    });
    return currentDate;
}
