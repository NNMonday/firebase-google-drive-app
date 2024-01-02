import React, { useEffect, useState } from 'react'
import DriveNavBar from './DriveNavBar'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import useFolder from '../../hooks/useFolder'
import Folder from './Folder'
import { useParams } from 'react-router-dom'
import FolderBreadcrumbs from './FolderBreadcrumbs'

export default function Drive() {
  const { folderId } = useParams();
  const [currentFolder, setCurrentFolder] = useState({
    name: 'Root',
    id: null,
    path: []
  })
  useEffect(() => {
    setCurrentFolder(JSON.parse(localStorage.getItem('folder')))
  }, [])
  console.log(JSON.parse(localStorage.getItem('folder')));
  const { folder, childFolders } = useFolder(folderId, currentFolder.name === "Root" ? null : currentFolder);
  // const { folder, childFolders } = useFolder(folderId);
  return (
    <>
      <DriveNavBar />
      <Container fluid>
        <div className='d-flex align-items-center' style={{margin: '10px 0'}}>
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders && childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map((f) => (
              <div key={f.id} style={{ maxWidth: '250px' }} className='p-2'>
                <Folder folder={f} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
