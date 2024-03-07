import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EnTypo from '@expo/vector-icons/Entypo';
import {  ref, update, remove, child } from 'firebase/database';
import { db, TODO_REF } from '../firebase/Config';

export default function Todoitem({todoItem: {todoItem: title, done}, id}) {

    const [isDone, setIsDone] = useState(done);

    const onCheck = () => {
        setIsDone(!isDone);
        const updateTodoitem = {
            todoItem: title,
            done: !isDone
        }
        const updates = {};
        updates[TODO_REF + id] = updateTodoitem;
        return update(ref(db), updates);
    }

    const onRemove = () => {
        return remove(child(ref(db), TODO_REF + id));
    }

    return(
        <View style={styles.container}>
            <Pressable
            onPress={onCheck}
            >
                {isDone
                ? <MaterialIcons name="check-box" size={32} color="black" />
                : <MaterialIcons name="check-box-outline-blank" size={32} color="black" />
                }
            </Pressable>
            <Text onPress={onCheck}
            style={{
                backgroundColor: isDone ? 'lightgreen' : 'lightblue',
                fontSize: 24,
                marginLeft: 10
            }} 
            >
              {title}  
            </Text>
            <Pressable>
                <EnTypo name={'trash'} size={32} onPress={onRemove}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  