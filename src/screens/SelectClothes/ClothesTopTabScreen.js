import React, {useEffect} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {useGlobal} from 'reactn';
import CartSingleMenuItem from '../Custom/CartSingleMenuItem';
import EmptyDataScreen from '../EmptyData/EmptyDataScreen';

const ClothesTopTabScreen = ({navigation, route}) => {
  const [list, setList] = useGlobal('list');
  const [data, setData] = useGlobal('Data');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <FlatList
          data={data}
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
          contentContainerStyle={data.length === 0 && Styles.centerEmptySet}
          ListEmptyComponent={
            <EmptyDataScreen
              title={'Empty'}
              description={'Opps, No data found. Please try again later.'}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ClothesTopTabScreen;
