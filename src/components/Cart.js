import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { addItem, removeItem } from "../utils/cartSlice";
import { STRIPE_PUBLISHABLE_KEY } from "../utils/constants";

const Cart = () => {
    
    const cartItems = useSelector(store => store.cart.items);

    const dispatch = useDispatch();

    const itemAmount = cartItems.reduce((total, item) => {
        return total + (item.count * (item.card.info.price/100 || item.card.info.defaultPrice/100));
    }, 0);

    const handleCheckout = async () => {
    
        const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
        
        const response = await fetch('https://us-central1-bitebuddy-2693a.cloudfunctions.net/api/create-checkout-session', {
          
            method: 'POST',
          
            headers: {
            'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                items: cartItems.map(item => ({
                    name: item.card.info.name,
                    price: (item.card.info.price / 100) || (item.card.info.defaultPrice / 100),
                    quantity: item.count
                }))
            }),
        });
    
        const session = await response.json();
    
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
    
        if (result.error) {
          console.error(result.error.message);
        }
    };

    const GST = Number((0.05 * itemAmount).toFixed(2));

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
                                    <div onClick={() => dispatch(removeItem(item))}>-</div>
                                    <div>{item.count}</div>
                                    <div onClick={() => dispatch(addItem(item))}>+</div>
                            </div>

                            <div>₹{(item.count) * (item.card.info.price/100 || item.card.info.defaultPrice/100)}</div> 
                            
                        </div>)}
                </div>
                
                <div className="finalBox">

                    <h3>Bill Details</h3>

                    <div className="billDetails">

                        <div className="pricebox">
                            <div>Item total</div>
                            <div>₹{Number(itemAmount).toFixed(2)}</div>
                        </div>

                        <div className="pricebox">
                            <div>Platform fee</div>
                            <div>₹6</div>
                        </div>

                        <div className="pricebox">
                            <div>GST</div>
                            <div>₹{GST}</div>
                        </div>

                    </div>

                </div>
                
                <div className="toPay">
                    <div>TO PAY</div>
                    <div>₹{itemAmount + 6 + GST}</div>
                </div>

                <div className="proceed" onClick={handleCheckout}>
                    Proceed to Pay
                </div>

            </div>
            
        </div>
    )
}

export default Cart;