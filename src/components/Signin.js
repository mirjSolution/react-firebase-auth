import { useState, useCallback, useContext } from 'react';

import { Link, Redirect, useHistory } from 'react-router-dom';

import { app } from '../firebase';
import { AuthContext } from '../Auth.js';

import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

const Signin = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        setError('');
        history.push('/');
      } catch (error) {
        let err = error.message;
        setError(err);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign In</h2>
              {error !== '' && (
                <Alert className='w-100' variant='danger'>
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleLogin}>
                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' required />
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' name='password' required />
                </Form.Group>

                <Button className='w-100' type='submit'>
                  Sign in
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signin;
