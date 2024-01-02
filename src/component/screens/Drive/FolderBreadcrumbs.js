import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { useNavigate } from 'react-router-dom'

export default function FolderBreadcrumbs({ currentFolder }) {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) path = [...path, ...currentFolder.path]
    const navigate = useNavigate();
    function handleClick(folder, index) {
        localStorage.setItem('folder', JSON.stringify({ ...folder, path: path.slice(1, index) }));
        navigate(folder.id ? `/folder/${folder.id}` : '/drive');
    }
    return (
        <Breadcrumb className='flex-grow-1'
            listProps={{ className: "bg-white pl-0 m-0" }}>
            {path.map((folder, index) => {
                folder = { ...folder, path: path.slice(1, index) }
                // console.log("Breadcrumb: " + folder);
                return (
                    <Breadcrumb.Item key={index}
                        className='text-truncate d-inline-block'
                        style={{ maxWidth: '150px' }}
                        onClick={() => { handleClick(folder, index) }}
                    >
                        {folder.name}
                    </Breadcrumb.Item>
                )
            })}
            {currentFolder && (
                <Breadcrumb.Item className='text-truncate d-inline-block'
                    style={{ maxWidth: '200px' }}
                    active>
                    {currentFolder.name}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}
