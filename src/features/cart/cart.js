import React, { useEffect ,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItemAsync, cartItem, updateItemAsync } from './cartSlice'; 
import { deleteItemAsync } from './cartSlice';
import { Link } from 'react-router-dom';
function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItem); 
  const [quantity, setQuantity] = useState(1);
  
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const removeItem = () => {/* logic to remove item */};
  const removeAllItems = () => {/* logic to remove all items */};
  const addMoreMenu = () => {/* logic to add more menu items */};
  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({...item,quantity:+e.target.value}))
  };
  const totalAmount = cartItems.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce((total, item) => item.quantity + total, 0);
  useEffect(() => {
    dispatch(fetchCartItemAsync());
  }, [dispatch]);
console.log(cartItems.price);
  return (
    <div className='p-1' >
       <h1 className='my-3 text-4xl font-bold tracking-widest uppercase text-black
'> MY CART</h1>
<div className='flex flex-col  xl:flex-row xl:justify-between'>

<div className='flex flex-col gap-3'>
      {cartItems.map((item) => (
        <div className="flex flex-col  p-4 bg-netural-100 shadow-md">
        <div className="flex flex-col gap-6  items-center mb-4 xl:flex-row xl:justify-between md:flex-row md:justify-between">
          <div className="flex items-center">
            <img src={item.thumbnail} alt="Spicy Zinger Burger" className="h-16 w-16 mr-4" />
            <div>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <button onClick={()=>dispatch(deleteItemAsync(item.id))} className="text-red-500 text-sm">Remove</button>
            </div>
          </div>
          <div className="flex items-center">
          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
            <span className="font-bold ml-4">₹{item.price}</span>
          </div>
        </div>
       
      </div>
      
      ))}
       <div className="flex justify-between">
          <button onClick={removeAllItems} className="bg-red-500 text-white py-2 px-4 rounded">Remove All</button>
         <Link to="/"> <button  className="bg-green-500 text-white py-2 px-4 rounded">Add More Menu</button></Link>
        </div>
</div>

    <div className='p-9'>
    <ShoppingCartSummary totalAmount={totalAmount} totalItems={totalItems}/>
    </div>

    </div>
    </div>
  );
}


function ShoppingCartSummary({totalAmount,totalItems}) {
  const [addCarryBag, setAddCarryBag] = useState(false);
  const [addHope, setAddHope] = useState(false);
  let totalPrice=totalAmount+9.42;
  if(addCarryBag){
    totalPrice+=6;
  } 

  if(addHope){
    totalPrice+=5;
  }
  return (
    <div className="flex flex-col  p-4 bg-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{totalItems}  ITEM</h2>
        <div>
          <button className="text-red-500 border-red-500 border px-2 py-1 mr-2">Apply Offers & Deals</button>
          <button className="text-red-500 border-red-500 border px-2 py-1">View All</button>
        </div>
      </div>
      <div className="mb-4">
        <p>Subtotal <span className="font-bold">₹{totalAmount}</span></p>
        <p>GST <span className="font-bold">9.42</span></p>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" id="carryBag" checked={addCarryBag} onChange={() => setAddCarryBag(!addCarryBag)} className="mr-2" />
        <label htmlFor="carryBag">₹6.00 Tick to add a large carry bag.</label>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" id="addHope" checked={addHope} onChange={() => setAddHope(!addHope)} className="mr-2" />
        <label htmlFor="addHope">Donate ₹5.00 Tick to Add Hope Our goal is to feed 20 million people by 2024.</label>
      </div>
      <button className="bg-red-500 text-white py-2 px-4 rounded-full hover:font-bold">Checkout ₹{totalPrice}</button>
    </div>
  );
}




export default Cart;
