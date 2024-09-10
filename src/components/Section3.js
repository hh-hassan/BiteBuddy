import { useState, useEffect, useRef, useCallback } from "react";
import RestaurantCard2 from "./RestaurantCard2";

const Section3 = ({props}) => {
    
    if(!props) return;

    const restaurants = props?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    
    /********* Infinite scrolling
    
    const [nextOffset, setNextOffset] = useState("CJhlELQ4KIDotu3Q6/2oYTCnEzgC");
    const loader = useRef(null);
    
    const fetchRestaurants = async () => {
        
        const payload = {
            filters:{},
            lat: 28.562147,
            lng: 77.285702,
            nextOffset: "CJhlELQ4KICwnN6N1OeuATCnEzgD",
            page_type: "DESKTOP_WEB_LISTING",
            seoParams: {
                apiName: "FoodHomePage",
                pageType: "FOOD_HOMEPAGE", 
                seoUrl: "https://www.swiggy.com/", 
            },
            widgetOffset: {
                NewListingView_category_bar_chicletranking_TwoRows: "",
                NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
                Restaurant_Group_WebView_PB_Theme: "",
                Restaurant_Group_WebView_SEO_PB_Theme: "",
                collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: `${restaurants.length}`,
                inlineFacetFilter: "",
                restaurantCountWidget: ""
            },
            _csrf: "kDAKpkSQUNJY-kGbnTndoAlP5jzrLeIBCKvJmGeY"
        };

        const response = await fetch('http://localhost:3000/api/restaurants', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
        });

            const data = await response.json();
            const newRestaurants = data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
            setrestaurants(prevRestaurants => [...prevRestaurants, ...newRestaurants]);
            setNextOffset(data?.data?.nextOffset);
    };

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            fetchRestaurants();
        }
    }, [nextOffset]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
        if (loader.current) observer.observe(loader.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    *********/
    
    return (

        <div className="section">

            <div className="desc1">
                {props?.data?.cards[2]?.card?.card?.title}
            </div>

            <div className="restaurants">{restaurants.map(rest => <RestaurantCard2 key={rest.info.id} props={rest}/>)}</div>
            
            {/* <div ref={loader} style={{ height: "50px", backgroundColor: "transparent" }} /> */}

        </div>
    );
};

export default Section3;