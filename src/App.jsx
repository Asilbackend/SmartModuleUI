import { Route, Routes } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import Loginpage from './pages/auth/loginpage/Loginpage';
import Certificates from './pages/certificates/Certificates';
import CertificatesDetail from './pages/certificates/CertificatesDetail';
import CertificatesList from './pages/certificates/CertificatesList';
import Contents from './pages/contents/Contents.jsx';
import EnlightenmentPage from './pages/enlightenment/EnlightenmentPage';
import HomePage from './pages/homepage/HomePage';
import ModulesList from './pages/modules/ModulesList';
import News from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import NewsList from './pages/news/NewsList';
import ProfilePage from './pages/profile/ProfilePage';
import RecomendedModuls from './pages/recomended/RecomendedModuls';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Loginpage />} />
      <Route path='/' element={<MainLayout />}>
        <Route path='home' element={<HomePage />} />
        <Route path='enlightenment' element={<EnlightenmentPage />} />
        <Route path='modules' element={<ModulesList />} />
        <Route path='modules/:id/content' element={<Contents />} />
      </Route>
      <Route path='recommended' element={<RecomendedModuls />} />
      <Route path='news' element={<News />}>
        <Route index element={<NewsList />} />
        <Route path=':id' element={<NewsDetail />} />
      </Route>
      <Route path='certificates' element={<Certificates />}>
        <Route index element={<CertificatesList />} />
        <Route path=':id' element={<CertificatesDetail />} />
      </Route>
      <Route path='profile' element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
