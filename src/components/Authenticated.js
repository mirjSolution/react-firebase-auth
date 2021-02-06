import { useState } from 'react';

import { Container, Card, Navbar, Form, Button } from 'react-bootstrap';
import { app } from '../firebase';

const Authenticated = () => {
  const [image, setImage] = useState(null);
  let userName = app.auth().currentUser.email;
  let storage = app.storage();
  let storageRef = storage.ref();
  storageRef
    .child(userName)
    .getDownloadURL()
    .then(function (url) {
      setImage(url);
    });

  return (
    <>
      <Navbar bg='dark' variant='dark' className='justify-content-between'>
        <Navbar.Brand>HOME</Navbar.Brand>

        <Form inline>
          <Button onClick={() => app.auth().signOut()}>Logout</Button>
        </Form>
      </Navbar>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <Card style={{ width: '30rem' }}>
          <Card.Img variant='top' src={image} />
          <Card.Body>
            <Card.Title className='text-center'>{userName}</Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Authenticated;
