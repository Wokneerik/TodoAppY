import React, {FC, useState} from 'react';
import {TextInput} from 'react-native';
import tw from 'twrnc';
import Padding from '../../ui/Padding';

interface ITask {
  _id: string;
  name: string;
  isCompleted: boolean;
}

const Header: FC = () => {
  const [newTask, setNewTask] = useState<string>(''); // Initialize as an empty string

  return (
    <Padding style={tw`flex-row items-center`}>
      <TextInput
        placeholder="Create a new task"
        style={{
          paddingVertical: 8,
          paddingHorizontal: 8,
          fontSize: 16,
          width: '100%',
          backgroundColor: '#d3d3d3',
          borderRadius: 30,
          paddingLeft: 15,
        }}
        maxLength={36}
        textAlignVertical="center"
        value={newTask}
        onChangeText={text => {
          setNewTask(text);
        }}
      />
    </Padding>
  );
};

export default Header;
