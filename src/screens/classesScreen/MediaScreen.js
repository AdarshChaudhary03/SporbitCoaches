import {StyleSheet, Text, TouchableOpacity, View, Picker, FlatList, Button, Linking, Image} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import { heightToDP, widthToDP } from '../../utils/utils';
import Expand from '../../../assets/icons/courses/expand.svg';
import Compress from '../../../assets/icons/courses/compress.svg';
import { TextInput } from 'react-native-gesture-handler';
import EmptyList from './EmptyList';
import { getMedia } from '../../utils/getters';
import AvailableMediaList from './AvailableMediaList';
import MediaModal from './MediaModal';

const MediaScreen = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [ mediaToAdd, setMediaToAdd ] = useState('');
  const { media, setMedia, students } = props;
  const [ availableMedia, setAvailableMedia ] = useState([]);
  const [ isVisible, setIsVisible ] = useState(false);

  const fetchMedia = async () => {
    await getMedia(students[0].academy.id, students[0].sportID).then(media => {
      console.log('media',media);
      setAvailableMedia(media);
    })
  }

 React.useEffect(() => {
  fetchMedia();
 },[]);

  const Icon = () => {
    if (!expanded) {
      return <Expand />
    } else {
      return <Compress />
    }
  };

const saveMediaItem = async () => {
  await setMedia(prevArray => [...prevArray,mediaToAdd]);
  setMediaToAdd('');
}

const MediaItems = (itemData,index) => {
  return (
    <View style={styles.mediaItem}> 
      <TouchableOpacity
   onPress={() => {
      Linking.openURL(itemData.item);
          }}
        >
       <Image style={{width: '100%', height: 100, borderRadius: 20}} source={{ uri: `https://img.youtube.com/vi/${itemData.item.split('youtu.be/')[1]}/0.jpg`}}/>   
      <Text style={styles.mediaItemText}>{itemData.item}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      const tempMedia = [...media];
      tempMedia.splice(itemData.index, 1);
      setMedia(tempMedia);
    }}>
      <Text style={{color: 'red', fontWeight: 'bold'}}>X</Text>
    </TouchableOpacity>
    </View>
  );
}

  return (
    <View
      style={
        expanded
          ? styles.container
          : [styles.container, {height: heightToDP('9%')}]
      }>
      <View style={styles.feedbackView}>
        <Text style={styles.tabHeaderText}>Media</Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Icon />
        </TouchableOpacity>
      </View>
      <View style={styles.feedback}>
        <View style={styles.inputContainer}>
{/*      <TextInput 
        placeholder='Enter the youtube link'
        value={mediaToAdd} 
        maxLength={200}
        onChangeText={text => setMediaToAdd(text)}
        /> 
*/}
        <Button title="Add" onPress={() => setIsVisible(true)}/>
        <MediaModal isVisible={isVisible} setIsVisible={setIsVisible} media={media} setMedia={setMedia} availableMedia={availableMedia}/>
        </View>
        <FlatList
        data={media}
        ListEmptyComponent={EmptyList}
        renderItem={MediaItems}
        keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};
export default MediaScreen;

const styles = StyleSheet.create({
  container: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    marginBottom: widthToDP('7%'),
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  mediaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: heightToDP('2%'),
    marginTop: heightToDP('2%'),
  },
  mediaItemText: {
    color: 'blue'
  },
  feedbackView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedback: {
    paddingBottom: heightToDP('5%'),
    paddingTop: heightToDP('5%'),
  },
  feedbackRow: {
    flexDirection: 'row',
    width: '80%',
    paddingTop: heightToDP('1%'),
  },
  feedbackDot: {
    color: 'rgba(255, 89, 89, 1)',
    marginRight: widthToDP('4%'),
    fontSize: 16,
  },
  feedbackText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  feedbackDateText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
  tabHeaderText: {
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
    alignSelf: 'flex-start',
  },
});
