import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"


const UpdateModal = (props) => {

  const { user } = useAuth0();
  const handleTermSubmit = async (e) => {
    e.preventDefault();
    let termToUpdate = {
      term_name: e.target.term_name.value,
      definition: e.target.definition.value,
      documentation_url: e.target.documentation_url.value,
      user_email: user.email,
      _id: props.currentTerm._id,
      __v: props.currentTerm.__v
    }
    let success = await props.updateTerm(termToUpdate);
    if (success) {
      props.closeModalHandler();
      props.updateViewedTerm(termToUpdate);
      navigate(`/${e.target.term_name.value.replace(/ /g, '%20')}`);
    }
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
              <Form.Control type="text" id="term_name" defaultValue={props.currentTerm.term_name} required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Definition</Form.Label>
              <Form.Control type="text" id="definition" defaultValue={props.currentTerm.definition} required/>
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