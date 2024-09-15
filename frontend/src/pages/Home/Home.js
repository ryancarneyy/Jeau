import React, { useEffect, useState } from "react";
import './Home.css'
import FetchUsers from "../../components/FetchUsers/FetchUsers";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


// function getCoords(address) {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         if (data.length > 0) {
//             console.log(data);
//             const data_latitude = data[0].lat;
//             const data_longitude = data[0].lon;
//             // setLatitude(data_latitude);
//             // setLongitude(data_longitude);
//             console.log(`Latitude: ${data_latitude}, Longitude: ${data_longitude}`);
//             return [data_latitude, data_longitude];
//         } else {
//             console.error('Geocoding failed: No results found.');
//         }
//     })
//     .catch(error => console.error('Error:', error));
// } 


const Home = () => {

    const [stores, setStores] = useState([]);
    useEffect(() => {
        // let coords = getCoords(address);
        // If the map exists
        if (L.DomUtil.get('map') !== null) {
            // Remove the existing map before creating a new one
            L.DomUtil.get('map')._leaflet_id = null;
        }
        
        const map = L.map('map').setView([35.262850, -120.677280], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([35.262850, -120.677280]).addTo(map);
        marker.bindTooltip("McDonald's").openTooltip();
     
    }, [])

    const getStores = async () => {
        await fetch('http://localhost:8000/stores/getStores', {
            method: 'GET'
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(`Error fetching stores: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            setStores(data.stores);
            console.log(data.stores);
        })
        .catch(err => {
            console.error('Error while trying to fetch participating stores');
        })
    }


    return (
        <div className="main-container">
            <div className="map-text-div">
                <h2>Participating Locations</h2>
                <div className="map-container">
                    <div id="map"></div>
                </div>
                <button onClick={getStores}>get stores</button>
            </div>
        </div>
            
            
    );
}

export default Home;