import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Switch, Alert } from 'react-native';

export default function MainScreen({ navigation }) {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title='About' onPress={() => navigation.navigate("AboutScreen")}/>

    })
  }, [navigation])

  const [ isMeters, setIsMeters ] = useState(true)
  const [ roomSize, setRoomSize ] = useState(0)
  const [ flooringPrice, setFlooringPrice ] = useState(0)
  const [ installPrice, setInstallPrice ] = useState(0)


  const calculateCosts = () => {
    // Validation
    if (
      roomSize == 0 || isNaN(roomSize) ||
      flooringPrice == 0 || isNaN(flooringPrice) ||
      installPrice == 0 || isNaN(installPrice)
    ) {
      Alert.alert("Missing information", "Please include all fields. Numbers ONLY")
      return
    }

    // Calculations
    const calcFloorCost = roomSize * flooringPrice
    const calcInstallPrice = roomSize * installPrice
    const totalCost = calcFloorCost + calcInstallPrice
    const tax = totalCost * 0.13

    // Display info to user. Using an alert for now.
    Alert.alert("Invoice", 
      `Installation cost (before tax): $${Math.round(calcInstallPrice*100)/100}\n
      Flooring cost (before tax): $${Math.round(calcFloorCost*100)/100}\n
      Total cost (before tax): $${Math.round(totalCost*100)/100}\n
      Tax: $${Math.round(tax*100)/100}`
    )
    return
  }

  return (<View style={styles.container}>
    <Text style={styles.title}>Calculate Flooring Costs</Text>
    <TextInput
      style={styles.input}
      placeholder="Size of room"
      keyboardType='numeric'
      value={roomSize}
      onChangeText={setRoomSize}
    />

    <View style={styles.textContainer}>
      <Text>Unit: square meters </Text>
      <Text style={styles.subtext}> (toggle off for square feet)</Text>
      <Switch
        style={styles.switch}
        isOn={isMeters}
        value={isMeters}
        onValueChange={setIsMeters}
      />
    </View>

    <TextInput
      style={styles.input}
      placeholder="Price per unit - Flooring"
      keyboardType='numeric'
      value={flooringPrice}
      onChangeText={setFlooringPrice}
    />

    <TextInput
      style={styles.input}
      placeholder="Price per unit - Installation"
      keyboardType='numeric'
      value={installPrice}
      onChangeText={setInstallPrice}
    />

    <Button
      title="Calculate" 
      onPress={calculateCosts}
    />
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "left",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 10,
    color: '#6b6b6b'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switch: {
    alignSelf: 'flex-end',
    marginRight: 0
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },

});