import { Text, View, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import styles from './style/style';
import uuid from 'react-uuid'

export default function App() {
  const [weight, setWeight] = useState("");
  const [bottles, setBottles] = useState(1);
  const [gender, setGender] = useState('male');
  const [times, setTime] = useState(1);
  const [alcLvl, setAlc] = useState(0);

  const bottle = Array();
  bottle.push({label: '1 bottle', value: 1});
  bottle.push({label: '2 bottles', value: 2});
  bottle.push({label: '3 bottles', value: 3});
  bottle.push({label: '4 bottles', value: 4});
  bottle.push({label: '5 bottles', value: 5});
  bottle.push({label: '6 bottles', value: 6});

  const time = Array();
  time.push({label: '1 hour', value: 1});
  time.push({label: '2 hours', value: 2});
  time.push({label: '3 hours', value: 3});
  time.push({label: '4 hours', value: 4});
  time.push({label: '5 hours', value: 5});
  time.push({label: '6 hours', value: 6});

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]

  function calculate() {
    let result = 0;
    let litres = bottles * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight/10;
    let gLeft = grams - burning * times
    if (weight === "") {
      alert("Please enter your weight");
    }
    else if (gender == 'male') {
      result = gLeft/(weight * 0.7);
    }
    else {
      result = gLeft/(weight * 0.6);
    }
    if (result < 0) {
      result = 0;
    }
    setAlc(result);
    if (result > 0.50) {
      styles.tulos = {
        color: 'red',
        fontSize: 40,
      }
    } else if (result > 0.25) {
      styles.tulos = {
        color: 'yellow',
        fontSize: 40,
      }
    } else {
      styles.tulos = {
        color: 'green',
        fontSize: 40,
      }
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alcometer</Text>
      <Text style={styles.label}>Weight</Text>
      <TextInput
        keyboardType='number-pad'
        placeholder='Enter your weight'
        value={weight}
        onChangeText={text => setWeight(text)}
        keyboardType='number-pad'
      />
      <Text style={styles.label}>Bottles</Text>
      <Picker
        style={styles.pick}
        selectedValue={bottles}
        onValueChange={(itemValue) => setBottles(itemValue)}
        >
        {bottle.map((bottles) => (
          <Picker.Item label={bottles.label} value={bottles.value} key={uuid()} />
        ))}
      </Picker>
      <Text style={styles.label}>Time</Text>
      <Picker
        style={styles.pick}
        selectedValue={times}
        onValueChange={(itemValue) => setTime(itemValue)}
        >
        {time.map((times) => (
          <Picker.Item label={times.label} value={times.value} key={uuid()} />
        ))}
      </Picker>  
      <Text style={styles.label}>Gender</Text>
      <RadioForm
        buttonSize = {10}
        radio_props={genders}
        initial={0}
        onPress={(value) => {setGender(value)}}
      />
      <Text style={styles.tulos}>{alcLvl.toFixed(2)}</Text>
      <Button onPress={calculate} title="Calculate"></Button>
    </View>
  );
}