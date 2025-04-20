import './App.css'

import AppHeader from "@components/AppHeader.jsx";
import FooterOne from "@components/FooterOne.jsx";
import FooterTwo from "@components/FooterTwo.jsx";
import {useState} from "react";
import LoginForm from "@components/LoginForm.jsx";
import React from 'react';
import IPInfo from 'ip-info-react';


function App() {
    const [loginTitle, setLoginTitle] = useState('Academica');

    return (
        <>
            <AppHeader/>

            <div className="off-canvas-wrap">
                <div style={{height: '33px'}}></div>

                {/*<LoginContainer/>*/}
                <div className="login-container">
                    <div className="row login-header-row">
                        <div
                            className="large-9 medium-11 small-12 small-centered medium-centered large-centered columns login-header">
                            <span className="es-destination-name">{loginTitle}</span> Login
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="large-9 medium-11 small-12 small-centered medium-centered large-centered columns login-content">
                            <div className="row">
                                <div className="large-12 large-centered login-overview">
                                    <p>You have reached a page that requires authentication, please enter your Wayne
                                        State <a href="https://tech.wayne.edu/kb/accessid-accounts/accessid"
                                                 target="_blank">AccessID</a> and password.</p>
                                </div>
                            </div>
                            <div className="row">
                                <LoginForm loginTitle={loginTitle} setLoginTitle={setLoginTitle}/>
                                <div className="large-6 medium-12 small-12 large-offset-1 columns end login-infobox">
                                    <ul>
                                        <li><a href="https://webmail.wayne.edu/am/pw/forgot" target="_blank">Forgot your
                                            AccessID or password?</a></li>
                                        <li><a href="https://tech.wayne.edu/kb/accessid-accounts/accessid"
                                               target="_blank">Don't
                                            have an AccessID or password?</a></li>
                                        <li><a href="https://tech.wayne.edu/" target="_blank">Need help with other WSU
                                            technologies?</a></li>
                                    </ul>
                                    <p>By using this service you agree to adhere to WSU computing <a
                                        href="http://wayne.edu/policies/" target="_blank">policies and guidelines</a>.
                                    </p>

                                    <div className="panel radius medium-11" style={{"display": "none"}}
                                         id="forgot-your-password">
                                        <a href="https://webmail.wayne.edu/am/pw/forgot">Forgot your password?</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row login-footer-row">
                </div>
            </div>

            <FooterOne/>
            <FooterTwo/>
        </>
    )
}

export default App