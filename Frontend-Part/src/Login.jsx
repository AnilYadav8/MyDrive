import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'  

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    const handleChange = (e) => {
      e.preventDefault()  // to stop copying data again and again
      axios.post('http://localhost:3000/login', {email, password})
      .then(result => {console.log(result)
        navigate('/dashboard')
      })
      .catch(err => console.log(err))
    }
  return (
    <div style={{
      backgroundColor:"#c4c3ca",
      display:"flex",
      alignItems:"center",
      textAlign:"center",
      justifyContent:"center",
      height:"100vh",
      width:"220vh",
      margin:""

    }}>
      <div style={{
        backgroundColor:"white",
        color:"black",
        textAlign:"center",
        alignItems:"center",
        height:"400px",
        width:"350px",
        borderRadius:"20px",
        margin:"5vh"
        // border:"2px solid skyblue"
      }}>

      
    
        <h1 style={{marginTop:"5vh"}}>Login</h1>
        <form onSubmit={handleChange}>
            <input type="email" placeholder='Enter Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}/>
            <br /><br/>
            <input type="password" placeholder='Enter Password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}/>
            <br /><br />
            <button style={{ backgroundColor:"blue",color:"white", height:"30px", width:"190px",borderRadius:"20px"}}>Login</button>
        </form><br/>
        <p>Don't register yet ?? <a href="/Signup">Signup</a></p>
        <p>Practice the code ?? <a href="dashboard">Dashboard</a></p>
    
    </div>
    </div>
  )
}

export default Login










