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
      />
    )

    return (
      <div className="main-div">
        <section className="header">
          <h1 className="main-heading">Code Fellows Glossary</h1>
          {this.props.auth0.isAuthenticated &&
            <Button
              className="add-button"
              type="button"
              onClick={this.addTermModalHandler}
            >
              Add New Term
            </Button>
          }
        </section>
        <hr className="hr"/>
        <ListGroup
          className="list-group"
        >
          {termItem}
        </ListGroup>
        {this.props.auth0.isAuthenticated &&
          <AddModal
            isAddTermModalDisplaying={this.state.isAddTermModalDisplaying}
            closeAddTermModalHandler={this.closeAddTermModalHandler}
            addTerm={this.props.addTerm}
          />
        }
      </div>
    );
  }
}

export default withAuth0(Main);