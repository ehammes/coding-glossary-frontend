import React from 'react';
import './Main.css';
// import AddModal from './AddModal'
// import OneTerm from '../OneTerm/OneTerm'
import Term from './Term'
import { ListGroup, Button } from 'react-bootstrap'

class Main extends React.Component {


  // addTermClick

  render() {
    let termItem = this.props.allTerms.map((term) =>
      <Term
        key={term._id}
        term={term}
        updateViewedTerm={this.props.updateViewedTerm}
      />
    )
    console.log(termItem);

    return (
      <>
        <h1>Glossary of Terms Code301</h1>
        <Button
          type="button"
          onClick={this.addTermClick}
        >
          Add New Term
        </Button>
        <ListGroup>
          {termItem}
        </ListGroup>
      </>
    );
  }
}

export default Main;