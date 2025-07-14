// src/pages/modules/ModuleVideo.jsx

import { Rate } from 'antd';
import { useParams } from 'react-router-dom';

import { modules } from '../../data/moduleData';

export default function ModuleVideo() {
  const { moduleId, videoId } = useParams();

  // 1. Modulni top
  const mod = modules.find((m) => m.id === Number(moduleId));
  if (!mod) return <div className='p-8'>Modul topilmadi</div>;

  // 2. Videoni top
  let foundVideo = null;

  for (const section of mod.sections) {
    const video = section.items.find((item) => item.id === Number(videoId));
    if (video) {
      foundVideo = video;
      break;
    }
  }

  if (!foundVideo) return <div className='p-8'>Video topilmadi</div>;

  return (
    <div className='mx-auto max-w-6xl space-y-4 p-2 sm:space-y-8 lg:space-y-12'>
      <div className='rounded-3xl bg-white shadow-xs'>
        <video
          controls
          poster='/news-image.png'
          className='mb-2 h-[520px] w-full rounded-3xl object-cover'
        >
          <source src={foundVideo.src || '/123.mp4'} />
          Sizning browser videoni qo‘llab-quvvatlamaydi.
        </video>
        <div className='flex items-center justify-between px-5 py-1 md:py-4'>
          <h2 className='mb-2 text-2xl font-semibold xl:text-3xl'>{foundVideo.title}</h2>
          <div>
            <Rate style={{ fontSize: 26 }} />
            <p className='text-center text-lg font-semibold'>Videoni baholash</p>
          </div>
        </div>
      </div>
    </div>
  );
}
