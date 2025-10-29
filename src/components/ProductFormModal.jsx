import { useState, useEffect } from "react";

const ProductFormModal = ({ mode = "add", product = null, onSubmit, onClose }) => {
    const [form, setForm] = useState({ 
        name: product?.name || "", 
        description: product?.description || "", 
        category: product?.category || "" 
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(product?.photourl || null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                category: product.category || ""
            });
            setImagePreview(product.photourl);
        }
    }, [product]);

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!form.name.trim()) return setError("Name is required");
        if (!form.description.trim()) return setError("Description is required");
        if (!form.category.trim()) return setError("Category is required");
        if (mode === "add" && !imageFile) return setError("Please upload an image");

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('category', form.category);
        
        if (imageFile) {
            formData.append('photo', imageFile);
        } else if (mode === "edit" && product) {
            formData.append('photourl', product.photourl);
        }

        await onSubmit(formData, imagePreview);
        
        // Reset form
        setForm({ name: "", description: "", category: "" });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleClose = () => {
        setForm({ name: "", description: "", category: "" });
        setImageFile(null);
        setImagePreview(null);
        setError("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40" onClick={handleClose} />
            <form onSubmit={handleSubmit} className="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6 z-10 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">
                    {mode === "add" ? "Add Product" : "Edit Product"}
                </h2>
                {error && <div className="text-sm text-red-600 mb-3 p-2 bg-red-50 rounded">{error}</div>}
                
                <label className="block text-sm mb-3">
                    <span className="text-sm font-medium text-gray-700 mb-1 block">Product Name *</span>
                    <input 
                        name="name" 
                        value={form.name} 
                        onChange={onChange} 
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm text-sm p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="Enter product name"
                        required
                    />
                </label>

                <label className="block text-sm mb-3">
                    <span className="text-sm font-medium text-gray-700 mb-1 block">Description *</span>
                    <textarea
                        name="description" 
                        value={form.description} 
                        onChange={onChange} 
                        rows="3"
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm text-sm p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="Enter product description"
                        required
                    />
                </label>

                <label className="block text-sm mb-3">
                    <span className="text-sm font-medium text-gray-700 mb-1 block">Category *</span>
                    <select
                        name="category" 
                        value={form.category} 
                        onChange={onChange} 
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm text-sm p-2.5 focus:ring-2 focus:ring-[#f4c155] focus:border-[#f4c155]" 
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Oil Painting">Oil Painting</option>
                        <option value="Water Colors">Water Colors</option>
                        <option value="Sketch">Sketch</option>
                        <option value="Portraits">Portraits</option>
                        <option value="Canvas">Canvas</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Others">Others</option>
                    </select>
                </label>

                <label className="block text-sm mb-3">
                    <span className="text-sm font-medium text-gray-700 mb-1 block">
                        Upload {mode === "edit" ? "New " : ""}Image {mode === "add" ? "*" : "(optional)"}
                    </span>
                    <div className="mt-1">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={onImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                            required={mode === "add"}
                        />
                    </div>
                    {mode === "edit" && (
                        <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
                    )}
                </label>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="mb-4">
                        <span className="text-sm font-medium text-gray-700 mb-1 block">
                            {imageFile ? 'New Image Preview' : mode === "edit" ? 'Current Image' : 'Image Preview'}
                        </span>
                        <div className="mt-1 relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                            />
                            {(imageFile || mode === "add") && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImageFile(null);
                                        setImagePreview(mode === "edit" && product ? product.photourl : null);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg"
                                    title="Remove image"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                    <button 
                        type="button" 
                        onClick={handleClose} 
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50 font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
                    >
                        {mode === "add" ? "Create Product" : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFormModal;
