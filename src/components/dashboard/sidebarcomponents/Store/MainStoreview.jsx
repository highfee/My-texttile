import { IoIosLink } from "react-icons/io";

export default function MainStoreview({ setActiveComponent, showOverlay, setShowOverlay, showOverlay1, setShowOverlay1 }) {
  return (
    <div className="px-2 lg:px-10">
      <div className="border p-2 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <img src="/dashboard/appearance/Modelight.png" />
          <div>
            <a href="#" className="text-blue-600 underline">
              https://www.my-store-1029a69b.com
            </a>
            <h2 className="text-xl font-bold">my-store-1029a69b</h2>
            <p className="opacity-[0.44]">
              Welcome to your custom print-on-demand store! Here
            </p>
          </div>
          <div className="flex flex-row lg:flex-col gap-2 lg:ml-auto">
            <button
              className="bg-bluebutton text-white px-4 py-2 rounded"
              onClick={() => setActiveComponent("setup")}
            >
              Setup store
            </button>
            <button
              className="bg-[#016FDE1A] text-graycolor px-4 py-2 rounded"
              onClick={() => setActiveComponent("viewSites")}
            >
              View stores
            </button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-4">
        <div className="border p-4 rounded-md text-center space-y-4">
          <div className="flex justify-center">
            <IoIosLink className="text-3xl" />
          </div>
          <p className="font-bold">Purchase new domain</p>
          <p className="opacity-[0.44]">$12.9/year</p>
          <button
            className="bg-bluebutton text-white px-4 py-2 rounded mt-2"
            onClick={() => setActiveComponent("domain1")}
          >
            Activate
          </button>
        </div>
        <div className="border p-4 rounded-md text-center space-y-4">
          <div className="flex justify-center">
            <IoIosLink className="text-3xl" />
          </div>
          <p className="font-bold">Purchase new domain</p>
          <p className="opacity-[0.44]">$12.0/year</p>
          <button
            className="bg-bluebutton text-white px-4 py-2 rounded mt-2"
            onClick={() => setActiveComponent("domain2")}
          >
            Activate
          </button>
          <p className="opacity-[0.44] text-xs">
            *Free connection when you buy a domain through Mytextil
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-10 mt-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-left">Desktop View</h3>
          <p className="opacity-[0.44]">Manage your earnings efficiently</p>

          <div
            className="relative flex justify-center py-4"
            onMouseEnter={() => setShowOverlay1(true)}
            onMouseLeave={() => setShowOverlay1(false)}
          >
            <img
              src="/dashboard/store/desktop.png"
              alt="Desktop View"
              width={600}
              height={400}
            />

            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4 lg:hidden ${
                showOverlay1 ? "" : "hidden"
              }`}
            >
              <h3 className="text-sm font-semibold">For Better Experience, Edit</h3>
              <p className="text-lg font-bold">Store On Desktop</p>
              <p className="underline">Visit store on Desktop</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-left">Mobile View</h3>
          <p className="opacity-[0.44]">Manage your earnings efficiently</p>

          <div
            className="relative flex justify-center py-4"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <img
              src="/dashboard/store/mobile.png"
              alt="Mobile View"
              width={300}
              height={500}
            />

            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4 lg:hidden ${
                showOverlay ? "" : "hidden"
              }`}
            >
              <h3 className="text-sm font-semibold">For Better Experience, Edit</h3>
              <p className="text-lg font-bold">Store On Desktop</p>
              <p className="underline">Visit store on Desktop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}