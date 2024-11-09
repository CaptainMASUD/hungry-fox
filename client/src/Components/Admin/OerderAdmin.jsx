import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'flowbite-react';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All'); // Default filter is 'All'
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Fetch orders for admin
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:12005/api/orders/all', {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on selected status or search query
  useEffect(() => {
    filterOrders(selectedStatus);
  }, [orders, selectedStatus, searchQuery]);

  const filterOrders = (status) => {
    let filtered = orders;

    if (status !== 'All') {
      filtered = orders.filter((order) => order.status === status);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  // Handle status update
  const handleStatusUpdate = async (orderId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:12005/api/orders/${orderId}/status`,
        { status },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success('Order status updated!');
        // Update the order status locally without fetching again
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
        );
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Handle delete order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:12005/api/orders/${orderId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('Order deleted');
        // Remove the deleted order from the local state
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      }
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Order Management</h1>

      {/* Flex container for toggle buttons and search input */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
          <Button
            onClick={() => setSelectedStatus('All')}
            color={selectedStatus === 'All' ? 'indigo' : 'gray'}
            size="sm"
            className="mb-2 md:mb-0"
          >
            All Orders
          </Button>
          <Button
            onClick={() => setSelectedStatus('Pending')}
            color={selectedStatus === 'Pending' ? 'indigo' : 'gray'}
            size="sm"
            className="mb-2 md:mb-0"
          >
            Pending
          </Button>
          <Button
            onClick={() => setSelectedStatus('In-Delivery')}
            color={selectedStatus === 'In-Delivery' ? 'indigo' : 'gray'}
            size="sm"
            className="mb-2 md:mb-0"
          >
            In-Delivery
          </Button>
          <Button
            onClick={() => setSelectedStatus('Completed')}
            color={selectedStatus === 'Completed' ? 'indigo' : 'gray'}
            size="sm"
            className="mb-2 md:mb-0"
          >
            Completed
          </Button>
        </div>

        {/* Search Input with Search Icon */}
        <div className="flex justify-end w-full md:w-auto mt-4 md:mt-0">
          <div className="relative w-full md:max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Customer, Phone, or Address"
              className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {/* Search Icon inside the input */}
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <Table hoverable>
          <thead className="bg-indigo-600 text-white dark:bg-indigo-800 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Customer Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Address</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Phone Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{order.customerName}</td>
                <td className="px-6 py-4 text-sm font-medium">${order.totalAmount}</td>
                <td className="px-6 py-4 text-sm font-medium">{order.address}</td>
                <td className="px-6 py-4 text-sm font-medium">{order.phone}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In-Delivery">In-Delivery</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Button
                    color="red"
                    size="sm"
                    onClick={() => handleDeleteOrder(order.id)}
                    className="flex items-center dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    <FiTrash2 className="mr-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default OrderAdmin;
