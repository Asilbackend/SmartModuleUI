import { Button, Input } from 'antd';
// import axios from 'axios';
import React from 'react';
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

  const formSubmitHandler = (data) => {
    console.log(data);
    if (data.login && data.parol) {
      navigate('/home');
    }
  };

  // const formSubmitHandler = async (data) => {
  //   try {
  //     const res = await axios.post('https://dev.anvarovich.uz/auth/login', {
  //       username: data.login,
  //       password: data.parol,
  //     });

  //     const token = res.data?.token;
  //     if (token) {
  //       localStorage.setItem('token', token); // 🔐 token saqlanadi
  //       message.success('Muvaffaqiyatli login qilindi!');
  //       navigate('/home'); // ✅ Kirishdan keyin boshqa sahifaga o‘tish
  //     } else {
  //       message.error('Token qaytmadi. Login muvaffaqiyatsiz.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     const msg = error?.response?.data?.message || 'Login yoki parolda xatolik!';
  //     message.error(msg);
  //   }
  // };

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
