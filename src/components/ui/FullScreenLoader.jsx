import 'react';

import logo from '/src/assets/logo.svg';

const FullScreenLoader = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-tl from-indigo-50/90 via-white/80 to-purple-50/90 backdrop-blur-xl transition-all duration-700'>
      <div className='relative flex items-center justify-center'>
        {/* Central Image */}
        <div className='relative h-24 w-24 overflow-hidden rounded-full border-2 border-blue-300/50 shadow-2xl'>
          <img
            src={logo} // Replace with your image URL
            alt='Loader Center'
            className='h-full w-full object-cover'
          />
          {/* Subtle Glow Around Image */}
          <div className='absolute inset-0 animate-pulse rounded-full bg-blue-400/20'></div>
        </div>

        {/* Outer Rotating Ring (Clockwise) */}
        <div className='absolute h-32 w-32 animate-spin rounded-full border-4 border-blue-500 border-t-transparent border-r-transparent shadow-md'></div>

        {/* Inner Rotating Ring (Counter-Clockwise) */}
        <div className='animate-spin-reverse absolute h-28 w-28 rounded-full border-3 border-blue-400 border-b-transparent border-l-transparent shadow-sm'></div>

        {/* Background Pulse Effect */}
        <div className='animate-ping-slow absolute h-36 w-36 rounded-full bg-blue-200/20'></div>

        {/* Orbiting Particles */}
        <div className='animate-spin-slow absolute h-40 w-40'>
          <div className='absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-300/80 shadow-lg'></div>
          <div className='absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-300/80 shadow-lg'></div>
          <div className='absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-300/80 shadow-lg'></div>
          <div className='absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-300/80 shadow-lg'></div>
        </div>

        {/* Loading Text */}
      </div>
    </div>
  );
};

export default FullScreenLoader;
