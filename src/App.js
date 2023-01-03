import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Chat from "./Chat"
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvier';


function App() {
  const [{ user }, dispatch] = useStateValue()
  return (
    <div className="App">
      <Router >
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/about" element={<div style={{ flex: "0.9", display: 'flex', flexDirection: "column", alignItems: "center" }}><h1 style={{ marginTop: "300px" }}>Just a welcoming Page</h1>. <p>Only the channels are operationnal you can add new channels if you want and chat in them with a peer </p> </div>} />
                <Route path="/" element={<Chat />} />
              </Routes>
            </div>
          </>
        )
        }

      </Router >
    </div >
  );
}

export default App;
