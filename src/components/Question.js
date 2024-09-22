import up from "../../images/icons/up.png";
import down from "../../images/icons/down.png";

const Question = ({props, showORnot, setshowAns}) => {

    const {
        title,
        description,
        hyperLinkText,
        hyperLink,
        options,
    } = props;

    return (

        <div className="question">

            <div className="qn"
                    onClick = { () =>
                        showORnot === title ? setshowAns(null) : setshowAns(title)
                    }>

                {title}

                {showORnot===title && <img className="arrow" src={up}></img>}
                {showORnot!==title && <img className="arrow" src={down}></img>}
                
            </div>

            {
                    showORnot===title && (

                        <div className="ans">

                            {description !== null ? <div className="description">{description}</div> : null}

                            {
                                hyperLinkText !== null ?
                                    <div className="link">
                                        <a href={hyperLink} target="_blank" rel="noopener noreferrer">
                                            {hyperLinkText}
                                        </a>
                                    </div> : null
                            }

                            {
                                (options.length!==0 && options[0].type==="email") ?

                                    <div>

                                        <div className="email">
                                            <a href="mailto:${options[0].emailId}?subject=Inquiry&body=Hello">
                                                Send an Email
                                            </a>
                                        </div>

                                        <div className="waitTime">{options[0].waitTime}</div>

                                    </div> : null   
                            }
                            
                        </div>
            )}

        </div>
    );
};

export default Question;