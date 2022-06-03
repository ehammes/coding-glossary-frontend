import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UpdateModal from './UpdateModal';
import Header from '../Glossary/Header'
import './OneTerm.css';

class OneTerm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalDisplaying: false,
    }
  }

  getOneTerm = async (term_name) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/terms?term_name=${term_name}`);
      const term = response.data; // revisit to make sure this is correct
      this.setState({
        currentTerm: term[0]
      })
    } catch (error) {
      console.log('There has been an error');
    }
  };

  componentDidMount() {
    this.getOneTerm(window.location.href.split('/')[3]);
  }

  updateViewedTerm = (term) => {
    this.setState({
      currentTerm: term,
    });
  }

  openModalHandler = () => {
    this.setState({
      isModalDisplaying: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isModalDisplaying: false,
    });
  };

  render() {
    if (this.state.currentTerm) {
      return (
        <>
          <Header />
          <section className="term">
            <h1 className="term-title">{this.state.currentTerm.term_name}</h1>
            <hr />
            <p className="supporting-text">{this.state.currentTerm.definition}</p>
            <p className="supporting-text">{this.state.currentTerm.documentation_url}</p>
          </section>
          <section className="update-button">
            {this.props.auth0.isAuthenticated &&
              <>
                <Button
                  type="button"
                  onClick={this.openModalHandler}
                >
                  Update Term
                </Button>
                <UpdateModal
                  isModalDisplaying={this.state.isModalDisplaying}
                  currentTerm={this.state.currentTerm}
                  updateTerm={this.props.updateTerm}
                  updateViewedTerm={this.updateViewedTerm}
                  deleteTerm={this.props.deleteTerm}
                  closeModalHandler={this.closeModalHandler}
                />
              </>
            }
          </section>
          <section className="view-button">
            <Link to="/">
              <Button 
                type="button" 
                variant="outline-primary"
              >
                View All Terms
              </Button>
            </Link>
          </section>
        </>
      );
    } else {
      <h3>Term not found</h3>
    }
  }
}

export default withAuth0(OneTerm);