import React from 'react';
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
        <Header />
        <section className="term">
          <h1 className="term-title">{this.props.currentTerm.term_name}</h1>
          <hr/>
          <p className="supporting-text">{this.props.currentTerm.definition}</p>
          <p className="supporting-text">{this.props.currentTerm.documentation_url}</p>
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
                currentTerm={this.props.currentTerm}
                updateTerm={this.props.updateTerm}
                deleteTerm={this.props.deleteTerm}
                closeModalHandler={this.closeModalHandler}
              />
            </>
          }
        </section>
        <section className="view-button">
          <Link to="/">
            <Button type="button">
              View All Terms
            </Button>
          </Link>
        </section>
      </>
    );
  }
}

export default withAuth0(OneTerm);