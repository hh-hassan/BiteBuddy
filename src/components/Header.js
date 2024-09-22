import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import UserContext from "../utils/UserContext";
import { LOGO_URL, LOC_ICON_PATH, CART_PATH } from "../utils/constants";

import lunchbox from "../../images/icons/lunchbox.jpg";
import search from "../../images/icons/search.jpg";
import offers from "../../images/icons/offer.jpg";
import help from "../../images/icons/help.jpg";
import signIn from "../../images/icons/signIn.jpg";

const Header = () => {

    const navigate = useNavigate();

    const { place, islocationSection, setlocationSection, isloginSection, setisloginSection } = useContext(UserContext);

    const cartItems = useSelector(store => store.cart.items);

    return (
        
        <div className="header">
            
            <div>
                <Link to='/'>
                    <img className="logo" src={LOGO_URL}></img>
                </Link>
            </div>

            <div className="locHeader" onClick={() => {setlocationSection(!islocationSection)}}>
                
                <svg viewBox="0 0 100 100" fill="#EF4444">
                    <path d={LOC_ICON_PATH}></path>
                </svg>
                
                <span>{place.replace(/(\b\w+\b)(, \1)+/g, '$1')}</span>

                <svg viewBox="0 0 24 24" width="24" height="24" fill="red">
                    <path d="M7 10l5 5 5-5H7z" />
                </svg>

            </div>

            <div className="nav-bar">

                <div className="item">
                        <img src={lunchbox}/>
                        <div>Swiggy Corporate</div>
                </div>

                <div className="item"
                    onClick={() => navigate('/search')}>

                        <img src={search}/>
                        <div>Search</div>
                </div>

                <div className="item">
                        <img src={offers}/>
                        <div>Offers<sup>NEW</sup></div>
                </div>
                
                <div className="item"
                    onClick={() => navigate('/support')}>

                        <img src={help}/>
                        <div>Help</div>
                </div>
                
                <div className="item" onClick = {() => setisloginSection(!isloginSection)}>
                    <img src={signIn}/> {isloginSection? <div>Sign Out</div> : <div>Sign In</div>}
                </div>
                
                <div className="item"
                    onClick={() => navigate('/checkout')}>

                        <svg className="SVG" viewBox="-1 0 37 32">
                            <path d={CART_PATH} />
                            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="svg-text">{cartItems.length}</text>
                        </svg>

                        <div>Cart</div>
                </div>
                
            </div>

        </div>
    );
}

export default Header;