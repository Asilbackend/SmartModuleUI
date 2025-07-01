import React from 'react';

import Logotype from '../../../assets/Frame 94.svg';
import LoginForm from './LoginForm';

const Loginpage = () => {
  return (
    <section className='flex'>
      <div className='flex h-screen w-1/2 items-center justify-center bg-[#008Cff]'>
        <img src={Logotype} alt='Logotype' className='w-[500px] max-w-full' />
      </div>
      <LoginForm />
    </section>
  );
};

export default React.memo(Loginpage);
