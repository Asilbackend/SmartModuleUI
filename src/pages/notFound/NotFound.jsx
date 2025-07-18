import 'react-toastify/dist/ReactToastify.css';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const NotFound = () => {
  // Toast xabarni faqat bir marta ko'rsatish
  useEffect(() => {
    toast.info('Bu sahifa topilmadi!', {
      position: 'top-right',
      autoClose: 3000,
    });
  }, []);

  // Animatsiya variantlari
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 120 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-[#008CFF] px-4'>
      <motion.div
        className='text-center text-white'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div variants={numberVariants}>
          <AlertCircle className='mx-auto mb-4 h-16 w-16 md:h-24 md:w-24' />
        </motion.div>
        <motion.h1
          className='text-8xl font-bold tracking-wider md:text-[10rem]'
          variants={numberVariants}
        >
          404
        </motion.h1>
        <motion.h2
          className='mt-4 text-xl font-semibold md:text-3xl'
          variants={containerVariants}
          transition={{ delay: 0.2 }}
        >
          Sahifa topilmadi!
        </motion.h2>
        <motion.p
          className='mx-auto mt-4 max-w-md text-base md:text-lg'
          variants={containerVariants}
          transition={{ delay: 0.4 }}
        >
          Siz qidirgan sahifa mavjud emas yoki o‘chirilgan bo‘lishi mumkin. Bosh sahifaga qayting.
        </motion.p>
        <motion.div className='mt-6' variants={containerVariants} transition={{ delay: 0.6 }}>
          <Link to='/'>
            <motion.button
              className='rounded-lg bg-white px-5 py-2 text-base font-medium text-[#008CFF] md:text-lg'
              variants={buttonVariants}
              whileHover='hover'
            >
              Uyga qaytish
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
