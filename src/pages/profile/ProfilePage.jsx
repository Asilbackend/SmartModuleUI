import { UserRound } from 'lucide-react';
import { Medal } from 'lucide-react';
const ProfilePage = () => {
  const certificates = [
    { title: 'Faol talaba', place: '1-o‘rin' },
    { title: 'Faol talaba', place: '3-o‘rin' },
    { title: 'Faol talaba', place: '2-o‘rin' },
  ];
  const testResults = Array(8).fill({
    score: 60,
    correct: 8,
    total: 10,
    label: 'Tartib intizom testi',
  });

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='flex w-full items-center gap-1 rounded-4xl bg-white p-1 shadow-xs sm:gap-3 sm:p-2 md:p-3'>
        <UserRound
          strokeWidth={1}
          className='h-8 w-8 rounded-full bg-[#F0F7FF] p-1 md:h-12 md:w-12'
        />
        <h2 className='text-lg sm:text-xl md:text-2xl'>Yoqubjonov Abubakir Iskandar o’g’li</h2>
      </div>
      <div className='grid grid-cols-12 gap-4 pt-4 sm:gap-6 sm:pt-6 md:gap-8 md:pt-8'>
        <div className='col-span-12 space-y-4 md:col-span-6 md:space-y-8 lg:col-span-5'>
          <div className='rounded-3xl bg-white shadow-xs'>
            <video
              controls
              poster='/news-image.png'
              className='mx-auto mb-4 h-[280px] w-full rounded-3xl object-cover'
            >
              <source src='./123.mp4' type='video/mp4' />
              Sizning browser videoni qo‘llab-quvvatlamaydi.
            </video>
            <div className='px-4 pb-4'>
              <h3 className='mb-2 text-2xl font-bold text-[#013464]'>
                Digital Science jurnali endi TATUda
              </h3>
              <p>
                TATUda yangi ilmiy jurnal - Digital Science chop etilmoqda. Unda talabalar va
                o‘qituvchilar o‘z maqolalari bilan qatnashishlari mumkin.
              </p>
            </div>
          </div>
          <div className='rounded-3xl bg-white p-4 shadow-xs'>
            <h3 className='pb-4 text-2xl font-semibold'>Tavsiya etilgan videolar</h3>
            <div className='xl:flex'>
              <img src='./image.png' alt='image' className='' />
              <div className='mt-2 xl:mt-0 xl:ml-4'>
                <h4 className='text-lg font-medium'>Unversitet imkoniyatlaridan foydalanish</h4>
                <p className='text-sm'>Hisob fanidan ozlashtira olmaganigiz uchun</p>
              </div>
            </div>
            <button className='mt-4 w-full cursor-pointer rounded-2xl bg-blue-600 py-3 text-xl font-semibold text-white'>
              Videolarni ko`rish
            </button>
          </div>
        </div>
        <div className='col-span-12 md:col-span-6 lg:col-span-7'>
          <div className='rounded-2xl bg-white px-4 pt-4 pb-4 shadow-xs md:pb-6'>
            <h2 className='mb-4 text-2xl font-semibold'>🏅 Sertifikatlarim</h2>
            <div className='space-y-2'>
              {certificates.map((c, i) => (
                <div key={i} className='flex justify-between rounded-full bg-[#EDF5FF] px-4 py-2'>
                  <span>{c.title}</span>
                  <span>{c.place}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-4 rounded-2xl bg-white px-4 pt-4 pb-6 shadow-xs md:mt-8'>
            <div className='flex gap-1'>
              <Medal size={30} color='red' strokeWidth={1} />
              <h2 className='mb-4 text-2xl font-semibold'>Test natijalari</h2>
            </div>
            <div className='grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
              {testResults.map((res, i) => (
                <div
                  key={i}
                  className='flex flex-col items-center rounded-2xl bg-[#EDF5FF] px-2 py-2 sm:py-4'
                >
                  <div className='mb-2 rounded-full border border-blue-600 px-6 py-9 text-center'>
                    <p className='text-3xl font-semibold'>{res.score}%</p>
                  </div>
                  <p className='mt-1 text-sm font-medium'>
                    {res.correct}/{res.total}
                  </p>
                  <p className='text-center text-xs font-medium'>{res.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
