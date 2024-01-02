import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import AuthenLayout from './AuthenLayout'
import DriveNavBar from '../Drive/DriveNavBar';

export default function Profile() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setError('Failed to logout');
      console.log(error.message);
    }

  }
  return (
    <>
      <DriveNavBar />
      <AuthenLayout>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <strong>Email: </strong> {currentUser.email}
            <Link to={"/update-profile"} className='btn btn-primary w-100 mt-3'>Update Profile</Link>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          <Button variant='link' onClick={handleLogout}>Log Out</Button>
        </div>
      </AuthenLayout>
    </>
  )
}
