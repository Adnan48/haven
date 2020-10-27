import React, {useState} from 'react';
import {View, Text, FlatList, Button, TextInput} from 'react-native';
import ScreenTemplate from './ScreenTemplate';
import TaskListItem from '../component/TaskListItem';

export default function TaskList() {
  const [project, addProject] = useState([
    {text: 'Build a Project', key: 1, priority: 'low'},
    {text: 'Buy coffee', key: 2, priority: 'high'},
    {text: 'Save It', key: 3, priority: 'medium'},
  ]);

  const priorities = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const [text, setText] = useState('');

  const onPressAdd = () => {
    addProject([
      ...project,
      {text: text, key: project.length + 1, priority: 'low'},
    ]);
    setText('');
  };

  const onPressDelete = (key) => {
    addProject((prevProject) => {
      return prevProject.filter((todo) => todo.key !== key);
    });
  };

  const onChangePriority = (index, value) => {
    addProject((prevProject) => {
      const newProject = [...prevProject];
      newProject[index].priority = value;
      return newProject;
    });
  };

  const onPressSave = (index) => {
    addProject((prevProject) => {
      const newProject = [...prevProject];
      newProject[index].text = text;
      return newProject;
    });
  };

  const priorityTask = project.sort(
    (a, b) => priorities[a.priority] - priorities[b.priority],
  );

  console.log(priorityTask);

  return (
    <ScreenTemplate title="Task List">
      <View style={{margin: 10}}>
        <TextInput
          placeholder="Enter Task"
          onChangeText={(text) => setText(text)}
          style={{borderBottomWidth: 1, marginBottom: 10}}
        />
        <Button title="Add Task" onPress={onPressAdd} />
      </View>
      <FlatList
        data={priorityTask}
        renderItem={({item, index}) => (
          <TaskListItem
            item={item}
            index={index}
            onPressDelete={onPressDelete}
            onPressSave={onPressSave}
            onChangePriority={onChangePriority}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
    </ScreenTemplate>
  );
}
