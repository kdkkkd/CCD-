
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 space-y-2">
      <div className="inline-block bg-red-700 text-white px-6 py-2 transform -rotate-1 shadow-lg border-2 border-white/20">
        <h1 className="text-3xl font-bold uppercase tracking-widest">CCD 复古相机</h1>
      </div>
      <div className="block">
        <p className="font-handwritten text-3xl text-green-800 -mt-2">2024 圣诞限定版</p>
      </div>
    </header>
  );
};

export default Header;
