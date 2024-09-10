import { useNavigate } from 'react-router-dom';
import { CDN_URL } from "../utils/constants";
import star from "../../images/icons/star.jpg";

const RestaurantCard1 = ({props}) => {
    
    const {
        id,
        cloudinaryImageId,
        aggregatedDiscountInfoV3,
        name,
        avgRating,
        sla,
        cuisines,
        areaName,
    } = props?.info;

    const navigate = useNavigate();
    
    const route = `/restaurant/${id}`;

    return (
        <div className="restContainer1" onClick={() => navigate(route)}>

            <div className="image1">

                <img src={CDN_URL + cloudinaryImageId}></img>

                {
                    aggregatedDiscountInfoV3?.header? 
                        <div className="overlay-text"> 
                            <div>{aggregatedDiscountInfoV3?.header + " " + aggregatedDiscountInfoV3?.subHeader}</div>
                        </div>
                            :    null
                }

            </div>
            
            <div className="restName">{name}</div>
            
            <div className="rating">
                <img src={star}/>
                <span>{avgRating} • <b>{sla.slaString}</b></span> 
            </div>

            <div className="cuisine">
                <div>{cuisines.join(', ')}</div>
                <div>{areaName}</div>
            </div>

        </div>
    );
};

export default RestaurantCard1;