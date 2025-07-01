import React from 'react';

function NewsVideo({ video, title, subtitle }) {
  return (
    <div className='mr-auto w-auto max-w-[1035px] overflow-hidden rounded-xl bg-white shadow-md'>
      <video
        src={video}
        alt='newsVid'
        controls
        width='100%'
        height='auto'
        autoPlay={false}
        loop={false}
        muted={false}
        poster='/news-image.png'
      />
      <div className='p-8'>
        <h1 className='mt-1 text-[32px] leading-[100%] font-semibold tracking-[0%]'>{title}</h1>
        <p className='mt-[10px] text-[16px] leading-[100%] font-normal tracking-[0%]'>{subtitle}</p>
      </div>
    </div>
  );
}

export default NewsVideo;
