import Alert from "./Components/Alert";
import Navbar from "./Components/Navbar";
import Textform from "./Components/Textform";
import { useState } from "react";
import About from "./Components/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  const [alert, setAlert]=useState(null);

  const showAlert=(message,type)=>{
      setAlert({
          msg:message,
          type:type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <Router>
    <div className="App">
      <Navbar title="TextUtils"/>
      <Alert alert={alert} />
      <div className="container  my-3">
      <Routes>
         <Route exact path="/" element={<Textform heading="Enter your text below to analyze it" showAlert={showAlert}/>} />
    </Routes>  
     <Routes>
         <Route exact path="about" element={<About />} />
    </Routes>
     </div>
    </div>
    </Router>
    </>
  );
}

export default App;
