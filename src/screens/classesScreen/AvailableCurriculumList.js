import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableNativeFeedback } from "react-native";
import { heightToDP, widthToDP } from "../../utils/utils";
import CurriculumItem from "./CurriculumItem";
import EmptyList from "./EmptyList";
import MediaItem from "./mediaItem";

const AvailableCurriculumList = props => {

    const { availableCurriculum, setIsVisible,isVisible, curriculum , setCurriculum } = props;

    const saveCurriculumItem = async (drill) => {
        console.log(drill);
        await setCurriculum(prevArray => [...prevArray,drill]);
      }


    if(availableCurriculum.length!==0){
        return (
            <View>
                {Object.keys(availableCurriculum[0].drills)
                .map((drill, index) => {
                    console.log(availableCurriculum[0].drills[drill])
                    drill = {
                        id: drill,
                        value: availableCurriculum[0].drills[drill]
                    }
                    return (
                        <TouchableNativeFeedback onPress={async () => {
                            await saveCurriculumItem(drill);
                            setIsVisible(!isVisible);
                        }}>                
                        <View style={styles.header} key={drill.id}>
                        <Text style={styles.headerText}>{drill.id}</Text>
                            <View style={styles.itemList}>
                            {Object.keys(drill.value).map(skillItem => {
                                return <Text style={styles.skillText}>{drill.value[skillItem]}</Text>
                            })}
                            </View>
{/*                        <FlatList
                        keyExtractor={drill => drill.id}
                        data={drill.value}
                        renderItem={(item) => {
                        return <CurriculumItem key={item.item} isVisible={isVisible} setIsVisible={setIsVisible} item={item} curriculum={curriculum} setCurriculum={setCurriculum}/>}}
                        />*/}
                        </View>
                        </TouchableNativeFeedback>
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
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemList: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingBottom: 5,

    },
    skillText: {
        width: '50%',
        textAlign: 'center',
        fontStyle: "italic",
    }
})

export default AvailableCurriculumList;