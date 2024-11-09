import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart, incrementSliderQuantity, decrementSliderQuantity, setToken, clearToken } from '../../Redux/CartSlice/cartSlice';
import { Button } from 'flowbite-react';
import { FiX, FiTrash, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Ensure the styles are imported

function CartSlider({ isOpen, onClose }) {
  const { items, discount, token } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  
  const validCoupons = {
    "#hungryfox#66": 10,
    "#hungryfox12": 15,
    "#hungryfox88": 20,
    "#hungryfox44": 5,
  };

  const handleCouponApply = () => {
    if (validCoupons[couponCode]) {
      const appliedDiscount = validCoupons[couponCode];
      dispatch(setToken({ token: couponCode, discount: appliedDiscount }));
      toast.success(`Coupon applied! You've got ${appliedDiscount}% off.`);
    } else {
      dispatch(clearToken());
      toast.error("Invalid coupon code.");
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const sliderVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
  };

  // Calculate total price excluding items with quantity 0 and applying discount
  const totalPrice = items.reduce((total, item) => {
    return item.sliderQuantity > 0 ? total + item.price * item.sliderQuantity : total;
  }, 0).toFixed(2);

  const discountedPrice = (totalPrice * (1 - discount / 100)).toFixed(2);

  const isCartEmpty = items.length === 0 || items.every(item => item.sliderQuantity === 0);

  return (
    <motion.div
      className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-6 overflow-y-auto"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sliderVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Cart</h2>
        <FiX className="cursor-pointer text-gray-500 dark:text-gray-400" onClick={onClose} />
      </div>

      {items.length > 0 ? (
        <>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}
                className="flex justify-between items-center mb-4"
              >
                <img src={item.imageUrl || '/placeholder.svg?height=50&width=50'} alt={item.name} className="w-12 h-12 object-cover" />
                <div className="flex-1 ml-2">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">৳{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2 mr-6">
                  <FiMinus
                    className="cursor-pointer text-gray-500 dark:text-gray-400"
                    onClick={() => {
                      dispatch(decrementSliderQuantity(item.id));
                    }}
                  />
                  <span className="text-center w-8">{item.sliderQuantity}</span>
                  <FiPlus
                    className="cursor-pointer text-gray-500 dark:text-gray-400"
                    onClick={() => {
                      dispatch(incrementSliderQuantity(item.id));
                    }}
                  />
                </div>
                <FiTrash className="text-red-500 cursor-pointer" onClick={() => dispatch(removeItem(item.id))} />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-4">
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Total: ৳{totalPrice}</p>
            {discount > 0 && (
              <p className="text-lg font-bold text-green-500">Discount Applied: {discount}%</p>
            )}
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Price after Discount: ৳{discountedPrice}</p>
          </div>

          <div className="mt-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button onClick={handleCouponApply} color="indigo" className="ml-2">Apply</Button>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button color="gray" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
            <Button
              gradientDuoTone="purpleToPink"
              outline
              color={isCartEmpty ? "red" : "success"}
              className="flex items-center space-x-2"
              disabled={isCartEmpty}
              onClick={handleCheckout}
            >
              <MdOutlineShoppingCartCheckout className="mt-1 mr-2" />
              <span>Checkout</span>
            </Button>
          </div>
          {isCartEmpty && (
            <p className="text-red-500 text-center mt-2">At least add one item.</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty</p>
      )}

      {/* ToastContainer component to show the toast */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />
    </motion.div>
  );
}

export default CartSlider;
