import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../config/Colors';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../BottomTabScreens/HomeScreen';
import ProfileScreen from '../BottomTabScreens/ProfileScreen';
import {useTheme} from '@react-navigation/native';
import OrdersScreen from '../BottomTabScreens/OrdersScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomTabStack = () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor={Colors.accent}
        barStyle={{
          backgroundColor: theme.dark ? Colors.greyDark : Colors.light,
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="home" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="OrdersScreen"
          component={OrdersScreen}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="clockcircleo" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="user" color={color} size={22} />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default BottomTabStack;
