import React from 'react';
import { withAuth0 } from "@auth0/auth0-react"
import './Main.css';
import AddModal from './AddModal'
import Term from './Term'
import { ListGroup, Button } from 'react-bootstrap'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddTermModalDisplaying: false
    }
  }

  addTermModalHandler = () => {
    this.setState({
      isAddTermModalDisplaying: true
    });
  };

  closeAddTermModalHandler = () => {
    this.setState({
      isAddTermModalDisplaying: false
    });
  };

  render() {
    let termItem = this.props.allTerms.map((term) =>
      <Term
        key={term._id}
        term={term}
        updateViewedTerm={this.props.updateViewedTerm}
      />
    )

    return (
      <>
        <h1>Glossary of Terms Code301</h1>
        {this.props.auth0.isAuthenticated &&
          <Button
            type="button"
            onClick={this.addTermModalHandler}
          >
            Add New Term
          </Button>
        }
        <ListGroup>
          {termItem}
        </ListGroup>
        {this.props.auth0.isAuthenticated &&
          <AddModal
            isAddTermModalDisplaying={this.state.isAddTermModalDisplaying}
            closeAddTermModalHandler={this.closeAddTermModalHandler}
            addTerm={this.props.addTerm}
          />
        }
      </>
    );
  }
}

export default withAuth0(Main);