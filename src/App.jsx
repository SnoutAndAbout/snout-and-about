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
        <Route path="/city/:cityId" element={<City/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
    </div>
  );
}

export default App;
