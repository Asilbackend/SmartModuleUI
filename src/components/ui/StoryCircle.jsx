import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

import MyCustomPlayer from './CustomPlayer';

export default function StoryCircle({ imageSrc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPlaying(false);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='relative h-20 w-20 cursor-pointer rounded-full' onClick={handleClick}>
        <motion.div
          className='absolute top-0 left-0 h-full w-full rounded-full border-4 border-blue-500'
          initial={false}
          animate={
            isPlaying
              ? { rotate: 360, transition: { repeat: Infinity, duration: 2, ease: 'linear' } }
              : { rotate: 0 }
          }
        />
        <img src={imageSrc} alt='story' className='h-full w-full rounded-full object-cover' />
      </div>

      {isOpen && (
        <div className='bg-opacity-80 fixed inset-0 z-70 flex items-center justify-center bg-gradient-to-b from-gray-800 to-blue-800'>
          <X
            size={40}
            strokeWidth={1}
            className='absolute top-5 right-10 cursor-pointer text-white md:top-15 md:right-30'
            onClick={handleClose}
          />
          {/* <video src={videoSrc} controls autoPlay className='w-[80%] max-w-xl rounded-xl' /> */}
          <MyCustomPlayer />
        </div>
      )}
    </div>
  );
}
