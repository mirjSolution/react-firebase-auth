import { useHistory } from 'react-router-dom';

import { Button } from 'react-bootstrap';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className='text-center mt-5'>
      <h1>Sorry</h1>
      <p>That page cannot be found</p>
      <p>
        <Button
          onClick={() => {
            history.push('/');
          }}
          variant='primary'
        >
          Back to Homepage
        </Button>
      </p>
    </div>
  );
};

export default NotFound;
