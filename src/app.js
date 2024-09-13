import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Help from "./components/Help";
import Cart from "./components/Cart";
import Error from "./components/Error";
import RestaurantDetails from "./components/RestaurantDetails";
import Location from "./components/Location";
import Login from "./components/Login";

import appStore from "./utils/appStore";
import useOnlineStatus from "./utils/useOnlineStatus";
import UserContext from "./utils/UserContext";

/* chunking, code splitting, dynamic bundling, lazy Loading, on demand loading, dynamic import */

// const Instamart = lazy(() => import(""));

const AppLayout = () => {
    
    const [islocationSection, setlocationSection] = useState(false);
    const [coordinates, setcoordinates] = useState({
        lat: 28.7041,
        lng: 77.1025,
    });
    const [place, setplace] = useState("Delhi, India");
    const [isloginSection, setisloginSection] = useState(false);

    if(!useOnlineStatus()) return (<div><h1>Looks like you're offline..Please check your internet connection...</h1></div>);

    useEffect(() => {
        
        if (islocationSection || isloginSection) document.body.classList.add('no-scroll');
        else document.body.classList.remove('no-scroll');

        return () => document.body.classList.remove('no-scroll');

    }, [islocationSection, isloginSection]);
    
    return (

        <Provider store={appStore}>

            <UserContext.Provider value={{ place, setplace, coordinates, setcoordinates, islocationSection, setlocationSection, isloginSection, setisloginSection }}>
                
                <div className="app">
                    
                    <div className={`main-content ${(islocationSection || isloginSection) ? 'inactive' : ''}`}>
                        <Header />
                        <Outlet />
                        <Footer />
                    </div>
                    
                    {
                        islocationSection &&
                        
                            <div className="overlaySec">
                                <div className="dim-overlay" onClick={() => setlocationSection(!islocationSection)}></div>
                                <Location />
                            </div>                 
                    }

                    {
                        isloginSection &&
                        
                            <div className="overlaySec">
                                <div className="dim-overlay" onClick={() => setisloginSection(!isloginSection)}></div>
                                <Login />
                            </div>                 
                    }

                </div>

            </UserContext.Provider> 
        </Provider>
    );
} 

const appRouter = createBrowserRouter([
    
    {
        path: "/",

        element:<AppLayout/>,

        children: [
            
            {
                path: "/", 
                element: <Body/>
            },
            
            {
                path: "/search", 
                element: <Search/>
            },

            {
                path: "/support", 
                element: <Help/>
            },

            {
                path: "/checkout", 
                element: <Cart/>
            },

            {
                path: "/restaurant/:resId", 
                element: <RestaurantDetails/>
            }
        ],

        errorElement: <Error/>
    },

    // {
    //     path: "/about-us", 
    //     element: <AboutUs/>
    // },

    // {
    //     path: "/instamart",
    //     element: (
    //         <Suspense fallback={<h1>Instamart coad is loading..Please wait for a while</h1>}>
    //             <Instamart />
    //         </Suspense>
    //     )
    // },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);