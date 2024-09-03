import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Keyboard, TouchableWithoutFeedback,Alert } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';


export default function HomeScreen({navigation}) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [reading, setReading] = useState('');
  const [price, setPrice] = useState('');

  const onChange = (event, selectedDate) => {
    setShow(false);
    console.log(selectedDate);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const openDatePicker = () => {
    setShow(true);
  };

  async function handleSubmit() {

    console.log('Reading:', reading);
    console.log('price:', price);
    console.log('Date:', date);
    const formData = {
      reading: reading,
      price:price,
      date: date
    };

    try {
      const response = await axios.post('https://petrol-backend.vercel.app/petrol', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('Success:', response.data);
      Alert.alert('Success', 'Data saved successfully');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to save data');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Text style={styles.txt}>Petrol Reading</Text>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput placeholder="Enter Reading" keyboardType='numeric' onChangeText={(val) => setReading(val)} />
          </View>
          <View style={styles.input}>
            <TextInput placeholder="Enter Price" keyboardType='numeric' keyboardAppearance='dark' onChangeText={(val) => setPrice(val)} />
          </View>
        </View>
        <View >
          <Button title="Enter Date" onPress={openDatePicker} />
        </View>
        <View style={styles.button}>
          <Button title="Submit" color={'green'} onPress={handleSubmit} />
        </View>
        {show && (
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <View style={styles.button}>
            <Button title="Records" color={'#7b57ab'} onPress={() => navigation.navigate('Details')}/>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'coral',
    borderRadius: 5,
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20
  },
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30
  }
});
