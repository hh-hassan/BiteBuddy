import { useState, useEffect } from "react";
import { SERVER_URL } from "./constants";

const useData = ({lat, lng}) => {
    
    const [data, setdata] = useState();
    
    useEffect(() => {
        fetchData();
    }, [lat, lng]);

    const fetchData = async () => {
        const data = await fetch(SERVER_URL + `restaurants?lat=${lat}&lng=${lng}`);
        const json = await data.json();
        setdata(json);
    };
    
    return data;
};

export default useData;