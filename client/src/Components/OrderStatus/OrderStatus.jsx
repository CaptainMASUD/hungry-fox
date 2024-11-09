// src/components/OrderStatus/OrderStatus.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
import { FaClock, FaTruck, FaCheckCircle } from 'react-icons/fa';


function OrderStatus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:12005/api/orders', {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Order Status</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="mb-4 border p-4 rounded">
              <h3 className="font-semibold">Order ID: {order.id}</h3>
              <p>Total Amount: ৳{parseFloat(order.totalAmount).toFixed(2)}</p>
              <p>Food Items: {JSON.parse(order.foodItems).map(item => `${item.name} x${item.sliderQuantity}`).join(', ')}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="flex items-center mt-2">
                {order.status === 'Pending' && <FaClock className="text-yellow-500 mr-2" />}
                {order.status === 'In-Delivery' && <FaTruck className="text-blue-500 mr-2" />}
                {order.status === 'Completed' && <FaCheckCircle className="text-green-500 mr-2" />}
                <span className="font-semibold">{order.status}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderStatus;
