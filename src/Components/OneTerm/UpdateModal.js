import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

class UpdateModal extends React.Component {

  handleTermSubmit = (e) => {
    e.preventDefault();
    let termToUpdate = {
      term_name: e.target.term_name.value || this.props.currentTerm.term_name,
      definition: e.target.definition.value || this.props.currentTerm.definition,
      documentation_url: e.target.documentation_url.value || this.props.currentTerm.documentation_url,
      _id: this.props.currentTerm._id,
      __v: this.props.currentTerm.__v
    }
    this.props.updateTerm(termToUpdate);
    this.props.closeModalHandler();
  }

  deleteTermHandler = (e) => {
    e.preventDefault();
    let id = this.props.currentTerm._id;
    this.props.deleteTerm(id);
  } 

  render() {

    return (
      <>
        <Modal
          show={this.props.isModalDisplaying}
          onHide={this.props.closeModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Term</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleTermSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Term Name</Form.Label>
                <Form.Control type="text" id="term_name" defaultValue={this.props.currentTerm.term_name} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Definition</Form.Label>
                <Form.Control type="text" id="definition" defaultValue={this.props.currentTerm.definition} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Resource Link</Form.Label>
                <Form.Control type="text" id="documentation_url" defaultValue={this.props.currentTerm.documentation_url} />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit"
              >
                Submit
              </Button>
              <Button 
                variant="danger"
                onClick={this.deleteTermHandler}
              >
                Delete
              </Button>
            </Form>
            <Modal.Footer>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UpdateModal;