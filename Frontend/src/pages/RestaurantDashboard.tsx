import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  fetchRestaurantProfile,
  fetchMenuItems,
  fetchOrders,
  updateMenuItem,
  deleteMenuItem,
  addMenuItem,
  updateOrderStatus,
  toggleOpenCloseStatus,
} from "../redux/slices/restaurantSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { AppDispatch } from "../redux/store";

// Menu Item Form Component (would be separated in production)
interface MenuItemFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isAvailable: boolean;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      isAvailable: true,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "price"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        >
          <option value="">Select a category</option>
          <option value="appetizer">Appetizer</option>
          <option value="main">Main Course</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <input
          type="text"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isAvailable"
          id="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label
          htmlFor="isAvailable"
          className="ml-2 block text-sm text-gray-700"
        >
          Available
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md text-sm"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

const RestaurantDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("orders");
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<any>(null);
  const [orderStatusUpdating, setOrderStatusUpdating] = useState<string | null>(
    null
  );

  // Get data from Redux store
  const { profile, menuItems, orders, loading, error } = useSelector(
    (state: RootState) => state.restaurant
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch data on component mount
  useEffect(() => {
    console.log("Restaurant Dashboard mounting...");
    dispatch(fetchRestaurantProfile());
    dispatch(fetchMenuItems());
    dispatch(fetchOrders());

    // Refresh orders every minute
    const orderRefreshInterval = setInterval(() => {
      if (activeTab === "orders") {
        dispatch(fetchOrders());
      }
    }, 60000);

    return () => {
      clearInterval(orderRefreshInterval);
    };
  }, [dispatch, activeTab]);

  // Update the handleMenuItemSubmit function
  const handleMenuItemSubmit = (data: any) => {
    console.log("Submitting menu item:", data);
    if (editingMenuItem) {
      dispatch(
        updateMenuItem({
          id: editingMenuItem._id,
          data,
        })
      )
        .then(() => {
          setEditingMenuItem(null);
          console.log("Menu item updated successfully");
        })
        .catch((err) => {
          console.error("Error updating menu item:", err);
          // Add error handling UI here
        });
    } else {
      dispatch(addMenuItem(data))
        .then((result) => {
          console.log("Menu item added successfully:", result);
          setIsAddingMenuItem(false);
        })
        .catch((err) => {
          console.error("Error adding menu item:", err);
          // Add error handling UI here
        });
    }
  };

  // Handle order status update
  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrderStatusUpdating(orderId);
    dispatch(updateOrderStatus({ id: orderId, status: newStatus })).finally(
      () => {
        setOrderStatusUpdating(null);
      }
    );
  };

  // Handle restaurant open/close toggle
  const handleOpenCloseToggle = () => {
    if (profile) {
      dispatch(toggleOpenCloseStatus(!profile.openCloseStatus));
    }
  };

  // Format timestamp to readable date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Orders</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status Filters:</span>
                <select className="text-sm border rounded p-1">
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {loading.orders ? (
              <LoadingSpinner />
            ) : error.orders ? (
              <div className="bg-red-50 p-4 text-red-700 rounded">
                {error.orders}
              </div>
            ) : (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No orders found.
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white p-4 rounded-lg border"
                    >
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <h3 className="font-medium">{order.customerName}</h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`text-sm px-2 py-1 rounded ${
                              order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "preparing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "ready"
                                ? "bg-green-100 text-green-800"
                                : order.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                          <p className="text-sm font-medium mt-1">
                            ${order.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="py-3 border-b">
                        <h4 className="text-sm font-medium mb-2">
                          Order Items
                        </h4>
                        <ul className="space-y-2">
                          {order.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.quantity}x {item.menuItemId.name}
                              </span>
                              <span>
                                $
                                {(
                                  item.menuItemId.price * item.quantity
                                ).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm">
                            <strong>Contact:</strong> {order.customerContact}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            disabled={orderStatusUpdating === order._id}
                            className="text-sm border rounded p-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="out for delivery">
                              Out for Delivery
                            </option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );

      case "menu":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Menu Management</h2>
              {!isAddingMenuItem && !editingMenuItem && (
                <button
                  onClick={() => setIsAddingMenuItem(true)}
                  className="bg-black text-white px-4 py-2 rounded-md text-sm"
                >
                  Add New Item
                </button>
              )}
            </div>

            {isAddingMenuItem || editingMenuItem ? (
              <div className="bg-white p-6 rounded-lg border mb-6">
                <h3 className="text-lg font-medium mb-4">
                  {editingMenuItem ? "Edit Menu Item" : "Add Menu Item"}
                </h3>
                <MenuItemForm
                  initialData={editingMenuItem}
                  onSubmit={handleMenuItemSubmit}
                  onCancel={() => {
                    setIsAddingMenuItem(false);
                    setEditingMenuItem(null);
                  }}
                />
              </div>
            ) : null}

            {loading.menu ? (
              <LoadingSpinner />
            ) : error.menu ? (
              <div className="bg-red-50 p-4 text-red-700 rounded">
                {error.menu}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 col-span-full">
                    No menu items found. Add your first item!
                  </div>
                ) : (
                  menuItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-lg border overflow-hidden"
                    >
                      <div className="h-40 bg-gray-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <span className="font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                            {item.category}
                          </span>
                          <span
                            className={`ml-2 text-xs px-2 py-1 rounded ${
                              item.isAvailable
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.isAvailable ? "Available" : "Unavailable"}
                          </span>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingMenuItem(item)}
                            className="text-sm px-3 py-1 border rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this item?"
                                )
                              ) {
                                dispatch(deleteMenuItem(item._id));
                              }
                            }}
                            className="text-sm px-3 py-1 border border-red-400 text-red-600 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Restaurant Profile</h2>
            {loading.profile ? (
              <LoadingSpinner />
            ) : error.profile ? (
              <div className="bg-red-50 p-4 text-red-700 rounded">
                {error.profile}
              </div>
            ) : profile ? (
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                      {profile.profileImage ? (
                        <img
                          src={profile.profileImage}
                          alt={profile.restaurantName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {profile.restaurantName}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 mr-3">
                          {profile.location}
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm mr-1">Rating:</span>
                          <span className="text-sm font-medium">
                            {profile.ratings} ★
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Restaurant Status</h4>
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-4 h-4 rounded-full mr-2 ${
                            profile.openCloseStatus
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        <span className="text-sm">
                          {profile.openCloseStatus ? "Open" : "Closed"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleOpenCloseToggle}
                      className={`w-full py-2 rounded-md text-center text-white font-medium ${
                        profile.openCloseStatus
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {profile.openCloseStatus
                        ? "Mark as Closed"
                        : "Mark as Open"}
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                    <div>
                      <h4 className="text-sm text-gray-500">
                        Contact Information
                      </h4>
                      <dl className="mt-2 space-y-2">
                        <div>
                          <dt className="text-sm font-medium">Email</dt>
                          <dd>{profile.email}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium">Phone</dt>
                          <dd>{profile.contactNumber}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-500">Business Hours</h4>
                      <dl className="mt-2 space-y-2">
                        <div>
                          <dt className="text-sm font-medium">Opening Time</dt>
                          <dd>{profile.openTime}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium">Closing Time</dt>
                          <dd>{profile.closeTime}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium mb-4">Additional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium">Delivery Range</h5>
                        <p>{profile.deliveryRange} km</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t flex justify-end">
                    <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No profile information available.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden mt-16">
        {/* Sidebar */}
        <div className="w-64 border-r h-full border-gray-300 bg-white pt-6 flex flex-col">
          <div className="px-6 mb-6">
            <h2 className="font-semibold text-xl">
              {user?.restaurantName || "Restaurant"}
            </h2>
            <p className="text-sm text-gray-600">Dashboard</p>
          </div>

          <nav className="flex-1">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full px-6 py-3 text-left ${
                    activeTab === "orders"
                      ? "bg-gray-100 font-medium border-l-4 border-black"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("menu")}
                  className={`w-full px-6 py-3 text-left ${
                    activeTab === "menu"
                      ? "bg-gray-100 font-medium border-l-4 border-black"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Menu Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full px-6 py-3 text-left ${
                    activeTab === "profile"
                      ? "bg-gray-100 font-medium border-l-4 border-black"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Restaurant Profile
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
