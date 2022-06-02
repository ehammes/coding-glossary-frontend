import React from 'react';
import { withAuth0 } from "@auth0/auth0-react"
import { Button } from 'react-bootstrap'
import UpdateModal from './UpdateModal';

class OneTerm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalDisplaying: false,
    }
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
    return (
      <>
        <ul>
          <li>key={this.props.currentTerm._id}</li>
          <li>term_name={this.props.currentTerm.term_name}</li>
          <li>definition={this.props.currentTerm.definition}</li>
          <li>user_email={this.props.currentTerm.user_email}</li>
          <li>documentation_url={this.props.currentTerm.docum}</li>
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
              currentTerm={this.props.currentTerm}
              updateTerm={this.props.updateTerm}
              deleteTerm={this.props.deleteTerm}
              closeModalHandler={this.closeModalHandler}
            />
          </>
        }
      </>
    );
  }
}

export default withAuth0(OneTerm);