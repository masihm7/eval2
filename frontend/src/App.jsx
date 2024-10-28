import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from '../src/context/authcontext';
import { Landingpage } from "./pages/landingpage";
import { Dashboard } from "./pages/dashboard";
import {Login} from "./pages/login"
import {Signup} from "./pages/signup"


function App() {
    return (
      <AuthProvider>
         <Router>
         <Routes>
           <Route path="/" element={<Landingpage />} />
           <Route path="/Login" element={<Login />} />
           <Route path="/Signup" element={<Signup />} />
           <Route path="/Dashboard" element={<Dashboard />} />
         </Routes>
       </Router>
      </AuthProvider>
       
   );
}

export default App
