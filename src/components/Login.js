import { useState, useRef, useContext } from 'react';
import UserContext from "../utils/UserContext";
import { CROSS_ICON } from '../utils/constants';

const Login = () => {
    
    const { isloginSection, setisloginSection} = useContext(UserContext);
    
    const [isLoginForm, setisLoginForm] = useState(true);
    const phonenumber = useRef(null);
    const username = useRef(null);
    const email = useRef(null);
    
    return (
        
        <div className="login">

            <img className="cross" src={CROSS_ICON} onClick={() => {setisloginSection(!isloginSection)}}></img>

            <div className="createAccount">
                <h1>{isLoginForm? "Login" : "Sign up"}</h1>
                <span>or</span>
                <span className="createAccountClick" onClick={() => setisLoginForm(!isLoginForm)}>{isLoginForm? "create an account" : "login to your account"}</span>
            </div>
            
            <input 
                ref={phonenumber}
                type="tel" 
                placeholder="Phone number">
            </input>

            {!isLoginForm && (

                <div>

                    <input 
                        ref={username}
                        type="text" 
                        placeholder="Name">
                    </input>

                    <input 
                        ref={email}
                        type="text" 
                        placeholder="Email">
                    </input>

                    <input 
                        ref={email}
                        type="text" 
                        placeholder="Email">
                    </input>

                    <div className="referral">Have a referral code?</div>

                </div>
            )}

            <div className="loginBut">
                {isLoginForm? "Login" : "Continue"}
            </div>

            <div className="disclaimer">
                <span>By clicking on Login, I accept the</span>
                <span className="TCs">Terms & Conditions & Privacy Policy</span>
            </div>

        </div>
    )
}

export default Login;