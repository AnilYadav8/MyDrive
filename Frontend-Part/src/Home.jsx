import React from 'react'

const Home = () => {
  return (
    <div style={{
      backgroundColor:"#51C0A3",
      height:"100vh",
      width:"220vh",
      borderRadius:"20px",
      color:"black",
      
      // display:"flex",
      alignItems:"center",
      justifyContent:"center",
      textAlign:"center"
    }}>
      <div style={{
        
        
      }}>
        <h1 style={{marginTop:"20px"}}>Welcome to Code Drive</h1>
       
        
        <a href="/login"><button style={{padding:"5px 25px",backgroundColor:"blue",color:"white",gap:"10px", borderRadius:"20px", width:"250px"}}>Log In</button></a><br/><br/>
       <a href="/signup"><button style={{padding:"5px 25px",backgroundColor:"blue",color:"white",borderRadius:"20px",width:"250px"}}>Sign Up</button></a>
    </div>
    </div>
  )
}

export default Home
