import { useContext } from "react";
import UserContext from "../utils/UserContext";
import useData from "../utils/useData.js";

import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";

import Shimmer from "./Shimmer";

import { CDN_URL } from "../utils/constants.js";

const Body = () => {
    
    const { coordinates } = useContext(UserContext);
    
    const data = useData(coordinates);

    if(data?.data?.cards[0]?.card?.card?.id === "swiggy_not_present")
        return (
            <div className="locationUnserviceable">
                <img src={CDN_URL + "portal/m/location_unserviceable.png"}></img>
                <div><h2>Location Unserviceable</h2></div>
                <div className="greyColor">We don’t have any services here till now. Try changing location.</div>
            </div>
    );

    if(!data) return <Shimmer />;
    
    return (
    
        <div className="body">
            
            <Section1 props={data}/>
            <Section2 props={data}/>
            <Section3 props={data}/>
            <Section4 />
            <Section5 />
            <Section6 />
            
        </div>
    );
}

export default Body;