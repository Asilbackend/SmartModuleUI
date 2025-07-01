import { Button, Input } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import tatulogo from '../../../assets/image 2.svg';

const ruleLogin = {
  required: "Login maydoni to'ldirilishi shart!",
  minLength: {
    value: 8,
    message: 'Login kamida 8 ta belgidan iborat bo‘lishi kerak',
  },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: 'Login faqat harflar, raqamlar va pastki chiziq (_) dan iborat bo‘lishi kerak',
  },
};

const ruleParol = {
  required: "Parol maydoni to'ldirilishi shart!",
  minLength: {
    value: 8,
    message: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak',
  },
};

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formSubmitHandler = (data) => {
    console.log(data);

    if (data.login && data.parol) {
      navigate('/home');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className='flex w-1/2 items-center justify-center bg-[#F0F7FF]'
    >
      <div className='rounded-2x w-[570px] px-[39px] py-[43px]'>
        <div className='mb-[25px] text-center'>
          <h2 className='text-[20px] !font-medium text-[#172243]'>Muhammad Al-Xorazmiy nomidagi</h2>
          <h2 className='text-[20px] !font-medium text-[#172243]'>
            Toshkent Axborot Texnologiyalar Univeriteti
          </h2>
          <div className='my-2 flex items-center justify-center'>
            <img src={tatulogo} alt='tatulogo' />
          </div>
        </div>
        <div className='flex flex-col items-center gap-[8px]'>
          <div className='flex flex-col gap-[5px]'>
            <label className='text-[20px] !font-[500] text-[#172243]'>Login</label>
            <Controller
              name='login'
              control={control}
              rules={ruleLogin}
              render={({ field }) => (
                <Input
                  {...field}
                  type='text'
                  size='large'
                  placeholder='Login'
                  className='!w-[370px] !border-none !py-4'
                  status={errors.login ? 'error' : ''}
                />
              )}
            />
            {errors.login && <p className='text-red-500'>{errors.login.message}</p>}
          </div>

          <div className='flex flex-col gap-[5px]'>
            <label className='text-[20px] !font-[500] text-[#172243]'>Parol</label>
            <Controller
              name='parol'
              control={control}
              rules={ruleParol}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size='large'
                  placeholder='********'
                  className='!w-[370px] !border-none !py-4'
                  status={errors.parol ? 'error' : ''}
                />
              )}
            />
            {errors.parol && <p className='text-red-500'>{errors.parol.message}</p>}
          </div>
          <Button
            className='!mt-3 !w-[370px] !bg-[#008CFF] !py-7 !text-xl !font-bold !text-white'
            htmlType='submit'
          >
            Kirish
          </Button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(LoginForm);
