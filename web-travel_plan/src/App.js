import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Signup2 from './pages/Signup2'
import Myinterest from './pages/Myinterest';
import StartTrip from './pages/StartTrip';
import MyTravel from './pages/MyTravel';
import FixSchedule from './pages/FixSchedule';
import TripDetail from './pages/TripDetail';
import Budget from './pages/Budget';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/myinterest" element={<Myinterest />} />
        <Route path="/startTrip" element={<StartTrip />} />
        <Route path="/myTravel" element={<MyTravel />} />
        <Route path="/fixSchedule" element={<FixSchedule />} />
        <Route path="/tripDetail" element={<TripDetail />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  );
}
export default App;