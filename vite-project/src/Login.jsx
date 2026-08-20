import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';



function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                navigate("/chat");
            } else {
                alert("Login failed");
            }
        });
    }

    return (
        
            <div className="login-password">
            <input
                className="login"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password-button">
            <input
                className="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
       
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
            </div>
           
        </div>
    )
}

export default Login;