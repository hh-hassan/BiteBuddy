import {useState} from "react";
import RestaurantCard1 from "./RestaurantCard1";
import Location from "./Location";
import search from "../../images/icons/search.jpg";

const Search = () => {
    
    const [text, settext] = useState("");

    // const listOfRest = useRestaurantList();
    const [filteredList, setfilteredList] = useState([]);
    
    return (
        
        <div className="searchPage">

            <div className="search">

                <div>
                    <input 
                        type="text" 
                        placeholder="Search for restaurants and food"
                        value={text}
                        onChange={(e) => {settext(e.target.value)}}
                    >    
                    </input>
                </div>
                
                {/* <div>
                    <button
                        onClick={() => {
                            const filteredData = listOfRest.filter(rest => rest.info.name.toLowerCase().includes(text.toLowerCase()));
                            setfilteredList(filteredData);
                        }}
                    >
                        <img src={search}/>
                    </button>
                </div> */}
                
            </div>

            {/* <div className="restChains">{filteredList.map(rest => <RestaurantCard1 key={rest.info.id} props={rest}/>)}</div> */}
            
            {/* <Location /> */}


        </div>  
    );
}

export default Search;