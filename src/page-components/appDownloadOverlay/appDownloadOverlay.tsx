import { useState, useEffect } from 'react';
import Link from 'next/link';

const AppDownloadOverlay = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check screen size
  const checkScreenSize = () => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  };

  useEffect(() => {
    checkScreenSize();

    // Add resize event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMobile) return null; // Don't render anything if screen size is not mobile

  return (
    <div className="app-download-overlay">
      <div className="content">
        <h1>Download Our App</h1>
        <p>Your screen is too small. Please download our app:</p>

        <div className="store-buttons">
          <Link href="https://play.google.com/store/apps/details?id=com.yourapp" target="_blank" className="store-button play-store">
            
              <img src="/play-store.png" alt="Play Store" />
              <span>Get it on Google Play</span>
            
          </Link>

          <Link href="https://apps.apple.com/us/app/your-app/id123456789" target="_blank" className="store-button app-store">
        
              <img src="/app-store.png" alt="App Store" />
              <span>Download on the App Store</span>
            
          </Link>
        </div>
      </div>

      <style jsx>{`
        .app-download-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensures it is above other content */
        }

        .content {
          text-align: center;
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 90%;
          max-height: 80%;
          overflow: auto;
        }

        .store-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 20px;
        }

        .store-button {
          display: flex;
          align-items: center;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-decoration: none;
          background-color: #f8f8f8;
        }

        .store-button img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        .store-button span {
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default AppDownloadOverlay;
