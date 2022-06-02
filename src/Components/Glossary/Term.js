import React from 'react';
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class Term extends React.Component {

  render() {
    return (
      <Link
        onClick={() => { this.props.updateViewedTerm(this.props.term) }}
        to={`/${this.props.term.term_name}`}>
        <ListGroup.Item
          key={this.props.term._id}
          term_name={this.props.term.term_name}
          definition={this.props.term.definition}
          user_email={this.props.term.user_email}
          documentation_url={this.props.term.docum}
        >
          {this.props.term.term_name}
        </ListGroup.Item>
      </Link>
    )
  }
}

export default Term;