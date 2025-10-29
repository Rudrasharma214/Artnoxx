import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isReviewHovered, setIsReviewHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const navigate = useNavigate();
  const artworks = [
    {
      id: 1,
      title: "Evening Campfire",
      image:
        "https://images.unsplash.com/photo-1579762715459-5a068c289fda?w=800&h=600&fit=crop&fm=webp&q=75",
      srcSet:
        "https://images.unsplash.com/photo-1579762715459-5a068c289fda?w=400&h=300&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1579762715459-5a068c289fda?w=800&h=600&fit=crop&fm=webp&q=75 800w",
      description: "A cozy evening scene with warmth",
      year: "2024",
    },
    {
      id: 2,
      title: "Futuristic Stage",
      image:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop&fm=webp&q=75",
      srcSet:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=300&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop&fm=webp&q=75 800w",
      description: "Digital art performance space",
      year: "2024",
    },
    {
      id: 3,
      title: "Abstract Portrait",
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop&fm=webp&q=75",
      srcSet:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop&fm=webp&q=75 800w",
      description: "Modern portrait exploration",
      year: "2024",
    },
    {
      id: 4,
      title: "Cosmic Dreams",
      image:
        "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop&fm=webp&q=75",
      srcSet:
        "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=300&fit=crop&fm=webp&q=75 400w, https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop&fm=webp&q=75 800w",
      description: "Journey through the stars",
      year: "2024",
    },
  ];

  const customerReviews = [
    {
      id: 1,
      name: "James I.",
      role: "",
      image:
        "https://images.unsplash.com/photo-1579762715459-5a068c289fda?w=400&h=500&fit=crop",
      rating: 5,
      review:
        "Your wonderful website makes it easy to find what visually and aesthetically pleases me. The purchase process is simple and smooth, the way I like it.",
      date: "2024-10-15",
      artwork: "Times Square Painting By Inez Froehlich",
    },
    {
      id: 2,
      name: "Sarah M.",
      role: "",
      image:
        "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=500&fit=crop",
      rating: 5,
      review:
        "I've purchased multiple pieces for my clients. The attention to detail and artistic vision is exceptional! Every artwork tells a story.",
      date: "2024-10-10",
      artwork: "Abstract Collection",
    },
    {
      id: 3,
      name: "Emily R.",
      role: "",
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=500&fit=crop",
      rating: 5,
      review:
        "Absolutely stunning artwork! The piece I ordered transformed my living room completely. The colors are vibrant and the quality is outstanding.",
      date: "2024-10-05",
      artwork: "Modern Portrait Series",
    }
  ];

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  }, [artworks.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  }, [artworks.length]);

  const nextReview = useCallback(() => {
    setReviewIndex((prev) => (prev + 1) % customerReviews.length);
  }, [customerReviews.length]);

  const prevReview = useCallback(() => {
    setReviewIndex(
      (prev) => (prev - 1 + customerReviews.length) % customerReviews.length
    );
  }, [customerReviews.length]);

  useEffect(() => {
    if (!isHovered && !isMobile) {
      const interval = setInterval(nextSlide, 4500);
      return () => clearInterval(interval);
    }
  }, [isHovered, isMobile, nextSlide]);

  // Auto-advance reviews
  useEffect(() => {
    const reviewInterval = setInterval(nextReview, 5000);
    return () => clearInterval(reviewInterval);
  }, [nextReview]);

  const getCardStyle = useCallback(
    (index) => {
      const diff = (index - currentIndex + artworks.length) % artworks.length;

      if (diff === 0) {
        return {
          transform: "translateX(0) translateZ(0px) rotateY(0deg) scale(1)",
          zIndex: 50,
          opacity: 1,
          filter: "brightness(1)",
        };
      } else if (diff === 1) {
        return {
          transform:
            "translateX(90%) translateZ(-200px) rotateY(-35deg) scale(0.75)",
          zIndex: 40,
          opacity: 0.7,
          filter: "brightness(0.8)",
        };
      } else if (diff === 2) {
        return {
          transform:
            "translateX(180%) translateZ(-350px) rotateY(-45deg) scale(0.6)",
          zIndex: 30,
          opacity: 0.4,
          filter: "brightness(0.6)",
        };
      } else if (diff === artworks.length - 1) {
        return {
          transform:
            "translateX(-90%) translateZ(-200px) rotateY(35deg) scale(0.75)",
          zIndex: 40,
          opacity: 0.7,
          filter: "brightness(0.8)",
        };
      } else if (diff === artworks.length - 2) {
        return {
          transform:
            "translateX(-180%) translateZ(-350px) rotateY(45deg) scale(0.6)",
          zIndex: 30,
          opacity: 0.4,
          filter: "brightness(0.6)",
        };
      } else {
        return {
          transform: "translateX(0) scale(0.3)",
          zIndex: 10,
          opacity: 0,
          filter: "brightness(0.5)",
        };
      }
    },
    [currentIndex, artworks.length]
  );

  return (
    <div className="bg-transparent min-h-[calc(100vh-80px)] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header Section - Refined Typography */}
        <div className="text-center mb-12 lg:mb-16 max-w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 leading-tight tracking-tight px-4">
            ArtNoxx's Collection
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed px-4">
            A curated blend of imagination and emotion,
            <br className="hidden sm:block" />
            welcome to the world of ArtNoxx.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <button
              onClick={() => navigate("/work")}
              className="group relative bg-orange-500 hover:bg-orange-600 text-white text-sm px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10">Recent Work</span>
              <div className="absolute inset-0 bg-orange-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Conditional Rendering: Mobile Column vs Desktop Carousel */}
        {isMobile ? (
          // Mobile: Vertical Scrollable Column
          <div className="flex flex-col gap-6 pb-8">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="relative group w-full max-w-md mx-auto"
              >
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <span className="inline-block text-xs font-normal text-white/70 mb-1 uppercase tracking-wider">
                      {artwork.year}
                    </span>
                    <h3 className="text-xl font-medium text-white mb-1.5">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-white/85 font-light">
                      {artwork.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop: 3D Carousel
          <div
            className="relative mt-12 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="relative h-[350px] sm:h-[450px] lg:h-[500px] mb-8 w-full"
              style={{
                perspective: "2000px",
                perspectiveOrigin: "50% 50%",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {artworks.map((artwork, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={artwork.id}
                      className="absolute w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg transition-all duration-700 ease-out cursor-pointer"
                      style={getCardStyle(index)}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <div className="relative group">
                        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                          <img
                            src={artwork.image}
                            alt={artwork.title}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            draggable="false"
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding={index === 0 ? "sync" : "async"}
                            fetchPriority={index === 0 ? "high" : "low"}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60" />

                          <div className="absolute inset-0 p-5 flex flex-col justify-end">
                            <div
                              className={`transition-all duration-300 ${
                                isActive
                                  ? "translate-y-0 opacity-100"
                                  : "translate-y-4 opacity-0"
                              }`}
                            >
                              <span className="inline-block text-xs font-normal text-white/70 mb-1 uppercase tracking-wider">
                                {artwork.year}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-medium text-white mb-1.5">
                                {artwork.title}
                              </h3>
                              <p className="text-sm text-white/85 font-light leading-relaxed">
                                {artwork.description}
                              </p>
                            </div>
                          </div>

                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={prevSlide}
                className="hover:bg-white text-gray-700 rounded-full p-2 hover:shadow-lg transition-all hover:scale-105"
                aria-label="Previous artwork"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex gap-1.5">
                {artworks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all rounded-full ${
                      index === currentIndex
                        ? "bg-indigo-600 w-6 h-2"
                        : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                    }`}
                    aria-label={`Go to artwork ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="hover:bg-white text-gray-700 rounded-full p-2 hover:shadow-lg transition-all hover:scale-105"
                aria-label="Next artwork"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Why Shop Section - Refined Typography */}
        <div className="mt-20 mb-20 bg-transparent py-14 rounded-3xl">
          <div className="max-w-6xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
                The Artnoxx Experience
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Step into a space where creativity meets individuality. At{" "}
                <span className="font-semibold text-gray-900">Artnoxx</span>,
                every creation is more than design — it’s an emotion, a story,
                and a reflection of passion and purpose brought to life through
                technology and imagination.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1 - Creative Vision */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5">
                  <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 20l9-5-9-5-9 5 9 5zm0-10V4l9 5-9 5z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Boundless Creativity
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every idea starts as a spark — at Artnoxx, that spark turns
                  into something extraordinary. Innovation is at our core.
                </p>
              </div>

              {/* Card 2 - Human Connection */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5">
                  <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5V10l-7-7H5a2 2 0 00-2 2v18l6-3 6 3z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Designed With Emotion
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Great design isn’t just seen — it’s felt. Every detail at
                  Artnoxx is crafted with meaning, emotion, and purpose.
                </p>
              </div>

              {/* Card 3 - Modern Aesthetics */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5">
                  <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2 1.343 2 3 2m0-8c-1.11 0-2.08.402-2.599 1M12 8V7m0 1v8m0 0v1"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Modern. Minimal. Meaningful.
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Simplicity meets sophistication — Artnoxx designs speak with
                  clarity and purpose in every pixel and line.
                </p>
              </div>

              {/* Card 4 - Inspired by Curiosity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5">
                  <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 20l9-5-9-5-9 5 9 5zm0-10V4l9 5-9 5z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Inspired by Curiosity
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every project begins with a question — “What if?” — and ends
                  with something that challenges boundaries and inspires change.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section - Refined Typography */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
              Voices that define Artnoxx
            </h2>
          </div>

          {/* Reviews Carousel */}
          <div
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setIsReviewHovered(true)}
            onMouseLeave={() => setIsReviewHovered(false)}
          >
            <div className="bg-transparent rounded-3xl shadow-none overflow-hidden">
              <div className="relative">
                {customerReviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`transition-all duration-500 ${
                      index === reviewIndex
                        ? "opacity-100"
                        : "opacity-0 absolute inset-0"
                    }`}
                  >
                    {/* Review Content - Side by Side Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* Left Side - Artwork Image */}
                      <div className="bg-transparent p-6 md:p-8 flex items-center justify-center min-h-[140px] md:min-h-[180px]">
                        <div className="relative w-full max-w-sm">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-full h-auto rounded-lg shadow-xl object-cover"
                          />
                        </div>
                      </div>

                      {/* Right Side - Testimonial Text */}
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        {/* Review Text */}
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 font-light">
                          "{review.review}"
                        </p>

                        {/* Customer Info */}
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            {review.name}
                          </h4>
                          {review.role && (
                            <p className="text-xs text-gray-500 mt-1">
                              {review.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Outside the box */}
            <button
              onClick={prevReview}
              className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-900 text-gray-900 hover:text-white rounded-full p-3 shadow-xl border-2 border-gray-900 transform transition-all duration-500 ${
                isReviewHovered
                  ? "-translate-x-0 opacity-100 hover:scale-110"
                  : "-translate-x-6 opacity-0"
              }`}
              aria-label="Previous review"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextReview}
              className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-900 text-gray-900 hover:text-white rounded-full p-3 shadow-xl border-2 border-gray-900 transform transition-all duration-500 ${
                isReviewHovered
                  ? "translate-x-0 opacity-100 hover:scale-110"
                  : "translate-x-6 opacity-0"
              }`}
              aria-label="Next review"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div
              className={`flex justify-center gap-2 mt-6 transform transition-all duration-500 ${
                isReviewHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {customerReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setReviewIndex(index)}
                  className={`transition-all rounded-full ${
                    index === reviewIndex
                      ? "bg-gray-900 w-8 h-3"
                      : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
