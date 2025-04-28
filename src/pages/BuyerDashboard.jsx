import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import CartComponent from "../components/CartComponent";
import OrdersComponent from "../components/OrdersComponent";

function BuyerDashboard() {
  const currentBuyer = useSelector(state => state.auth.userData?.email || '');
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back!</h1>
              <p className="text-gray-600">
                Ready to find your next favorite purchase?
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-purple-700">
                  Logged in as: {currentBuyer}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setActiveTab("cart")}
            className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === "cart"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-100"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="font-medium">Your Cart</span>
          </button>
          
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === "orders"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-100"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="font-medium">Your Orders</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {activeTab === "cart" && <CartComponent />}
          {activeTab === "orders" && <OrdersComponent />}
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;