import { IoArrowBack } from "react-icons/io5";

export default function Activate2({ onBack }) {
  return (
    <div className="w-full  p-8 px-48">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-graycolor py-4"
      >
        <IoArrowBack /> Back to Store
      </button>
      <div className="flex flex-row justify-between items-start w-full bg-[#016FDE0A] rounded-lg px-12 p-4">
        <div className="flex flex-col py-6 space-y-4">
          <h1 className="text-[28px] font-bold text-black">
            Unlock Custom Domain for your site
          </h1>
          <p className="text-[16px] opacity-[0.44]">
            Manage your earnings efficiently
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-4">
          <img src="/dashboard/store/web.png" className="w-16" />
          <img src="/dashboard/store/search.png" className="" />
        </div>
      </div>

      <div className="w-full mt-8">
        <div>
          <h2 className="text-[20px] font-semibold text-black">Overview</h2>
          <p className="text-[16px] text-gray-600 mt-4">
            Upgrade your Spring store with the ability to connect your own
            custom domain. You've created a store, now take it to the next level
            with a custom domain. Create a space that is uniquely your own—one
            your fans can enjoy.
          </p>
          <p className="text-[16px] text-gray-600 mt-4">
            Every domain that points to a Spring site comes with a free SSL
            certificate so your visitors can see that your website is secured.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-[20px] font-semibold text-black">
            What's Included
          </h2>
          <ul className="text-[16px] text-gray-600 space-y-2 mt-4">
            <li className="flex items-start">
              <span className="text-graycolor mr-2">•</span>
              Connect your domain or subdomain by our Spring store
            </li>
            <li className="flex items-start">
              <span className="text-graycolor mr-2">•</span>
              Customise your store with elevated, personal branding
            </li>
            <li className="flex items-start">
              <span className="text-graycolor mr-2">•</span>
              Aurigue domain name increases discoverability for your fans
            </li>
          </ul>
        </div>
        <div className="w-full py-12 items-center justify-center text-center">
          <h3 className="text-[18px] font-semibold text-black">
            Upgrade your store with a custom domain
          </h3>
          <div className="flex items-center justify-center mt-4">
            <button className="bg-[#0166FF] text-white px-6 py-2 rounded-md hover:bg-[#0156CC] transition-colors">
              Activate - $12.0
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
