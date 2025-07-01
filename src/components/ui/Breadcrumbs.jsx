import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const items = pathnames.map((name, index) => {
    const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
    const isLast = index === pathnames.length - 1;

    return {
      title: isLast ? (
        <span>{decodeURIComponent(name)}</span>
      ) : (
        <Link to={routeTo}>{decodeURIComponent(name)}</Link>
      ),
    };
  });

  return <Breadcrumb className='mb-4' items={items} />;
};

export default Breadcrumbs;
