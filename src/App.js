import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Glossary/Header'
import AboutUs from './Components/AboutUs/AboutUs';
import Main from './Components/Glossary/Main'
import OneTerm from './Components/OneTerm/OneTerm'
import { withAuth0 } from "@auth0/auth0-react"
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
      allTerms: [],
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

  // POST
  addTerm = async (term) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        const config = await this.getConfig('post', undefined, term);
        const newTerm = await axios(config);
        this.setState({
          allTerms: [...this.state.allTerms, newTerm.data]
        });
      } catch (error) {
        if (error.response.status === 400 && (error.response.data.term_name_errors || error.response.data.definition_errors)) {
          if (error.response.data.term_name_errors && error.response.data.definition_errors) {
            this.askUserToOverride(term, true, error.response.data.term_name_errors, error.response.data.definition_errors)
          } else if (error.response.data.term_name_errors) {
            this.askUserToOverride(term, true, error.response.data.term_name_errors)
          } else {
            this.askUserToOverride(term, true, error.response.data.definition_errors)
          }
        } else {
          console.log('There has been an error ', error);
        }
      }
    } else {
      console.log('Please login for this functionality');
    }
  }

  askUserToOverride(term, add, arr1, arr2) {
    let firstIteration = true;
    let arr1Misspells = arr1.reduce((misspellingList, word) => {
      if (firstIteration) {
        firstIteration = false;
        return word.word;
      } else {
        return `${misspellingList}, ${word.word}`;
      }
    }, '');
    firstIteration = true;
    let arr2Misspells;
    if (arr2) {
      arr2Misspells = arr2.reduce((misspellingList, word) => {
        if (firstIteration) {
          firstIteration = false;
          return word.word;
        } else {
          return `${misspellingList}, ${word.word}`;
        }
      }, '');
    }
    let confirmationString;
    if (arr2) {
      confirmationString = `You spelled the following words incorrectly\n\n${arr1Misspells}, ${arr2Misspells}\n\n Press OK if you would like to override and submit as is`
    } else {
      confirmationString = `You spelled the following words incorrectly\n\n${arr1Misspells}\n\n Press OK if you would like to override and submit as is`
    }
    let user_response = window.confirm(confirmationString);
    if (user_response) {
      term.override = true;
      if (add) {
        this.addTerm(term);
      } else {
        return this.updateTerm(term);
      }
    }
    return false;
  }

  // DELETE
  deleteTerm = async (id) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        const config = await this.getConfig('delete', id)
        await axios(config);
        let updatedTermsList = this.state.allTerms.filter(term => term._id !== id)
        this.setState({
          allTerms: updatedTermsList
        })
      } catch (error) {
        console.log('There has been an error', error);
      }
    } else {
      console.log('Please login for this functionality');
    }
  }

  // PUT
  updateTerm = async (termToUpdate) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        const config = await this.getConfig('put', termToUpdate._id, termToUpdate);
        const updatedTerm = await axios(config);
        let newTermsArray = this.state.allTerms.map(existingTerm => {
          return (existingTerm._id === termToUpdate._id
            ? updatedTerm.data
            : existingTerm
          )
        });
        this.setState({
          allTerms: newTermsArray,
        })
        return true
      } catch (error) {
        console.log('error ', error);
        if (error.response.status === 400 && (error.response.data.term_name_errors || error.response.data.definition_errors)) {
          if (error.response.data.term_name_errors && error.response.data.definition_errors) {
            return this.askUserToOverride(termToUpdate, false, error.response.data.term_name_errors, error.response.data.definition_errors)
          } else if (error.response.data.term_name_errors) {
            return this.askUserToOverride(termToUpdate, false, error.response.data.term_name_errors)
          } else {
            return this.askUserToOverride(termToUpdate, false, error.response.data.definition_errors)
          }
        } else {
          console.log('There has been an error ', error);
        }
      }
    } else {
      console.log('Please login for this functionality');
    }
    return false;
  }

  async getConfig(method, id, body) {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    const config = {
      method: method,
      baseURL: process.env.REACT_APP_SERVER,
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    }
    if (body) {
      config.data = body;
    }
    if (id !== undefined) {
      config.url = `/terms/${id}`;
    } else {
      config.url = '/terms';
    }
    return config;
  }

  componentDidMount() {
    this.getTerms();
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
                    updateTerm={this.updateTerm}
                    deleteTerm={this.deleteTerm}
                  />
                </>
              }
            >
            </Route>
            <Route
              path="/aboutUs"
              element={<AboutUs />}
            >
            </Route>
            <Route
              path={"/:termId"}
              element=
              {
                <OneTerm
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

export default withAuth0(App);
