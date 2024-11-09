// src/components/Restricted.js
import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const Restricted = () => {
  return (
    <div className="flex items-center justify-center h-screen text-red-500">
      <FiAlertTriangle className="text-5xl mr-4" />
      <h2 className="text-3xl">Access Restricted: Admins Only</h2>
    </div>
  );
};

export default Restricted;
