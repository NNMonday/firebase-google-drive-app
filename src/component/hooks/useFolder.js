import { useEffect, useReducer } from "react";
import { database } from "../../firebase";
import { doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ACTIONS = {
    SELECT_FOLDER: 'select folder',
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders"
}

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] }
function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFile: [],
                childFolders: [],
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            // console.log(payload.childFolders);
            return {
                ...state,
                childFolders: payload.childFolders
            }
        default:
            return state
    }
}

export default function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFile: []
    });

    const { currentUser } = useAuth();

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: { folderId, folder }
        })
    }, [folderId, folder]);

    async function getMyDoc(folderId) {
        await getDoc(doc(database.folders, folderId))
            .then(doc => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: database.myDoc(doc) }
                });
            })
            .catch(err => {
                console.log(err.message);
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: ROOT_FOLDER }
                });
            })
    }

    useEffect(() => {
        if (folderId === null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            });
        }
        getMyDoc(folderId)

    }, [folderId])

    // console.log(currentUser.uid);

    const queryRef = (folderId, currentUser) => query(
        database.folders,
        where('parentId', '==', folderId),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt')
    )

    useEffect(() => {
        async function myQuery(folderId, currentUser) {
            await getDocs(queryRef(folderId, currentUser))
        }

        myQuery(folderId, currentUser);
        return onSnapshot(queryRef(folderId, currentUser), snapshot => {
            // console.log(snapshot.docs.map(database.myDoc));
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: snapshot.docs.map(database.myDoc) }
            })
            
        })

    }, [folderId, currentUser])

    // console.log(state.childFolders);

    return state;
}
