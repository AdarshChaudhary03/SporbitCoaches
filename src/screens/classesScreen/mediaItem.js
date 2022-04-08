import React from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback, Image } from "react-native";
import { heightToDP } from "../../utils/utils";

const MediaItem = props => {

    const { setMedia,media,setIsVisible,isVisible } = props;

    const saveMediaItem = async () => {
        await setMedia(prevArray => [...prevArray,props.item.item]);
        console.log('media',media);
      }
      

    return (
        <View>
        <TouchableNativeFeedback onPress={async () => {
            await saveMediaItem();
            setIsVisible(!isVisible);
            console.log('props.item',props.mediaToAdd);
        }}>
            <View>
            <Image style={{width: '100%', height: 100, borderRadius: 20}} source={{ uri: `https://img.youtube.com/vi/${props.item.item.split('youtu.be/')[1]}/0.jpg`}}/>   
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

export default MediaItem;