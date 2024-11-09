import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Spinner } from 'flowbite-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { clearCart } from '../../Redux/CartSlice/cartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { currentUser } = useSelector((state) => state.user);
  const { items, discount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'cash', // Default payment method
    onlinePaymentMethod: null, // Online payment method (Bkash or Nagad)
  });

  const [couponCode, setCouponCode] = useState('');
  const [validCoupon, setValidCoupon] = useState(false);

  const validCoupons = {
    "#hungryfox#66": 10,
    "#hungryfox12": 15,
    "#hungryfox88": 20,
    "#hungryfox44": 5,
  };

  const totalPrice = items.reduce((total, item) => {
    return total + (item.price * item.sliderQuantity);
  }, 0).toFixed(2);

  // Calculate the discounted price
  const discountedPrice = (totalPrice * (1 - discount / 100)).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCouponApply = () => {
    if (validCoupons[couponCode]) {
      // Update the discount based on the coupon
      dispatch(setToken({ token: couponCode, discount: validCoupons[couponCode] }));
      setValidCoupon(true);
      toast.success(`Coupon applied! You've got ${validCoupons[couponCode]}% off.`);
    } else {
      dispatch(clearToken());
      setValidCoupon(false);
      toast.error("Invalid coupon code.");
    }
  };

  const handleOrderNow = async () => {
    if (!userDetails.name || !userDetails.address || !userDetails.phone) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:12005/api/orders',
        {
          userId: currentUser.id,
          customerName: userDetails.name,
          address: userDetails.address,
          phone: userDetails.phone,
          foodItems: items,
          totalAmount: discountedPrice, // Use the discounted price
          paymentMethod: userDetails.paymentMethod,
          onlinePaymentMethod: userDetails.onlinePaymentMethod,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        setUserDetails({ name: '', address: '', phone: '', paymentMethod: 'cash', onlinePaymentMethod: null });
        setTimeout(() => navigate('/orderstatus'), 2000);
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
  <div className="text-center p-6">
    <h2 className="text-xl font-bold">Please sign in to proceed with checkout.</h2>
    <div className="grid place-self-center">
      <Button
        gradientDuoTone='purpleToPink'
        outline
        className="mt-4 w-24"
        color="purple"
        onClick={() => (window.location.href = '/sign-in')}
      >
        Sign In
      </Button>
    </div>
  </div>
</div>

    );
  }

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={userDetails.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="cash">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>

        {userDetails.paymentMethod === 'online' && (
          <div className="mb-4">
            <label className="block mb-1" htmlFor="onlinePaymentMethod">Select Online Payment Method</label>
            <select
              id="onlinePaymentMethod"
              name="onlinePaymentMethod"
              value={userDetails.onlinePaymentMethod}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="Bkash">Bkash</option>
              <option value="Nagad">Nagad</option>
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1" htmlFor="coupon">Coupon Code</label>
          <div className="flex">
            <input
              type="text"
              id="coupon"
              name="coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Enter coupon code"
            />
            <Button onClick={handleCouponApply} color="indigo" className="ml-2">Apply</Button>
          </div>
        </div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-bold">Total: ৳{discountedPrice}</h2>
          <Button
            color="purple"
            onClick={handleOrderNow}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Place Order'}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}

export default Checkout;
