import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'


const UpdateModal = (props) => {

  const handleTermSubmit = (e) => {
    e.preventDefault();
    let termToUpdate = {
      term_name: e.target.term_name.value || props.currentTerm.term_name,
      definition: e.target.definition.value || props.currentTerm.definition,
      documentation_url: e.target.documentation_url.value || props.currentTerm.documentation_url,
      _id: props.currentTerm._id,
      __v: props.currentTerm.__v
    }
    props.updateTerm(termToUpdate);
    props.closeModalHandler();
  }

  const navigate = useNavigate();

  const deleteTermHandler = (e) => {
    e.preventDefault();
    let id = props.currentTerm._id;
    props.deleteTerm(id);
    props.closeModalHandler();
    navigate('/');
  }

  return (
    <>
      <Modal
        show={props.isModalDisplaying}
        onHide={props.closeModalHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Term</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTermSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Term Name</Form.Label>
              <Form.Control type="text" id="term_name" defaultValue={props.currentTerm.term_name} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Definition</Form.Label>
              <Form.Control type="text" id="definition" defaultValue={props.currentTerm.definition} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resource Link</Form.Label>
              <Form.Control type="text" id="documentation_url" defaultValue={props.currentTerm.documentation_url} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="danger"
              onClick={deleteTermHandler}
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

export default UpdateModal;