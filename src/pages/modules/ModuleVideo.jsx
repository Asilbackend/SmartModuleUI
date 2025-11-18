import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Rate, Skeleton } from 'antd';
import { Check, Edit, MessageCircle, Send, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { VideoImg } from 'src/api/attachment-controller.api';
import {
  addVideoComment,
  deleteVideoComment,
  getPercentWatched,
  getVideoComments,
  getVideoRate,
  postVideoRate,
  updateVideoComment,
  uptPercentWatched,
} from 'src/api/content-video-controller.api';

export default function ModuleVideo() {
  const [newComment, setNewComment] = useState('');
  const [editId, setEditId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [seenVideo, setSeenVideo] = useState(false);
  const { videoId } = useParams();
  const queryClient = useQueryClient();
  const videoRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const updateIntervalRef = useRef(null);
  const { state } = useLocation();

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

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteVideoComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['videoComments', videoId]);
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ updComment, commentId }) => updateVideoComment(updComment, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['videoComments', videoId]);
      setEditId(null);
      setEditComment('');
    },
  });

  const uptVideoMutation = useMutation({
    mutationFn: ({ attachmentId, percent, contentId }) =>
      uptPercentWatched(attachmentId, percent, contentId),
  });

  const getVideoPercent = useQuery({
    queryKey: ['videoPercent', videoId],
    queryFn: async () => {
      const res = await getPercentWatched(videoId, state?.contentId);
      return res.data || 0;
    },
  });

  // Video percent 95% dan yuqori bo'lsa seenVideo ni true qilish
  useEffect(() => {
    if (getVideoPercent.data?.percent >= 99) {
      setSeenVideo(true);
    }
  }, [getVideoPercent.data?.percent]);

  const updateVideoProgress = () => {
    const video = videoRef.current;
    if (!video || !videoId || video.paused || seenVideo) return;

    const currentTime = video.currentTime;
    const duration = video.duration;

    // Agar duration hali yuklanmagan bo'lsa yoki 0 bo'lsa
    if (!duration || duration === 0) return;

    // Foizni hisoblash
    const percent = Math.floor((currentTime / duration) * 100);

    // Har 3 sekundda yangilash
    const now = Date.now();
    if (now - lastUpdateTimeRef.current >= 3000) {
      lastUpdateTimeRef.current = now;
      if (percent > getVideoPercent.data?.percent) {
        uptVideoMutation.mutate(
          {
            attachmentId: videoId,
            percent: percent,
            contentId: state?.contentId,
          },
          {
            onSuccess: () => {
              if (percent >= 100) {
                setSeenVideo(true);
                queryClient.invalidateQueries(['videoPercent', videoId]);
              }
            },
          }
        );
      }

      console.log(`Progress update: ${percent}% at ${currentTime}s / ${duration}s`);
    }
  };

  // Video event handlers
  const handlePlay = () => {
    // Video play bo'lganda interval boshlash
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }
    updateIntervalRef.current = setInterval(() => {
      updateVideoProgress();
    }, 1000); // Har sekundda tekshirish, lekin yuborish 3 sekundda bir marta
  };

  const handlePause = () => {
    // Pause bo'lganda interval to'xtatish
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }

    // Pause bo'lganda oxirgi holatni yuborish
    const video = videoRef.current;
    if (!video || !videoId || seenVideo) return;

    const currentTime = video.currentTime;
    const duration = video.duration;

    if (!duration || duration === 0) return;

    const percent = Math.floor((currentTime / duration) * 100);

    uptVideoMutation.mutate(
      {
        attachmentId: videoId,
        percent: percent,
        contentId: state?.contentId,
      },
      {
        onSuccess: () => {
          if (percent >= 99) {
            setSeenVideo(true);
            queryClient.invalidateQueries(['videoPercent', videoId]);
          }
        },
      }
    );
  };

  const handleEnded = () => {
    if (seenVideo) return; // ⛔ Yana PUT qilmaslik

    uptVideoMutation.mutate(
      {
        attachmentId: videoId,
        percent: 100,
        contentId: state?.contentId,
      },
      {
        onSuccess: () => {
          setSeenVideo(true);
          queryClient.invalidateQueries(['videoPercent', videoId]);
        },
      }
    );
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !attachment.data?.lastWatchedTime) return;

    // Agar avval ko'rilgan bo'lsa, o'sha joydan davom ettirish
    video.currentTime = attachment.data.lastWatchedTime;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addCommentMutation.mutate(newComment);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className='mx-auto w-full max-w-4xl space-y-4 p-3 sm:space-y-6 lg:space-y-8 lg:p-4'>
      {/* Video Section */}
      <div className='overflow-hidden rounded-2xl bg-white shadow-xs sm:rounded-3xl'>
        {attachment.isPending ? (
          <div className='relative w-full bg-gray-100'>
            <Skeleton.Node
              active
              className='!h-0 !w-full rounded-t-2xl !bg-gray-200 !pb-[56.25%] sm:rounded-t-3xl'
              style={{ paddingBottom: '56.25%' }}
            />
          </div>
        ) : (
          <div className='relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl'>
            <video
              ref={videoRef}
              controls
              poster={attachment.data?.thumbnailImageUrl}
              className='aspect-video w-full rounded-t-2xl object-cover sm:rounded-t-3xl'
              playsInline
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source
                src={`https://dev.anvarovich.uz/api/student/content-video/${videoId}/stream`}
                type='video/mp4'
              />
              Sizning brauzeringiz videoni qollab-quvvatlamaydi.
            </video>
          </div>
        )}

        <div className='flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:py-6'>
          <h2 className='text-lg leading-tight font-semibold sm:text-xl lg:text-2xl'>
            {state?.title}
          </h2>
          <div className='flex flex-col items-start gap-1 sm:items-end'>
            <Rate
              value={getRate.data?.userVideoRating || 0}
              onChange={(value) => videoRateMutation.mutate(value)}
              disabled={Boolean(getRate.data?.userVideoRating)}
              className='text-base sm:text-lg lg:text-xl'
            />
            <p className='text-xs font-medium text-gray-600 sm:text-sm'>Videoni baholash</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className='rounded-2xl bg-white p-4 shadow-xs sm:rounded-3xl sm:p-6'>
        <h3 className='mb-4 text-lg font-semibold sm:text-xl'>Fikrlar</h3>

        {/* New Comment Input */}
        <div className='mb-6 flex items-start gap-3'>
          <div className='hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:flex sm:h-10 sm:w-10'>
            <MessageCircle size={18} />
          </div>
          <div className='flex-1 space-y-3'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              <input
                type='text'
                value={newComment}
                placeholder='Fikr bildirish...'
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                className='flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none sm:rounded-2xl sm:py-2.5 sm:text-base'
                disabled={addCommentMutation.isPending}
              />
              <button
                onClick={handleAddComment}
                disabled={addCommentMutation.isPending || !newComment.trim()}
                className='flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50 sm:w-auto sm:rounded-2xl sm:py-2.5'
              >
                <Send size={16} />
                <span className='hidden sm:inline'>
                  {addCommentMutation.isPending ? 'Yuborilmoqda...' : 'Yuborish'}
                </span>
                <span className='sm:hidden'>Yuborish</span>
              </button>
            </div>
            {addCommentMutation.isError && (
              <p className='text-xs text-red-500 sm:text-sm'>
                Xatolik: {addCommentMutation.error.message}
              </p>
            )}
          </div>
        </div>

        {/* Comments List */}
        <div className='space-y-4'>
          {isPending ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className='flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0'
              >
                <Skeleton.Avatar active size={36} shape='circle' />
                <div className='flex-1 space-y-2'>
                  <Skeleton.Input active size='small' className='!w-32' />
                  <Skeleton active paragraph={{ rows: 2 }} title={false} />
                </div>
              </div>
            ))
          ) : error ? (
            <div className='py-8 text-center'>
              <p className='text-sm text-red-500'>Fikrlarni yuklashda xatolik</p>
              <button
                onClick={() => queryClient.refetchQueries(['videoComments', videoId])}
                className='mt-2 text-sm text-blue-600 hover:underline'
              >
                Qayta urinish
              </button>
            </div>
          ) : comments.length === 0 ? (
            <div className='py-10 text-center'>
              <MessageCircle size={44} className='mx-auto mb-3 text-gray-300' />
              <p className='text-sm text-gray-500'>Hozircha fikr yoq</p>
              <p className='mt-1 text-xs text-gray-400'>Birinchi fikrni siz qoldiring!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className='border-b border-gray-100 pb-4 last:border-0 last:pb-0'
              >
                <div className='flex items-start gap-3'>
                  <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm'>
                    {(comment.firstName?.[0] || 'U') + (comment.lastName?.[0] || '')}
                  </div>

                  <div className='min-w-0 flex-1'>
                    <div className='mb-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm'>
                      <span className='font-medium text-gray-900'>
                        {comment.firstName} {comment.lastName}
                      </span>
                    </div>

                    {editId === comment.commentId ? (
                      <div className='mt-2 space-y-2'>
                        <textarea
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          className='w-full resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none'
                          rows={3}
                        />
                        <div className='flex gap-2'>
                          <button
                            onClick={() => {
                              if (editComment.trim() === comment.comment.trim()) {
                                setEditId(null);
                                setEditComment('');
                                return;
                              }
                              updateCommentMutation.mutate({
                                updComment: editComment,
                                commentId: editId,
                              });
                            }}
                            disabled={updateCommentMutation.isPending}
                            className='inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700 disabled:opacity-50'
                          >
                            <Check size={14} />
                            Saqlash
                          </button>
                          <button
                            onClick={() => {
                              setEditId(null);
                              setEditComment('');
                            }}
                            className='inline-flex items-center gap-1 rounded-lg bg-gray-200 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-300'
                          >
                            <X size={14} />
                            Bekor
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className='mt-1 text-sm leading-relaxed break-words text-gray-700 sm:text-base'>
                          {comment.comment}
                        </p>
                        {comment.own && (
                          <div className='mt-2 flex gap-2'>
                            <button
                              onClick={() => {
                                setEditId(comment.commentId);
                                setEditComment(comment.comment);
                              }}
                              className='inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs text-blue-700 hover:bg-blue-100'
                            >
                              <Edit size={12} />
                              Tahrirlash
                            </button>
                            <button
                              onClick={() => {
                                deleteCommentMutation.mutate(comment.commentId);
                              }}
                              disabled={deleteCommentMutation.isPending}
                              className='inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs text-red-700 hover:bg-red-100 disabled:opacity-50'
                            >
                              <Trash2 size={12} />
                              {deleteCommentMutation.isPending ? 'Ochmoqda...' : 'Ochirish'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
