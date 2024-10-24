// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import './Popup.css'

const Popup = ({ closePopup }) => {
    return (
        <div className='popup'>
            <div className='popup-content'>
                <p className='popup-text'>User successfully created!</p>
                <button onClick={closePopup}>Close</button>
            </div>
        </div>
    );

}



export default Popup;