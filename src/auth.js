import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router,Routes,Route} from "react-router";
import Land from "./components/landing";
import Login from "./components/login";
import Sign from "./components/singup";
import Time from "./components/time";
import Help from "./components/helping";

function Auth(){
    return(
       <Router>
        <Routes>
            <Route path="/" element={<Land/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/sign" element={<Sign/>}></Route>
            <Route path="/time" element={<Time/>}></Route>
            <Route path="/help" element={<Help/>}></Route>
        </Routes>
       </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth/>
  </React.StrictMode>
);

