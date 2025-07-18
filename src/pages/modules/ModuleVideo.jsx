import { Rate } from 'antd';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { modules } from '../../data/moduleData';

export default function ModuleVideo() {
  const { moduleId, videoId } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: 'Yoqubjonov Abubakir', text: 'Universitetda forma majburiy mi?' },
  ]);

  const mod = modules.find((m) => m.id === Number(moduleId));
  if (!mod) return <div className='p-8'>Modul topilmadi</div>;

  let foundVideo = null;

  for (const section of mod.sections) {
    const video = section.items.find((item) => item.id === Number(videoId));
    if (video) {
      foundVideo = video;
      break;
    }
  }

  if (!foundVideo) return <div className='p-8'>Video topilmadi</div>;

  const handleAddComment = () => {
    if (comment.trim() === '') return;
    const newComment = {
      id: Date.now(),
      name: 'Foydalanuvchi',
      text: comment,
    };
    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div className='mx-auto max-w-6xl space-y-4 p-2 sm:space-y-8 lg:space-y-12'>
      <div className='rounded-3xl bg-white shadow-xs'>
        <video
          controls
          poster='/news-image.png'
          className='mb-2 w-full rounded-3xl object-cover sm:h-[520px]'
        >
          <source src={foundVideo.src || '/123.mp4'} />
          Sizning browser videoni qo‘llab-quvvatlamaydi.
        </video>
        <div className='flex flex-wrap items-center justify-between px-5 py-1 md:py-4'>
          <h2 className='mb-2 text-[22px] font-semibold sm:text-2xl xl:text-3xl'>
            {foundVideo.title}
          </h2>
          <div>
            <Rate style={{ fontSize: 26 }} />
            <p className='font-semibold sm:text-center sm:text-lg'>Videoni baholash</p>
          </div>
        </div>
      </div>

      <div className='rounded-3xl bg-white p-4 shadow-xs'>
        <h3 className='mb-4 text-xl font-semibold'>Fikrlar</h3>
        <div className='mb-4 flex items-center gap-2'>
          <MessageCircle className='text-gray-500' />
          <input
            type='text'
            placeholder='Fikr bildirish'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='focus:cursor-gittext flex-1 rounded-2xl border border-gray-400 px-4 py-2 focus:outline-none'
          />
          <button
            onClick={handleAddComment}
            className='flex items-center gap-1 rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-300'
          >
            <Send size={16} />
            Yuborish
          </button>
        </div>

        {comments.map((c) => (
          <div key={c.id} className='flex items-start gap-3 border-t pt-4'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white'>
              {c.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className='flex-1'>
              <p className='font-semibold'>{c.name}</p>
              <p>{c.text}</p>
            </div>
            <button
              onClick={() => handleDeleteComment(c.id)}
              className='text-gray-400 hover:text-red-500'
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
