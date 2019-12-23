import React from 'react';
import { Root, Icon } from 'native-base';
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import HomeScreen from './screens/home/index';


import SideBar from './screens/sidebar';
import { Dimensions } from 'react-native';
import ChatsScreen from './screens/chats/index';
import ServiceDetailsScreen from './screens/home/serviceDetails';
import MyTeamScreen from './screens/myteam/';
import ProfileScreen from './screens/profile/';
import PrivateChatsScreen from './screens/chats/PrivateChats/PrivateChatsContainer';
import TeamChatsScreen from './screens/myteam/TeamChats/TeamChatsContainer';
import { RealmProvider } from 'realm-react-redux';
import configureRealmStore from './State/RealmStore';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';
import configureStore, { dispatch } from './State/ReduxStore';
import configureReactotron from './Config/ReactotronConfig';
import AuthLoadingScreen from './screens/user/AuthLoadingScreen';
import LogInScreen from './screens/user/Login';
import OTPScreen from './screens/user/OTP';
import UserDetailsFormScreen from './screens/user/UserDetailsForm';

if (__DEV__) configureReactotron();
export const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
const realmStore = configureRealmStore();
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({
  $rem: entireScreenWidth / 411,
});

function hideTabBar(navigation) {
  const { routeName, index, routes } = navigation.state;

  let tabBarVisible = true;

  if (index > 0) {
    // if (routeName === 'Offers') {
    //   if (index === 1 && routes[1].routeName === 'TimelineChannels') {
    //   } else {
    //     tabBarVisible = false;
    //   }
    // } else {
    tabBarVisible = false;
    // }
  }

  return tabBarVisible;
}

// const Drawer = createDrawerNavigator(
//   {
//     Home: { screen: HomeScreen },

//   },
//   {
//     initialRouteName: "Home",
//     contentOptions: {
//       activeTintColor: "#e91e63"
//     },
//     contentComponent: props => <SideBar {...props} />
//   }
// );

const Home = createStackNavigator(
  {
    Home: HomeScreen,
    ServiceDetailsScreen:ServiceDetailsScreen,
   
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

      return {
        header: null,
      };
    },
  }
);

const Chats = createStackNavigator(
  {
    Chats: ChatsScreen,
    PrivateChats: PrivateChatsScreen,
    TeamChats: TeamChatsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

      return {
        header: null,
      };
    },
  }
);

const MyTeam = createStackNavigator(
  {
    MyTeam: MyTeamScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

      return {
        header: null,
      };
    },
  }
);

const Profile = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

      return {
        header: null,
      };
    },
  }
);

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      title: 'Home',
      screen: Home,
      path: '/Home',
      navigationOptions: {
        tabBarTestID: 'Home',
        tabBarAccessibilityLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'home'}
            style={{ color: focused ? 'rgba(255, 133, 47, 1)' : 'gray' }}
          />
        ),
      },
    },
    MyTeam: {
      screen: MyTeam,
      path: '/MyTeam',
      navigationOptions: {
        title: 'My Bookings',
        tabBarAccessibilityLabel: 'My Bookings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'grid'}
            style={{ color: focused ? 'rgba(255, 133, 47, 1)' : 'gray' }}
          />
        ),
      },
    },
    Chats: {
      screen: Chats,
      path: '/Chats',
      navigationOptions: {
        title: 'Help',
        tabBarAccessibilityLabel: 'Help',
        tabBarIcon: ({ tintColor, focused }) => (
          
          <Icon
            name={'mail'}
            style={{ color: focused ? 'rgba(255, 133, 47, 1)' : 'gray' }}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      path: '/Profile',
      navigationOptions: {
        tabBarTestID: 'Account',
        title: 'Profile',
        tabBarAccessibilityLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'contact'}
            style={{ color: focused ? 'rgba(255, 133, 47, 1)' : 'gray' }}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    optimizationsEnabled: true,
    lazy: false, // make false later
    tabBarOptions: {
      activeTintColor: '#004B8C',
      inactiveTintColor: '#727272',
      upperCaseLabel: false,
      pressColor: '#004B8C',

      labelStyle: {
        fontSize: 12,
        marginTop: 0,
        fontFamily: 'FiraSans-Regular',
      },
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
      tabStyle: {
        padding: 0,
      },
      style: {
        backgroundColor: '#fff',
        // borderTopWidth: 1,
        elevation: 10,
      },
    },
  }
);

Home.navigationOptions = ({ navigation }) => ({
  tabBarVisible: hideTabBar(navigation),
});

Chats.navigationOptions = ({ navigation }) => ({
  tabBarVisible: hideTabBar(navigation),
});

MyTeam.navigationOptions = ({ navigation }) => ({
  tabBarVisible: hideTabBar(navigation),
});

Profile.navigationOptions = ({ navigation }) => ({
  tabBarVisible: hideTabBar(navigation),
});

const AuthStack = createStackNavigator(
  {
    LogIn: LogInScreen,
    OTP: OTPScreen,
    UserDetailsForm: UserDetailsFormScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      if (['TermsAndConditions'].includes(routeName)) {
        return customHeader(navigation);
      }
      return {
        header: null,
      };
    },
  }
);

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default () => (
  <Root>
    <Provider store={reduxStore}>
      <RealmProvider store={realmStore}>
        <AppContainer />
      </RealmProvider>
    </Provider>
  </Root>
);
