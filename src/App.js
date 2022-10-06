
import Navbar from './navbar';
import Student from './student';
import Teacher from './teacher';
import Home from './home';
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom';



function App() {
  return (
    <div className="App">
     
    

      <Router>
      <Routes>
     

        {/* <Route path='/' element={<Navbar/>}/> */}
        <Route path='/Home' element={<Home/>}/>
        <Route path='/student' element={<Student/>}/>
        <Route path='/teacher' element={<Teacher/>}/>
      </Routes>

      </Router>
      
     

 
    
    </div>
  );
}


export default App;
