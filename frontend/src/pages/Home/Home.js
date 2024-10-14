import React, { useEffect, useState } from "react";
import FetchStores from "../../components/FetchUsers/FetchStores";
import './Home.css'
// import FetchUsers from "../../components/FetchUsers/FetchUsers";
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

    // Display Map
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

    useEffect(() => {
        FetchStores(stores, setStores)
    }, [])


    return (
        <div className="main-container">
            <div className="map-and-text-div">
                <h2>Participating Locations</h2>
                <div className="map-container">
                    <div id="map"></div>
                </div>
            </div>
            <div className="store-list-container">
                    <ul> 
                        {stores.map((store) => (
                        <div className="store-list-item">
                            <li key={store.id}> <span style={{fontWeight: 'bold'}}>{store.name}</span> </li>
                            <ul>
                                <li>&nbsp;&nbsp;&nbsp; {store.address} </li>
                                {/* <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Email: </span>{store.email}</li>
                                <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Phone Number: </span> {store.phone_number} </li> */}
                            </ul>
                        </div>
                        ))}
                    </ul>
                </div>
        </div>
    );
}

export default Home;