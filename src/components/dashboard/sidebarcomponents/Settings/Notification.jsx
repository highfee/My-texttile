import { useState } from "react";
import { Switch } from "@headlessui/react";

const notifications = [
  { category: "Email Notification", description: "Get emails to find out what's going on when you're not online. You can turn these off.", items: [
    { name: "Order confirmations", description: "Real-time updates on new orders." },
    { name: "Shipment updates", description: "Track your orders from processing to delivery." },
    { name: "Low inventory alerts", description: "Be notified when your favorite products are running low." },
    { name: "New customer sign-ups", description: "Stay ahead of the latest trends and offers." },
    { name: "Sales reports", description: "Gain insights into your sales performance." },
    { name: "Newsletter subscriptions", description: "Receive exclusive deals and news." },
  ]},
  { category: "Push Notifications", description: "Get instant alerts on your device:", items: [
    { name: "New orders", description: "Be the first to know when you have a new order." },
    { name: "Product reviews", description: "Stay updated on customer feedback." },
    { name: "Sales and promotions", description: "Never miss a deal or discount." },
    { name: "Message notifications", description: "Stay ahead of the latest trends and offers." },
  ]},
  { category: "SMS Notifications", description: "Receive essential updates via SMS", items: [
    { name: "Order Confirmations", description: "Real-time order confirmation." },
    { name: "Shipment Updates", description: "Track your orders progress." },
    { name: "Payment", description: "Stay on top of your payments." },
  ]}
];

export default function NotificationSettings() {
  const [enabled, setEnabled] = useState(
    Object.fromEntries(notifications.flatMap(({ items }) => items.map(item => [item.name, true])))
  );

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Notification</h2>
      {notifications.map(({ category, description, items }) => (
        <div key={category} className=" grid grid-cols-1 lg:grid-cols-2 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="space-y-2">
            {items.map(({ name, description }) => (
              <div key={name} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="text-sm font-medium text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
                <Switch
                  checked={enabled[name]}
                  onChange={() => setEnabled(prev => ({ ...prev, [name]: !prev[name] }))}
                  className={`${enabled[name] ? "bg-blue-600" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
                >
                  <span
                    className={`${enabled[name] ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full transition-all`}
                  />
                </Switch>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
