import React, { useState } from 'react';
import { Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun, FaRegUserCircle } from "react-icons/fa";
import { GiFox } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../../Redux/Theme/ThemeSlice';
import { logout } from '../../Redux/UserSlice/userSlice';
import CartSlider from '../CartSlider/CartSlider';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const cartItemsCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Navbar className="border-b-2">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Hungry</span>
          <GiFox className="mt-2" />
        </Link>

        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>

        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>

          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center">
                  <FaRegUserCircle className="text-2xl text-gray-600" />
                </div>
              }
              className="w-64"
            >
              <Dropdown.Header>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-sm">{currentUser.username}</span>
                    <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                  </div>
                  {currentUser.isAdmin && (
                    <label className="text-xs text-green-500 ml-2">Admin</label>
                  )}
                </div>
              </Dropdown.Header>

              <Link to={currentUser.isAdmin ? '/admin' : '/userprofile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>

              {/* Conditionally render Control Orders for Admin users */}
              {currentUser.isAdmin && (
                <Link to="/adminorderpanel">
                  <Dropdown.Item>Control Orders</Dropdown.Item>
                </Link>
              )}

              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}
        </div>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/getoffers"} as={"div"}>
            <Link to="/getoffers">Get offers</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/project"} as={"div"}>
            <Link to="/aboutus">About us</Link>
          </Navbar.Link>

          {/* Cart Icon next to navigation items */}
          <div className="relative flex items-center">
            <FiShoppingCart className="cursor-pointer" onClick={() => setIsCartOpen(true)} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItemsCount}
              </span>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* Cart Slider */}
      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;
