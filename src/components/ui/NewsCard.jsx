import React from 'react';

function NewsCard({ img, title, subtitle }) {
  return (
    <div className='w-auto max-w-[325px] basis-full overflow-hidden rounded-xl bg-white shadow-md'>
      <img src={img} alt='newsImg' />
      <div className='p-8'>
        <h1 className='mt-1 block text-lg leading-tight font-semibold text-black'>{title}</h1>
        <p className='mt-[10px] text-[12px] leading-[100%] font-normal tracking-[0%]'>{subtitle}</p>
      </div>
    </div>
  );
}

export default NewsCard;
