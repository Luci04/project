import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import BucketList from "./components/BucketList/BucketList";
import Bucket from "./components/Bucket/Bucket";

import "./App.css";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<BucketList />}></Route>
            <Route path="/bucket/:id/:BucketName" element={<Bucket />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
