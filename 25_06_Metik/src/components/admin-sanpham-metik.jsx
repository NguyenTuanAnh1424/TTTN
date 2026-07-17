import React from 'react';

const ProductCard = ({ imageUrl, title }) => (
  <div className="group relative overflow-hidden bg-white border border-gray-200 transition-shadow duration-300 hover:shadow-xl cursor-pointer">
    <div className="aspect-square overflow-hidden bg-gray-50 relative">
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 transform group-hover:scale-125"
      />
    </div>
    <div className="p-4 border-t border-gray-100 bg-white relative z-10">
      <h3 className="text-center font-bold text-orange-500 text-sm md:text-base transition-colors group-hover:text-orange-600">
        {title}
      </h3>
    </div>
  </div>
);

export default function AdminSanPhamMetik({
  breadcrumb = "TRANG CHỦ / SẢN PHẨM",
  products = [
    { title: 'Snack vị Bắp', imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=600&auto=format&fit=crop' },
    { title: 'Snack vị BBQ', imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop' },
    { title: 'Snack vị Phô mai', imageUrl: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=600&auto=format&fit=crop' },
    { title: 'Snack vị Tảo biển', imageUrl: 'https://images.unsplash.com/photo-1623910271038-da1b4b23ce5f?q=80&w=600&auto=format&fit=crop' },
  ]
}) {
  return (
    <div className="w-full bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Title */}
        <div className="mb-8">
          <h2 className="text-sm md:text-base text-gray-400 uppercase tracking-widest">
            {breadcrumb.split('/').map((part, index, array) => (
              <React.Fragment key={index}>
                <span className={index === array.length - 1 ? 'font-bold text-gray-800' : ''}>
                  {part.trim()}
                </span>
                {index < array.length - 1 && <span className="mx-2">/</span>}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              imageUrl={product.imageUrl}
              title={product.title}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}
