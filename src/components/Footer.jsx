import { memo } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t border-[#e8d76e] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-row justify-between items-center text-gray-600 text-sm">
          
          {/* Left Side - Copyright */}
          <p className="text-xs sm:text-sm">
            © {currentYear} ArtNoxx. All rights reserved.
          </p>

          {/* Right Side - Developer Credit */}
          <p className="text-xs sm:text-sm text-right">
            Developed by{" "}
            <a
              href="https://portfolio-rudrasharma.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0362dd] hover:text-[#f4c155] font-medium hover:underline transition-colors"
            >
              Rudra Sharma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
