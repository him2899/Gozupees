import React from 'react';

export default function CustomerLogosSection() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">Trusted by industry-leading brands</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-80">
          <img src="/coco-moon-hawaii.png" alt="Coco Moon Hawaii" className="h-16 w-auto grayscale" />
          <img src="/eklexic.png" alt="Eklexic" className="h-6 w-auto grayscale" />
          <img src="/copper-smith.png" alt="Copper Smith" className="h-6 w-auto grayscale" />
          <img src="/mohala-eyewear.png" alt="Mohala Eyewear" className="h-16 w-auto grayscale" />
          <img src="/fused-hawaii.png" alt="Fused Hawaii" className="h-12 w-auto grayscale" />
          <img src="/find-wunder.png" alt="Find Wunder" className="h-16 w-auto grayscale" />
          <img src="/pet-a-porter.png" alt="Pet-a-Porter" className="h-16 w-auto grayscale" />
          <img src="/snack-hawaii.png" alt="Snack Hawaii" className="h-16 w-auto grayscale" />
          <img src="/spiritual-society.png" alt="Spiritual Society" className="h-16 w-auto grayscale" />
        </div>
      </div>
    </section>
  );
}