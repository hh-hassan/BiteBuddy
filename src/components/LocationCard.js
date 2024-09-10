import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { GPS_SMALL_ICON } from "../utils/constants";

const LocationCard = ({props}) => {
    
    const parts = props.formatted.split(',');
    const first = parts[0];
    const last = parts.slice(-2).join(',');

    const { setplace, setcoordinates, islocationSection, setlocationSection } = useContext(UserContext);
    
    return (
        <div className="locCard" 
                onClick={() => {

                    setcoordinates({
                        lat: props.geometry.lat,
                        lng: props.geometry.lng,
                      });

                    setplace(first + ", " + last);

                    setlocationSection(!islocationSection);
                }}
        >

            <img src={GPS_SMALL_ICON}></img>
            <div>
                <div>{first}</div>
                <div className="smallText">{last}</div>
            </div>
            

            {/* <div>{props.geometry.lat}</div>
            <div>{props.geometry.lng}</div> */}

        </div>
    )
}

export default LocationCard;