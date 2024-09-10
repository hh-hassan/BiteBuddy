import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from 'react-router-dom';
import UserContext from "../utils/UserContext";

import Shimmer from "./Shimmer";
import OfferCard from "./OfferCard";
import OfferCardClass from "./OfferCardClass";
import CarouselCard from "./CarouselCard";
import CategoryCard from "./CategoryCard";
import CombosCard from "./CombosCard";

import star from "../../images/icons/star.jpg";
import { MENU_URL } from "../utils/constants";
import { MENU_LOGO_URL } from "../utils/constants";

const RestaurantDetails = () => {
    
    const { resId } = useParams();

    const [details, setdetails] = useState(null);

    const [showCategory, setshowCategory] = useState(null);

    const scrollRef = useRef(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const { coordinates } = useContext(UserContext);

    const fetchData = async () => {
        const data = await fetch(MENU_URL + "lat=" + coordinates.lat + "&lng=" + coordinates.lng + "&restaurantId=" + resId);
        const json = await data?.json();

        setdetails(json?.data);
    };

    if(details === null)
        return (
            <div className="restaurantDetails">
                <Shimmer />
            </div>
    )

    const {
        name,
        areaName,
        avgRating,
        costForTwoMessage,
        cuisines,
        feeDetails,
        totalRatingsString,
        sla,
    } = details?.cards[2]?.card?.card?.info;

    const offerList = details?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers;

    const categoryArr = details?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards;

    return (

        <div className="restaurantDetails">
        
            <div><h1>{name}</h1></div>

            <div className="detailBox">

                <div className="rating"> 
                    <img src={star}/>
                    <span><b>{avgRating} ({totalRatingsString}) • {costForTwoMessage}</b></span>
                </div>

                <div>{cuisines?.join(", ")}</div>
                <div><b>Outlet</b><span>{areaName}</span></div>
                <div><b>{sla?.slaString}</b></div>
                
                <hr></hr>

                <div>
                    <img  className="delivery" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu"/>
                    <span>{sla?.lastMileTravel} kms | ₹{feeDetails?.totalFee / 100 } Delivery fee will apply</span>
                </div>

            </div>

            <div className="sec">

                <div className="secHeader">
                    
                    <h2>Deals for you</h2>

                    <div>
                        <button className="scrollButton" onClick={
                                () => {
                                    scrollRef.current.scrollLeft -= 300;
                                }
                            }>
                                &#10094;
                        </button>

                        <button className="scrollButton" onClick={
                            () => {
                                scrollRef.current.scrollLeft += 300;
                            }
                        }>
                            &#10095;
                        </button>
                    </div>

                </div>
                
                <div className="off" ref={scrollRef}>

                    {/* function-based component */}
                    {/* {offerList.map(off => <OfferCard key={off.info.offerIds[0]} props={off}/>)} */}
                    
                    {/* class-based component */}
                    {offerList.map(off => <OfferCardClass props={off}/>)}
                
                </div>
            </div>

            <div className="menu">
                <img src={MENU_LOGO_URL}></img>
            </div>

            <div className="menuList">   {
                categoryArr.map((cat, ind) =>   {
                    
                    if('title' in cat.card.card)
                    {
                        if('carousel' in cat.card.card) return <CarouselCard key={ind} props={cat}/>;
                        
                        else if('itemCards' in cat.card.card)
                            return <CategoryCard 
                                        key={ind} 
                                        props={cat}
                                        showORnot={showCategory}
                                        setshowCategory={(name)=> setshowCategory(name)}  
                                    />;

                        else if('categories' in cat.card.card)
                            return <CombosCard 
                                        key={ind} 
                                        props={cat}
                                        showORnot={showCategory}
                                        setshowCategory={(name)=> setshowCategory(name)}
                                    />;
                    }

                })

            }</div>

        </div>
    );
}

export default RestaurantDetails;