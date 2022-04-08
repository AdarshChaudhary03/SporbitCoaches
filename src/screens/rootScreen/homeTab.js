import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Animated, LogBox } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import ClassesScreen from "../classesScreen/ClassesScreen";
import StudentScreen from "../studentsScreen/StudentsScreen";
import ProfileScreen from "../profileScreen/ProfileScreen";
import HomeTabIcon from './../../../assets/icons/bottomTab/homeTab.svg';
import ProfileTabIcon from './../../../assets/icons/bottomTab/profileTab.svg';
import StudentTabIcon from './../../../assets/icons/bottomTab/coursesTab.svg';
import CommunityTabIcon from './../../../assets/icons/bottomTab/communityTab.svg';
import ActiveHomeTabIcon from './../../../assets/icons/bottomTab/activeHomeTab.svg';
import ActiveProfileTabIcon from './../../../assets/icons/bottomTab/activeProfileTab.svg';
import ActiveStudentTabIcon from './../../../assets/icons/bottomTab/activeCoursesTab.svg';
import ActiveCommunityTabIcon from './../../../assets/icons/bottomTab/activeCommunityTab.svg';

const HomeTab = ({route}) => {

  const { user } = route.params;

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  },[]);


  const [ index, setIndex ] = useState(0);
  const [ tabIndex, setTabIndex] = useState('first');
    const [routes, setRoutes ] = useState([
        { key: 'first', title: 'Classes',  icon: <HomeTabIcon/>, activeIcon: <ActiveHomeTabIcon/>},
      { key: 'second', title: 'Students',icon: <CommunityTabIcon/>, activeIcon: <ActiveCommunityTabIcon/> },
      { key: 'third', title: 'Profile', icon:  <ProfileTabIcon/>, activeIcon: <ActiveProfileTabIcon/> },
    ]);

    _renderScene = SceneMap({
        first: ClassesScreen,
        second: StudentScreen,
        third: ProfileScreen
      });

      const renderScene = ({route}) => {
        switch(route.key){
          case 'first': return <ClassesScreen user={user}/>
          case 'second': return <StudentScreen user={user}/>
          case 'third': return <ProfileScreen user={user}/>
          default: return null;
        }
      }

      _handleIndexChange = (index) => {
        console.log(index);
        setTabIndex(index);
        setIndex(index)};

      _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);    

        return (
          <View style={styles.tabBar}>
            {props.navigationState.routes.map((route, i) => {
              const opacity = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 1 : 0.5
                ),
              });
    
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.tabItem}
                  onPress={() => {
                    setIndex(i);
                    setTabIndex(routes[i].key);
                  }
                    }>
                  <Animated.Text key={route.key} style={{ opacity, color: '#fff' }}>
                    {tabIndex===route.key ? route.activeIcon : route.icon}
                    </Animated.Text>
                    <Animated.Text key={route.key+route.key} style={{ opacity, color: '#fff' }}>
                    {route.title}
                    </Animated.Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      };

    return (
        <TabView
        navigationState={{index: index, routes: routes}}
        tabBarPosition="bottom"
        swipeEnabled={false}
        renderScene={renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
      />
            );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(28, 38, 87, 1)',
//        paddingTop: Constants.statusBarHeight,
      },
      tabItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      },
})

export default HomeTab;