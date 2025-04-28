import { useState } from "react";
import Header from "../components/Header";
import Additems from "../components/Additems";
import ViewItems from "../components/ViewItems";
import EditItems from "../components/EditItems";

function SellerDashboard() {
    const [activeView, setActiveView] = useState('add'); // Default to Add Items view

    const renderView = () => {
        switch(activeView) {
            case 'add':
                return <Additems />;
            case 'edit':
                return <EditItems />;
            case 'view':
                return <ViewItems />;
            default:
                return <Additems />;
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Dashboard Navigation */}
                    <div className="mb-8 bg-white shadow rounded-lg overflow-hidden">
                        <div className="flex flex-wrap">
                            <button
                                onClick={() => setActiveView('add')}
                                className={`px-6 py-3 font-medium text-sm md:text-base ${activeView === 'add' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                Add Items
                            </button>
                            <button
                                onClick={() => setActiveView('edit')}
                                className={`px-6 py-3 font-medium text-sm md:text-base ${activeView === 'edit' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                Edit Items
                            </button>
                            <button
                                onClick={() => setActiveView('view')}
                                className={`px-6 py-3 font-medium text-sm md:text-base ${activeView === 'view' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                View All Items
                            </button>
                            {/* Add more buttons as needed */}
                        </div>
                    </div>

                    {/* Active View Content */}
                    <div className="bg-white shadow rounded-lg p-6">
                        {renderView()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellerDashboard;