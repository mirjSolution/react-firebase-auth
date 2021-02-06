import { useCallback, useState } from 'react';

import { useHistory, Link } from 'react-router-dom';

import { app } from '../firebase';

import { Form, Button, Card, Image, Container, Alert } from 'react-bootstrap';

const Signup = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditPicture = (e) => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, confirmPassword } = event.target.elements;
      if (password.value !== confirmPassword.value) {
        return setError('Passwords not match');
      }
      if (image === null) {
        return setError('Please select image');
      }

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

        //   Upload image
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(email.value);
        fileRef.put(image).then(() => {
          console.log('Uploaded file', image.name);
        });

        setError('');
        history.push('/');
      } catch (error) {
        let err = error.message;
        setError(err);
      }
    },
    [history, image]
  );

  return (
    <>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {error !== '' && (
                <Alert className='w-100' variant='danger'>
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSignUp}>
                <div className='w-100 text-center'>
                  <Image
                    src={
                      image === null
                        ? 'https://via.placeholder.com/150'
                        : URL.createObjectURL(image)
                    }
                    style={{ width: '150px', height: '150px' }}
                    roundedCircle
                  />
                  <input
                    type='file'
                    id='imageInput'
                    hidden='hidden'
                    onChange={handleImageChange}
                  />
                  <Button
                    className='w-100 mt-2 mb-2'
                    onClick={handleEditPicture}
                  >
                    Select Image
                  </Button>
                </div>

                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' required />
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control name='password' type='password' required />
                </Form.Group>
                <Form.Group id='password-confirm'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name='confirmPassword'
                    type='password'
                    required
                  />
                </Form.Group>
                <Button className='w-100' type='submit'>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/'>Sign In</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
