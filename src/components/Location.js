import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../utils/UserContext";
import LocationCard from "./LocationCard";
import { GEOCODING_API_KEY, GPS_ICON, CROSS_ICON } from '../utils/constants';

const Location = () => {

  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [debouncedAddress, setDebouncedAddress] = useState(address);

  const { islocationSection, setlocationSection} = useContext(UserContext);

  useEffect(() => {

    const timerId = setTimeout(() => {
      setDebouncedAddress(address);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [address]);

  const fetchGeocode = async (debouncedAddress) => {

    if (!debouncedAddress) return;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}&countrycode=in&no_annotations=1&limit=100`;
    
    const response = await fetch(url);

    if (response.ok) {

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setLocation(data.results);
        setError(null);
      } 
      
      else {
        setLocation(null);
        setError('No results found');
      }
    } 
    
    else {
      setLocation(null);
      setError('Error fetching geocode');
    }
  };

  useEffect(() => {
    fetchGeocode(debouncedAddress);
  }, [debouncedAddress]);

  return (
    
    <div className="location">

        <div>
            <img className="cross" src={CROSS_ICON} onClick={() => {setlocationSection(!islocationSection)}}></img>
        </div>
        
        <div className="locationInput">
            <input
                type="text"
                placeholder="Search for area, street name..."
                value={address}
                onChange={(e) => setAddress(e.target.value)} // Trigger input change
            />
        </div>

        <div className="GPSlocation">
            <img src={GPS_ICON}></img>
            <div>
                <div>Get current location</div>
                <div className="smallText">Using GPS</div>
            </div>
        </div>

        {location && location.map(l => (<LocationCard props={l} />))}

        {error && <p>{error}</p>}

    </div>
  );
};

export default Location;