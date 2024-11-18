import React from 'react';

const DownloadPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
    <img src="/icons/logo2.png" alt="Google Play Store" className="h-20 mb-4" />

      <h1 className="text-3xl font-bold mb-6">Download Our App</h1>
      <p className="text-lg text-gray-700 mb-8">
        For a better experience, please download our app from the App Store or Play Store.
      </p>
      <div className="flex gap-4">
        <a
          href="https://play.google.com/store/apps/details?id=com.yourapp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-200"
        >
          <img src="/icons/Play.svg" alt="Google Play Store" className="h-10" />
        </a>
        <a
          href="https://apps.apple.com/us/app/your-app-id"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-200"
        >
          <img src="/icons/Store.svg" alt="App Store" className="h-10" />
        </a>
      </div>
    </div>
  );
};

export default DownloadPage;
