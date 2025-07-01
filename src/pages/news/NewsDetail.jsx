import { Link, useParams } from 'react-router-dom';

import News from './NewsData';

const NewsDetail = () => {
  const { id } = useParams();
  const newsItem = News.find((item) => String(item.id) === id);

  if (!newsItem) {
    return <div className='p-4 text-red-500'>Yangilik topilmadi!</div>;
  }

  const recommended = News.filter((item) => String(item.id) !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className='mx-auto max-w-6xl space-y-12 p-2'>
      <div className='rounded-3xl bg-white shadow-xs'>
        {newsItem.video ? (
          <video
            controls
            poster='/news-image.png'
            className='mx-auto mb-4 h-[520px] w-full rounded-3xl object-cover'
          >
            <source src={newsItem.video} type='video/mp4' />
            Sizning browser videoni qo‘llab-quvvatlamaydi.
          </video>
        ) : (
          <img
            src={newsItem.img}
            alt={newsItem.title}
            className='mb-4 h-[520px] w-full rounded-3xl object-cover'
          />
        )}
        <div className='px-5 py-2'>
          <h2 className='mb-2 text-3xl font-bold'>{newsItem.title}</h2>
          <p className='mb-4 text-lg'>{newsItem.description}</p>
        </div>
      </div>

      <div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {recommended.map((item) => (
            <Link
              to={`/news/${item.id}`}
              key={item.id}
              className='block overflow-hidden rounded-2xl bg-white shadow-xs transition-all duration-200 hover:shadow-md'
            >
              <img src={item.img} alt={item.title} className='w-full rounded-t-2xl object-cover' />
              <div className='space-y-1 p-3'>
                <h3 className='text-lg font-semibold'>{item.title}</h3>
                <p className='line-clamp-2 text-sm text-gray-600'>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
