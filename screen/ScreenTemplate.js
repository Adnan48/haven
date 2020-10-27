import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

export default function ScreenTemplate(props) {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          borderColor: '#bbb',
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>
        <Icon
          name="arrow-back-ios"
          type="material"
          iconStyle={{marginLeft: 10}}
          onPress={() => navigation.goBack()}
        />
        <Text style={{flex: 1, fontSize: 20, marginLeft: 10}}>
          {props.title}
        </Text>
      </View>
      {props.children}
    </View>
  );
}
