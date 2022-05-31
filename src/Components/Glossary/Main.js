import React from 'react';
import './Main.css';
// import AddModal from './AddModal'
import OneTerm from '../OneTerm/OneTerm'
import { ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {
  Routes,
  Route,
} from "react-router-dom";

class Main extends React.Component {


  // addTermClick

  render() {
    let termItem = this.props.allTerms.map((term) =>
      <ListGroup.Item
        key={term._id}
      >
        {term.term_name}
      </ListGroup.Item>
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
          <Link
            to="/oneTerm"
          >
            {termItem}
          </Link>
        </ListGroup>
        <Routes>
          <Route
            path="/oneTerm"
            element=
            {
              <OneTerm
                currentTerm={this.props.currentTerm}
                updateTerm={this.props.updateTerm}
                deleteTerm={this.props.deleteTerm}
              />
            }
          >
          </Route>
        </Routes>
        <OneTerm
          term={this.props.currentTerm}
          updateTerm={this.props.updateTerm}
          deleteTerm={this.props.deleteTerm}
        />
      </>
    );
  }
}

export default Main;