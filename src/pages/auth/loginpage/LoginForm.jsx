import axiosClient from '@components/service/axiosClient.js';
import { Button, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

  // const formSubmitHandler = (data) => {
  //   console.log(data);
  //   if (data.login && data.parol) {
  //     navigate('/home');
  //   }
  // };
  // utils/checkToken.js
  function isJwtValid(token) {
    if (!token) return false;
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const now = Math.floor(Date.now() / 1000);
      return decodedPayload.exp && decodedPayload.exp > now;
    } catch (error) {
      console.error('Token decode error:', error);
      return false;
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (isJwtValid(accessToken)) {
        navigate('/home');
        return;
      }

      const refreshToken = localStorage.getItem('refreshToken');
      if (!isJwtValid(refreshToken)) {
        localStorage.clear();
        return;
      }

      try {
        const res = await axiosClient.post('/auth/refresh-token', null, {
          params: { refreshToken },
        });

        const accessToken = res.data?.accessToken;
        localStorage.setItem('accessToken', accessToken);
        navigate('/home');
      } catch (error) {
        localStorage.clear();
        console.error('Refresh token xato:', error);
      }
    };

    checkToken();
  }, [navigate]);

  const formSubmitHandler = async (data) => {
    try {
      const res = await axiosClient.post('/auth/login', {
        login: data.login,
        password: data.parol,
      });

      const { accessToken, refreshToken } = res.data;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        message.success('Muvaffaqiyatli login qilindi!');
        navigate('/home');
      } else {
        message.error('Token qaytmadi. Login muvaffaqiyatsiz.');
      }
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || 'Login yoki parolda xatolik!';
      message.error(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className='w-[300px] space-y-3 md:w-[280px] lg:w-[320px]'
    >
      <div className='flex flex-col space-y-1'>
        <label className='text-lg font-medium text-[#172243]'>Login</label>
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
              className='!border-none !py-3'
              status={errors.login ? 'error' : ''}
            />
          )}
        />
        {errors.login && <span className='text-sm text-red-500'>{errors.login.message}</span>}
      </div>

      <div className='flex flex-col space-y-1'>
        <label className='text-lg font-medium text-[#172243]'>Parol</label>
        <Controller
          name='parol'
          control={control}
          rules={ruleParol}
          render={({ field }) => (
            <Input.Password
              {...field}
              size='large'
              placeholder='********'
              className='!border-none !py-3'
              status={errors.parol ? 'error' : ''}
            />
          )}
        />
        {errors.parol && <span className='text-sm text-red-500'>{errors.parol.message}</span>}
      </div>

      <Button
        htmlType='submit'
        className='!w-full !rounded-lg !bg-[#008CFF] !py-6 !text-lg !font-semibold !text-white transition-all duration-200 hover:!bg-[#0070cc]'
      >
        Kirish
      </Button>
    </form>
  );
};

export default React.memo(LoginForm);
