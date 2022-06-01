import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Glossary/Header'
import Main from './Components/Glossary/Main'
import Footer from './Components/Glossary/Footer'
import OneTerm from './Components/OneTerm/OneTerm'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const API_SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTerm: '',
      allTerms: []
    }
  }

  // GET ALL
  getTerms = async () => {
    try {
      const response = await axios.get(`${API_SERVER}/terms`)
      const terms = response.data;
      this.setState({
        allTerms: terms
      })
    } catch (error) {
      console.log('There has been an error');
    }
  }

  // GET ONE
  getOneTerm = async (id) => {
    try {
      const response = await axios.get(`${API_SERVER}/terms/${id}`);
      const term = response.data; // revisit to make sure this is correct
      this.setState({
        currentTerm: term
      })
    } catch (error) {
      console.log('There has been an error');
    }
  }

  // POST
  addTerm = async (term) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        const config = this.getConfig('post');
        const newTerm = await axios(config);
        this.setState({
          allTerms: [...this.state.allTerms, newTerm.data]
        })
      } catch (error) {
        console.log('There has been an error');
      }
    }
  }

  // DELETE
  deleteTerm = async (id) => {
    try {
      const config = this.getConfig('delete', id)
      await axios(config);
      let updatedTermsList = this.state.terms.filter(term => term._id !== id)
      this.setState({
        allTerms: updatedTermsList
      })
    } catch (error) {
      console.log('There has been an error');
    }
  }


  // PUT
  updateTerm = async (termToUpdate) => {
    try {
      const updatedTerm = await axios.post(`${API_SERVER}/terms/${termToUpdate._id}`, termToUpdate);

      let newTermsArray = this.state.allTerms.map(existingTerm => {
        return existingTerm._id === termToUpdate._id
          ? updatedTerm.data
          : existingTerm
      });
      this.setState({
        allTerms: newTermsArray
      })
    } catch (error) {
      console.log('There has been an error');
    }
  }

  async getConfig(method, id) {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    const config = {
      method: method,
      baseURL: process.env.REACT_APP_SERVER,
      url: `/terms/${id}`,
      header: {
        "Authorization": `Bearer ${jwt}`
      }
    }
    return config
  }

  updateViewedTerm = (viewedTerm) => {
    console.log(viewedTerm);
    this.setState({
      currentTerm: viewedTerm
    })

  }

  async componentDidMount() {
    await this.getTerms();
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              exact path="/"
              element=
              {
                <>
                  <Header />
                  <Main
                    allTerms={this.state.allTerms}
                    addTerm={this.addTerm}
                    currentTerm={this.state.currentTerm}
                    updateTerm={this.updateTerm}
                    deleteTerm={this.deleteTerm}
                    updateViewedTerm={this.updateViewedTerm}
                  />
                  <Footer />
                </>
              }
            >
            </Route>
            <Route
              path="/oneTerm"
              element=
              {
                <OneTerm
                  currentTerm={this.state.currentTerm}
                  updateTerm={this.updateTerm}
                  deleteTerm={this.deleteTerm}
                />
              }
            >
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
