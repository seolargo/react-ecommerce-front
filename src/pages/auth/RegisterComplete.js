import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let dispatch = useDispatch();
    
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [history]) //This piece runs whenever the component mounts.
    
    //"Mounting" is when React "renders" the component for the first time and actually builds the initial DOM from those instructions
    //"Rendering" is any time a function component gets called (or a class-based render method gets called) which returns a set of instructions for creating DOM.
    //A "re-render" is when React calls the function component again to get a new set of instructions on an already mounted component.

    const handleSubmit = async (e) => {
        e.preventDefault(); //in order to prevent the browser from reloading.
        //If you don't have this, when the button is clicked, the form element is submitted, the browser will reload the page by default.
        
        //Validation
        if(!email || !password) {
            toast.error('Email and password is required')
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            if(result.user.emailVerified) {
                //Remove user email from local storage
                window.localStorage.removeItem("emailForRegistration")
                //Get user id token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult
                //Redux store
                createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id
                        }
                    });
                })
                .catch()
                //Redirect
                history.push('/')
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                className="form-control" 
                value={email}
                disabled
            />

            <input 
                type="password" 
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-raised">
                Complete Register
            </button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;