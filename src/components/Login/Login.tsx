import React, { ReactElement, useState } from 'react'
import './Login.css'
import Loading from "../Loading/Loading.component";
import {Link} from "react-router-dom";
import { RootState } from '../../store/rootReducer';
import {useSelector, useDispatch} from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';

interface Props {
    
}

function Login({}: Props): ReactElement {
    const [user, setUser] = useState<{email: string, password: string}>({
        email: "",
        password: ""
    })
    const {loading} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(user));
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="simple-login-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12 form-group">
                    <input type="email" className="form-control" name="email" onChange={handleChange} placeholder="Email" required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 form-group">
                        <input type="password" placeholder="Enter your Password" name="password" onChange={handleChange} className="form-control" required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 form-group">
                        {
                            loading
                            ?
                            <button type="submit" className="btn btn-block btn-login">
                                <Loading type="spinner-border text-light"/>
                            </button>
                            :
                            <button type="submit" className="btn btn-block btn-login">Sign In</button>
                        }
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="col-md-12">
                    OR <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
