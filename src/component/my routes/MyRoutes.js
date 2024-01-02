import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from '../context/AuthContext';
import Login from "../screens/authen/Login";
import Register from "../screens/authen/Register";
import Reset from "../screens/authen/Reset";
import Profile from "../screens/authen/Profile.js";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../screens/authen/UpdateProfile";
import Drive from "../screens/Drive/Drive";

export default function MyRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/reset' element={<Reset />} />
                    <Route path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }>
                    </Route>
                    <Route path="/drive"
                        element={
                            <PrivateRoute>
                                <Drive />
                            </PrivateRoute>
                        }>
                    </Route>
                    <Route path="/update-profile"
                        element={
                            <PrivateRoute>
                                <UpdateProfile />
                            </PrivateRoute>
                        }>
                    </Route>
                    <Route path="/folder/:folderId"
                        element={
                            <PrivateRoute>
                                <Drive />
                            </PrivateRoute>
                        }>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
