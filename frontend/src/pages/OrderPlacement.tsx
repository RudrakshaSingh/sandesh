import React from 'react';
import { CreditCard, Wallet, IndianRupee } from 'lucide-react';

const OrderPlacement = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Just a few more details to finish your invitation</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="e.g., Wedding Ceremony"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                rows={3}
                placeholder="Enter venue details"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span>Basic Package</span>
              <span>₹999</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Custom Design</span>
              <span>₹499</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Video Integration</span>
              <span>₹299</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total</span>
              <span>₹1,797</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-md cursor-pointer hover:border-orange-500">
              <input type="radio" name="payment" className="mr-3" />
              <CreditCard className="h-5 w-5 mr-2" />
              <span>Credit/Debit Card</span>
            </div>
            <div className="flex items-center p-4 border rounded-md cursor-pointer hover:border-orange-500">
              <input type="radio" name="payment" className="mr-3" />
              <Wallet className="h-5 w-5 mr-2" />
              <span>UPI</span>
            </div>
            <div className="flex items-center p-4 border rounded-md cursor-pointer hover:border-orange-500">
              <input type="radio" name="payment" className="mr-3" />
              <IndianRupee className="h-5 w-5 mr-2" />
              <span>Net Banking</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition font-semibold">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPlacement;