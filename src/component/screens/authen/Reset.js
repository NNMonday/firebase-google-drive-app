import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import AuthenLayout from './AuthenLayout'

export default function Reset() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value)
      alert("Check your mail for further instruction")
      navigate('/login');
    } catch (error) { 
      setError('Failed to reset password');
      console.log(error.message);
    }
    setLoading(false);
  }

  return (
    <AuthenLayout>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Button className='w-100' disabled={loading} style={{ marginTop: '10px' }} type="submit">Reset Password</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to={"/login"}>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to={'/register'}>Register</Link>
      </div>
    </AuthenLayout>
  )
}