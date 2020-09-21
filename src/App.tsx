import React, {Fragment} from 'react';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "./store/rootReducer"
import {PublicRoute, PrivateRoute} from "./components/Route/Route";
import { BrowserRouter, Routes } from 'react-router-dom';
import Login from "./components/Login/Login"
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';

const App = () => {
  const {authenticated} = useSelector((state : RootState) => state.auth);


  return (
    <Fragment>
      <BrowserRouter>
        <div className="App">
          
            <Routes>
            {/* <PrivateRoute path="/:id/" authenticated={authenticated} component={Home}></PrivateRoute> */}
              <PrivateRoute path="/" authenticated={authenticated} component={Home}></PrivateRoute>
              <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
              <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
            </Routes>

        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
