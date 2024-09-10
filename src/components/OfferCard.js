import { CDN_URL } from "../utils/constants";

const OfferCard = ({props}) => {
    
    console.log(props);
    
    const {
        header,
        couponCode,
        offerLogo
    } = props?.info;
    
    return (
        <div className="offerCard">

            <img src={CDN_URL + offerLogo}></img>

            <div>
                <div>{header}</div>
                <div className="grey"><h5>{couponCode}</h5></div>
            </div>
            
        </div>
    )
};

export default OfferCard;