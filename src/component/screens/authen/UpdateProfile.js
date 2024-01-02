import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5';
import AuthenLayout from './AuthenLayout'

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, changeEmail, changePass } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailRef.current.value) {
      return setError('Email is required');
    } else if (passwordRef.current.value.length !== 0) {
      if (passwordRef.current.value.length <= 8) {
        return setError('Password must be longer than 8 characters')
      } else if (!passwordRegex.test(passwordRef.current.value)) {
        return setError('Password must contain at least 1 letter, 1 number, 1 special character');
      } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Password doesnt match');
      } else if (md5(passwordRef.current.value) === currentUser.pass) {
        return setError('New password cannot be similar to the old password');
      } else if (passwordRef.current.value === emailRef.current.value) {
        return setError('Password cannot be similar to email');
      }
    }

    // console.log(passwordRef.current.value);
    // console.log(passwordRef.current.value.length);
    try {
      setError("");
      setLoading(true);
      if (currentUser.email !== emailRef.current.value) {
        await changeEmail(emailRef.current.value);
      }

      if (currentUser.pass !== passwordRef.current.value && passwordRef.current.value.length !== 0) {
        await changePass(passwordRef.current.value)
      }

      navigate('/profile');
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        return setError("Email already in use");
      }
      setError('Failed to update profile');
      console.log(error.message);
    }
    setLoading(false);
  }

  return (
    <AuthenLayout>
      <Card style={{ padding: '10px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Register</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' defaultValue={""} ref={passwordRef} placeholder='Leave blank to keep the same' />
            </Form.Group>
            <Form.Group id='passwordConfirm'>
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
            </Form.Group>
            <Button className='w-100' disabled={loading} style={{ marginTop: '10px' }} type="submit">Update Profile</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to={'/profile'}>Cancel</Link>
      </div>
    </AuthenLayout>
  )
}
