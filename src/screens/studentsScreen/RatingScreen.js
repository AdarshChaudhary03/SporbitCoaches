import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import Header from "../constants/Header";
import { useNavigation } from "@react-navigation/native";
import { heightToDP, widthToDP } from "../../utils/utils";
import RatingItem from "./components/RatingItem";
import { updateRatings } from "../../utils/setters";
import { getStudents } from "../../utils/getters";
import style from "react-native-datepicker/style";

const RatingScreen = ({route}) => {

    const navigation = useNavigation();
    const [ skills, setSkills ] = useState([]);
    const { user,setStudents } = route.params;
    const [ skillParameters, setSkillParameters ] = useState([]);
    const MAX_SCORE_PER_SKILL = 10;


    const onRefresh = useCallback(async () => {
        const skills = user.item.skills;
        setSkills([]);
        Object.keys(skills).forEach((skillID) => {
            skills[skillID] = {
                ...skills[skillID],
                key: skillID
            }
            setSkills(prevSkill => [...prevSkill, skills[skillID]]);
            setSkillParameters(prevParam => [...prevParam, {
                key: skillID,
                value: 0
            }]);
        });
    });

    const submitRating = async () => {
        console.log('skillParameters',skillParameters);
        const skillsList = [... skills];
        console.log('skills',skillsList);
        Object.keys(skillParameters).forEach(param => {
            Object.keys(skills).forEach(skill => {                
                if(skills[skill].key === skillParameters[param].key){
                    const skillItem = {...skillsList[skill]};
                    skillItem.value = skillItem.value + ((skillParameters[param].value/MAX_SCORE_PER_SKILL) * (100 / (user.item.classes/12)));
                    skillsList[skill] = skillItem;
                    setSkills(skillsList);
                }
            })
        })
        console.log('skills',skillsList);
        let skillsData = {};
        await Object.keys(skillsList).forEach(skill => {
            const key = skillsList[skill].key;
            skillsData = {
                ...skillsData,
                [key]: skillsList[skill]
            }
        });
        console.log('skillsData',skillsData);
        console.log('skills',user.item.skills);
        await updateRatings(user.item.academy.id, user.item.uid, skillsData).then(async () => {
            setStudents([]);
            await getStudents(user.item.academy.id).then(student => {
                setStudents(student);
            }).then(() => {
                navigation.goBack();
                alert('Rating submitted successfully.');
            })    
        })
    }


    useEffect(() => {
        onRefresh().then(() => {
            console.log('skills',skills);
        });
    },[]);

    return (
        <View>
            <Header text={'Ratings'} navigation={navigation}/>
            { !user.item.isRatingDone ? (<View>
            <View style={styles.bodyContainer}>
            <Text style={styles.skillHeader}>SKILLS</Text>
            <View style={styles.ratingScreen}>
            <FlatList
            style={{width: '90%'}}
            data={skills}
            renderItem={(skill, index) => {return <RatingItem maxmark={MAX_SCORE_PER_SKILL} skill={skill} skillParameters={skillParameters} setSkillParameters={setSkillParameters}/>}}
            />
            </View>
            </View>
            <View style={styles.btnContainer}>
            <Button style={styles.btn} title="Submit" onPress={() => submitRating()}/>
            </View>
            </View>) : (
                <View style={styles.bodyContainer}>
                    <Text>Rating done</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        marginTop: heightToDP('10%'),
        width: '100%'
    },
    skillHeader: {
        fontSize: widthToDP('6%'),
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        padding: widthToDP('5%'),
        borderRadius: 10,
        backgroundColor: '#fff',
        width: widthToDP('90%')
    },
    ratingScreen: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: widthToDP('5%'),
        width: widthToDP('90%'),
        alignSelf: 'center',
        marginTop: heightToDP('1%'),
        marginBottom: heightToDP('1%')
    },
    btnContainer: {
        width: widthToDP('40%'),
        alignSelf: 'center',
    },
    btn: {
        borderRadius: 20,
        fontWeight: 'bold'
    }
})

export default RatingScreen;