import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCartItemAsync,
  cartItem,
  updateItemAsync,
  resetCartAsync,
} from './cartSlice';
import { deleteItemAsync } from './cartSlice';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItem);

  const removeAllItems = () => {
    dispatch(resetCartAsync());
  };

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }));
  };

  const totalAmount = cartItems.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  useEffect(() => {
    dispatch(fetchCartItemAsync());
  }, [dispatch]);

  return (
    <div className='p-1'>
      <h1 className='my-3 text-4xl font-bold tracking-widest uppercase text-black'>
        MY CART
      </h1>

      <div className='flex flex-col xl:flex-row xl:justify-between'>
        <div className='flex flex-col gap-3 xl:flex-grow '>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex flex-col p-4 bg-neutral-100 shadow-md'
            >
              <div className='flex flex-col gap-6 items-center mb-4 xl:flex-row xl:justify-between md:flex-row md:justify-between'>
                <div className='flex items-center'>
                  <img
                    src={item.thumbnail}
                    alt='Spicy Zinger Burger'
                    className='h-16 w-16 mr-4'
                  />
                  <div>
                    <h2 className='text-lg font-bold'>{item.title}</h2>
                    <button
                      onClick={() => dispatch(deleteItemAsync(item.id))}
                      className='text-red-500 text-sm'
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className='flex items-center'>
                  <label
                    htmlFor='quantity'
                    className='inline mr-5 text-sm font-medium leading-6 text-gray-900'
                  >
                    Qty
                  </label>
                  <select
                    onChange={(e) => handleQuantity(e, item)}
                    value={item.quantity}
                  >
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <span className='font-bold ml-4'>₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between'>
            <button
              onClick={removeAllItems}
              className='bg-red-500 text-white py-2 px-4 rounded'
            >
              Remove All
            </button>
            <Link to='/'>
              <button className='bg-green-500 text-white py-2 px-4 rounded'>
                Add More Menu
              </button>
            </Link>
          </div>
        </div>
        <div className='p-4 '>
          <ShoppingCartSummary
            totalAmount={totalAmount}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
}

function ShoppingCartSummary({ totalAmount, totalItems }) {
  const [addCarryBag, setAddCarryBag] = useState(false);
  const [addHope, setAddHope] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  let totalPrice = totalAmount + 9.42;

  if (addCarryBag) {
    totalPrice += 6;
  }

  if (addHope) {
    totalPrice += 5;
  }

  const handleDialog = () => {
    setOpenDialog(true);
  };

  return (
    <div className='flex flex-col p-4 bg-white shadow-md'>
      <div className='flex justify-center items-center mb-4'>
        <h2 className='text-lg font-bold'>{totalItems} ITEM</h2>
      </div>
      <div className='mb-4'>
        <p className='flex justify-between'>
          Subtotal <span className='font-bold'>₹{totalAmount.toFixed(2)}</span>
        </p>
        <p className='flex justify-between'>
          GST <span className='font-bold'>9.42</span>
        </p>
      </div>
      <div className='flex items-center mb-4'>
        <Checkbox
          id='carryBag'
          checked={addCarryBag}
          onChange={() => setAddCarryBag(!addCarryBag)}
        />
        <label htmlFor='carryBag' className='ml-2'>
          ₹6.00 Tick to add a large carry bag.
        </label>
      </div>
      <div className='flex items-center mb-4'>
        <Checkbox
          id='addHope'
          checked={addHope}
          onChange={() => setAddHope(!addHope)}
        />
        <label htmlFor='addHope' className='ml-2'>
          Donate ₹5.00 Tick to Add Hope. Our goal is to feed 20 million people
          by 2024.
        </label>
      </div>
      <button
        onClick={handleDialog}
        className='bg-red-500 text-white py-2 px-4 rounded-full hover:font-bold'
      >
        Checkout ₹{totalPrice.toFixed(2)}
      </button>

      {openDialog && <DialogDefault setOpenDialog={setOpenDialog} />}
    </div>
  );
}

function DialogDefault({ setOpenDialog }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    tableNo: '',
    phoneNo: '',
  });

  const navigate = useNavigate();

  const handleConfirm = () => {
    // Assuming form validation is done
    navigate('/checkout', { state: formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md xl:items-center xl:justify-center'>
      <Dialog
        size='xs'
        open={true}
        handler={handleClose}
        className='bg-transparent shadow-none fixed inset-0 justify-between top-[23%] -left-4 '
      >
        <Card className='mx-auto w-full max-w-[42rem]'>
          <CardBody className='flex flex-col gap-4'>
            <Typography variant='h4' color='blue-gray'>
              Checkout
            </Typography>

            <Typography className='-mb-2' variant='h6'>
              Your Email
            </Typography>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              size='lg'
              value={formData.email}
              onChange={handleChange}
            />
            <Typography className='-mb-2' variant='h6'>
              Name
            </Typography>
            <Input
              type='text'
              name='name'
              placeholder='Name'
              size='lg'
              value={formData.name}
              onChange={handleChange}
            />
            <Typography className='-mb-2' variant='h6'>
              Table No
            </Typography>
            <Input
              type='number'
              name='tableNo'
              placeholder='Table No'
              size='lg'
              value={formData.tableNo}
              onChange={handleChange}
            />
            <Typography className='-mb-2' variant='h6'>
              Phone No
            </Typography>
            <Input
              type='number'
              name='phoneNo'
              placeholder='Phone No'
              size='lg'
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </CardBody>
          <CardFooter className='pt-0'>
            <button
              onClick={handleConfirm}
              className='bg-red-500 text-white py-2 px-4 rounded-full hover:font-bold'
            >
              Confirm
            </button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default Cart;
