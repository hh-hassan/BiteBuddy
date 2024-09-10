import ComboCategoryCard from "./ComboCategoryCard";

const CombosCard = ({props, showORnot, setshowCategory}) => {
    
    const {
        title,
        categories,
    } = props?.card?.card;
    
    return (
        <div className="combo">
            <div><h3>{title}</h3></div>
            <div>{categories.map((cat, ind) => 
                    <ComboCategoryCard 
                        key={ind} 
                        props={cat} 
                        showORnot={showORnot} 
                        setshowCategory={setshowCategory}
                    />
                )}
            </div>
        </div>
    )
}

export default CombosCard;