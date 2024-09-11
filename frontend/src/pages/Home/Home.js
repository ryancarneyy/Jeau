import React, { useEffect } from "react";
import './Home.css'
import FetchUsers from "../../components/FetchUsers/FetchUsers";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

const Home = () => {
    useEffect(() => {
        // if statement can be removed in production, StrictMode double-renders map
        const map = L.map('map').setView([35.270378, -120.680656], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      }, []);
    
    return (
        <>
           <div id="map"></div>
        </>
            
            
    );
}

export default Home;