import React from 'react';
import { StyleSheet, Text,TextInput, View, Button } from 'react-native'
import axios from 'axios'
// import {getWordFromApi} from './api'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.emptySource = true
    this.emptyTarget = true
    this.state = {
      wordSource: "",
      wordTarget: "",
      dico: []
    }
  }

  componentDidMount() {
    this.loadDico()
  }

// getWordFromApi() {
//   const url = 'http://localhost:8000/api/words/'
//   return fetch(url)
//     .then((response) => response.json())
//     .catch((error) => console.error(error))
// }

  loadDico() {
    console.log(this.state.dico)
    axios
      .get("http://172.25.33.186:8000/api/words/") //172.25.33.186
      .then(res => console.log("lol")) //this.setState({dico: res.data}))
      .catch(err => console.log(err))
    // this.getWordFromApi().then(data => {this.setState({dico: data})})
    console.log(this.state.dico)

  }

  reset() {
    this.emptySource = true
    this.emptyTarget = true
    this.setState({wordSource: "", wordTarget: ""})
  }

  textInputSourceChanged(text) {
    this.emptyTarget = false
    this.setState({wordSource: text})
  }

  textInputTargetChanged(text) {
    this.emptySource = false
    this.setState({wordTarget: text})
  }

  reset() {
    this.emptySource = true
    this.emptyTarget = true
    this.setState({wordSource: "", wordTarget: ""})
  }

  translate() {
    let found = false
    for (let i=0;i<this.state.dico.length;i++) {
      if(this.state.dico[i].en===this.state.wordSource && this.emptyTarget) {
        this.setState({wordTarget: this.state.dico[i].wg})
        found = true
      }
      if(this.state.dico[i].wg===this.state.wordTarget && this.emptySource) {
        this.setState({wordSource: this.state.dico[i].en})
        found = true
      }
    }
    if(!found && !this.emptyTarget) {
      this.setState({wordTarget: "Pas du tout wagou"})
    }
    if(!found && !this.emptySource) {
      this.setState({wordSource: "Pas du tout wagou"})
    }
    this.emptySource = false
    this.emptyTarget = false
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>English</Text>
        <TextInput
          style={styles.textinput}
          placeholder="English word"
          onChangeText={text => this.textInputSourceChanged(text)}
          editable={this.emptySource}
          value={this.state.wordSource}
        />
        <Button
          style={styles.button}
          title="Translate"
          onPress={() => this.translate()}
        />
        <Button
          style={styles.button}
          title="Reset"
          onPress={() => this.reset()}
        />
        <Text>Wagou</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Wagou ysuwiwagouhoh"
          onChangeText={text => this.textInputTargetChanged(text)}
          editable={this.emptyTarget}
          value={this.state.wordTarget}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textinput: {
    marginLeft:5,
    marginRight:5,
    height:50,
    borderColor:'#000000',
    borderWidth:2,
    paddingLeft:5
  },
});
