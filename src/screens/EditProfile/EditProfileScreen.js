import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  Image,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Styles from '../../styles/Styles';
import {Colors} from '../../config/Colors';
import {Text} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {TextInput} from 'react-native';

const EditProfileScreen = ({navigation}) => {
  const theme = useTheme();
  const [secure, setSecure] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        //   onPress={() => {
        //     handleBackButtonClick();
        //   }}
        >
          <AntDesign
            name={'check'}
            color={theme?.colors.text}
            size={24}
            style={{marginRight: 12}}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 16}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={[
              Styles.elevationLow,
              {
                width: 106,
                height: 106,
                backgroundColor: theme?.colors.card,
                borderRadius: 106 / 2,
                padding: 3,
                margin: 5,
              },
            ]}>
            <Image
              source={require('../../../images/ProfilePic.png')}
              //borderRadius will help to make Round Shape
              style={{width: 100, height: 100, borderRadius: 100 / 2}}
            />
            <AntDesign
              name={'edit'}
              color={Colors.accent}
              size={16}
              style={[
                Styles.elevationLow,
                ,
                {
                  padding: 8,
                  borderRadius: 24 / 2,
                  width: 32,
                  height: 32,
                  marginTop: -25,
                  alignSelf: 'flex-end',
                  backgroundColor: theme?.colors.card,
                },
              ]}
            />
          </View>
        </View>

        <Text style={[Styles.customFontNormal, {color: 'grey'}]}>
          BASIC INFO
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={[Styles.customFontMedium, {marginLeft: 8}]}>
            Full Name
          </Text>
          <TextInput
            style={[
              Styles.customFontMedium,
              {
                flex: 1,
                height: 40,
                borderColor: 'gray',
                borderBottomWidth: 1,
                margin: 4,
              },
            ]}
            placeholder="Enter yore full name"
            // value={fullName}
            // onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={[Styles.customFontMedium, {marginLeft: 8}]}>Mobile</Text>
          <TextInput
            style={[
              Styles.customFontMedium,
              {
                flex: 1,
                height: 40,
                borderColor: 'gray',
                borderBottomWidth: 1,
                margin: 4,
              },
            ]}
            placeholder="Enter your mobile number"
            //   onChangeText={(text) => setPhone(text)}
            // value={phone}
            autoCompleteType={'tel'}
            keyboardType={'phone-pad'}
            maxLength={10}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={[Styles.customFontMedium, {marginLeft: 8}]}>Email</Text>
          <TextInput
            style={[
              Styles.customFontMedium,
              {
                flex: 1,
                height: 40,
                borderColor: 'gray',
                borderBottomWidth: 1,
                margin: 4,
              },
            ]}
            placeholder="Email"
            // onChangeText={(text) => setEmail(text)}
            // value={email}
            autoCompleteType={'email'}
            keyboardType={'email-address'}
          />
        </View>

        <Text style={[Styles.customFontNormal, {color: 'grey', marginTop: 16}]}>
          CHANGE PASSWORD
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={[Styles.customFontMedium, {marginLeft: 8}]}>
            Current Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'gray',
              borderBottomWidth: 1,
              alignItems: 'center',
            }}>
            <AntDesign name={'lock1'} color={Colors.accent} size={24} />
            <TextInput
              style={[
                Styles.customFontMedium,
                {
                  flex: 1,
                  height: 40,
                  margin: 4,
                },
              ]}
              placeholder="Enter your current password"
              // onChangeText={(text) => setEmail(text)}
              // value={email}
              secureTextEntry={secure}
              textContentType={'password'}
              autoCompleteType={'password'}
              keyboardType={'default'}
            />
            <Ionicons
              name={secure ? 'eye-outline' : 'eye-off-outline'}
              color={Colors.accent}
              size={24}
              onPress={() => setSecure(!secure)}
            />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={[Styles.customFontMedium, {marginLeft: 8}]}>
            New Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'gray',
              borderBottomWidth: 1,
              alignItems: 'center',
            }}>
            <AntDesign name={'lock1'} color={Colors.accent} size={24} />
            <TextInput
              style={[
                Styles.customFontMedium,
                {
                  flex: 1,
                  height: 40,
                  margin: 4,
                },
              ]}
              placeholder="Enter a new password"
              // onChangeText={(text) => setEmail(text)}
              // value={email}

              secureTextEntry={secure}
              textContentType={'newPassword'}
              autoCompleteType={'password'}
              keyboardType={'default'}
            />
            <Ionicons
              name={secure ? 'eye-outline' : 'eye-off-outline'}
              color={Colors.accent}
              size={24}
              onPress={() => setSecure(!secure)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
