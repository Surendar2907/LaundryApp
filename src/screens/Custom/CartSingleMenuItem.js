import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, View, SafeAreaView, Image} from 'react-native';
import CardView from 'react-native-cardview';
import InputSpinner from 'react-native-input-spinner';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useGlobal} from 'reactn';
import {Colors} from '../../config/Colors';
import Styles from '../../styles/Styles';
import {checkCountFirstTimeValue, updateItem} from '../../Utils/SharedFunction';
// import {renderVegOrNonVegImage} from './SharedFunction';

const CartSingleMenuItem = ({
  id,
  title,
  price,
  description,
  image_src,
  isVeg,
}) => {
  const theme = useTheme();

  const [list, setList] = useGlobal('list');
  const [count, setCount] = useGlobal('count');
  const [value, setValue] = useState(checkCountFirstTimeValue(id, list));

  useEffect(() => {
    var id = updateFromKeyboard(value);
    return () => {
      id;
    };
  }, [value]);

  const updateFromKeyboard = (num) => {
    if (list.length === 0) {
      setList([{id: id, count: num}]);
    } else {
      setList(updateItem(id, {count: num}, list));
    }
  };

  const increment = () => {
    if (value < 10) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (value > 0) {
      setCount(count - 1);
    }
  };
  return (
    <View
      style={{
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 2,
        alignItems: 'center',
      }}>
      <CardView
        style={{
          elevation: 4,
          cornerRadius: 5,
          opacity: 1,
          width: '100%',
          backgroundColor: theme?.colors.card,
        }}>
        <View style={{flexDirection: 'row', margin: 20, alignItems: 'center'}}>
          <AntDesign name={'skin'} color={Colors.accent} size={50} />
          <View style={{flex: 1, flexDirection: 'row', marginLeft: 16}}>
            <View style={{flex: 1}}>
              <Text style={[Styles.customFontNormal]}>Shirt</Text>

              <Text style={[Styles.customFontSmall, {color: Colors.accent}]}>
                Wash & Ironing
              </Text>

              <Text style={[Styles.customFontSmall, {marginTop: 8}]}>
                Rs. {parseFloat(price).toFixed(2)}
              </Text>
              {/* {renderVegOrNonVegImage(isVeg)} */}
            </View>
            <View style={{flex: 0.7, alignItems: 'center'}}>
              <InputSpinner
                inputStyle={{padding: 0}}
                max={10}
                min={0}
                step={1}
                width={60}
                height={30}
                color={'#00000000'}
                editable={false}
                fontSize={10}
                value={value}
                onChange={(num) => {
                  setValue(num);
                }}
                onIncrease={increment}
                onDecrease={decrement}
                buttonLeftImage={
                  <AntDesign
                    name={'minussquareo'}
                    color={Colors.accent}
                    size={24}
                  />
                }
                buttonRightImage={
                  <AntDesign
                    name={'plussquareo'}
                    color={Colors.accent}
                    selectionColor={Colors.dark}
                    size={24}
                  />
                }
                activeOpacity={0.25}
              />
              <Text
                style={[
                  Styles.customFontSmall,
                  {color: '#35A6FF', alignSelf: 'center'},
                ]}>
                X {value} : ₹ {(price * value).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </CardView>
    </View>
  );
};

export default CartSingleMenuItem;
