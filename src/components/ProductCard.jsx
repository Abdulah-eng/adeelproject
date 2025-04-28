import React from 'react';

function ProductCard({ 
  image, 
  name, 
  quantity, 
  price, 
  rating, 
  description,
  onAddToCart,
  onFieldChange,
  discount = 0,
  isNew = false,
  use,
  deleteItem
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-xs hover:shadow-xl transition-shadow duration-300 group">
      {/* Image container with badges */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Product details */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          {use === 'edititems' ? (
            <input
              type="text"
              value={name}
              onChange={(e) => onFieldChange('productname', e.target.value)}
              className="border rounded px-2 py-1 text-sm w-32"
            />
          ) : (
            <h3 className="text-lg font-bold text-gray-900 truncate mr-2">{name}</h3>
          )}

          {use === 'edititems' ? (
            <input
              type="number"
              value={price}
              onChange={(e) => onFieldChange('price', parseFloat(e.target.value) || 0)}
              className="border rounded px-2 py-1 text-sm w-20 text-right"
            />
          ) : (
            <p className="text-lg font-bold text-indigo-600 whitespace-nowrap">
              ${Number(price).toFixed(2)}
              {discount > 0 && (
                <span className="text-xs text-gray-500 line-through ml-1">
                  ${(Number(price) * (1 + discount / 100)).toFixed(2)}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Rating and stock */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
              </svg>
            ))}
            <span className="text-gray-600 text-sm ml-1">({Number(rating).toFixed(1)})</span>
          </div>

          {use === 'edititems' ? (
            <input
              type="number"
              value={quantity}
              onChange={(e) => onFieldChange('quantity', parseInt(e.target.value) || 0)}
              className="border rounded px-2 py-1 text-sm w-20 text-right"
            />
          ) : (
            <span className={`text-sm font-medium ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {quantity > 0 ? `${quantity} in stock` : 'Out of stock'}
            </span>
          )}
        </div>

        {/* Description */}
        {use === 'edititems' ? (
          <textarea
            value={description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            className="border rounded w-full mt-3 p-2 text-sm"
            rows="2"
          />
        ) : (
          <p className="text-gray-600 text-sm mt-3 line-clamp-2">{description}</p>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex justify-between items-center space-x-2">
          <button 
            onClick={onAddToCart}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            {
              use === 'cartcomponent' ? 'Order Now' : 
              use === 'edititems' ? 'Save ' : 
              use === 'orderscomponent' ? 'Remove from list' :
              'Add to Cart'
            }
          </button>

          {/* Delete Button */}
          {(use === 'cartcomponent' || use === 'edititems') && (
            <button 
              onClick={deleteItem}
              className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
