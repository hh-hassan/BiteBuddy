import {useState, useEffect} from "react";
import Question from "./Question";
import Shimmer from "./Shimmer";
import { HELP_URL } from "../utils/constants";

const TitleDescription = ({props}) => {
    
    const {
        title,
        type,
    } = props;
    
    const [details, setdetails] = useState(null);

    const [showAns, setshowAns] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        
        const data = await fetch(HELP_URL + "/issues/" + type);
        const json = await data?.json();

        setdetails(json?.data);
    };

    if(details === null)
        return (
            <div className="helpContent">
                <Shimmer />
            </div>
    )
    
    const qns = details.issues.data;
    
    return (
        <div>
            <h2>{title}</h2>

            {
                qns.map(qn => 
                            <Question 
                                key={qn.id} 
                                props={qn} 
                                showORnot={showAns}
                                setshowAns={(name)=> setshowAns(name)}
                            />
                        )
            }

        </div>
    )
}

export default TitleDescription;