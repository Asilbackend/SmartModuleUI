import { Link } from 'react-router-dom';

const VideoCard = ({ title, desc }) => (
  <div className='relative rounded-3xl bg-white shadow-xs cursor-pointer'>
    <img src='/news-image.png' className='w-full rounded-3xl' alt='Image' />
    <div className='space-y-2 px-4 pt-2 pb-12'>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='line-clamp-3 text-sm text-gray-600'>{desc}</p>
    </div>
    <p className='absolute bottom-0 px-4 py-2 text-start text-[#008CFF]'>Majburiy</p>
  </div>
);
const HomePage = () => {
  const topNews = [
    {
      title: "Sun'iy intellekt bo‘yicha yangi laboratoriya",
      description:
        "TATUda sun'iy intellekt yo‘nalishida zamonaviy laboratoriya ochilib, talabalar uchun amaliy mashg‘ulotlar tashkil etildi.",
    },
    {
      title: 'TATUda xalqaro konferensiya bo‘lib o‘tdi',
      description:
        'Universitetda raqamli texnologiyalar bo‘yicha xalqaro ilmiy anjuman o‘tkazilib, 15 dan ortiq davlatdan olimlar ishtirok etdi.',
    },
    {
      title: 'Talabalar robototexnika musobaqasida g‘olib',
      description:
        'TATU talabalari xalqaro robototexnika tanlovida birinchi o‘rinni egallab, universitet nufuzini oshirishga hissa qo‘shdi.',
    },
    {
      title: "Sun'iy intellekt bo‘yicha yangi laboratoriya",
      description:
        "TATUda sun'iy intellekt yo‘nalishida zamonaviy laboratoriya ochilib, talabalar uchun amaliy mashg‘ulotlar tashkil etildi.",
    },
    {
      title: 'TATUda xalqaro konferensiya bo‘lib o‘tdi',
      description:
        'Universitetda raqamli texnologiyalar bo‘yicha xalqaro ilmiy anjuman o‘tkazilib, 15 dan ortiq davlatdan olimlar ishtirok etdi.',
    },
    {
      title: 'Talabalar robototexnika musobaqasida g‘olib',
      description:
        'TATU talabalari xalqaro robototexnika tanlovida birinchi o‘rinni egallab, universitet nufuzini oshirishga hissa qo‘shdi.',
    },
  ];
  return (
    <div className='mx-auto max-w-6xl'>
      <video
        poster='/news-image.png'
        className='mb-12 h-[280px] w-full rounded-3xl bg-blue-500 object-cover shadow-xs sm:h-[520px]'
        controls
      >
        <source src='/123.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className='mb-2 flex items-center justify-between'>
        <h2 className='mb-4 text-3xl font-semibold'>Top videolar</h2>
      </div>
      <div className='mb-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {topNews.map((item, index) => (
          <Link to={'/modules/1/video/1'} key={index}>
            <VideoCard key={index} title={item.title} desc={item.description} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
