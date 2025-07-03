import useAuthStore from "@/store/authStore";
import { useState, useEffect } from "react";
import { useUpdateUserProfile } from "@/store/apiCalls/useDesignStore";
import { Loader } from "lucide-react";
import { GetCountries } from "@/pages/api/countries";

const EditProfile = ({ isOpen, onClose }) => {
  const { session } = useAuthStore();

  const [formData, setFormData] = useState({
    first_name: session?.user?.first_name || "",
    last_name: session?.user?.last_name || "",
    password: "",
    profile_photo: session?.user?.profile_photo || "",
    email: session?.user?.email || "",
    phone_number: session?.user?.phone_number || "",
    country_code: session?.user?.country_code || "",
  });

  const { mutate, isLoading } = useUpdateUserProfile();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await GetCountries();
        //const data = response.json();
        //console.log(response);
        setCountries(response);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country_code") {
      const selectedCountry = countries.find((c) => c.countryCode === value);
      if (selectedCountry) {
        setFormData((prev) => ({
          ...prev,
          country_code: value,
          country: selectedCountry.name,
        }));
      } else {
        setFormData((prev) => ({ ...prev, country_code: value }));
      }
    } else if (name === "country") {
      const selectedCountry = countries.find((c) => c.name === value);
      if (selectedCountry) {
        setFormData((prev) => ({
          ...prev,
          country: value,
          country_code: selectedCountry.countryCode,
          postalCode: selectedCountry.postalCode || "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, country: value }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative h-4/5  lg:h-5/6 overflow-y-auto space-y-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          className="absolute top-2 right-2 text-graycolor hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold">Update Profile</h2>
        <p className="text-xs text-graycolor opacity-[0.44]">
          Set your preferred payout day. Standard payouts process within 7 days,
          while Pro users can enjoy faster options like 24-hour or immediate
          payouts.
        </p>
        <h3 className="text-sm font-semibold">Withdrawal Method</h3>
        <select className="w-full p-2 border rounded">
          <option>Direct Bank Deposit</option>
        </select>
        <h3 className="text-sm font-semibold">Personal Information</h3>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter First Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Enter Last Name"
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled
          placeholder="Email address"
          className="w-full p-2 border rounded"
        />
        <label className="block text-sm font-medium">Mobile Number</label>
        <div className="flex space-x-2">
          <select
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            className="p-2 border rounded w-1/4"
          >
            <option value="">Code</option>
            {countries.map((country) => (
              <option key={country.code} value={country.countryCode}>
                {country.countryCode}
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="w-3/4 p-2 border rounded"
          />
        </div>
        <h3 className="text-sm font-semibold">Address Details</h3>
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          placeholder="12 St. Lois, LA"
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium">Bio</label>
        <textarea
          placeholder="Text here"
          className="w-full p-2 border rounded"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border rounded">Cancel</button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-bluebutton text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? <Loader className=" animate-spin" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
