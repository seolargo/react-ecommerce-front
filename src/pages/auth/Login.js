import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';

const Login = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if (user && user.token) history.push("/")
    }, [user, history])

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        if (res.data.role === 'admin') {
            history.push('/admin/dashboard');
        } else {
            history.push("/user/history");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //in order to prevent the browser from reloading.
        //If you don't have this, when the button is clicked, the form element is submitted, the browser will reload the page by default.
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            
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
                    roleBasedRedirect(res)
                })
                .catch()
            
            history.push('/')
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
        }
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}    
                    placeholder="Your email"
                    autoFocus
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}    
                    placeholder="Your password"
                />
            </div>
            <br />
            <Button
                onClick={handleSubmit}
                type="submit"
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length<6}
            >
                Login with email/password
            </Button>

            <Link to="/forgot/password" className="float-right text-danger">
                Forgot Password
            </Link>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

export default Login;