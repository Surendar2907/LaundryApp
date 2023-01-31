import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CardView from 'react-native-cardview';
import {Appbar, Avatar, useTheme, Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';
import {Colors} from '../../config/Colors';
import Styles from '../../styles/Styles';
const NavigationDrawerStructure = ({navigation}) => {
  const route = useRoute();
  const theme = useTheme();
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.toggleDrawer();
  };

  const gotoEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const profileHeader = () => {
    return <View></View>;
  };
  const profileHeaderRight = () => {
    return (
      <TouchableOpacity onPress={gotoEditProfile}>
        <AntDesign
          name="form"
          color={theme.colors.text}
          size={24}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
    );
  };
  const mainHeader = () => {
    return (
      <View>
        <Text style={Styles.customFontMediumBold}>Hi Surendar,</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="enviromento" color={Colors.accent} size={15} />
          <Text style={Styles.customFontSmall}>
            {' '}
            3863, Ray Court, jacksonville,NC 28540
          </Text>
        </View>
      </View>
    );
  };

  const mainHeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
        <AntDesign
          name="shoppingcart"
          color={theme.colors.text}
          size={24}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <CardView style={{padding: 12, backgroundColor: theme.colors.card}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginLeft: 8}}>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            {/*Donute Button Image */}
            <AntDesign name="menuunfold" color={theme.colors.text} size={24} />
          </TouchableOpacity>
        </View>
        {route?.state?.index === 2 ? profileHeader() : mainHeader()}
        {route?.state?.index === 2 ? (
          profileHeaderRight()
        ) : (
          <View style={{width: 24}} />
        )}
      </View>
    </CardView>
  );
};

export default NavigationDrawerStructure;
