import { Link } from 'react-router-dom';

const Certificates = () => {
  const certificatesData = [
    {
      id: 1,
      title: 'Akademik Tartib va Talablar',
      description:
        'Mazmuni: Dars jadvali, baholash tizimi, imtihon qoidalari, kredit tizimi, dars qoldirish va akademik intizom haqida ma’lumotlar.',
    },
    {
      id: 2,
      title: 'Akademik Tartib va Talablar',
      description:
        'Mazmuni: Dars jadvali, baholash tizimi, imtihon qoidalari, kredit tizimi, dars qoldirish va akademik intizom haqida ma’lumotlar.',
    },
    {
      id: 3,
      title: 'Akademik Tartib va Talablar',
      description:
        'Mazmuni: Dars jadvali, baholash tizimi, imtihon qoidalari, kredit tizimi, dars qoldirish va akademik intizom haqida ma’lumotlar.',
    },
  ];

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='space-y-3 pt-4'>
        {certificatesData.map((certificate) => (
          <div
            key={certificate.id}
            className='flex flex-col justify-between gap-2 rounded-2xl bg-white p-3 shadow-xs transition-shadow duration-200 hover:shadow-sm md:flex-row md:items-end md:p-6 xl:gap-0'
          >
            <div>
              <h3 className='text-xl font-semibold text-black'>{certificate.title}</h3>
              <p className='text-md mt-1 text-gray-800'>{certificate.description}</p>
            </div>
            <Link
              to={`${certificatesData.id}`}
              className='mt-4 min-w-44 cursor-pointer rounded-full bg-[#008CFF] px-4 py-2 text-center text-sm font-medium text-white md:mt-0'
            >
              Sertifikatni ko‘rish
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
