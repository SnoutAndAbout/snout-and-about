import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import City from "./components/City";
import Registration from "./components/Registration";
import Account from "./components/Account";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/City" element={<City/>}/>
        <Route path="/Registration" element={<Registration/>}/>
        <Route path="/Account" element={<Account/>}/>
      </Routes>
    </div>
  );
}

export default App;
