import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { MapPinIcon, ClockIcon, UserIcon ,TableCellsIcon ,EnvelopeIcon,PhoneIcon} from '@heroicons/react/16/solid';

import { useDispatch, useSelector } from 'react-redux';
import { cartItem } from '../features/cart/cartSlice';
import { selectloggedInUser } from '../features/auth/authSlice';
import { createOrderAsync } from '../features/order/orderSlice';
import { useLocation } from 'react-router-dom';
function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItem);
  const user = useSelector(selectloggedInUser);
  const totalAmount = cartItems.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );
  const totalPrice = totalAmount + 9.42;
  const handleOrder = () => {
    if (paymentMethod) {
      const order = {
        cartItems,
        totalAmount,
        totalItems,
        user,
        paymentMethod,

        status: 'pending', // other status can be delivered, received.
      };
      dispatch(createOrderAsync(order));
      alert("Order Placed Sucessfully....")
    } else {
      alert('Select a payment Method');
    }
  };

  const [paymentMethod, setPaymentMethod] = useState(null);
  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };
  const location = useLocation();
  const formData = location.state || {};
  return (
    <div className='bg-white '>
      <Navbar>
        <div className='bg-white p-4'>
          <div className='flex justify-between items-center border-b pb-2 w-1/2'>
            <h1 className='text-2xl font-bold'>CHECKOUT</h1>
          </div>

          <div className='flex flex-col   xl:flex-row xl:justify-between '>
            <div className=' p-4 xl:w-2/3 xl:h-screen '>
              {/* div-1 start */}
              <div className='flex p-5 rounded-xl bg-white-txt  text-black shadow-lg justify-between  xl:h-1/3'>
                <div className='mb-4 ml-9 flex items-center justify-center'>
                  <h2 className='text-lg font-bold'>DINE IN INFO</h2>
                </div>
                <div className='flex flex-col'>
                  <div className='mt-9 mr-20  '>
                    <MapPinIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      Delhi Chai Cafe - Rajouri Garden Market
                    </p>
                  </div>
                  <div className='mt-9 mr-20  '>
                    <ClockIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>ASAP</p>
                  </div>
                  <div className='mt-9 mr-20  '>
                    <TableCellsIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>{formData.tableNo}</p>
                  </div>
                </div>
              </div>
              {/* div-2 start */}
              <div className='flex mt-6 p-5 rounded-xl items-center bg-white-txt  text-black shadow-lg justify-between xl:h-1/3'>
                <div className=' '>
                  <h2 className='text-lg font-bold'>CONTACT INFO</h2>
                </div>
                <div className='flex flex-col'>
                  <div className='mt-9 mr-20  '>
                    <UserIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                     {formData.name}
                    </p>
                  </div>
                  <div className='mt-9 mr-20  '>
                    <EnvelopeIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>{formData.email}</p>
                  </div>
                  <div className='mt-9 mr-20  '>
                    <PhoneIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>{formData.phoneNo}</p>
                  </div>
                </div>
              </div>

              {/* div-3 start */}
              {/* <div className='flex mt-6 p-5 rounded-xl bg-white-txt  text-black shadow-lg justify-between h-1/3'>
                <div className='mb-4 ml-9 flex items-center justify-center'>
                  <h2 className='text-lg font-bold'>CONTACT INFO</h2>
                </div>
                <div className='flex flex-col'>
                  <div className='mt-9 mr-20  '>
                    <UserIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>
                      Name - Rajouri Garden Market
                    </p>
                  </div>
                  <div className='mt-9 mr-20  '>
                    <ClockIcon className='w-5 inline-block' />
                    <p className='font-md mx-2 text-semibold inline'>ASAP</p>
                  </div>
                </div>
              </div> */}

              {/* all div end  */}
            </div>
            {/* checkout div  */}
            <div className='flex flex-col p-4 bg-white shadow-md w-[50%] h-[50%]'>
              <div className='flex justify-center items-center mb-4'>
                <h2 className='text-lg font-bold'>{totalItems}ITEM</h2>
              </div>
              <div className='mb-4'>
                <p className='flex justify-between'>
                  Subtotal{' '}
                  <span className='font-bold'>₹{totalAmount.toFixed(2)}</span>
                </p>
                <p className='flex justify-between'>
                  GST <span className='font-bold'>9.42</span>
                </p>
              </div>
              <div>
                <fieldset className=' mb-3'>
                  <legend className='text-sm font-semibold leading-6 text-gray-900'>
                    Payment Methods
                  </legend>
                  <div className=' flex justify-between'>
                    <div className='flex items-center'>
                      <p className='mt-1 text-sm leading-6 text-gray-600'>
                        Choose One
                      </p>
                    </div>
                    <div className='mt-6 space-y-6'>
                      <div className='flex  items-center gap-x-3'>
                        <input
                          id='cash'
                          name='payments'
                          onChange={handlePayment}
                          value='cash'
                          type='radio'
                          checked={paymentMethod === 'cash'}
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                        <label
                          htmlFor='cash'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Cash
                        </label>
                      </div>
                      <div className='flex items-center gap-x-3'>
                        <input
                          id='card'
                          onChange={handlePayment}
                          name='payments'
                          checked={paymentMethod === 'card'}
                          value='card'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                        />
                        <label
                          htmlFor='card'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <button
                onClick={handleOrder}
                className='bg-nav-blue text-white py-2 px-4 rounded-full hover:font-bold'
              >
                Checkout ₹{totalPrice.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default CheckoutPage;
