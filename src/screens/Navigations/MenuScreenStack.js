import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../BottomTabScreens/ProfileScreen';
import {Colors} from '../../config/Colors';
import NavigationDrawerStructure from '../Custom/NavigationDrawerStructure';

const Stack = createStackNavigator();
const MenuScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {backgroundColor: Colors.accent},
        headerTintColor: Colors.light,
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Profile Page'}}
      />
    </Stack.Navigator>
  );
};

export default MenuScreenStack;
