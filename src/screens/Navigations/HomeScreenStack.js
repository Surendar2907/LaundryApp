import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawerStructure from '../Custom/NavigationDrawerStructure';
import BottomTabStack from './BottomTabStack';
import CartScreen from '../Cart/CartScreen';
import AddNewAddressScreen from '../AddNewAddress/AddNewAddressScreen';
import SelectDeliveryAddressScreen from '../SelectDeliveryAddress/SelectDeliveryAddressScreen';
import CheckOutScreen from '../CheckOut/CheckOutScreen';
import OrderSummaryScreen from '../OrderSummary/OrderSummaryScreen';
import EditProfileScreen from '../EditProfile/EditProfileScreen';
import SelectClothesScreen from '../SelectClothes/SelectClothesScreen';

const Stack = createStackNavigator();
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="BottomTabStack">
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={({route}) => ({
          header: ({scene, previous, navigation}) => (
            // route.params.name === 'ProfileScreen' ? (
            //   ''
            // ) : (
            <NavigationDrawerStructure
              scene={scene}
              previous={previous}
              navigation={navigation}
            />
          ),
          // ),
          // headerRight: () => (
          //   <LeftHeaderComponent navigationProps={navigation} />
          // ),
        })}
      />

      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Cart', //Set Header Title
          // headerTitleStyle: Styles.customFontBig,
        }}
      />
      <Stack.Screen
        name="SelectDeliveryAddressScreen"
        component={SelectDeliveryAddressScreen}
        options={{
          title: 'Select Delivery Address', //Set Header Title
          // headerTitleStyle: Styles.customFontBig,
        }}
      />
      <Stack.Screen
        name="AddNewAddressScreen"
        component={AddNewAddressScreen}
        options={{
          title: 'Add New Address', //Set Header Title
          // headerTitleStyle: Styles.customFontBig,
        }}
      />
      <Stack.Screen
        name="CheckOutScreen"
        component={CheckOutScreen}
        options={{
          title: 'Review Your Order', //Set Header Title
          // headerTitleStyle: Styles.customFontBig,
        }}
      />
      <Stack.Screen
        name="OrderSummaryScreen"
        component={OrderSummaryScreen}
        options={{
          title: 'Your Order', //Set Header Title
          // headerTitleStyle: Styles.customFontBig,
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile', //Set Header Title
          // headerTitleStyle: Styles.customFontBig,
        }}
      />
      <Stack.Screen
        name="SelectClothesScreen"
        component={SelectClothesScreen}
        options={{
          title: 'Select Clothes', //Set Header Title
          // headerTitleStyle: Styles.customFontBig,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
