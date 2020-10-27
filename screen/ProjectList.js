import React, {useState} from 'react';
import {View, Text, FlatList, Button, TextInput} from 'react-native';
import ScreenTemplate from './ScreenTemplate';
import ProjectListItem from '../component/ProjectListItem';

export default function ProjectList() {
  const [project, addProject] = useState([
    {text: 'Build a Project', key: 1},
    {text: 'Buy coffee', key: 2},
    {text: 'Save It', key: 3},
  ]);

  const [text, setText] = useState('');

  const onPressAdd = () => {
    addProject([...project, {text: text, key: project.length + 1}]);
    setText('');
  };

  const onPressDelete = (key) => {
    addProject((prevProject) => {
      return prevProject.filter((todo) => todo.key !== key);
    });
  };

  const onPressSave = (index) => {
    addProject((prevProject) => {
      const newProject = [...prevProject];
      newProject[index].text = text;
      return newProject;
    });
  };

  return (
    <ScreenTemplate title="Project List">
      <View style={{margin: 10}}>
        <TextInput
          placeholder="Enter Project"
          onChangeText={(text) => setText(text)}
          style={{borderBottomWidth: 1, marginBottom: 10}}
        />
        <Button title="Add Project" onPress={onPressAdd} />
      </View>
      <FlatList
        data={project}
        renderItem={({item, index}) => (
          <ProjectListItem
            item={item}
            index={index}
            onPressDelete={onPressDelete}
            onPressSave={onPressSave}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </ScreenTemplate>
  );
}
