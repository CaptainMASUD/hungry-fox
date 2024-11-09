'use client'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiPlusCircle, FiList, FiUsers, FiUser, FiLogOut, FiMoon, FiSun, FiEdit, FiTrash2, FiShield } from 'react-icons/fi'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";
import {
  fetchAllFoodItems,
  addFoodItem,
  deleteFoodItem,
  updateFoodItem,
  fetchAllUsers,
  editUser,
  deleteUser,
  getFoodItemsCount
} from '../services/Api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from 'flowbite-react'

export default function AdminPanel() {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('add')
  const [foodItems, setFoodItems] = useState([])
  const [users, setUsers] = useState([])
  const [foodItemsCount, setFoodItemsCount] = useState(0)
  const [newFoodItem, setNewFoodItem] = useState({ name: '', category: '', price: '', image: null })
  const [editingFoodItem, setEditingFoodItem] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const authenticateUser = () => {
      if (currentUser && currentUser.isAdmin) {
        setIsAuthenticated(true)
        loadFoodItems()
        loadUsers()
        loadFoodItemsCount()
      } else if (currentUser) {
        navigate('/')
      } else {
        navigate('/sign-in')
      }
    }

    authenticateUser()
  }, [currentUser, navigate])

  const loadFoodItems = async () => {
    try {
      const data = await fetchAllFoodItems()
      setFoodItems(data)
    } catch (error) {
      console.error('Error fetching food items', error)
    }
  }

  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users', error)
    }
  }

  const loadFoodItemsCount = async () => {
    try {
      const countData = await getFoodItemsCount()
      if (countData && typeof countData.count === 'number') {
        setFoodItemsCount(countData.count)
      } else {
        console.error('Unexpected data format for food items count:', countData)
        setFoodItemsCount(0)
      }
    } catch (error) {
      console.error('Error fetching food items count', error)
      setFoodItemsCount(0)
    }
  }

  const handleAddFood = async () => {
    setLoading(true)
    try {
      await addFoodItem(newFoodItem)
      toast('Food item added successfully!')
      loadFoodItems()
      loadFoodItemsCount()
      setNewFoodItem({ name: '', category: '', price: '', image: null })
    } catch (error) {
      console.error('Error adding food item', error)
      toast.error('Failed to add food item.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateFood = async () => {
    if (!editingFoodItem) return
    setLoading(true)

    try {
      const updatedFoodItem = {
        ...editingFoodItem,
        image: editingFoodItem.image || foodItems.find(item => item.id === editingFoodItem.id)?.imageUrl,
      }

      await updateFoodItem(editingFoodItem.id, updatedFoodItem)
      toast('Food item updated successfully!')
      loadFoodItems()
      setEditingFoodItem(null)
    } catch (error) {
      console.error('Error updating food item', error)
      toast.error('Failed to update food item.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFood = async (id) => {
    try {
      await deleteFoodItem(id)
      toast('Food item deleted successfully!')
      loadFoodItems()
      loadFoodItemsCount()
    } catch (error) {
      console.error('Error deleting food item', error)
      toast.error('Failed to delete food item.')
    }
  }

  const handleUpdateUser = async () => {
    if (!editingUser) return
    setLoading(true)

    try {
      await editUser(editingUser.id, editingUser)
      toast('User updated successfully!')
      loadUsers()
      setEditingUser(null)
    } catch (error) {
      console.error('Error updating user', error)
      toast.error('Failed to update user.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id)
      toast('User deleted successfully!')
      loadUsers()
    } catch (error) {
      console.error('Error deleting user', error)
      toast.error('Failed to delete user.')
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/sign-in')
  }

  const cancelEditFood = () => {
    setEditingFoodItem(null)
  }

  const cancelEditUser = () => {
    setEditingUser(null)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={`min-h-screen  flex flex-col md:flex-row ${isDarkMode ? 'dark' : ''}`}>
      <div className="w-full md:w-64 bg-gray-800 text-white p-6 ">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <button
            className={`flex items-center w-full p-3 mb-2 ${activeTab === 'add' ? 'bg-blue-600' : 'hover:bg-gray-700'} rounded`}
            onClick={() => setActiveTab('add')}
          >
            <MdOutlineDashboardCustomize className="mr-2" /> Add Food Item
          </button>
          <button
            className={`flex items-center w-full p-3 mb-2 ${activeTab === 'food' ? 'bg-blue-600' : 'hover:bg-gray-700'} rounded`}
            onClick={() => setActiveTab('food')}
          >
            <MdOutlineFoodBank className="mr-2" /> Manage Food Items
          </button>
          <button
            className={`flex items-center w-full p-3 mb-2 ${activeTab === 'users' ? 'bg-blue-600' : 'hover:bg-gray-700'} rounded`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers className="mr-2" /> Manage Users
          </button>
          <button
            className={`flex items-center w-full p-3 mb-2 ${activeTab === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-700'} rounded`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser className="mr-2" /> Profile
          </button>
        </nav>
      </div>

      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-8 overflow-y-auto">
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition: Bounce
/>

        {activeTab === 'add' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Add New Food Item</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Food Name"
                value={newFoodItem.name}
                onChange={(e) => setNewFoodItem({ ...newFoodItem, name: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Food Category"
                value={newFoodItem.category}
                onChange={(e) => setNewFoodItem({ ...newFoodItem, category: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Food Price"
                value={newFoodItem.price}
                onChange={(e) => setNewFoodItem({ ...newFoodItem, price: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <input
                type="file"
                onChange={(e) => setNewFoodItem({ ...newFoodItem, image: e.target.files[0] })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
              />
              <Button
              gradientDuoTone='purpleToPink'
              outline
              
                onClick={handleAddFood}
                className=""
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Food Item'}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Manage Food Items</h3>
            <div className="space-y-4">
              {foodItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  {editingFoodItem && editingFoodItem.id === item.id ? (
                    <div className="flex-1 mr-4">
                      <input
                        type="text"
                        value={editingFoodItem.name}
                        onChange={(e) => setEditingFoodItem({ ...editingFoodItem, name: e.target.value })}
                        className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:text-white"
                      />
                      <input
                        type="text"
                        value={editingFoodItem.category}
                        onChange={(e) => setEditingFoodItem({ ...editingFoodItem, category: e.target.value })}
                        className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:text-white"
                      />
                      <input
                        type="number"
                        value={editingFoodItem.price}
                        onChange={(e) => setEditingFoodItem({ ...editingFoodItem, price: e.target.value })}
                        className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:text-white"
                      />
                      <input
                        type="file"
                        onChange={(e) => setEditingFoodItem({ ...editingFoodItem, image: e.target.files[0] })}
                        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                      />
                      <div className="flex space-x-2">
                        <Button
                        gradientDuoTone='purpleToBlue'
                        outline
                          onClick={handleUpdateFood}
                          className="bg-red-500 text-white  mt-4 hover:bg-blue-600"
                          disabled={loading}
                        >
                          {loading ? 'Updating...' : 'Update Food Item'}
                        </Button>
                        <button
                          onClick={cancelEditFood}
                          className="bg-red-400 text-white px-4 mt-4 py-2 rounded hover:bg-red-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-4">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt="Food"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h4 className="text-lg font-semibold dark:text-white">{item.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{item.category}</p>
                          <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingFoodItem(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteFood(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Manage Users</h3>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  {editingUser && editingUser.id === user.id ? (
                    <div className="flex-1 mr-4">
                      <input
                        type="text"
                        value={editingUser.username}
                        onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                        className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:text-white"
                      />
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:text-white"
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={!!editingUser.isAdmin}
                          onChange={(e) => setEditingUser({ ...editingUser, isAdmin: e.target.checked })}
                        />
                        <span className="dark:text-white">Admin</span>
                      </label>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleUpdateUser}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          disabled={loading}
                        >
                          {loading ? 'Updating...' : 'Update User'}
                        </button>
                        <button
                          onClick={cancelEditUser}
                          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-4">
                        <FiShield className="text-2xl" />
                        <div>
                          <h4 className="text-lg font-semibold dark:text-white">
                            {user.username}
                            {user.isAdmin && (
                              <span className="ml-2 text-xs text-white bg-blue-600 px-2 py-1 rounded">Admin</span>
                            )}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Admin Profile</h3>
            <FiShield className="text-6xl text-blue-600 mx-auto mb-4" />
            <p className="text-xl dark:text-white">{currentUser.username}</p>
            <div className='flex justify-center'>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 mt-4 flex rounded hover:bg-red-600"
            >
              <FiLogOut className="mr-2 mt-1" /> Logout
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
