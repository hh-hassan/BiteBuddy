import ItemCard, { BestsellerItemCard } from "./ItemCard";
import up from "../../images/icons/up.png";
import down from "../../images/icons/down.png";

const CategoryCard = ({props, showORnot, setshowCategory}) => {
    
    const {
        title,
        itemCards,
    } = props;

    const BestsellerCard = BestsellerItemCard();

    return (

        <div className="com">
                
                <div className="comHeader"
                        onClick = { () =>
                                showORnot === title ? setshowCategory(null) : setshowCategory(title)
                        }
                >
                    
                    <h3>{title} ({itemCards.length})</h3>

                    {showORnot===title && <img className="arrow" src={up}></img>}
                    {showORnot!==title && <img className="arrow" src={down}></img>}
                    
                </div>
                
                {
                    showORnot===title && (
                        <div>
                        {
                            itemCards.map(item => (item.card.info.isBestseller? <BestsellerCard key={item.card.info.id} props={item} /> : <ItemCard key={item.card.info.id} props={item} />))
                        }
                        </div>
                )}
                
        </div>
    )
}

export default CategoryCard;