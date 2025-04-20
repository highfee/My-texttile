import React, { useState } from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

const Overview = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const mockUserData = {
        firstName: 'Rafin',
        lastName: 'Ahmed',
        street: '7529 E. Pecan St.',
        state: 'Austin',
        email: 'rafinahmed@babs.com',
        phoneNumber: '(217) 555-0113',
        postalCode: '45785',
        country: 'USA',
        bio: 'Nil',
        timezone: 'Eastern Standard Time',
    };

    const devices = [
        {
            name: "Rafs Macbook pro",
            type: "Chrome Browser",
            status: "Active",
            time: "a month ago",
            location: "Montana",
            image: "/dashboard/security/apple.svg",
        },
        {
            name: "Windows OS",
            type: "Chrome Browser",
            status: "Inactive",
            time: "6 months ago",
            location: "Montana",
            image: "/dashboard/security/windows.svg",
        },
        {
            name: "Firefox on Android",
            type: "Mobile phone",
            status: "Active",
            time: "2 months ago",
            location: "NYC",
            image: "/dashboard/security/firefox.svg",
        },
    ];

    return (
        <div className="bg-white rounded-md shadow-md min-h-screen p-2 lg:p-4 ">
            <div className="space-y-6">
                <div className=" p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <img src="/dashboard/Profile-pic.svg" alt="User Avatar" className="w-full h-full" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">Rafin Ahmed</p>
                                <p className="text-sm text-gray-500">Project Manager</p>
                                <p className="text-sm text-gray-500">Leeds, United Kingdom</p>
                                <p className="text-sm text-gray-500">User ID: aaa44706</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start ">
                        <p className='text-lg font-semibold py-2'>Tier</p>
                            <span className="inline-block  py-1 rounded-full text-xs font-semibold opacity-[0.44]">
                                Tier 3 (Professional)
                            </span>
                            <button className="inline-block px-4 py-1 rounded-md border bg-[#DCE7F2] text-bluebutton  text-sm">
                                Upgrade To Tier 4
                            </button>
                            
                        </div>
                        <button className="flex flex-row items-center gap-x-2 p-2 rounded-full cursor-pointer text-bluebutton hover:bg-blue-50">
                            <span className="">Edit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </button>
                    </div>
                </div>
                <div className="">
                    <div className="p-4">
                        <p className="text-lg font-semibold text-gray-900">Personal Information</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                        {Object.entries(mockUserData).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-sm font-medium text-gray-500">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </p>
                                <p className="text-sm text-graycolor font-semibold">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="">
                    <div className="p-4">
                        <p className="text-lg font-semibold text-gray-900">Login History / Devices</p>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-lg">
                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                <div className="grid grid-cols-4 text-sm font-medium pb-2 border-b border-gray-200">
                                    <span>Device</span>
                                    <span>Current session</span>
                                    <span>Location</span>
                                    <span>Action</span>
                                </div>
                                {devices.map((device, index) => (
                                    <div key={index} className="grid grid-cols-4 items-center text-sm text-gray-700 py-2 border-b border-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <img src={device.image} alt={device.name} className="w-8 h-8" />
                                            <div>
                                                <p className="font-medium">{device.name}</p>
                                                <p className="text-xs text-gray-500">{device.type}</p>
                                            </div>
                                        </div>
                                        <div  className='flex flex-col'>
                                        <div className={device.status === "Active" ? 'text-[#10B981]' : 'text-[#FF5789]'}>
                                            <p>{device.time}</p> <span className="text-xs">{device.status}</span>
                                        </div>
                                        </div>
                                        <div>{device.location}</div>
                                        <div className="text-[#FF5789] cursor-pointer">
                                            <Trash2 className="h-4 w-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="p-4">
                        <p className="text-lg font-semibold text-gray-900">Account</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Creation Date</p>
                            <p className="text-sm text-gray-700">23rd Nov. 2024</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-500">Password</p>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    value="********"
                                    className=" py-1  rounded-md text-sm text-gray-700"
                                    readOnly
                                />
                                
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold  text-[#10B981]">Active</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active products</p>
                            <p className="text-sm text-gray-700">54</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
