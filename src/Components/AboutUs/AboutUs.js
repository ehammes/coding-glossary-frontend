import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from '../Glossary/Header'

class AboutUs extends React.Component {


  render() {
    return (
      <>
        <Header />
        <div>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Guy Farley</Card.Title>
                  <Card.Text>
                    I've wanted to pursue a career in software development for a few years now, and I'm excited to finally be making that transition. My professional background is in project and account management, primarily for retail marketing. Most recently I managed an account team in support of Unilever's marketing programs, where I turned the client's creative vision into an elevated in-store experience for their customer.
                  </Card.Text>
                </Col>
                <Col>
                  <img src="img/profile_square.jpg" alt="Guy's Profile" />
                </Col>
              </Row>
              <a class="btn btn-primary" href="https://www.linkedin.com/in/guyefarley/" target="_blank" rel="noreferrer" role="button">LinkedIn</a>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Elizabeth Hammes</Card.Title>
                  <Card.Text>
                    I've always had an interest in software development. I'm excited to further my education and pursue a role as a software developer. My professional experience includes roles in consulting, product management, and account management primarily focused on ecommerce within the tech industry. Most recently I worked in customer success / account management at an ecommerce SaaS start-up.
                  </Card.Text>
                </Col>
                <Col>
                  <img src="img/eh_profile.jpg" alt="Elizabeth's Profile" />
                </Col>
              </Row>
              <a class="btn btn-primary" href="https://www.linkedin.com/in/elizabethhammes/" target="_blank" rel="noreferrer" role="button">LinkedIn</a>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Brady Davenport</Card.Title>
                  <Card.Text>
                    I am gaining my first software development experiencing here at Code Fellows, but I have gained a breadth of other experience from careers in the U.S. Marine Corps and Emergency Medical Services.  I don’t like to settle for doing things “the way they’ve always been done”, and am enjoying learning these new skills that will help continue to be an innovator.
                  </Card.Text>
                </Col>
                <Col>
                  <img src="img/bd_profile.jpg" alt="Brady's Profile" />
                </Col>
              </Row>
              <a class="btn btn-primary" href="https://www.linkedin.com/in/bradydavenport/" target="_blank" rel="noreferrer" role="button">LinkedIn</a>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Benjamin Small</Card.Title>
                  <Card.Text>
                    In 2016 I graduated the UW Seattle with a BS in Industrial Engineering which included several computer science classes as electives and a software oriented internship. However, I spent the last five years as an Army Aviation Officer on Active Duty. I am excited to be returning to Software to fill out my burgeoning skillset and start my career as a Full Stack Software Developer as I am passionate about using code to solve real world problems.
                  </Card.Text>
                </Col>
                <Col>
                  <img src="img/bs_profile.jpg" alt="Ben's Profile" />
                </Col>
              </Row>
              <a class="btn btn-primary" href="https://www.linkedin.com/in/bjgsmall/" target="_blank" rel="noreferrer" role="button">LinkedIn</a>
            </Card.Body>
          </Card>
        </div>
      </>
    )
  }
}

export default AboutUs;
