import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import {db} from '../../../firebase';
import LogoutButton from '../../ui/Logout';
const COLORS = {primary: '#1f145c', white: '#fff'};

const ListItem = () => {
  const [todos, setTodos] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const addTodo = async () => {
    if (textInput === '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        task: textInput,
        completed: false,
        timestamp: serverTimestamp(), // Add a timestamp field
      };

      try {
        // Add the new task to Firebase Firestore
        const docRef = await addDoc(collection(db, 'todos'), newTodo);

        // Update local state
        setTodos(prevTodos => [
          ...prevTodos,
          {
            _id: docRef.id,
            ...newTodo,
          },
        ]);

        setTextInput('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const deleteTaskFromFirestore = async todoId => {
    try {
      // Delete the task from Firebase Firestore
      await deleteDoc(collection(db, 'todos'), todoId);

      // Update local state by removing the deleted task
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markTodoComplete = todoId => {
    const newTodosItem = todos.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    setTodos(newTodosItem);
  };

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };

  const ListItem = ({todo}) => {
    return (
      <View
        style={tw`p-2 items-center bg-white flex-row elevation-12 rounded-4 my-3`}>
        <View style={tw`flex-1`}>
          <Text
            style={tw`font-bold text-8 ${
              todo?.completed ? 'line-through' : ''
            }`}>
            {todo?.task}
          </Text>
        </View>
        {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
            <View
              style={tw`h-10 w-10 justify-center items-center bg-green-500 ml-5 rounded-3`}></View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View
            style={tw`h-10 w-10 justify-center items-center bg-red-500 ml-5 rounded-3`}></View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView>
        <View style={tw`p-5 flex-row justify-center items-center`}>
          <Text style={tw`font-bold text-7 text-blue-500`}>TODO APP</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          data={todos}
          renderItem={({item}) => <ListItem todo={item} />}
        />

        <View
          style={tw`absolute bottom-0 w-full flex-row items-center px-4 py-4 `}>
          <View
            style={tw`h-13 px-2 elevation-40 bg-white flex-1 my-1 mr-10 rounded-30 justify-center`}>
            <TextInput
              value={textInput}
              placeholder="Add Todo"
              onChangeText={text => setTextInput(text)}
            />
          </View>
          <TouchableOpacity onPress={addTodo}>
            <View
              style={tw`h-12 w-12 bg-blue-500 elevation-40 rounded-25 justify-center items-center`}></View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={tw` mt-70`}>
        <LogoutButton />
      </View>
    </>
  );
};

export default ListItem;
