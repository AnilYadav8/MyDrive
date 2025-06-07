import React, { useState } from 'react'
// axios ka kaam hota hai frontend ko backend se connect karta hai
import axios from 'axios'
import { useNavigate } from 'react-router-dom'   // ek page se doosre page par move karta hai

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    const handleChange = (a) => {
      a.preventDefault()   // Baar baar agar koi signup click kare to to value baar baar store na ho to use prevent karna hai
      axios.post('http://localhost:3000/signup', {name, email, password})
      .then(result => {console.log(result)
        navigate('/login')
      })
      .catch(err => console.log(err))
    }
  return (
    <div style={{background:"linear-gradient(to right,#51C0A3,pink,blue",
    height:"100vh",
    width:"220vh",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    display:"flex",
    }}>
      <div style={{
        background:"#fff",
       
        textAlign:"center",
        alignItems:"center",
        height:"400px",
        width:"350px",
        borderRadius:"20px"
      }}>
        <h1 style={{marginTop:"5vh"}}>Signup</h1>
        <form onSubmit={handleChange}>
            <input type="text" placeholder='Enter Name'
            name='name'
            onChange={(e) => setName(e.target.value)}
            />
            <br /><br/>
            <input type="email" placeholder='Enter Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}/>
            <br /><br/>
            <input type="password" placeholder='Enter Password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}/>
            <br /><br />
            <button style={{background:"#51C0A3", color:"white",height:"35px", width:"190px",borderRadius:"20px"}}>Signup</button>
        </form><br/>
        <p>Already Registered <a href="/Login">Login</a></p>
    </div>
    </div>
  )
}

export default Signup
