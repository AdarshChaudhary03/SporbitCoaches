import React from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback, Image } from "react-native";
import { heightToDP } from "../../utils/utils";

const CurriculumItem = props => {

    const { setCurriculum ,curriculum ,setIsVisible,isVisible } = props;

    const saveCurriculumItem = async () => {
        await setCurriculum(prevArray => [...prevArray,props.item.item]);
      }
      

    return (
        <View>
        <TouchableNativeFeedback onPress={async () => {
            await saveCurriculumItem();
            setIsVisible(!isVisible);
        }}>
            <View>
            <Text style={styles.linkItem}>{props.item.item}</Text>
            </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    linkItem: {
        marginVertical: 10
    }
})

export default CurriculumItem;