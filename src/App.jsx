import { Route, Routes } from 'react-router-dom';
// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import Loginpage from './pages/auth/loginpage/Loginpage';
import Certificates from './pages/certificates/Certificates';
import CertificatesDetail from './pages/certificates/CertificatesDetail';
import CertificatesList from './pages/certificates/CertificatesList';
import Contents from './pages/contents/Contents.jsx';
import EnlightenmentPage from './pages/enlightenment/EnlightenmentPage';
import HomePage from './pages/homepage/HomePage';
import ModulesList from './pages/modules/ModulesList';
import ModuleVideo from './pages/modules/ModuleVideo';
import News from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import NewsList from './pages/news/NewsList';
import ProfilePage from './pages/profile/ProfilePage';
import NotFound from '@/pages/notFound/NotFound.jsx';

const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');
  return token ? <Outlet /> : <Navigate to='/' replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Loginpage />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/enlightenment' element={<EnlightenmentPage />} />
          <Route path='/modules' element={<Contents />} />
          <Route path='/modules/:id' element={<ModulesList />} />
          <Route path='/modules/:moduleId/video/:videoId' element={<ModuleVideo />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/news' element={<News />}>
            <Route index element={<NewsList />} />
            <Route path=':id' element={<NewsDetail />} />
          </Route>
          <Route path='/certificates' element={<Certificates />}>
            <Route index element={<CertificatesList />} />
            <Route path=':id' element={<CertificatesDetail />} />
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
