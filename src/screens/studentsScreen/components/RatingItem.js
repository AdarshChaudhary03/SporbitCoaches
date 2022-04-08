import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Slider from '@react-native-community/slider';
import { heightToDP, widthToDP } from "../../../utils/utils";
import Star from "../../../../assets/icons/profile/badges/star.svg";

const RatingItem = (props) => {

    const { skill, skillParameters, setSkillParameters,maxmark } = props;
    const [ rating, setRating ] = useState(0);


    const saveSkillRating = async (rating) => {
        setRating(rating);
        const params = {
            key: skill.item.key,
            value: rating
        }
        await Object.keys(skillParameters).map(param => {
            if(skillParameters[param].key===skill.item.key){
                const items =[ ...skillParameters];
                const item = {...items[param]} 
                item.value = rating
                items[param] = item;
                setSkillParameters(items);
            }
        });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.skillText}>{skill.item.description} - {skill.item.key}</Text>
            <View style={styles.sliderContainer}>
            <Slider
                style={{width: '70%', height: 40}}
                thumbTintColor='rgba(255, 4, 4, 1)'
                minimumTrackTintColor='rgb(255, 0, 255)'
                thumbImage={Star}
                value={rating}
                minimumValue={0}
                maximumValue={maxmark}
                step={1}
                onSlidingComplete={rating => {
                        saveSkillRating(rating);
                }}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                />
                <Text style={styles.text}>{rating}</Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: heightToDP('2%'),
        width: '100%'
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 20, 
    },
    skillText: {
        alignSelf: 'center',
        fontSize: widthToDP('4%'),
        fontWeight: 'bold',
        marginBottom: heightToDP('1%')
    }
})

export default RatingItem;