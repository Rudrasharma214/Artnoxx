import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

const ProductList = ({ products, selectedCategory, onEdit, onDelete, onAddClick }) => {
    const groupProductsByCategory = () => {
        const categories = ['Oil Painting', 'Water Colors', 'Sketch', 'Portraits', 'Canvas', 'T-Shirt', 'Shirt', 'Shoes', 'Jacket', 'Jeans', 'Others'];
        const grouped = {};
        
        categories.forEach(cat => {
            grouped[cat] = products.filter(p => p.category === cat);
        });
        
        return grouped;
    };

    const filteredProducts = selectedCategory === "All" 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    const filteredProductsByCategory = selectedCategory === "All"
        ? groupProductsByCategory()
        : { [selectedCategory]: filteredProducts };

    if (filteredProducts.length === 0) {
        return (
            <EmptyState 
                title={selectedCategory === "All" ? "No products yet" : `No ${selectedCategory} products found`}
                description={selectedCategory === "All" 
                    ? "Get started by adding your first product" 
                    : "Try selecting a different category or add a new product"}
                onAction={onAddClick}
                actionLabel="Add Your First Product"
            />
        );
    }

    return (
        <section className="space-y-12">
            {Object.entries(filteredProductsByCategory).map(([category, categoryProducts]) => {
                if (categoryProducts.length === 0) return null;
                
                return (
                    <div key={category} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {category}
                            </h3>
                            <span className="text-sm font-semibold text-gray-600 bg-[#f8da8f] px-3 py-1 rounded-full border border-[#f4c155]">
                                {categoryProducts.length}
                            </span>
                            <div className="flex-1 h-px bg-[#e8d76e]"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categoryProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default ProductList;
