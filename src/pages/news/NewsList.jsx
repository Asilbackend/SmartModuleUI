import { Link } from 'react-router-dom';

import News from './NewsData';

const NewsList = () => {
  return (
    <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 p-2 sm:grid-cols-2 lg:grid-cols-3'>
      {News.map((news) => (
        <Link
          key={news.id}
          to={`${news.id}`}
          className='block overflow-hidden rounded-3xl bg-white shadow-xs transition-all duration-200 hover:shadow-md'
        >
          <img src={news.img} alt={news.title} className='w-full rounded-t-3xl object-cover' />
          <div className='space-y-2 px-4 pt-2 pb-6'>
            <h3 className='text-xl font-semibold'>{news.title}</h3>
            <p className='line-clamp-3 text-sm text-gray-600'>{news.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsList;
