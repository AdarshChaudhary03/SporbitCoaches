import firebaseSetup from './setup';
const {firestore, storage, auth} = firebaseSetup();

export const updateCoach = async (data, coachID) => {
    //console.log(coachID);
    firestore()
      .collection('coaches')
      .doc(coachID)
      .update(data)
      .then(() => {
        //console.log('Profile Updated!');
      });
    try {
      await auth().currentUser.updateProfile(data);
    } catch (exception) {}
    return data;
  };
  

export const addAttendance = async (academyID,studentID,attendance,type) => {
    await firestore()
    .collection(`academies/${academyID}/students`)
    .doc(studentID)
    .update({
        attendance: attendance,
        isAttendanceDone: true,
        attendanceType: type
    });
}

export const updateRatings = async (academyID, studentID, skills) => {
  await firestore()
  .collection(`academies/${academyID}/students`)
  .doc(studentID)
  .update({
    skills: skills,
    isRatingDone: true
  })
}

export const addClassHistory = async (academyID, studentID,data, newClassDate) => {
    ////console.log(academyID);
    ////console.log(studentID);
    ////console.log(data);
    await firestore()
    .collection(`academies/${academyID}/students/${studentID}/classHistory`)
    .doc(new Date().getTime().toString())
    .set(data);

    await firestore()
    .collection(`academies/${academyID}/students`)
    .doc(studentID)
    .update({
        isAttendanceDone: false,
        attendanceType: '',
        nextClass: firestore.Timestamp.fromDate(new Date(newClassDate)),
        layOffAvailed: data.layOffAvailed,
        noOfLayOff: data.noOfLayOff,
        isLayOff: data.noOfLayOff===0 ? !data.isLayOff : data.isLayOff,
        layOffStartDate: data.layOffAvailed===data.layOffAvailable ? null : data.layOffStartDate,
        layOffEndDate: data.layOffAvailed===data.layOffAvailable ? null : data.layOffEndDate
    })

}

export const addOrUpdateFeedback = async (academyID, studentID, feedback) => {
    ////console.log('academyID',academyID);
    ////console.log('studentID',studentID);
    ////console.log('feedback',feedback);
    await firestore()
    .collection(`academies/${academyID}/students`)
    .doc(studentID)
    .update({
        feedback: feedback
    });
}

