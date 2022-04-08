import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { heightToDP, widthToDP } from "../../utils/utils";
import CurriculumItem from "./CurriculumItem";
import EmptyList from "./EmptyList";
import MediaItem from "./mediaItem";

const AvailableMediaList = props => {

    const { availableMedia, setIsVisible,isVisible,media,setMedia } = props;

    if(availableMedia.length!==0){
        return (
            <View>
                {Object.keys(availableMedia[0].skills)
                .sort((a,b) => {return b-a})
                .map((skill, index) => {
                    console.log('availableMedia[0].skills[skill]',availableMedia[0].skills[skill])
                    skill = {
                        id: skill,
                        value: availableMedia[0].skills[skill]
                    }
                    return (
                        <View style={styles.header} key={skill.id}>
                        <Text style={styles.headerText}>{skill.id}</Text>
                        <FlatList
                        keyExtractor={skill => skill.id}
                        data={skill.value}
                        renderItem={(item) => {
                        return <MediaItem key={item.item} isVisible={isVisible} setIsVisible={setIsVisible} item={item} media={media} setMedia={setMedia}/>}}
                        />
                        </View>
                    );
                })
                }
            </View>
        );
    }
    else{
        return null;
    }
}

const styles = StyleSheet.create({
    header: {
        padding: heightToDP('3%'),
        marginHorizontal: widthToDP('4%'),
        marginBottom: widthToDP('7%'),
        backgroundColor: '#fff',
        borderRadius: widthToDP('3%'),
        overflow: 'hidden',    
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
})

export default AvailableMediaList;