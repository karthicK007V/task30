import React from "react"
import { Link } from "react-router-dom"
 
function Navbar(){
    return(
        <>
        <nav className="nav-bar">
            
            <Link to="/home" className="student">Home</Link>
                <Link to={"/student"} className="student">
                    Student</Link>
                <Link to={"/teacher"} className="student">Teacher</Link>
          
               
         
        </nav>
        </>
    )
}
export default Navbar