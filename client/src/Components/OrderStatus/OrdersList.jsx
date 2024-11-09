// src/components/OrderList/OrderList.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';

function OrderList() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:12005/api/orders`, {
          params: { userId: currentUser.id },
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb-4 border p-4 rounded">
              <h3 className="font-semibold">Order ID: {order.id}</h3>
              <p>Status: {order.status}</p>
              <p>Total Amount: ৳{order.totalAmount}</p>
              <p>Food Items: {JSON.parse(order.foodItems).map(item => `${item.name} x${item.sliderQuantity}`).join(', ')}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderList;
