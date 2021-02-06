import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from './Signin';
import Authenticated from './Authenticated';
import Signup from './Signup';
import NotFound from './NotFound';
import { AuthProvider } from '../Auth';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Authenticated} />

          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
