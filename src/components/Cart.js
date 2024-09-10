import { useSelector } from "react-redux";

const Cart = () => {
    
    const cartItems = useSelector(store => store.cart.items);
    
    return (
        <div className="cart">

            <div className="otherDetails">
                <div>Account</div>
                <div>Delivery Address</div>
                <div>Payment</div>
            </div>
            
            <div className="orderDetails">
                {cartItems.map(item => <div>{item.card.info.name} : ₹{item.card.info.price/100 || item.card.info.defaultPrice/100}</div>)}
            </div>
            
        </div>
    )
}

export default Cart;