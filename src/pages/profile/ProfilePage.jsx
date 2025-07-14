import { Button, Flex, Progress } from 'antd';
import { Check, Eye, X } from 'lucide-react';
import { useState } from 'react';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const student = {
    ism: 'Abubakir',
    familiya: 'Yoqubjonov',
    yonalish: 'Suniy Intelekt',
    oqishTili: 'Uz',
    kurs: 2,
    guruh: '261-23',
    daraja: 'Bakalavr',
    talimShakli: 'Kunduzgi',
    stipendiya: 'Yo‘q',
  };

  const leftInfo = [
    { label: 'Ism', value: student.ism },
    { label: 'Familiya', value: student.familiya },
    { label: 'Yo’nalish', value: student.yonalish },
    { label: 'O’qish tili', value: student.oqishTili },
    { label: 'Kurs', value: student.kurs },
    { label: 'Guruh', value: student.guruh },
  ];

  const rightInfo = [
    { label: 'Guruh', value: student.guruh },
    { label: 'Darajasi', value: student.daraja },
    { label: 'Ta’lim shakli', value: student.talimShakli },
    { label: 'Stipendiya', value: student.stipendiya },
  ];

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='gap-4 sm:gap-6 md:gap-8'>
        <div className='grid grid-cols-12 gap-6 md:col-span-6 lg:col-span-5'>
          <div className='col-span-5 rounded-3xl bg-white shadow-xs'>
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
          <div className='col-span-7 rounded-3xl bg-white p-4 shadow-xs'>
            <div className='flex max-w-3xl flex-col rounded-lg md:flex-row'>
              <div className='flex items-center justify-center p-4 md:w-1/3'>
                <img
                  src='./image.png'
                  alt='Talaba rasmi'
                  className='h-60 w-full rounded-lg object-cover'
                />
              </div>
              <div className='p-6 md:w-2/3'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className='border-r pr-2'>
                    {leftInfo.map((item) => (
                      <p className='py-1' key={item.label}>
                        <span className='font-semibold'>{item.label}:</span> {item.value}
                      </p>
                    ))}
                  </div>
                  <div className='pl-3'>
                    {rightInfo.map((item) => (
                      <p key={item.label} className='py-1'>
                        <span className='font-semibold'>{item.label}:</span> {item.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-12 md:col-span-6 lg:col-span-7'>
          <div className='mt-4 rounded-2xl bg-white px-4 pt-4 pb-6 shadow-xs md:mt-8'>
            <div className='mb-8 flex'>
              <div>
                <h2 className='mb-2 text-2xl font-semibold'>
                  1. Universitet tarixi va tashkiliy tuzilmasi (Required)
                </h2>
                <p className='text-lg'>Universitetning istiqbolli yo’nalishlari (Matn)</p>
              </div>
              <div className='ml-auto flex flex-col items-end gap-2'>
                <Button
                  type='primary'
                  icon={<Check strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                  ghost
                >
                  Tugallangan
                </Button>
                <Button
                  onClick={handleClick}
                  type='primary'
                  icon={<Eye strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                >
                  Sertifikatni ko`rish
                </Button>
              </div>
            </div>
            <Flex gap='small' vertical>
              <Progress
                percent={60}
                percentPosition={{ align: 'center', type: 'inner' }}
                style={{ width: '100%', height: '40%' }}
                strokeWidth={20}
                strokeColor='#008CFF'
              />
            </Flex>
          </div>
          <div className='mt-4 rounded-2xl bg-white px-4 pt-4 pb-6 shadow-xs md:mt-8'>
            <div className='mb-8 flex'>
              <div>
                <h2 className='mb-2 text-2xl font-semibold'>
                  1. Universitet tarixi va tashkiliy tuzilmasi (Required)
                </h2>
                <p className='text-lg'>Universitetning istiqbolli yo’nalishlari (Matn)</p>
              </div>
              <div className='ml-auto flex flex-col items-end gap-2'>
                <Button
                  type='primary'
                  icon={<Check strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                  ghost
                >
                  Tugallangan
                </Button>
                <Button
                  onClick={handleClick}
                  type='primary'
                  icon={<Eye strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                >
                  Sertifikatni ko`rish
                </Button>
              </div>
            </div>
            <Flex gap='small' vertical>
              <Progress
                percent={80}
                percentPosition={{ align: 'center', type: 'inner' }}
                style={{ width: '100%', height: '40%' }}
                strokeWidth={20}
                strokeColor='#008CFF'
              />
            </Flex>
          </div>
        </div>

        {isOpen && (
          <div className='bg-opacity-80 fixed inset-0 z-70 flex items-center justify-center bg-gradient-to-b from-gray-800 to-blue-700'>
            <X
              size={40}
              strokeWidth={1}
              className='absolute top-20 right-20 cursor-pointer text-white'
              onClick={handleClose}
            />
            <img src='/sertifikat.png' className='w-[80%] max-w-4xl select-none' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
