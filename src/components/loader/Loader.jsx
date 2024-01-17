import React from 'react';
import MipossibleLogo  from '../../assets/logo.png'; 

const Loader = () => {
  return (
    <>
    <div className="fixed inset-0 bg-sky-500 flex justify-center items-center">
      <img src={MipossibleLogo} alt="Loading..." className="animate-bounce w-150 md:h-100 px-10 md:px-10 md:mx-10" />
    </div>
    </>
  );
};

export default Loader;

