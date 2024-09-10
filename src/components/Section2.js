import { useEffect, useRef } from "react";
import RestaurantCard1 from "./RestaurantCard1";

const Section2 = ({props}) => {

    if(!props) return;
    
    const listOfRest = props?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    const scrollRef = useRef(null);
    const indicatorRef = useRef(null);

    useEffect(() => {

        if (!listOfRest) return;

        const scrollContainer = scrollRef.current;
        const indicator = indicatorRef.current;
        const scrollStatus = indicator.parentElement; // .scroll-status

        const handleScroll = () => {
            const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const scrollLeft = scrollContainer.scrollLeft;

            const indicatorWidth = indicator.offsetWidth;
            const containerWidth = scrollStatus.clientWidth; // Width of .scroll-status

            // Calculate the proportional left position
            const scrollPercentage = scrollLeft / scrollWidth;
            const maxLeft = containerWidth - indicatorWidth; // Maximum left position for indicator
            const left = scrollPercentage * maxLeft;

            indicator.style.left = `${Math.min(Math.max(left, 0), maxLeft)}px`;
        };

        scrollContainer.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };

    }, [listOfRest]);

    return listOfRest?
        (
            <div className="section">

                <div className="desc1">
                    
                    {props?.data?.cards[1]?.card?.card?.header?.title}

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
                                scrollRef.current.scrollLeft -= 500;
                            }
                        }>
                            &#10094;
                        </button>

                        <button className="scrollButton" onClick={
                            () => {
                                scrollRef.current.scrollLeft += 500;
                            }
                        }>
                            &#10095;
                        </button>

                    </div>

                </div>
                    
                <div className="restChains" ref={scrollRef}>{listOfRest.map(rest => <RestaurantCard1 key={rest.info.id} props={rest}/>)}</div>
                
                <div className="scroll-status">
                    <div className="indicator" ref={indicatorRef}></div>
                </div>

            </div>
        ) : null;
}

export default Section2;