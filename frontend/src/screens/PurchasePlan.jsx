import React from "react";
const PurchasePlan = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-[#f4d6c9] via-[#fc8e57] to-[#2a217c]">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">Purchase Plan</h1>
            <p className="mb-4">Choose a plan that suits you best!</p>
            {/* Add your plan options here */}
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            Purchase Now
            </button>
        </div>
        </div>
    );
}

export default PurchasePlan;