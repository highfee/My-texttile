export default function Integrations() {
    const integrations = [
      {
        name: "Youtube Shop",
        description: "List product on YouTube live and Youtube store",
        image: "/dashboard/integrations/youtube.svg",
        status: "Active",
        buttonText: "Unlink",
        buttonStyle: "bg-[#FF57891A] text-[#FF5789] border border-[#FF5789] px-3 py-1 text-sm rounded-md",
      },
      {
        name: "TikTok Shop",
        description: "Sell with ease on TikTok store",
        image: "/dashboard/integrations/tiktok.svg",
        status: "Inactive",
        buttonText: "Connect",
        buttonStyle: "bg-bluebutton text-white px-4 py-1 text-sm rounded-md",
      },
      {
        name: "MangaAI",
        description:
          "Leverage AI tools to generate unique designs, enhance images, or refine existing artwork with ease.",
          image: "/dashboard/integrations/mongo.svg",
          status: "Inactive",
        buttonText: "Connect",
        buttonStyle: "bg-bluebutton text-white px-4 py-1 text-sm rounded-md",
      },
    ];
  
    return (
      <div className="w-full h-full">
        <div className="bg-bluebutton text-white p-6 rounded-t-lg">
          <h2 className="text-lg font-semibold leading-6">
            Unlock the full power of MyTextil with additional apps to boost your security.
          </h2>
          <div className="flex items-center space-x-4 text-sm mt-2">
            <button className="text-white underline">+ Request Integration</button>
            <button className="text-white underline">Help</button>
          </div>
        </div>
          <div className="bg-white p-2 lg:p-4 rounded-b-lg">
          {integrations.map((app, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center space-x-4">
                <img src={app.image} alt={app.name} className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="font-medium text-sm">{app.name}</h3>
                  <p className="text-gray-500 text-xs">{app.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {app.status === "Active" && (
                  <span className="bg-green-100 bg-[#2CDA9433] text-[#12CB94] px-3 py-1 text-xs rounded-md">
                    {app.status}
                  </span>
                )}
                <button className={app.buttonStyle}>{app.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  