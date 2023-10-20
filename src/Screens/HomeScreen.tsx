import {View, Text, Pressable, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [newWord, setNewWord] = useState('');
  const [serverdata, setServerData] = useState([]);

  const searchWord = enteredWord => {
    setNewWord(enteredWord);
  };

  async function getPost() {
    try {
      const response = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/learners/json/${newWord}?key=4f6bc0c1-4557-438a-87c9-efaeded32c27`,
      );

      const posts = await response.json();
      setServerData(posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPost();
  }, []);
  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <View style={{alignItems: 'center', margin: 10}}>
          <Text style={{fontSize: 30}}>Dictionary</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}>
            <TextInput
              placeholder="Search"
              onChangeText={searchWord}
              value={newWord}
              clearButtonMode="always"
              style={{
                borderWidth: 1,
                padding: 10,
                width: '70%',
                borderRadius: 30,
              }}
            />
            <Pressable
              onPress={() => {
                getPost();
              }}
              style={{backgroundColor: 'black', width: '20%'}}>
              <Text
                style={{
                  fontSize: 20,
                  padding: 10,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Go
              </Text>
            </Pressable>
          </View>

          <Text>{newWord}</Text>

          {/* <View>
            {serverdata.map(item => (
              <View>
                <Text>{item.meta.id}</Text>
                <Text>{item.shortdef}</Text>
              </View>
            ))}
          </View> */}
          <View style={{}}>
            <FlatList
              // horizontal={false}
              data={serverdata}
              keyExtractor={item => item.meta.uuid}
              renderItem={({item}) => (
                <View>
                  <Text style={{color: 'red'}}>{item.meta.id + ' '}</Text>
                  <Text style={{color: 'black'}}>{item.shortdef}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// import {
//   View,
//   Text,
//   Pressable,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import React, {useState} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {TextInput} from 'react-native-gesture-handler';

// export default function HomeScreen() {
//   const [newWord, setNewWord] = useState('');
//   const [checkedWord, setCheckedWord] = useState('');
//   const [definition, setDefinition] = useState('');
//   const [example, setExample] = useState('');

//   const searchWord = enteredWord => {
//     setNewWord(enteredWord);
//   };

//   getInfo = () => {
//     var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newWord;

//     return fetch(url)
//       .then(data => {
//         return data.json();
//       })
//       .then(response => {
//         var word = response[0].word;
//         setCheckedWord(word);

//         var def = response[0].meanings[0].definitions[0].definition;
//         setDefinition(def);

//         var eg = response[0].meanings[0].definitions[0].example;
//         setExample(eg);
//       });
//   };

//   const clear = () => {
//     setCheckedWord('');
//     setDefinition('');
//     setExample('');
//     setNewWord('');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{flex: 0.2}}></View>

//       <View style={{flex: 0.8}}>
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <TextInput
//             style={styles.inputBox}
//             placeholder="search a word"
//             placeholderTextColor={'rgba(0,0,0,0.7)'}
//             textAlign="center"
//             clearButtonMode="always"
//             onChangeText={searchWord}
//             value={newWord}></TextInput>

//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               width: '60%',
//               marginTop: 20,
//               marginBottom: 20,
//             }}>
//             <TouchableOpacity
//               style={styles.buttonDesign}
//               onPress={() => {
//                 getInfo();
//               }}>
//               <Text style={styles.buttonText}>Go !</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.buttonDesign}
//               onPress={() => {
//                 clear();
//               }}>
//               <Text style={styles.buttonText}>Clear</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => {
//                 speak();
//               }}></TouchableOpacity>
//           </View>

//           <View>
//             <Text style={styles.textDesign}>Entered Word :{checkedWord} </Text>
//             <Text style={styles.textDesign}>Definition : {definition} </Text>
//             <Text style={styles.textDesign}>Example : {example} </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },

//   imageDesign: {
//     width: '80%',
//     height: '120%',
//     marginLeft: 50,
//     marginTop: 30,
//   },
//   inputBox: {
//     width: '80%',
//     height: 50,
//     borderWidth: 5,
//     borderColor: 'rgba(80, 235, 236 ,1)',
//     marginTop: 100,
//     fontSize: 25,
//   },
//   buttonDesign: {
//     backgroundColor: 'rgba(80, 235, 236,0.3)',
//     width: 80,
//     height: 40,
//     borderColor: 'black',
//     borderWidth: 1,
//     borderRadius: 20,
//   },
//   buttonText: {
//     fontSize: 25,
//     alignSelf: 'center',
//     marginTop: 5,
//   },
//   speakerButton: {
//     width: 50,
//     height: 40,
//   },
//   textDesign: {
//     fontSize: 25,
//     backgroundColor: 'rgba(80, 235, 236,0.3)',
//     marginTop: 10,
//     alignSelf: 'center',
//   },
// });
