import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function Folder({ folder }) {
  // console.log("Folder: " + folder);
  const navigate = useNavigate();
  function handleClick(){
    localStorage.setItem('folder', JSON.stringify(folder));
    navigate(`/folder/${folder.id}`);
  }
  return (
    <Button
      onClick={handleClick}
      className='text-truncate w-100'
      variant='outline-dark'>
      <FontAwesomeIcon icon={faFolder} style={{ marginRight: '6px' }} />
      {folder.name}
    </Button>
  )
}
