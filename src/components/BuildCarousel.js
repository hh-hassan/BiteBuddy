import { CDN_URL } from "../utils/constants";

const BuildCarousel = ({props}) => {
    
    const {
        creativeId,
        dish
    } = props;

    return (
        <div className="car">
            
            <img src={CDN_URL + creativeId}></img>

            <div className="carouselInfo">
                <div>₹{dish.info.price/100 || dish.info.defaultPrice/100}</div>
                <div className="carouselADD">ADD</div>
            </div>

        </div>
    )
}

export default BuildCarousel;