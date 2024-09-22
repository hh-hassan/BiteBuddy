import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../utils/UserContext";
import LocationCard from "./LocationCard";
import { GEOCODING_API_KEY, GPS_ICON, CROSS_ICON } from '../utils/constants';

const Location = () => {

  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [debouncedAddress, setDebouncedAddress] = useState(address);

  const { setplace, setcoordinates, islocationSection, setlocationSection} = useContext(UserContext);

  const getcurrentplace = async (lat, lng) => {
    
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${GEOCODING_API_KEY}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      const{ suburb, state_district } = data.results[0].components;
      setplace(`${suburb}, ${state_district}`);
    }

    else
      setplace("Current location");
  }

  const getcurrentLocation = () => {
    
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(
        
        (position) => {

            setcoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });

            getcurrentplace(position.coords.latitude, position.coords.longitude).catch((error) => {
              setplace("Current location");
            });

            setlocationSection(!islocationSection);
          },
            
        (error) => setError(error.message)
      );
    } 
    
    else
      setError("Geolocation is not supported by this browser.");
  };

  useEffect(() => {

    const timerId = setTimeout(() => {
      setDebouncedAddress(address);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [address]);

  useEffect(() => {
    
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
    
    fetchGeocode(debouncedAddress);

  }, [debouncedAddress]);

  return (
    
    <div className="location">

        <img className="cross" src={CROSS_ICON} onClick={() => {setlocationSection(!islocationSection)}}></img>
        
        <div className="locationInput">
            <input
                type="text"
                placeholder="Search for area, street name..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
        </div>

        <div className="GPSlocation" onClick={getcurrentLocation}>
            
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