import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const Cart = () => {
    
    const cartItems = useSelector(store => store.cart.items);

    const dispatch = useDispatch();

    const add = (item) => {
        dispatch(addItem(item));  
    };

    const sub = (item) => {
        dispatch(removeItem(item));
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.count * (item.card.info.price/100 || item.card.info.defaultPrice/100));
    }, 0);

    return (
        <div className="cart">

            <div className="otherDetails">
                <div>Account</div>
                <div>Delivery Address</div>
                <div>Payment</div>
            </div>
            
            <div className="orderDetails">
                
                <div className="finalBox">
                    
                    <h3>Cart Details</h3>
                
                    {cartItems.map(item => 
                        
                        <div className="cartItem">

                            <div className="dishName">{item.card.info.name.length > 25 
                                ? item.card.info.name.substring(0, 25) + "..."
                                : item.card.info.name}
                            </div>
                        
                            <div className="cartButton">
                                    <div onClick={() => sub(item)}>-</div>
                                    <div>{item.count}</div>
                                    <div onClick={() => add(item)}>+</div>
                            </div>

                            <div>₹{(item.count) * (item.card.info.price/100 || item.card.info.defaultPrice/100)}</div> 
                            
                        </div>)}
                </div>
                
                <div className="finalBox">

                    <h3>Bill Details</h3>

                    <div className="billDetails">

                        <div className="pricebox">
                            <div>Item total</div>
                            <div>₹{totalAmount}</div>
                        </div>

                        <div className="pricebox">
                            <div>Platform fee</div>
                            <div>₹6</div>
                        </div>

                        <div className="pricebox">
                            <div>GST</div>
                            <div>₹{0.05 * totalAmount}</div>
                        </div>

                    </div>

                </div>
                
                <div className="toPay">
                    <div>TO PAY</div>
                    {/* {console.log()} */}
                    <div>₹{totalAmount + 6 + (0.05 * totalAmount)}</div>
                </div>

                <div className="proceed">
                    Proceed to Pay
                </div>

            </div>
            
        </div>
    )
}

export default Cart;