import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export default function ProjectListItem({
  index,
  item,
  value,
  onChangeText,
  onPressDelete,
  onPressSave,
}) {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState('');
  const navigation = useNavigation();

  const onPressSaveButton = () => {
    onPressSave(index);
    setEditable(false);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={{flex: 1, padding: 10}}
        onPress={() => navigation.navigate('TaskList')}>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder={item.text || text || 'Enter Project Name'}
          editable={editable}
        />
      </TouchableOpacity>
      <View
        style={{
          width: '30%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Icon
          name={editable ? 'check' : 'pencil'}
          type="material-community"
          onPress={() => (editable ? onPressSaveButton() : setEditable(true))}
        />
        <Icon
          name="delete"
          type="material-community"
          onPress={() => onPressDelete(item.key)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 70,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 10,
    borderColor: '#bbb',
    borderRadius: 10,
  },
});
