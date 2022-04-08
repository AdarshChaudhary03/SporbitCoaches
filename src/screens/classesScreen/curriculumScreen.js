import {StyleSheet, Text, TouchableOpacity, View, Picker, FlatList, Button, Linking, Image} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import { heightToDP, widthToDP } from '../../utils/utils';
import Expand from '../../../assets/icons/courses/expand.svg';
import Compress from '../../../assets/icons/courses/compress.svg';
import { TextInput } from 'react-native-gesture-handler';
import EmptyList from './EmptyList';
import { getCurriculum, getMedia } from '../../utils/getters';
import AvailableMediaList from './AvailableMediaList';
import MediaModal from './MediaModal';
import CurriculumModal from './CurriculumModal';

const CurriculumScreen = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [ curriculumToAdd, setCurriculumToAdd ] = useState('');
  const { curriculum, setCurriculum, students } = props;
  const [ availableCurriculum, setAvailableCurriculum ] = useState([]);
  const [ isVisible, setIsVisible ] = useState(false);

  const fetchCurriculum = async () => {
      await getCurriculum(students[0].academy.id, students[0].sportID).then(curriculum => {
          setAvailableCurriculum(curriculum);
      })
  }

 React.useEffect(() => {
  fetchCurriculum();
 },[]);

  const Icon = () => {
    if (!expanded) {
      return <Expand />
    } else {
      return <Compress />
    }
  };

const saveCurriculumItem = async () => {
  await setCurriculum(prevArray => [...prevArray,curriculumToAdd]);
  setCurriculumToAdd('');
}

const CurriculumItems = (itemData,index) => {
  return (
    <View style={styles.mediaItem}> 
      <TouchableOpacity
   onPress={() => {
//      Linking.openURL(itemData.item);
          }}
        >
      <View style={styles.header}>
                        <Text style={styles.headerText}>{itemData.item.id}</Text>
                            <View style={styles.itemList}>
                            {Object.keys(itemData.item.value).map(skillItem => {
                                return <Text style={styles.skillText}>{itemData.item.value[skillItem]}</Text>
                            })}
                            </View>
{/*                        <FlatList
                        keyExtractor={drill => drill.id}
                        data={drill.value}
                        renderItem={(item) => {
                        return <CurriculumItem key={item.item} isVisible={isVisible} setIsVisible={setIsVisible} item={item} curriculum={curriculum} setCurriculum={setCurriculum}/>}}
                        />*/}
                        </View>

    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      const tempCurriculum = [...curriculum];
      tempCurriculum.splice(itemData.index, 1);
      setCurriculum(tempCurriculum);
    }}>
      <Text style={{color: 'red', fontWeight: 'bold', margin: 5}}>X</Text>
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
        <Text style={styles.tabHeaderText}>Curriculum</Text>
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
        <CurriculumModal isVisible={isVisible} setIsVisible={setIsVisible} curriculum={curriculum} setCurriculum={setCurriculum} availableCurriculum={availableCurriculum}/>
        </View>
        <FlatList
        data={curriculum}
        ListEmptyComponent={EmptyList}
        renderItem={CurriculumItems}
        keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};
export default CurriculumScreen;

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
  header: {
    backgroundColor: 'lightgray',
    borderRadius: widthToDP('3%'),
    overflow: 'hidden',
    width: '100%',
    padding: 5

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
});
