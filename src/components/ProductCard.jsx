const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-100 relative">
                <img 
                    src={product.photourl} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                />
            </div>
            <div className="p-4">
                <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                </h4>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <button 
                        onClick={() => onEdit(product)}
                        className="text-xs text-indigo-600 hover:underline font-medium"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => onDelete(product._id)} 
                        className="text-xs text-red-600 hover:underline font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
