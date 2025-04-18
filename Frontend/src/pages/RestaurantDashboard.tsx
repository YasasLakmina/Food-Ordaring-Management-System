import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";

const RestaurantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Dashboard sidebar icons
  const dashboardIcon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
      />
    </svg>
  );

  const overviewIcon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
      />
    </svg>
  );

  const ordersIcon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.5"
      />
    </svg>
  );

  const addMenuIcon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 7.8v8.4M7.8 12h8.4m-4.2 9a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
      />
    </svg>
  );

  const menuItemsIcon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 8h10M9 12h10M9 16h10M5 8h.01M5 12h.01M5 16h.01"
      />
    </svg>
  );

  // Get initials for avatar
  const getInitials = (): string => {
    if (!user) return "";

    if (user.restaurantName) {
      const words = user.restaurantName.split(" ");
      return words.map((word) => word[0]?.toUpperCase() || "").join("");
    }

    return user.username.substring(0, 2).toUpperCase();
  };

  const sidebarLinks = [
    { name: "Overview", id: "overview", icon: overviewIcon },
    { name: "Orders", id: "orders", icon: ordersIcon },
    { name: "Add Menu", id: "add-menu", icon: addMenuIcon },
    { name: "Menu Items", id: "menu-items", icon: menuItemsIcon },
  ];

  // Tab navigation
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "orders":
        return <OrdersTab />;
      case "add-menu":
        return <AddMenuTab />;
      case "menu-items":
        return <MenuItemsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {" "}
      {/* Changed from bg-white */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
          {sidebarLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center py-3 px-4 gap-3 
                ${
                  item.id === activeTab
                    ? "border-r-4 md:border-r-[6px] bg-gray-100 border-black text-black" // Changed from indigo colors
                    : "hover:bg-gray-100/90 border-white text-gray-700"
                }`}
            >
              {item.icon}
              <p className="md:block hidden text-center">{item.name}</p>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-100">
          {" "}
          {/* Added bg-gray-100 */}
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Restaurant Dashboard</h1>
              <p className="text-gray-500">Manage your restaurant operations</p>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Components - Rest of your code remains the same
const OverviewTab: React.FC = () => {
  // Your existing OverviewTab code
  return (
    // ... existing code
    <div>
      <h2 className="text-xl font-semibold mb-4">Restaurant Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-bold">125</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-green-500 text-xs font-medium">+12% </span>
            <span className="text-gray-400 text-xs">from last month</span>
          </div>
        </div>

        {/* ... rest of your component ... */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <p className="text-2xl font-bold">$3,400</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-green-500 text-xs font-medium">+8% </span>
            <span className="text-gray-400 text-xs">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Menu Items</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="bg-orange-100 rounded-full p-3">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-green-500 text-xs font-medium">+2 </span>
            <span className="text-gray-400 text-xs">new items added</span>
          </div>
        </div>
      </div>

      {/* Rest of overview tab remains the same */}
      <h3 className="font-medium mb-3">Recent Orders</h3>
      <div className="overflow-x-auto">
        {/* Your existing table code */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #ORD-1234
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  John Doe
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2 items
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $25.99
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-700">
                  Delivered
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #ORD-1235
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  Sarah Smith
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                3 items
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $42.50
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Preparing
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrdersTab: React.FC = () => {
  // Keep your existing OrdersTab code
  return (
    // ... your existing code
    <div>
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>All Orders</option>
            <option>New</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Search orders..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #ORD-123{i}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Customer {i + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  April 15, 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {i + 1} items
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${(15.99 * (i + 1)).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      i % 3 === 0
                        ? "bg-gray-100 text-gray-700"
                        : i % 3 === 1
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {i % 3 === 0
                      ? "Delivered"
                      : i % 3 === 1
                      ? "Preparing"
                      : "Ready"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AddMenuTab: React.FC = () => {
  // Keep your existing AddMenuTab code
  return (
    // ... your existing code
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. Chicken Burger"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            <option value="burgers">Burgers</option>
            <option value="pizzas">Pizzas</option>
            <option value="desserts">Desserts</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Describe the menu item"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Upload
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Add Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};

const MenuItemsTab: React.FC = () => {
  // Keep your existing MenuItemsTab code
  return (
    // ... your existing code
    <div>
      <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Burgers</option>
            <option>Pizzas</option>
            <option>Desserts</option>
            <option>Drinks</option>
          </select>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            placeholder="Search items..."
          />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800">
          + New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                [Food Image]
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">Menu Item {i + 1}</h3>
              <p className="text-gray-500 text-sm mb-2">
                Category: {["Burger", "Pizza", "Dessert"][i % 3]}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold">${(8.99 + i).toFixed(2)}</span>
                <div className="space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
