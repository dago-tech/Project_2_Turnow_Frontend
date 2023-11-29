import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar la lógica de autenticación, como enviar una solicitud al servidor

    // Redirigir al usuario después del inicio de sesión exitoso
    history('/users/'); // Reemplaza '/dashboard' con la ruta a la que deseas redirigir al usuario
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;