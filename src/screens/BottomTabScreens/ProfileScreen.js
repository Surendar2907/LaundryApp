import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView, Image, View, Switch} from 'react-native';
import Styles from '../../styles/Styles';
import {Colors} from '../../config/Colors';
import {Text} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import CardView from 'react-native-cardview';

const ProfileScreen = ({navigation}) => {
  const theme = useTheme();
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 16, backgroundColor: Colors.light}}>
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
          </View>
          <Text style={[Styles.customFontBigBold]}>Anne Watts</Text>

          <Text style={Styles.customFontNormal}>+91 8900100789</Text>
        </View>
        <Text style={[Styles.customFontSmall, {color: 'grey'}]}>GENERAL</Text>

        {/* <CardView
          cardElevation={0}
          cornerRadius={5}
          style={{backgroundColor: theme?.colors.card}}> */}
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'bells'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>Show Notification</Text>

            <Text style={Styles.customFontVerySmall}>
              Enable push notifications
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: Colors.accentFaded}}
            thumbColor={isEnabled ? Colors.accent : '#f4f3f4'}
            ios_backgroundColor={Colors.accent}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'enviromento'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>Location</Text>

            <Text style={Styles.customFontVerySmall}>
              Update your location data
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={Styles.customFontVerySmall}>Mumbai</Text>
            <AntDesign name={'right'} color={Colors.accent} size={20} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />

        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'earth'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>Language</Text>

            <Text style={Styles.customFontVerySmall}>Chenge your language</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={Styles.customFontVerySmall}>English</Text>
            <AntDesign name={'right'} color={Colors.accent} size={22} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />

        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'lock1'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>Change Password</Text>

            <Text style={Styles.customFontVerySmall}>Chenge your password</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name={'right'} color={Colors.accent} size={22} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'Safety'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>
              Sync Automatically
            </Text>

            <Text style={Styles.customFontVerySmall}>
              Update your data to cloud
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: Colors.accentFaded}}
            thumbColor={isEnabled ? Colors.accent : '#f4f3f4'}
            ios_backgroundColor={Colors.accent}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {/* </CardView> */}
        <Text
          style={[
            Styles.customFontSmall,
            {color: 'grey', marginTop: 8, marginBottom: 8},
          ]}>
          MORE
        </Text>

        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'infocirlceo'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>About</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name={'right'} color={Colors.accent} size={20} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'team'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>Contact Us</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name={'right'} color={Colors.accent} size={20} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'exception1'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>Terms & Policies</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name={'right'} color={Colors.accent} size={20} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <AntDesign
            name={'enviroment'}
            color={Colors.accent}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormalBold]}>Our Service Area</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name={'right'} color={Colors.accent} size={20} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 1,
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'lightgrey',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            paddingBottom: 22,
            alignItems: 'center',
          }}>
          <AntDesign
            name={'logout'}
            color={'red'}
            size={20}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: theme?.colors.card,
            }}
          />
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={[Styles.customFontNormal, {color: 'red'}]}>
              Logout
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
