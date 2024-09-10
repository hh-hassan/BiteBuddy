import { useEffect, useRef } from "react";
import { CDN_URL } from "../utils/constants";

const Section1 = ({props}) => {

    if(!props) return;

    const listOfFood = props?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;

    const scrollRef = useRef(null);
    
    return (
        
        <div className="section">
        
            <div className="desc1">
                {props?.data?.cards[0]?.card?.card?.header?.title}
                {console.log(props.data.cards[0].card)}

                <div>

                    {/* <button className="filterButton" onClick={
                        () => {
                            const filteredData = listOfRest.filter((rest) => rest.info.avgRating > 4.0);
                            setfilteredlistOfRest(filteredData);
                        }
                    }>
                        Ratings 4.0+
                    </button> */}
                    
                    <button className="scrollButton" onClick={
                        () => {
                            scrollRef.current.scrollLeft -= 400;
                        }
                    }>
                        &#10094;
                    </button>

                    <button className="scrollButton" onClick={
                        () => {
                            scrollRef.current.scrollLeft += 400;
                        }
                    }>
                        &#10095;
                    </button>

                </div>

            </div>

            <div className="food-container" ref={scrollRef}>

                {listOfFood.map(food => <img key={food.id} src={CDN_URL+food.imageId}></img>)}
                
            </div>

        </div>
    );
};

export default Section1;