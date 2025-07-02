import React from 'react';

import tatulogo from '@/assets/logo.svg';

import Logotype from '../../../assets/Frame 94.svg';
import LoginForm from './LoginForm';

const Loginpage = () => {
  return (
    <section className='flex h-screen w-full'>
      <div className='hidden w-1/2 items-center justify-center bg-[#008CFF] sm:flex'>
        <img src={Logotype} alt='Logotype' className='w-[500px] max-w-full p-6 lg:p-0' />
      </div>

      <div className='flex w-full flex-col items-center justify-center bg-[#F0F7FF] p-4 sm:w-1/2'>
        <div className='mb-8 text-center sm:mb-4'>
          <div className='mb-4 flex items-center justify-center sm:mb-2'>
            <img src={tatulogo} alt='tatulogo' className='max-w-[100px] lg:max-w-[150px]' />
          </div>
          <h2 className='text-lg font-medium text-[#172243]'>Muhammad Al-Xorazmiy nomidagi</h2>
          <h2 className='text-lg font-medium text-[#172243]'>
            Toshkent Axborot Texnologiyalari Universiteti
          </h2>
        </div>

        <LoginForm />
      </div>
    </section>
  );
};

export default React.memo(Loginpage);
