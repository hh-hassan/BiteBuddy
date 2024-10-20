import {useState, useEffect} from "react";
import Question from "./Question";
import Shimmer from "./Shimmer";
import { SERVER_URL } from "../utils/constants";

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
        const response = await fetch( SERVER_URL + `support/issues/${type}` );
        const json = await response.json();
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