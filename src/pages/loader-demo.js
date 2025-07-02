import React from 'react';
import { Loader } from '@/components/ui/loader';
import { Button } from '@/components/ui/button';

export default function LoaderDemo() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Loader Component Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Default</h2>
          <Loader />
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Small</h2>
          <Loader size="small" />
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Large</h2>
          <Loader size="large" />
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">XL</h2>
          <Loader size="xl" />
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Pulse Animation</h2>
          <Loader type="pulse" size="large" />
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Pulsing Animation</h2>
          <Loader type="pulsing" size="large" />
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Inside Button</h2>
          <Button disabled>
            <Loader size="small" />
            Loading...
          </Button>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-4">Custom Color</h2>
          <Loader className="text-blue-500" size="large" />
        </div>
      </div>
    </div>
  );
}