import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, SafeAreaView, ToastAndroid} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {useGlobal} from 'reactn';
import {Colors} from '../../config/Colors';
import Styles from '../../styles/Styles';
import CartSingleMenuItem from '../Custom/CartSingleMenuItem';
import EmptyDataScreen from '../EmptyData/EmptyDataScreen';

const CartScreen = ({navigation}) => {
  const theme = useTheme();
  const [list, setList] = useGlobal('list');
  const [data, setData] = useGlobal('Data');
  const [totalPrice, setTotalPrice] = useState('totalPrice');
  const [proData, setProData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [item, setItem] = useState({
    id: 0,
    title: '',
    price: 0.0,
    description: '',
    image_src: '',
    isFavourite: false,
  });
  useEffect(() => {
    var tempPrice = 0;
    let identicalElements = [];
    data.forEach((element1) => {
      list.forEach((element2) => {
        if (element1['id'] === element2['id']) {
          element1['count'] = element2['count'];
          if (element1['count'] !== 0) {
            identicalElements.push(element1);
            tempPrice = tempPrice + element1['price'] * element1['count'];
          }
        }
      });
    });
    setProData(identicalElements);
    setTotalPrice(tempPrice.toFixed(2));
  }, [list]);
  const goToSelectDeliveryScreen = () => {
    if (totalPrice > 0) {
      navigation.navigate('SelectDeliveryAddressScreen');
    } else {
      ToastAndroid.show(
        "You don't have any item. Please go back and select something.",
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={proData}
          renderItem={({item}) => (
            <CartSingleMenuItem
              id={item.id}
              title={item.title}
              description={item.description}
              image_src={item.image_src}
              price={item.price.toFixed(2)}
              count={item.count}
              isVeg={item.isVeg}
            />
          )}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={proData.length === 0 && Styles.centerEmptySet}
          ListEmptyComponent={
            <EmptyDataScreen
              title={'Empty'}
              description={'Opps, Your cart is empty...'}
            />
          }
        />
      </View>
      <TouchableOpacity
        onPress={goToSelectDeliveryScreen}
        style={[
          Styles.appButtonContainer,
          {
            backgroundColor: theme.dark ? Colors.greyDarkLevel2 : Colors.light,
          },
        ]}>
        <Text style={[Styles.customFontMedium, Styles.appButtonText]}>
          Checkout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartScreen;
