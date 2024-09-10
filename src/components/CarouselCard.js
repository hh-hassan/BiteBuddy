import { useRef } from "react";
import BuildCarousel from "./BuildCarousel";

const CarouselCard = ({props}) => {
    
    const {
        title,
        carousel
    } = props?.card?.card;

    const scrollRef = useRef(null);
    
    return (
        <div className="carSec">
            
            <div className="carSecHeader">

                <h3>{title}</h3>

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
            
            <div className="carousel" ref={scrollRef}>
                {carousel.map(car => <BuildCarousel key={car.bannerId} props={car}/>)}
            </div>
            
        </div>
    )
}

export default CarouselCard;