import React, { useEffect, Suspense } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import Home from './pages/Index';
import Dashboard from './pages/Dashboard';
import { setAuthToken } from './utilities/setAuthToken';
import jwt_decode from 'jwt-decode'
import { useUser } from './hooks/useUser';

export const App = () => {
    const { user: {isAuth}, setUser } = useUser();

    useEffect(() => {
        if (localStorage.token) {
            const { token } = localStorage;
            setAuthToken(token);
            const { firstName, id } = jwt_decode(token);
            setUser(() => ({ isAuth: true, firstName, id, token }));
        }
      }, [])
    
  return (
    <TransitionGroup>
        <CSSTransition timeout={500} classNames="fade">
            <Router>
                <NavBar/>
                <Suspense fallback={<div style={{minHeight: "90vh"}}/>}>
                <Switch>
                    <Route path="/login">
                        {isAuth ? <Redirect to="/dashboard"/> : <Auth auth="login"/>}
                    </Route> 
                    <Route path="/signup">
                        {isAuth ? <Redirect to="/dashboard"/> : <Auth auth="signup" />}
                    </Route>
                    <Route path="/logout">
                        {isAuth ? <Auth auth="logout"/> : <Redirect to="/Dashboard"/>}
                    </Route>
                    <Route path="/dashboard">
                        {isAuth ? <Dashboard/> : <Redirect to="/login"/> }
                    </Route>
                    <Route path="/">
                        {isAuth ? <Redirect to="/dashboard"/> : <Home/>}            
                    </Route>
                </Switch>
                </Suspense>
                <Suspense fallback={<div/>}><Footer/></Suspense>
            </Router>
        </CSSTransition>
    </TransitionGroup>
  );
}