import React from 'react';
import RegisterForm from './components/RegisterForm';
import { logo } from './assets/airbrbLogo';

function App () {
  return (
    <div className="App">
      {logo}
      <h1>Register Page</h1>
      <RegisterForm />
    </div>
  );
}

export default App;
