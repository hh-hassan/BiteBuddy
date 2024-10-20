import {useState, useEffect} from "react";
import { SERVER_URL } from "../utils/constants";
import TitleDescription from "./TitleDescription";
import Shimmer from "./Shimmer";

const Help = () => {
    
    const [details, setdetails] = useState(null);
    const [sec, setsec] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(SERVER_URL + `support`);
        const json = await response.json();
        setdetails(json?.data);
        setsec(json?.data?.issueTypes?.data[0]);
    };

    if(details === null)
        return (
            <div className="helpContent">
                <Shimmer />
            </div>
    )

    const {
        data,
    } = details?.issueTypes;
    
    return (
        <div className="help">

            <div className="helpHeader">
                <div><h1>Help & Support</h1></div>
                <div><h4>Let's take a step ahead and help you better.</h4></div>
            </div>

            <div className="helpBody">

                <div className="titles">
                    {
                        data.map(d => 
                                    <div
                                        className={`title ${sec === d ? 'selected' : ''}`}
                                        key={d.type}
                                        onClick={() => setsec(d)}
                                    >
                                        {d.title}
                                    </div>
                                )
                    }
                </div>

                <div className="FAQs">
                    <TitleDescription key={sec.type} props={sec}/>
                </div>

            </div>
        
        </div>
    )
}

export default Help;