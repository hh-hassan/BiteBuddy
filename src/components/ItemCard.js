import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { CDN_URL, BESTSELLER_LOGO_URL } from "../utils/constants";
import star from "../../images/icons/star.jpg";

const ItemCard = ({props}) => {

    const {
        name,
        price, defaultPrice,
        ratings,
        description,
        imageId

    } = props?.card?.info;

    const count = useSelector(store => 
        store.cart.items.filter(item => item === props).length
    );

    const dispatch = useDispatch();

    const add = () => {
        dispatch(addItem(props));
    };

    const sub = () => {
        dispatch(removeItem(props));
    };
    
    return (

        <div className="itemCard">

            <div className="itemDetails">
                <div className="itemName">{name}</div>
                <div className="itemName">₹{defaultPrice/100 || price/100}</div>
                {
                    ('rating' in ratings.aggregatedRating)? (
                        <div className="rating">
                            <img src={star}/>
                            <span className="green">{ratings.aggregatedRating.rating}</span>
                            <span>({ratings.aggregatedRating.ratingCount})</span>
                        </div>
                    ) : null
                }
                
                <div>{description}</div>
            </div>

            <div>

                <div className="itemImage">
                    
                    <img src={CDN_URL + imageId}></img>

                    {
                        count===0?
                            <div className="initButton" onClick={() => add(props)}>ADD</div>
                                :
                                    <div className="laterButton">
                                        <div onClick={() => sub()}>-</div>
                                        <div>{count}</div>
                                        <div onClick={() => add()}>+</div>
                                    </div>
                    }

                    <div className="dummyDiv"></div>

                </div>

                <div className="custom">
                    {(props?.card?.info?.addons || props?.card?.info?.variantsV2?.pricingModels)? <div>Customizable</div> : null}
                </div>

            </div>

        </div>
    )
};

export const BestsellerItemCard = () => {
    
    return (props) => {
        return (
            <div className="bestsellerComp">
                <img className="bestseller" src={BESTSELLER_LOGO_URL}></img>
                <ItemCard {...props}/>
                <div className="dummyDiv"></div>
            </div>
        )
    }
};

export default ItemCard;