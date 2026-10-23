import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Details from './pages/Details';
import VehicleDetails from './pages/VehicleDetails';

function App() {
  return (
    <BrowserRouter>
      <main>
        <h1>GTA5 Vehicles</h1>
        <nav className="app-nav">
          <NavLink to="/" end>
            Vehicles
          </NavLink>
          <NavLink to="/map">Apartment Map</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/details" element={<Details />} />
          <Route path="/vehicles/:garage/:vehicleId" element={<VehicleDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
