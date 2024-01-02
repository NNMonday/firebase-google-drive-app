import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import AuthenLayout from './AuthenLayout'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailRef.current.value) {
      return setError('Email is required');
    } else if (!passwordRef.current.value) {
      return setError('Password is required');
    } else if (passwordRef.current.value.length <= 8) {
      return setError('Password must be longer than 8 characters')
    } else if (!passwordRegex.test(passwordRef.current.value)) {
      return setError('Password must contain at least 1 letter, 1 number, 1 special character');
    } else if (passwordRef.current.value === emailRef.current.value) {
      return setError('Password cannot be similar to email');
    }
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/drive');
    } catch (error) {

      setError('Email or Password wrong');
      console.log(error.message);
    }
    setLoading(false);
  }

  return (
    <AuthenLayout>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button className='w-100' disabled={loading} style={{ marginTop: '10px' }} type="submit">Log In</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to={"/reset"}>Forgot your password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to={'/register'}>Register</Link>
      </div>
    </AuthenLayout>
  )
}