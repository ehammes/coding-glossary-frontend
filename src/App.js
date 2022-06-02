import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './Components/Glossary/Header'
import Main from './Components/Glossary/Main'
import Footer from './Components/Glossary/Footer'
import OneTerm from './Components/OneTerm/OneTerm'
import { withAuth0 } from "@auth0/auth0-react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AboutUs from './Components/AboutUs/AboutUs';

const API_SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTerm: '',
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
        const config = await this.getConfig('post', undefined, term);
        const newTerm = await axios(config);
        console.log(newTerm);
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
        this.updateTerm(term);
      }
    }
  }

  // DELETE
  deleteTerm = async (id) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        const config = await this.getConfig('delete', id)
        await axios(config);
        let updatedTermsList = this.state.allTerms.filter(term => term._id !== id)
        console.log('Term deleted');
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
        console.log('updatedTerm ', updatedTerm.data);
        console.log('termToUpdate', termToUpdate);
        let newTermsArray = this.state.allTerms.map(existingTerm => {
          return (existingTerm._id === termToUpdate._id
            ? updatedTerm.data
            : existingTerm
          )
        });
        this.setState({
          allTerms: newTermsArray,
          currentTerm: termToUpdate
        })
      } catch (error) {
        console.log('error ', error);
        if (error.response.status === 400 && (error.response.data.term_name_errors || error.response.data.definition_errors)) {
          if (error.response.data.term_name_errors && error.response.data.definition_errors) {
            this.askUserToOverride(termToUpdate, false, error.response.data.term_name_errors, error.response.data.definition_errors)
          } else if (error.response.data.term_name_errors) {
            this.askUserToOverride(termToUpdate, false, error.response.data.term_name_errors)
          } else {
            this.askUserToOverride(termToUpdate, false, error.response.data.definition_errors)
          }
        } else {
          console.log('There has been an error ', error);
        }
      }
    } else {
      console.log('Please login for this functionality');
    }
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

  updateViewedTerm = (viewedTerm) => {
    this.setState({
      currentTerm: viewedTerm
    })

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
            <Route
              path="/aboutUs"
              element={<AboutUs />}
            >
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default withAuth0(App);
