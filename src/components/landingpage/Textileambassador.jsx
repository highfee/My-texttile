import Link from "next/link";

const TextileAmbassador = () => {
    return (
      <div className=" items-center justify-center bg-ambassador">
        <div className="grid md:grid-cols-3 w-full py-16 gap-6 px-4 md:px-16 items-center text-center">
          <div className="order-1 md:order-2 p-8 shadow-md rounded-lg border border-[#12121270]">
            <h1 className="text-2xl font-bold mb-4">Become A MyTextil Ambassador</h1>
            <p className="text-[#12121270] text-sm mb-6">
              Are you passionate about fashion and content creation? Partner with MyTextil and earn rewards while growing your brand.
            </p>
            <Link href="https://forms.gle/Ji49zTNSAk9kd7jX7" className="bg-[#016FDE] text-white px-6 py-2 rounded-full text-sm font-medium">
              Apply Now
            </Link>
            <p className="mt-4 text-[#12121270] text-sm underline cursor-pointer">Read more</p>
          </div>
          <div className="order-2 md:order-1 flex flex-col md:items-start text-[#12121270] items-center space-y-4 lg:p-3 md:pl-8">
            <h2 className="text-lg font-semibold text-black">Benefits</h2>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Up to 25% commission on successful referrals.
            </button>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Access to brand materials, templates, & more
            </button>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Connect with top industry leaders.
            </button>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Priority Perks
            </button>
          </div>
          <div className="order-3 md:order-3 flex flex-col md:items-start text-[#12121270] items-center space-y-4  lg:p-3 lg:pl-12">
            <h2 className="text-lg font-semibold text-black">Who Can Apply?</h2>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Fashion Bloggers & Digital Content Creators
            </button>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Content Creators & Influencers
            </button>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Social Media Enthusiasts
            </button>
            <button className="px-4 py-2 border border-[#12121270] rounded-lg text-sm">
              Community Builders
            </button>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default TextileAmbassador;
  