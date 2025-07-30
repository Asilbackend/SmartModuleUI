import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StoryCircle({ imageSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    setTimeout(() => {
      setIsPlaying(false); // animatsiya to‘xtaydi
      navigate('/news'); // sahifa almashadi
    }, 1000);
  };

  const circleLength = 2 * Math.PI * 50;

  return (
    <div className='flex flex-col items-center'>
      <div className='relative h-20 w-20 cursor-pointer sm:h-22 sm:w-22' onClick={handleClick}>
        {/* SVG PROGRESS RING */}
        <svg className='absolute inset-0' viewBox='0 0 120 120'>
          {/* BACKGROUND CIRCLE (ORQA FON - OQ) */}
          <circle cx='60' cy='60' r='50' strokeWidth='5' fill='none' stroke='#3B82F6' />
          {/* PROGRESS CIRCLE (OLD QISMI - KO‘K) */}
          <circle
            cx='60'
            cy='60'
            r='50'
            strokeWidth='4'
            fill='none'
            stroke='#eee' /* Tailwind blue-500 */
            strokeDasharray={`${circleLength} ${circleLength}`}
            strokeDashoffset={isPlaying ? 0 : circleLength}
            style={{
              transition: 'stroke-dashoffset 1s linear',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>

        {/* AVATAR */}
        <img
          src={imageSrc}
          alt='story'
          className='absolute inset-0 m-auto h-[80%] w-[80%] rounded-full object-cover'
        />
      </div>
    </div>
  );
}
