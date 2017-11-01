import React, {Component} from 'react';
import {Text, Image, TextInput, TouchableOpacity, View, AsyncStorage, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class Authentication extends Component {

  constructor() {
    super();
    this.state = { email: null, password: null };
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  userSignup() {
    if (!this.state.email || !this.state.password) return;
    fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);

      this.saveItem('id_token', responseData.token),
      Alert.alert( 'Signup Success! Welcome to NetworkUp!'),
      Actions.HomePage();
    })
    .done();
  }

  userLogin() {
    if (!this.state.email || !this.state.password) return;
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.saveItem('id_token', responseData.token),
      Alert.alert('Login Success!'),
      Actions.HomePage();
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 80}}>
          <Image
          source={require('../assets/NetworkUp.png')}
          style={{width: 350, height:70}}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='email'
            returnKeyType='next'
            style={styles.inputText}
            value={this.state.email}
          />

          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
          />

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogin.bind(this)}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignup.bind(this)}>
            <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Authentication;
