import React from "react";
import { CDN_URL } from "../utils/constants";

// import UserContext from "../utils/UserContext";

class OfferCardClass extends React.Component {
    
    constructor(props) {
        
        super(props);

        // this.state = {
        //     count1: 1,
        //     count2: 2,
        // };
    }

    async componentDidMount() {
        // this func will be called only after mount...
        // any ASYNC task should be called here and state variables will be updated according to response of async task...
        // after this func call..2nd render will be triggered...

        // this.timer = setInterval(() => {
        //     console.log("anything")
        // }, 1000);

    }

    componentDidUpdate() {
        // this func will be called after render but only if there is any update in state variables...

    }

    componentWillUnmount() {
        // just before the component will unmount

        // clearInterval(this.timer);

        /*

        in useEffect hook used in function based component..we have to return a function in last statement 
        of useEffect and that function will be called just before unmounting the component....

        useEffect(() => {
            
            const timer = setInterval(() => {
                console.log("anything")
            }, 1000);

            return () => {
                clearInterval(timer);
            }

        }, [])

        */
    }

    render() {

        const {
        header,
        couponCode,
        offerLogo
        } = this.props?.props?.info;


        // const {count1, count2} = this.state;
        
        return (
            <div className="offerCard">

                <img src={CDN_URL + offerLogo}></img>

                <div>
                    <div><h3>{header}</h3></div>
                    <div className="grey"><h5>{couponCode}</h5></div>
                </div>

                {/* <div>
                    count1: {count1}
                    count2: {count2}
                </div>
                
                <button onClick={() => {
                    this.setState({
                        count1: count1 + 1,
                        count2: count2 + 1,
                    });
                }}>
                    Increase Count1 & Count2
                </button> */}

                {/* <div>
                    <UserContext.Consumer>
                       {({loggedInUser}) => <div>{loggedInUser}</div>} 
                    </UserContext.Consumer>
                </div> */}
                
            </div>
        )
    }
}

export default OfferCardClass;