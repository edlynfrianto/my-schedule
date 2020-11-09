import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import GetName from './GetName';

// App.js -> GetName.js -> Table.js
function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hai, {user.name}{'!'}
        <GetName name={user.name}/>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}

export default App;