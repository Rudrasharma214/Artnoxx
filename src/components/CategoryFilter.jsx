const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    const categories = ["All", "Oil Painting", "Water Colors", "Sketch", "Portraits", "Canvas", "T-Shirt", "Shirt", "Shoes", "Jacket", "Jeans", "Others"];

    return (
        <div className="flex items-center gap-3">
            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
                Filter by Category:
            </label>
            <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category === "All" ? "All Categories" : category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
