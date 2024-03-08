
import { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import { child, push, ref, remove, update, onValue, query } from 'firebase/database';
import { db, TODO_REF, USERS_REF } from '../firebase/Config';
import TodoItem from './TodoItem';
import { MaterialIcons } from '@expo/vector-icons';
import { logout } from './Auth';
import { styles } from '../style/style';

export default function Todo( { navigation, route } ) {

  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState({});
  const [userkey, setUserkey] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setUserkey(route.params.userUid);
    const userRef = query(ref(db, USERS_REF + route.params.userUid));
    onValue(userRef, (snapshot) => {
      snapshot.val()
      ? setNickname(snapshot.val().nickname)
      : setNickname('');
    })
    const todoItemsRef = ref(db, TODO_REF + snapshot.key);
    onValue(todoItemsRef, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const todoItems = {...data};
      setTodos(todoItems);
    });
  }, []);

  const addNewTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        done: false,
        todoItem: newTodo
      }
      const newTodoItemKey = push(child(ref(db), TODO_REF)).key;
      const updates = {};
      updates[TODO_REF + newTodoItemKey] = newTodoItem;
      setNewTodo('');
      return update(ref(db), updates);
    }    
  }

  const removeTodos = () => {
    remove(ref(db), TODO_REF);
  }

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Todolist",
      "Remove all items?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
        onPress: () => removeTodos() 
      }],
      { cancelable: false}
    );
  }

  let todosKeys = Object.keys(todos);
  
  return (
    <View style={styles.container}    
    >
      <Text>Todolist {todosKeys.length}</Text>
      <View style={{marginTop: 5}}>
        <TextInput
        style={{marginTop: 5, padding: 5, width: 200, borderColor: 'black', borderWidth: 1}}
        placeholder="Add new todo"
        value={newTodo}
        onChangeText = {setNewTodo}
        />
      </View>
      <View style={{marginTop: 15}}>
        <Button 
        title="Add new todo item" 
        onPress={() => addNewTodo()} />
        </View>
        <ScrollView style={{marginTop: 15}}>
          {todosKeys.length > 0 ? (
            todosKeys.map(key => (
                <TodoItem 
                key={key}
                id={key}
                todoItem={todos[key]}
                />
              ))
          ) 
          : (
            <Text>No todos</Text>
          )}
        <View style={{marginTop: 15}}>
        <Button 
        title="Remove all todos" 
        onPress={() => createTwoButtonAlert()} />
        </View>
        </ScrollView>  
    </View>
  );
}
