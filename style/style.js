import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    text: {
        marginTop: 10,
    },
    input: {
        marginTop: 10,
        padding: 10,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
      },
    button: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#9b4646',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    link: {
        marginTop: 10,
        color: 'blue',
    }
  });