import { Redirect } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

const App = () => {
  return <Redirect href={`/(home)/(tabs)/`} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
