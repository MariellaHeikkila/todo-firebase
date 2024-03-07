
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, _ScrollView } from 'react-native';
import { child, push, ref, remove, update, onValue } from 'firebase/database';
import { db, TODO_REF } from './firebase/Config';
import { TodoItem } from './components/Todoitem';

export default function App() {

  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState({});

  useEffect(() => {
    const todoItemsRef = ref(db, TODO_REF);
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
  
  return (
    <View style={styles.container}    
    >
      <Text>Todolist</Text>
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
        <View style={{marginTop: 15}}>
        <Button 
        title="Remove all todos" 
        onPress={() => createTwoButtonAlert()} />
        </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
