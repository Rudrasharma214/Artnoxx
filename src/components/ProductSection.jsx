import { useEffect, useState } from "react";
import { getAllProducts, createProduct, deleteProduct, updateProduct } from "../services/productService";
import ProductList from "./ProductList";
import ProductFormModal from "./ProductFormModal";
import CategoryFilter from "./CategoryFilter";
import LoadingSpinner from "./LoadingSpinner";

const ProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await getAllProducts();
                if (mounted) setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.warn("Could not fetch products:", err.message || err);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => (mounted = false);
    }, []);

    const handleAdd = async (formData, imagePreview) => {
        // Optimistic UI: add locally with preview
        const newProduct = {
            _id: Date.now(),
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            photourl: imagePreview,
        };

        setProducts((p) => [newProduct, ...p]);
        setShowAdd(false);

        try {
            const createdProduct = await createProduct(formData);
            // Update with real product from server
            setProducts((p) => p.map((prod) => 
                prod._id === newProduct._id ? createdProduct : prod
            ));
        } catch (err) {
            console.warn("createProduct failed:", err.message || err);
            // Rollback on error
            setProducts((p) => p.filter((prod) => prod._id !== newProduct._id));
        }
    };

    const handleDelete = async (id) => {
        // Optimistic remove
        const deletedProduct = products.find((p) => p._id === id);
        setProducts((p) => p.filter((x) => x._id !== id));
        
        try {
            await deleteProduct(id);
        } catch (err) {
            console.warn("delete failed", err.message || err);
            // Rollback on error
            if (deletedProduct) {
                setProducts((p) => [...p, deletedProduct]);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowEdit(true);
    };

    const handleUpdate = async (formData, imagePreview) => {
        const updatedData = {
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            photourl: formData.get('photo') ? imagePreview : editingProduct.photourl,
        };

        // Optimistic UI: update locally
        setProducts((p) => 
            p.map((product) => 
                product._id === editingProduct._id 
                    ? { ...product, ...updatedData }
                    : product
            )
        );

        setShowEdit(false);
        const productId = editingProduct._id;
        setEditingProduct(null);

        try {
            await updateProduct(productId, formData);
        } catch (err) {
            console.warn("updateProduct failed:", err.message || err);
        }
    };

    return (
        <>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Product Management</h2>
                <p className="text-gray-600 text-sm sm:text-base">Manage your product inventory</p>
            </div>

            {/* Category Filter and Add Button */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <CategoryFilter 
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                {/* Add Product Button - Desktop */}
                <button
                    onClick={() => setShowAdd(true)}
                    className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Product
                </button>
            </div>

            {/* Add Product Button - Mobile */}
            <div className="sm:hidden mb-4">
                <button
                    onClick={() => setShowAdd(true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg shadow-sm text-sm font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Product
                </button>
            </div>

            {/* Products List */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ProductList
                    products={products}
                    selectedCategory={selectedCategory}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAddClick={() => setShowAdd(true)}
                />
            )}

            {/* Add Product Modal */}
            {showAdd && (
                <ProductFormModal
                    mode="add"
                    onSubmit={handleAdd}
                    onClose={() => setShowAdd(false)}
                />
            )}

            {/* Edit Product Modal */}
            {showEdit && editingProduct && (
                <ProductFormModal
                    mode="edit"
                    product={editingProduct}
                    onSubmit={handleUpdate}
                    onClose={() => {
                        setShowEdit(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </>
    );
};

export default ProductsSection;
