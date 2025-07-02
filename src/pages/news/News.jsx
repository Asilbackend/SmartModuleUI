import { Outlet } from 'react-router-dom';

const News = () => {
  return (
    <div className='px-0 xl:px-4'>
      <Outlet />
    </div>
  );
};

export default News;
