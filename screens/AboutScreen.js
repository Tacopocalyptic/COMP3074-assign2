import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function AboutScreen() {

    const navigation = useNavigation();

    return (<View style={styles.container}>
        <Text style={styles.title}>About This App</Text>
        <Text>Josephine Snyder - 101150792</Text>
        <Text>This is a basic currency conversion app</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: "bold",
    },
  });