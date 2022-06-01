import React from 'react';

class OneTerm extends React.Component {

  render() {
    return (
      <ul>
        <li>key={this.props.currentTerm._id}</li>
        <li>term_name={this.props.currentTerm.term_name}</li>
        <li>definition={this.props.currentTerm.definition}</li>
        <li>user_email={this.props.currentTerm.user_email}</li>
        {/* <li>documentation_url={this.props.term.docum}</li> */}
      </ul>
    );
  }
}

export default OneTerm;