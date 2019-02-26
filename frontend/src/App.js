import React, { Component } from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap'
import axios from 'axios'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.emptySource = false
    this.emptyTarget = false
    this.state = {
      wordSource: "",
      wordTarget: "",
      dico: []
    }
  }

  handleSubmit(item) {
    axios
      .post("http://localhost:8000/api/words/", item)
      .then(res => this.loadDico())
  }

  buildDico() {
    const list = []
    for (var i=0;i<list.length;i++) {
      this.handleSubmit(list[i])
    }
  }

  componentDidMount() {
    this.loadDico()
  }

  loadDico() {
    axios
      .get("http://localhost:8000/api/words/")
      .then(res => this.setState({dico: res.data}))
      .catch(err => console.log(err))
  }

  reset() {
    this.emptySource = false
    this.emptyTarget = false
    this.setState({wordSource: "", wordTarget: ""})
  }

  textInputSourceChanged(text) {
    this.emptyTarget = true
    this.setState({wordSource: text.target.value})
  }

  textInputTargetChanged(text) {
    this.emptySource = true
    this.setState({wordTarget: text.target.value})
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
    if(!found && this.emptyTarget) {
      this.setState({wordTarget: "Pas du tout wagou"})
    }
    if(!found && this.emptySource) {
      this.setState({wordSource: "Pas du tout wagou"})
    }
    this.emptySource = false
    this.emptyTarget = false
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Wagou-Translator</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <Form>
                  <FormGroup>
                    <Label for="source">English</Label>
                    <Input
                      type="text"
                      name="source"
                      placeholder="English word"
                      onChange={text => this.textInputSourceChanged(text)}
                      value={this.state.wordSource}
                      readOnly={this.emptySource}
                    />
                </FormGroup>
                  <FormGroup>
                    <Label for="target">Wagou</Label>
                    <Input
                      type="text"
                      name="target"
                      placeholder="Wagou ysuwiwagouhoh"
                      onChange={text => this.textInputTargetChanged(text)}
                      value={this.state.wordTarget}
                      readOnly={this.emptyTarget}
                    />
                </FormGroup>
                  <FormGroup>
                    <Button color="danger" onClick={() => this.reset()}>Reset</Button>
                    <Button color="success" onClick={() => this.translate()}>Translate</Button>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default App;
