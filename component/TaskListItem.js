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
import {Picker} from '@react-native-picker/picker';

export default function TaskListitem({
  index,
  item,
  value,
  onChangePriority,
  onPressDelete,
  onPressSave,
}) {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(item.priority);
  const [deadline, setDeadline] = useState('');
  const navigation = useNavigation();

  const onPressSaveButton = () => {
    onPressSave(index);
    setEditable(false);
  };

  return (
    <View style={styles.item}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder={item.text || text || 'Enter Task Name'}
          editable={editable}
          style={{
            width: '60%',
            borderRadius: 5,
            borderColor: '#bbb',
          }}
        />
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
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <Text>{deadline ? `Deadline` : 'Set Deadline'} : </Text>
          <TextInput
            value={deadline}
            onChangeText={(text) => setDeadline(text)}
            placeholder={deadline || 'Enter Task Deadline'}
            editable={editable}
            style={{
              borderWidth: 1,
              width: '50%',
              borderRadius: 5,
              borderColor: '#bbb',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text>Priority : </Text>
          <Picker
            selectedValue={item.priority}
            style={{
              height: 50,
              width: '40%',
            }}
            onValueChange={(itemValue, itemIndex) => {
              setPriority(itemValue);
              onChangePriority(index, itemValue);
            }}>
            <Picker.Item label="High" value="high" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Low" value="low" />
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 15,
    marginHorizontal: 10,
    borderColor: '#bbb',
    borderRadius: 10,
  },
});
