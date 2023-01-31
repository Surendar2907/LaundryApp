import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ClothesTopTabScreen from './ClothesTopTabScreen';
import {Colors} from '../../config/Colors';
import Styles from '../../styles/Styles';
import {useTheme} from '@react-navigation/native';
import {useGlobal} from 'reactn';
import {BackHandler} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import CardView from 'react-native-cardview';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createMaterialTopTabNavigator();
const SelectClothesScreen = ({navigation, route}) => {
  var array = route.params.listItems;
  const [isNext, setIsNext] = useState(false);
  const theme = useTheme();
  const [servicePosition, setServicePosition] = useGlobal('servicePosition');
  var numbers = ['Daily wear', 'Ethnic', 'Winter wear', 'Household'];
  var x = numbers.map(Math.sqrt);
  useEffect(() => {
    validateSystem();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  function validateSystem() {
    for (let index = servicePosition; index < array.length; index++) {
      if (array[index].checked) {
        navigation.setOptions({
          title: array[index].service_name,
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                handleBackButtonClick();
              }}
            />
          ),
        });
        setServicePosition(index + 1);
        let val = false;
        for (let y = index + 1; y < array.length; y++) {
          if (array[y].checked) {
            val = true;
            break;
          } else {
            val = false;
          }
        }
        setIsNext(val);
        break;
      } else {
        // console.log('No service selected.');
      }
    }
  }

  function handleBackButtonClick() {
    if (route.params.previous_screen) {
      // A previous screen exists
      setServicePosition(servicePosition);
    } else {
      // No previous screen
      setServicePosition(0);
    }

    console.log(route.params.previous_screen);
    navigation.goBack();
    return true;
  }

  const goToSelectAddressScreen = () => {
    if (isNext) {
      navigation.push('SelectClothesScreen', {
        listItems: array,
        previous_screen: true,
      });
    } else {
      navigation.navigate('SelectDeliveryAddressScreen');
      // navigation.navigate('CheckOutScreen');

      // setServicePosition(0);
    }
  };

  const listItems = numbers.map((number) => (
    <Tab.Screen
      key={number.toString()}
      name={number.toString()}
      component={ClothesTopTabScreen}
    />
  ));

  return (
    <React.Fragment>
      <Tab.Navigator
        removeClippedSubviews={true}
        tabBarOptions={{
          activeTintColor: Colors.accent,
          inactiveTintColor: '#D3D3D3',
          scrollEnabled: true,
          tabStyle: {
            width: 'auto',
            padding: 0,
            marginLeft: 5,
            marginRight: 5,
          },
          indicatorStyle: {
            borderBottomColor: Colors.accent,
            borderBottomWidth: 2,
          },
        }}>
        {listItems}
      </Tab.Navigator>
      <View>
        <CardView
          cardElevation={2}
          cornerRadius={0}
          style={{
            backgroundColor: theme.dark ? Colors.lightWhite : Colors.light,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
              }}>
              <Text
                style={[
                  Styles.customFontNormal,
                  {marginLeft: 4, marginRight: 4},
                ]}>
                {/* {totalItem}  */}3 ITEMS
              </Text>
              <View
                style={{
                  backgroundColor: Colors.accent,
                  height: '100%',
                  width: 1,
                  margin: 6,
                }}
              />
              <Text style={[Styles.customFontNormalBold, {marginLeft: 4}]}>
                {/* {totalPrice} */}₹ 23
              </Text>
              <Text style={[Styles.customFontNormal, {marginLeft: 4}]}>
                {/* {totalPrice} */}
                plus taxes
              </Text>
            </View>
            <TouchableOpacity
              onPress={goToSelectAddressScreen}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                flex: 1,
              }}>
              <Text style={[Styles.customFontMedium, {marginRight: 16}]}>
                {isNext ? 'NEXT' : 'View Cart'}
              </Text>
              <AntDesign
                name={isNext ? 'arrowright' : 'shoppingcart'}
                color={Colors.accent}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </CardView>
      </View>
      {/* <TouchableOpacity
        onPress={goToSelectAddressScreen}
        style={[
          Styles.appButtonContainer,
          {
            backgroundColor: theme.dark ? Colors.greyDarkLevel2 : Colors.light,
            marginTop: 30,
          },
        ]}>
        <Text style={[Styles.customFontMedium, Styles.appButtonText]}>
          Next
        </Text>
      </TouchableOpacity> */}
    </React.Fragment>
  );
};

export default SelectClothesScreen;
