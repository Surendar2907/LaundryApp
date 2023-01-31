import React, {useState, useEffect} from 'react';
import {Button, View, SafeAreaView, Image} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import {useGlobal} from 'reactn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../../styles/Styles';
import {Colors} from '../../config/Colors';
import {Text} from 'react-native-paper';
import {checkCountFirstTimeValue, updateItem} from '../../Utils/SharedFunction';
// import {renderVegOrNonVegImage} from './SharedFunction';

const CheckoutSingleItem = ({id, title, price, isVeg}) => {
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
      }}>
      {/* {renderVegOrNonVegImage(isVeg)} */}
      <AntDesign name={'tags'} color={Colors.accent} size={24} />
      <View style={{flex: 1, marginLeft: 8}}>
        <Text style={[Styles.customFontNormal]}>Shirt</Text>
        <Text style={[Styles.customFontSmall]}>
          Rs. {parseFloat(price).toFixed(2)}
        </Text>
      </View>
      <View style={{flex: 0.7}}>
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
            <AntDesign name={'minussquareo'} color={Colors.accent} size={24} />
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
      </View>
      <View style={{alignItems: 'flex-end', flex: 1}}>
        <Text style={[Styles.customFontSmallBold]}>
          X {value} : ₹ {(price * value).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CheckoutSingleItem;
