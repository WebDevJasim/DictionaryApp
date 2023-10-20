import React, {useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {reducer, initialState, actionTypes} from './Respons';

const DictionaryScreen = () => {
  const [Data, setData] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const ApiData = () => {
    dispatch({type: actionTypes.SET_LOADING, payload: true});

    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/learners/json/${Data}?key=3e1dee41-e2ec-47df-908b-5025632d2f8e`,
      )
      .then(response => {
        dispatch({type: actionTypes.SET_DATA, payload: response.data});
        dispatch({type: actionTypes.SET_LOADING, payload: false});
      })
      .catch(error => {
        dispatch({type: actionTypes.SET_ERROR, payload: error});
        dispatch({type: actionTypes.SET_LOADING, payload: false});
      });
  };

  return (
    <ImageBackground
      source={require('../../../assets/backImg.jpg')}
      style={styles.body}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>Dictionary</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter a word in the dictionary"
            onChangeText={Data => setData(Data)}
          />
        </View>
        <ScrollView>
          <View>
            <View
              style={{
                marginTop: 50,
                marginLeft: 10,
                marginRight: 10,
                alignItems: 'baseline',
              }}>
              {state.loading && <Text style={styles.text}>Loading...</Text>}
              {state.error && (
                <Text style={styles.text}>Error: {state.error.message}</Text>
              )}
              {state.data.map(item => (
                <View key={item.meta.uuid}>
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    {item.meta.id}:{' '}
                    <Text style={{color: 'white', fontSize: 16}}>
                      {item.shortdef}
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={() => ApiData()}>
          <Text style={styles.text}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    alignItems: 'center',
    flex: 7,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 30,
    width: 300,
    marginTop: 30,
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000000',
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
