import React from 'react';

const SearchBar = ({ placeholder = "Search products...", value = '', onChange = () => {} }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="search-container">
      <style jsx>{`
        .search-container {
          position: relative;
          max-width: 400px;
          margin: 0 auto;
        }

        .galaxy {
          height: 60px;
          width: 100%;
          background-image: radial-gradient(#374151 1px, transparent 1px),
            radial-gradient(#374151 1px, transparent 1px);
          background-size: 30px 30px;
          background-position:
            0 0,
            15px 15px;
          position: absolute;
          z-index: -1;
          animation: twinkle 3s infinite;
          border-radius: 12px;
          opacity: 0.3;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .search-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background-color: #1f2937; /* bg-gray-800 */
          box-shadow: 0 4px 15px rgba(31, 41, 55, 0.7);
        }

        .search-input {
          background-color: #374151; /* bg-gray-700 */
          border: 2px solid #4b5563; /* border-gray-600 */
          width: 100%;
          height: 50px;
          border-radius: 10px;
          color: #f9fafb; /* text-gray-50 */
          padding-inline: 50px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .search-input::placeholder {
          color: #9ca3af; /* text-gray-400 */
          opacity: 0.7;
        }

        .search-input:focus {
          outline: none;
          border-color: #6b7280; /* border-gray-500 */
          box-shadow: 0 0 10px rgba(107, 114, 128, 0.5);
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af; /* text-gray-400 */
          pointer-events: none;
        }

        .search-button {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #1f2937; /* bg-gray-800 */
          border: none;
          color: white;
          padding: 8px 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .search-button:hover {
          background-color: #374151; /* bg-gray-700 */
        }

        @media (max-width: 768px) {
          .search-container {
            max-width: 100%;
            margin: 0 10px;
          }

          .search-input {
            height: 45px;
            font-size: 14px;
            padding-inline: 45px;
          }
        }
      `}</style>

      <div className="search-container">
        <div className="galaxy"></div>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
          />
          <div className="search-icon">
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="#9ca3af"
              fill="none"
              height="20"
              width="20"
              viewBox="0 0 24 24"
            >
              <circle r="8" cy="11" cx="11"></circle>
              <line y2="16.65" x2="16.65" y1="21" x1="21"></line>
            </svg>
          </div>
          <button className="search-button" type="button">
            <svg
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="white"
              fill="none"
              height="16"
              width="16"
              viewBox="0 0 24 24"
            >
              <circle r="8" cy="11" cx="11"></circle>
              <line y2="16.65" x2="16.65" y1="21" x1="21"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
