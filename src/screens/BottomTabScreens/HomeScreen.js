import React, {useEffect, useState} from 'react';
import {
  IndicatorViewPager,
  PagerDotIndicator,
} from '@shankarmorwal/rn-viewpager';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';

import {Checkbox, Text} from 'react-native-paper';
import CardView from 'react-native-cardview';

import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../config/Colors';
import {useTheme} from '@react-navigation/native';
import Styles from '../../styles/Styles';
import {Constant} from '../../config/Constant';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {updateServiceData} from '../../Utils/SharedFunction';

const HomeScreen = ({navigation}) => {
  const data = [1, 2, 3, 4];
  const theme = useTheme();
  const [dataSource, setDataSource] = useState([]);
  const [serviceData, setServiceData] = useState([
    {id: 1, service_name: 'Ironing', checked: false},
    {id: 2, service_name: 'Wash and Fold', checked: false},
    {id: 3, service_name: 'Wash and Iron', checked: false},
    {id: 4, service_name: 'Dry Cleaning', checked: false},
  ]);
  const [autoPlaytStatus, setAutoPlaytStatus] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let items = Array.apply(null, Array(6)).map((v, i) => {
      return {
        id: i,
        src: 'http://placehold.it/200x200?text=' + (i + 1),
      };
    });
    setDataSource(items);
  }, []);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setAutoPlaytStatus(true);
    });
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setAutoPlaytStatus(false);
    });

    return () => {
      unsubscribeFocus;
      unsubscribeBlur;
    };
  }, []);

  const setData = (id) => {
    var val = updateServiceData(serviceData, id);
    // console.log(val);
    setServiceData(val);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const openSelectClothes = () => {
    navigation.navigate('SelectClothesScreen', {
      listItems: serviceData,
      previous_screen: false,
    });
  };
  function _renderDotIndicator() {
    return (
      <PagerDotIndicator
        style={{top: 210}}
        pageCount={data.length}
        dotStyle={{backgroundColor: 'lightgrey'}}
        selectedDotStyle={{backgroundColor: Colors.accent}}
      />
    );
  }

  const listServiceItems = serviceData.map((item) => (
    <View key={item.id.toString()} style={{flexDirection: 'row'}}>
      <Text style={[Styles.customFontNormal, {margin: 8, flex: 1}]}>
        {item.service_name}
      </Text>
      <Checkbox
        status={item.checked ? 'checked' : 'unchecked'}
        color={Colors.accent}
        onPress={() => {
          setData(item.id);
        }}
      />
    </View>
  ));

  const RenderViewPageItem = () => {
    return (
      <View>
        <CardView
          cornerRadius={5}
          style={{backgroundColor: theme?.colors.card}}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
            }}>
            <View
              style={{
                flex: 1,
                padding: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'left',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Get 35% Off Monthly Premium Subscription Now!
              </Text>
              <View
                style={{
                  backgroundColor: 'cyan',
                  width: 100,
                  height: 6,
                  borderRadius: 8,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}>
                Browse Subscription
              </Text>
            </View>

            <Image
              source={require('../../../images/demo.jpg')}
              style={{
                width: '50%',
                height: '100%',
                resizeMode: 'cover',
                alignSelf: 'flex-end',
                flex: 0.8,
              }}
            />
          </View>
        </CardView>
      </View>
    );
  };
  const Header = () => {
    return (
      <View style={{padding: 16}}>
        <IndicatorViewPager
          style={styles.pagerStyle}
          indicator={_renderDotIndicator()}
          autoPlayEnable={autoPlaytStatus}>
          {data.map((data) => {
            return (
              <View key={data.toString()} style={{margin: 5, padding: 2}}>
                <RenderViewPageItem />
              </View>
            );
          })}
        </IndicatorViewPager>
        <Text
          style={{
            fontSize: 19,
            textAlign: 'left',
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Shedule Pickup{/* Services */}
        </Text>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View style={{padding: 16}}>
        <Text
          style={{
            fontSize: 19,
            textAlign: 'left',
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Today's Deal
        </Text>
        <FlatList
          data={dataSource}
          horizontal={true}
          renderItem={({item}) => (
            <View style={{margin: 8}}>
              <CardView style={{backgroundColor: theme?.colors.card}}>
                <View
                  style={{
                    flex: 1,
                    height: 120,
                    width: 260,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={require('../../../images/clothing.png')}
                    style={{
                      width: '50%',
                      height: '100%',
                      margin: 20,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      flex: 0.8,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'left',
                      alignSelf: 'center',
                      padding: 10,
                      flex: 1,
                      fontWeight: 'bold',
                    }}>
                    Get 35% Off Monthly Premium Subscription Now!
                  </Text>
                </View>
              </CardView>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.dark ? Colors.dark : Colors.lightWhite,
      }}>
      <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
        <Header />

        <CardView
          cornerRadius={5}
          style={{backgroundColor: theme?.colors.card, margin: 16}}>
          <View style={{padding: 24}}>
            <CardView
              cornerRadius={5}
              style={{backgroundColor: Colors.lightWhite}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <AntDesign name="enviromento" color={Colors.accent} size={15} />
                <Text style={{fontSize: 14}}>
                  {' '}
                  3863, Ray Court, jacksonville,NC 28540
                </Text>
              </View>
            </CardView>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={{flexDirection: 'row', marginTop: 16}}>
              <CardView
                cornerRadius={5}
                style={{
                  backgroundColor: Colors.lightWhite,
                  flex: 1,
                  marginRight: 12,
                }}>
                <TouchableOpacity onPress={showDatepicker}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <AntDesign
                      name="calendar"
                      color={Colors.accent}
                      size={15}
                    />
                    <Text style={Styles.customFontNormal}>
                      {' '}
                      {date.getDate() + ' ' + moment(date).format('MMM')}{' '}
                      {date.getFullYear()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </CardView>
              <CardView
                cornerRadius={5}
                style={{
                  backgroundColor: Colors.lightWhite,
                  flex: 1,
                  marginLeft: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <AntDesign
                    name="clockcircleo"
                    color={Colors.accent}
                    size={15}
                  />
                  <Text style={{fontSize: 14}}> Pickup Time</Text>
                </View>
              </CardView>
            </View>
            <View>
              <Text style={[Styles.customFontMediumBold, {marginTop: 16}]}>
                Services
              </Text>
              {listServiceItems}
            </View>
            <TouchableOpacity
              onPress={openSelectClothes}
              style={[
                Styles.appButtonContainer,
                {
                  backgroundColor: theme.dark
                    ? Colors.greyDarkLevel2
                    : Colors.light,
                  marginTop: 30,
                },
              ]}>
              <Text style={[Styles.customFontMedium, Styles.appButtonText]}>
                Select Clothes
              </Text>
            </TouchableOpacity>
          </View>
        </CardView>
        {/* <FlatList
          data={dataSource}
          renderItem={({item}) => (
            <CardView
              cornerRadius={5}
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 8,
                marginTop: 8,
                padding: 0,
                flex: 1,
                backgroundColor: theme?.colors.card,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                }}>
                <View style={styles.imageThumbnail}>
                  <MaterialIcons
                    name="dry-cleaning"
                    color={Colors.accent}
                    size={34}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    margin: 8,
                  }}>
                  Washing and ironing
                </Text>
              </View>
            </CardView>
          )}
          //Setting the number of column
          numColumns={2}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<Header />}
          ListFooterComponent={<Footer />}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    height: 60,
  },
  pagerStyle: {
    height: 200,
    paddingTop: 20,
  },
});
export default HomeScreen;
