import Link from 'next/link';
import React from 'react';

const Movement = () => {
  const features = [
    {
      title: 'EARN THROUGH ENGAGEMENT',
      description: 'Participate in promotional campaigns and referral programs.'
    },
    {
      title: 'EXCLUSIVE ACCESS',
      description: 'Participate in promotional campaigns and referral programs.'
    },
    {
      title: 'SPONSORSHIP',
      description: 'Stand a great chance for your business sponsorship.'
    },
    {
      title: 'COLLABORATE & CONNECT',
      description: 'Engage with a vibrant community of creators.'
    }
  ];

  return (
    <section className="py-8 md:py-16 lg:px-4 ">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center px-4 lg:px-16">
        <div className="space-y-6 text-center md:text-left">
          <div className="text-3xl md:text-4xl font-semibold text-black lg:text-[#12121270]">
            <p className='text-black py-2'>Join The MyTextil Movement<br className='hidden md:block'/><span className='lg:text-[#12121270]'>Shape The Future Of Fashion</span></p>
            
            
          </div>
          
          <p className="text-sm md:text-base text-[#12121270] ">
            Empowering creators, influencers, and entrepreneurs to be part of an
            innovative fashion revolution. Explore opportunities, earn rewards,
            and grow with MyTextil.
          </p>
          <div className='py-2'>
          <Link href="https://forms.gle/XxvEKrLzjzvPJJRu9" className="bg-[#016FDE] text-white px-6 py-2.5 rounded-full ">
            Join the Campaign
          </Link>
          </div>
          
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black text-white p-5 rounded-lg py-8 "
            >
              <h4 className="font-medium text-sm md:text-base ">{feature.title}</h4>
              <p className="text-xs md:text-sm text-gray-300 pt-4">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movement;
