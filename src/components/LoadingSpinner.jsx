const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-3"></div>
                <p className="text-sm text-gray-600">Loading products...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
