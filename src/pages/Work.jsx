import { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService";

const Work = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    loadArtworks();
  }, []);

  useEffect(() => {
    // Handle keyboard events for modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedArtwork) {
        setSelectedArtwork(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArtwork]);

  useEffect(() => {
    // Lock body scroll when modal is open
    if (selectedArtwork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedArtwork]);

  const loadArtworks = async () => {
    try {
      const data = await getAllProducts();
      const formatted = data.map((item) => ({
        _id: item._id,
        title: item.name,
        description: item.description,
        imageUrl: item.photourl,
        category: item.category,
      }));
      setArtworks(formatted);
      setLoading(false);
    } catch (error) {
      console.error("Error loading artworks:", error);
      setLoading(false);
    }
  };

  // Group artworks by category
  const groupedArtworks = artworks.reduce((acc, artwork) => {
    const category = artwork.category || "Others";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(artwork);
    return acc;
  }, {});

  const categories = Object.keys(groupedArtworks).sort();

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Get products to display for a category (3 initially, or all if expanded)
  const getDisplayedProducts = (category) => {
    const products = groupedArtworks[category];
    const isExpanded = expandedCategories[category];
    return isExpanded ? products : products.slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading artworks...</div>
      </div>
    );
  }

  return (
    <div className="bg-transparent py-8 sm:py-12 lg:py-16 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            My Work
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Explore my collection of artworks, each made with love and ready to shine.
          </p>
        </div>

        {/* Gallery Grid - Organized by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-16">
            {/* Category Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {category}
              </h2>
              <div className="w-20 h-1 bg-[#f4c155] rounded-full mx-auto"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {getDisplayedProducts(category).map((artwork) => (
                <div
                  key={artwork._id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    setSelectedArtwork(artwork);
                    setImageLoading(true);
                  }}
                >
                  {/* Wooden frame */}
                  <div
                    className="w-full sm:w-80 lg:w-96 p-2 sm:p-4 bg-transparent rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                    style={{
                      border: "12px solid #8B5E3C",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-80 sm:h-96 object-cover rounded-sm"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Title and Description below frame */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-4 text-center">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 text-center line-clamp-2">
                    {artwork.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {groupedArtworks[category].length > 3 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => toggleCategory(category)}
                  className="inline-flex items-center gap-2 px-4 py-2  hover:bg-[#fffdef] text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {expandedCategories[category] ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Show Less
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Show More ({groupedArtworks[category].length - 3} more)
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Enhanced Modal */}
        {selectedArtwork && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedArtwork(null)}
          >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

            {/* Modal Content */}
            <div
              className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-20 bg-gray-300 hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 group"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-gray-800 group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Body */}
              <div className="flex flex-col lg:flex-row max-h-[95vh] overflow-y-auto">
                {/* Image Section */}
                <div className="lg:w-2/3 bg-linear-to-br from-gray-50 to-gray-100 p-6 sm:p-8 flex items-center justify-center">
                  <div
                    className="relative max-w-full rounded-lg overflow-hidden shadow-xl"
                    style={{
                      border: "14px solid #8B5E3C",
                      boxShadow:
                        "inset 0 0 20px rgba(0,0,0,0.4), 0 10px 40px rgba(0,0,0,0.3)",
                      width: "fit-content",
                      margin: "0 auto"
                    }}
                  >
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-600"></div>
                      </div>
                    )}
                    <img
                      src={selectedArtwork.imageUrl}
                      alt={selectedArtwork.title}
                      className="max-h-[60vh] lg:max-h-[75vh] w-auto max-w-full object-contain rounded-sm"
                      onLoad={() => setImageLoading(false)}
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col bg-white">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-[#f8da8f] text-gray-800 border border-[#f4c155]">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      {selectedArtwork.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {selectedArtwork.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full mb-6"></div>

                  {/* Description */}
                  <div className="grow">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Description
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>

                  

                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add these animations to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Work;
