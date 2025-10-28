import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Rate } from 'antd';
import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { VideoImg } from 'src/api/attachment-controller.api';
import {
  addVideoComment,
  getVideoComments,
  getVideoRate,
  postVideoRate,
} from 'src/api/module-video-controller.api';

import { modules } from '../../data/moduleData';

export default function ModuleVideo() {
  const [newComment, setNewComment] = useState('');
  const { moduleId, videoId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['videoComments', videoId],
    queryFn: async () => {
      const res = await getVideoComments(videoId);
      return res.data || [];
    },
    enabled: !!videoId,
  });

  const attachment = useQuery({
    queryKey: ['videoAttachment', videoId],
    queryFn: async () => {
      const res = await VideoImg(videoId);
      return res.data || [];
    },
    enabled: !!videoId,
  });

  const getRate = useQuery({
    queryKey: ['videoRate', videoId],
    queryFn: async () => {
      const res = await getVideoRate(videoId);
      return res.data?.data || [];
    },
    enabled: !!videoId,
  });

  const addCommentMutation = useMutation({
    mutationFn: (commentText) => addVideoComment(commentText, videoId),
    onSuccess: () => {
      queryClient.invalidateQueries(['videoComments', videoId]);
      setNewComment('');
    },
  });

  const videoRateMutation = useMutation({
    mutationFn: (rate) => postVideoRate(rate, videoId),
    onSuccess: () => {
      queryClient.invalidateQueries(['videoRate', videoId]);
    },
  });

  const mod = modules.find((m) => m.id === Number(moduleId));
  if (!mod) return <div className='p-8'>Modul topilmadi</div>;

  const foundVideo = mod.sections
    .flatMap((section) => section.items)
    .find((item) => item.id === Number(videoId));

  if (!foundVideo) return <div className='p-8'>Video topilmadi</div>;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  return (
    <div className='mx-auto max-w-6xl space-y-4 p-2 sm:space-y-8 lg:space-y-12'>
      {/* Video */}
      <div className='rounded-3xl bg-white shadow-xs'>
        <video
          controls
          poster={attachment.thumbnailImageUrl}
          className='mb-2 w-full rounded-3xl object-cover sm:h-[520px]'
        >
          <source
            src={`https://dev.anvarovich.uz/api/student/content-video/${videoId}/stream`}
            type='video/mp4'
          />
          Sizning browser videoni qo‘llab-quvvatlamaydi.
        </video>

        <div className='flex flex-wrap items-center justify-between px-5 py-1 md:py-4'>
          <h2 className='mb-2 text-[22px] font-semibold sm:text-2xl xl:text-3xl'>
            {foundVideo.text}
          </h2>
          <div>
            <Rate
              value={getRate.data?.userVideoRating || 0}
              onChange={(value) => videoRateMutation.mutate(value)}
              disabled={getRate.data?.userVideoRating !== null}
              style={{ fontSize: 26 }}
            />
            <p className='font-semibold sm:text-center sm:text-lg'>Videoni baholash</p>
            {getRate && getRate?.userVideoRating}
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className='rounded-3xl bg-white p-4 shadow-xs'>
        <h3 className='mb-4 text-xl font-semibold'>Fikrlar</h3>

        {/* Yangi fikr */}
        <div className='mb-4 flex items-center gap-2'>
          <MessageCircle className='text-gray-500' />
          <input
            type='text'
            value={newComment}
            placeholder='Fikr bildirish'
            onChange={(e) => setNewComment(e.target.value)}
            className='flex-1 rounded-2xl border border-gray-400 px-4 py-2 focus:outline-none'
          />
          <button
            onClick={handleAddComment}
            disabled={addCommentMutation.isPending}
            className='flex items-center gap-1 rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-300 disabled:opacity-50'
          >
            <Send size={16} />
            {addCommentMutation.isPending ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </div>

        {/* Fikrlar */}
        {isPending && <p>Yuklanmoqda...</p>}
        {error && <p className='text-red-500'>Xatolik yuz berdi</p>}

        {comments.length === 0 && !isPending && !error && (
          <p className='text-gray-500'>Hozircha fikr yo‘q</p>
        )}

        {comments.map((c) => (
          <div key={c.id} className='flex items-start gap-3 border-t pt-4'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white'>
              {(c.firstName?.[0] || '') + (c.lastName?.[0] || '')}
            </div>
            <div className='flex-1'>
              <div className='flex gap-2'>
                <p className='font-semibold'>{c.firstName}</p>
                <p className='font-semibold'>{c.lastName}</p>
              </div>
              <p>{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
