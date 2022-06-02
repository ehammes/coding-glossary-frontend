import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react"
import { Button } from 'react-bootstrap'
import UpdateModal from './UpdateModal';

class OneTerm extends React.Component {
  constructor(props) {
    super(props);
    this.getOneTerm(window.location.href.split('/')[3]);
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
          <ul>
            <li>key={this.state.currentTerm._id}</li>
            <li>term_name={this.state.currentTerm.term_name}</li>
            <li>definition={this.state.currentTerm.definition}</li>
            <li>user_email={this.state.currentTerm.user_email}</li>
            <li>documentation_url={this.state.currentTerm.docum}</li>
          </ul>
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
                deleteTerm={this.props.deleteTerm}
                closeModalHandler={this.closeModalHandler}
              />
            </>
          }
        </>
      );
    } else {
      <h3>Term not found</h3>
    }
  }
}

export default withAuth0(OneTerm);