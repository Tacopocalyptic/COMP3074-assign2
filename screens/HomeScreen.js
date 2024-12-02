import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
// API key stored within a .env file in the root directory of this project.
// it has been excluded from the upload of this project
const API_KEY = process.env.EXPO_PUBLIC_API_KEY

// === CURRENCY CONVERSION PAGE ===

export default function HomeScreen({ navigation }) {

    const [ loading, setLoading ] = useState(true)
    const [ currencies, setCurrencies ] = useState([])
    const [ currencyCode, setCurrencyCode ] = useState('CAD')
    const [ amount, setAmount ] = useState('1')
    const [ toCurrency, setToCurrency ] = useState('USD')
    const [ outputMsg, setOutputMsg] = useState(false)
    const [ error, setError ] = useState(false)
    const [ errMessage, setErrorMessage ] = useState('')

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button title='About' onPress={() => navigation.navigate("AboutScreen")}/>
      })
      getCurrencies()
    }, [navigation])

    const getExchangeRate = async () => {
        setError(false)
        setOutputMsg(false)

        fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${currencyCode}&currencies=${toCurrency}`)
        .then((response) => response.json())
        .then((json) => { 
            // Pulls in individual exchange rate
            const exchangedAmount = amount*json.data[toCurrency]
            // Calculates and sets message
            setOutputMsg(`${amount} ${currencyCode} to ${toCurrency}: ${Math.round(exchangedAmount * 100) / 100}`)
        })
        .catch((e) => {
            console.log(e)
            setError(true);
            setErrorMessage('Error retrieving currencies');
        })
    }

    const getCurrencies = async () => {
        setError(false)
        fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`)
            .then((response) => {
                // console.log(response)
                return response.json()
            })
            .then((json) => { 
                // console.log(json.data)
                setCurrencies(Object.keys(json.data)) 
            })
            .catch((e) => {
                console.log(e)
                setError(true);
                setErrorMessage('Error retrieving currencies');
            })
        setLoading(false)
    }

  const calculateExchange = () => {
    // Validation
    if (
      !currencyCode || currencies.indexOf(currencyCode) === -1 ||
      amount == 0 || isNaN(amount) ||
      !toCurrency || currencies.indexOf(toCurrency) === -1
    ) {
        setError(true)
        setErrorMessage("Missing information, please include all fields")
        return
    }

    // Calculation happens in 'getExchangeRate()'
    getExchangeRate()
    return
  }

  return loading ? (
    <View style={styles.container}>
    <ActivityIndicator
        size="large" 
        color="#0c9"/>
    </View>
    ) : (
    <View style={styles.container}>
        <Text style={styles.title}>Exchange Rate Calculator</Text>

        <View style={styles.rowContainer}>
            <SelectList
                setSelected={(val) => setCurrencyCode(val)}
                data={currencies}
            />
            <TextInput
            style={styles.input}
            placeholder="amount"
            keyboardType='numeric'
            value={amount}
            onChangeText={setAmount}
            />
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.label}>To currency: </Text>
            <SelectList
                setSelected={(val) => setToCurrency(val)}
                data={currencies}
            />
        </View>

        <View style={styles.container}>
            <Button
            title="Calculate" 
            onPress={calculateExchange}
            />

            {error ? <Text style={styles.error}>{errMessage}</Text> : <></>}
            {outputMsg ? <Text style={styles.output}>{outputMsg}</Text> : <></>}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "top",
        alignItems: "left",
        padding: 20,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 10
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
    },
    label: {
        fontSize: 20
    },
    error: {
        fontSize: 20,
        color: '#a63028',
        padding: 15
    },
    input: {
        height: 40,
        minWidth: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        paddingLeft: 10,
    },
    output: {
        fontSize: 24,
        padding: 20
    }
});