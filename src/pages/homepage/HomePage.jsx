import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getTopVideos } from 'src/api/topVideos';

const VideoCard = ({ title, desc, img }) => (
  <div className='relative cursor-pointer rounded-3xl bg-white shadow-xs'>
    <img src={img} className='w-full rounded-3xl' alt='Image' />
    <div className='space-y-2 px-4 pt-2 pb-12'>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='line-clamp-3 text-sm text-gray-600'>{desc}</p>
    </div>
    <p className='absolute bottom-0 px-4 py-2 text-start text-[#008CFF]'>Majburiy</p>
  </div>
);

const HomePage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['topVideos'],
    queryFn: async () => {
      const res = await getTopVideos();
      return res.data.content || [];
    },
  });
  const videos = data || [];
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
        {videos.map((item, index) => (
          <Link to={'/modules/1/video/1'} key={index}>
            <VideoCard
              key={index}
              title={item.title}
              desc={item.description}
              img={item.thumbnailImageUrl}
            />
          </Link>
        ))}
        {isPending && <p>Yuklanmoqda...</p>}
        {error && <p className='text-red-500'>Xatolik yuz berdi: {error.message}</p>}
      </div>
    </div>
  );
};

export default HomePage;
