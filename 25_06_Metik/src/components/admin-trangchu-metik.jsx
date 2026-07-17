import React from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Medal, Truck } from 'lucide-react';

const ProductCard = ({ imageUrl, title }) => (
  <div className="group relative overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100 p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
    <div className="aspect-square overflow-hidden rounded-md bg-gray-50 mb-3 relative">
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 transform group-hover:scale-125"
      />
    </div>
    <h3 className="text-center font-semibold text-gray-800 text-lg group-hover:text-green-600 transition-colors relative z-10">
      {title}
    </h3>
  </div>
);

export default function AdminTrangChuMetik({ 
  bannerTitle = "Snack Pellets", 
  bannerImageUrl = "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=2070&auto=format&fit=crop",
  productsTitle = "SẢN PHẨM MỚI",
  products = [
    { id: 1, title: 'Snack 1', imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=600&auto=format&fit=crop' },
    { id: 2, title: 'Snack 2', imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop' },
    { id: 3, title: 'Snack 3', imageUrl: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=600&auto=format&fit=crop' },
    { id: 4, title: 'Snack 4', imageUrl: 'https://images.unsplash.com/photo-1623910271038-da1b4b23ce5f?q=80&w=600&auto=format&fit=crop' },
  ]
}) {
  return (
    <div className="w-full">
      {/* 1. HERO BANNER SECTION */}
      <div className="relative w-full h-[500px] overflow-hidden bg-orange-100 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />

        <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors z-10 text-orange-500">
          <ChevronLeft size={32} />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors z-10 text-orange-500">
          <ChevronRight size={32} />
        </button>

        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 
            className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wide mb-8"
            style={{ WebkitTextStroke: '2px #F97316', color: '#FFFFFF' }}
          >
            {bannerTitle}
          </h1>

          <div className="flex bg-white rounded-full shadow-lg overflow-hidden border border-gray-100 mt-auto absolute -bottom-16">
            <div className="flex items-center gap-2 px-6 py-3 border-r border-gray-200">
              <Medal className="text-orange-400" size={24} />
              <div className="text-left leading-tight">
                <span className="block text-sm font-bold text-gray-700">Premium</span>
                <span className="block text-sm text-gray-500">Quality</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 border-r border-gray-200">
              <ShieldCheck className="text-orange-400" size={24} />
              <div className="text-left leading-tight">
                <span className="block text-sm font-bold text-gray-700">Food</span>
                <span className="block text-sm text-gray-500">Safety</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3">
              <Truck className="text-orange-400" size={24} />
              <div className="text-left leading-tight">
                <span className="block text-sm font-bold text-gray-700">Export</span>
                <span className="block text-sm text-gray-500">Quality</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-blue-600"></div>
      </div>

      {/* 2. NEW PRODUCTS SECTION */}
      <div className="w-full bg-[#fdf9ef] py-16 px-4 md:px-8 lg:px-16 pt-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10 inline-block relative">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 uppercase tracking-wide relative z-10">
              {productsTitle}
            </h2>
            <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400 -z-0"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id || index}
                imageUrl={product.imageUrl}
                title={product.title}
              />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
