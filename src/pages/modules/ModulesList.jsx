import { useMutation, useQuery } from '@tanstack/react-query';
import { Skeleton, Steps } from 'antd';
import { BookOpenText, TvMinimalPlay } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getModuleById, postStartContent } from 'src/api/modules.api';

export default function ModuleList() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ['module-content', id],
    queryFn: async () => {
      const res = await getModuleById(id);
      return res.data || [];
    },
    enabled: !!id,
  });

  const moduleData = data || [];

  const startContentMutation = useMutation({
    mutationFn: (contentId) => postStartContent(contentId),
  });

  const handleStepClick = (sectionId, item) => {
    // Faqat birinchi marta boshlanganda API'ga so'rov yuborish
    if (!item.isRead) {
      startContentMutation.mutate(sectionId);
    }

    // Navigatsiya
    if (item.contentType === 'VIDEO') {
      navigate(`/modules/${id}/video/${item.attachmentId}`, {
        state: {
          contentId: sectionId,
          attachmentId: item.attachmentId,
          title: item.title,
          finish: item.isRead,
        },
      });
    } else if (item.contentType === 'TEXT') {
      navigate(`/modules/${id}/text/${item.title}`, {
        state: {
          title: item.title,
          contentId: sectionId,
          finish: item.isRead,
        },
      });
    } else {
      navigate(`/modules/${id}/file/${item.attachmentId}`, {
        state: {
          attachmentId: item.attachmentId,
          contentId: sectionId,
          finish: item.isRead,
        },
      });
    }
  };

  const ModuleSkeleton = () => {
    return (
      <div className='py-3 sm:px-4 sm:py-6 md:px-8'>
        <div className='mb-4 rounded-2xl bg-[#008CFF0A] p-4 sm:mb-6 sm:p-6'>
          <Skeleton.Input active size='large' style={{ width: 200, marginBottom: 10 }} />
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>

        {[1, 2].map((_, idx) => (
          <div key={idx} className='mb-8 rounded-2xl bg-white p-4 shadow-sm sm:p-6'>
            <div className='mb-8 flex items-center justify-between'>
              <Skeleton.Input active size='default' style={{ width: 250 }} />
              <div className='w-[70px] text-end lg:w-[100px]'>
                <Skeleton.Button active size='small' />
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              {[...Array(4)].map((_, stepIdx) => (
                <div
                  key={stepIdx}
                  className='flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0'
                >
                  <div className='flex items-start gap-3'>
                    <Skeleton.Avatar active shape='circle' size={40} />
                    <div className='w-[200px] lg:w-[450px] xl:w-[600px] 2xl:w-[850px]'>
                      <Skeleton active size='small' paragraph={{ rows: 2 }} />
                    </div>
                  </div>
                  <div className='w-[70px] text-end lg:w-[100px]'>
                    <Skeleton.Button active size='small' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Skeleton.Button active size='large' shape='round' block style={{ height: 50 }} />
      </div>
    );
  };

  if (isPending) return <ModuleSkeleton />;
  if (error) return <ModuleSkeleton />;
  if (!moduleData.length) return <div className='p-8'>Malumot topilmadi</div>;

  const { title, desc } = location.state || {};

  return (
    <div className='py-3 sm:px-4 sm:py-6 md:px-8'>
      <div className='mb-4 rounded-2xl border border-gray-100 bg-[#008CFF0A] p-3 sm:mb-6 sm:p-6'>
        <h2 className='mb-2 text-2xl font-semibold sm:mb-4'>{title}</h2>
        <p className='text-gray-700'>{desc}</p>
      </div>

      {moduleData.map((section, i) => {
        const isCompleted = section.userContentStatus === 'COMPLETED';
        const nextSection = moduleData[i + 1];
        const canStartNext = isCompleted && nextSection?.userContentStatus === 'NOT_STARTED';

        // Saralangan attachments
        const sortedAttachments = section.attachmentDetails.sort(
          (a, b) => a.order_element - b.order_element
        );

        // Birinchi isRead: false bo'lgan element indexini topish
        const firstUnreadIndex = sortedAttachments.findIndex((item) => !item.isRead);

        return (
          <div key={section.contentId} className='mb-8 rounded-2xl bg-white p-3 shadow-sm sm:p-6'>
            <div className='mb-5 flex flex-col-reverse items-start justify-between sm:mb-8 sm:flex-row sm:items-center'>
              <h2 className='text-[22px] font-semibold text-blue-900 sm:text-2xl'>
                {i + 1}. {section.contentTitle}
              </h2>

              <span
                className={`sm:text-md mb-2 rounded-2xl px-4 py-0.5 text-sm sm:mb-0 ${
                  isCompleted ? 'bg-[#00FF001A] text-[#00AA00]' : 'bg-[#FF00001A] text-[#FF0000]'
                }`}
              >
                {isCompleted ? 'Tugallangan' : section.isRequiredContent ? 'Majburiy' : 'Ixtiyoriy'}
              </span>
            </div>

            <Steps
              direction='vertical'
              current={firstUnreadIndex === -1 ? sortedAttachments.length : firstUnreadIndex}
              items={sortedAttachments.map((item, index) => ({
                description: (
                  <div className='mb-2 flex items-start justify-between gap-1'>
                    <div className='flex items-start gap-3'>
                      <div className='min-w-[30px]'>
                        {item.contentType === 'VIDEO' ? (
                          <TvMinimalPlay size={32} />
                        ) : (
                          <BookOpenText size={32} />
                        )}
                      </div>
                      <div className='flex max-w-[200px] flex-col md:max-w-full'>
                        <h3 className='line-clamp-2 text-[16px] md:text-[20px]'>{item.title}</h3>
                        <div className='flex gap-2 text-gray-500'>
                          <p className='text-[14px]'>{item.contentType}</p>
                          {item.videoDuration && (
                            <p className='text-[14px]'>{item.videoDuration}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tugmalarni ko'rsatish mantiqi */}
                    {item.isRead ? (
                      // Agar o'qilgan bo'lsa - "Tugallangan" tugmasi
                      <button
                        onClick={() => handleStepClick(section.contentId, item)}
                        className='cursor-pointer rounded-lg bg-[#F0F7FF] px-3 py-2 text-[#008CFF]'
                      >
                        Tugallangan
                      </button>
                    ) : index === firstUnreadIndex ? (
                      // Agar birinchi o'qilmagan element bo'lsa - "Boshlash" tugmasi
                      <button
                        onClick={() => handleStepClick(section.contentId, item)}
                        className='cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700'
                      >
                        Boshlash
                      </button>
                    ) : null}
                  </div>
                ),
              }))}
            />

            {canStartNext && (
              <button
                onClick={() => navigate(`/modules/${nextSection.contentId}`)}
                className='mt-4 w-full rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700'
              >
                Keyingi modulga otish →
              </button>
            )}
          </div>
        );
      })}

      <Link to={`/modules/${id}/test`}>
        <button className='mb-12 w-full cursor-pointer rounded-xl bg-[#008CFF] px-5.5 py-3 text-lg font-semibold text-white'>
          Ozingizni sinab koring
        </button>
      </Link>
    </div>
  );
}
