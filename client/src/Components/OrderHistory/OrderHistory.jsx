// // src/components/OrderHistory.js
// import React, { useEffect, useState } from 'react';
// import { fetchOrderHistory } from '../services/api';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const getOrderHistory = async () => {
//       const orderHistory = await fetchOrderHistory();
//       setOrders(orderHistory);
//     };
//     getOrderHistory();
//   }, []);

//   return (
//     <div>
//       <h2>Order History</h2>
//       {orders.length > 0 ? (
//         <ul>
//           {orders.map((order) => (
//             <li key={order.id}>
//               Order #{order.id} - Status: {order.status} - Total: ${order.totalAmount}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
