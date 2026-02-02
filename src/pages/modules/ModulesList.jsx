import { useMutation, useQuery } from '@tanstack/react-query';
import { Empty, Modal, Skeleton, Steps } from 'antd';
import { AlertCircle, BookOpenText, CheckCircle2 } from 'lucide-react';
import { TvMinimalPlay } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getModuleById, postStartContent } from 'src/api/modules.api';
import { getStartTest } from 'src/api/test-page.api';

export default function ModuleList() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const { data, isPending, error } = useQuery({
    queryKey: ['module-content', id],
    queryFn: async () => {
      const res = await getModuleById(id);
      return res.data || [];
    },
    enabled: !!id,
  });

  const startTest = useMutation({
    mutationFn: () => getStartTest(id),
    onSuccess: () => {
      navigate(`/modules/${id}/test`);
    },
    onError: (error) => {
      console.error('Testni boshlashda xato:', error);
    },
  });

  // Scroll pozitsiyasini tiklash
  useEffect(() => {
    if (!isPending && data) {
      const savedScrollPosition = sessionStorage.getItem(`module-scroll-${id}`);
      if (savedScrollPosition) {
        // Main container yoki window'ga scroll qilish
        const scrollContainer = document.querySelector('main') || window;

        setTimeout(() => {
          if (scrollContainer === window) {
            window.scrollTo(0, parseInt(savedScrollPosition));
          } else {
            scrollContainer.scrollTop = parseInt(savedScrollPosition);
          }
          sessionStorage.removeItem(`module-scroll-${id}`);
        }, 100);
      }
    }
  }, [id, isPending, data]);

  // Scroll pozitsiyasini saqlash
  const saveScrollPosition = () => {
    const scrollContainer = document.querySelector('main');
    const scrollPosition = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
    sessionStorage.setItem(`module-scroll-${id}`, scrollPosition.toString());
  };

  const moduleData = data || [];

  const startContentMutation = useMutation({
    mutationFn: (contentId) => postStartContent(contentId),
  });

  const handleStepClick = (sectionId, item, index) => {
    saveScrollPosition();
    if (!item.isRead && index === 0) {
      startContentMutation.mutate(sectionId);
    }

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

  const handleTestButtonClick = () => {
    setIsTestModalOpen(true);
  };

  const handleStartTest = () => {
    setIsTestModalOpen(false);
    startTest.mutate(id);
  };

  const ModuleSkeleton = () => {
    return (
      <div className='mx-auto w-full max-w-6xl p-3 sm:p-4'>
        <div className='space-y-4 sm:space-y-6'>
          {/* Header Skeleton */}
          <div className='rounded-2xl bg-white p-3 shadow-lg sm:rounded-3xl sm:p-6'>
            <div className='mb-2 flex items-center gap-2'>
              <Skeleton.Avatar active size={24} shape='square' className='!rounded-lg' />
              <Skeleton.Input active size='large' className='!h-7 !w-48 sm:!h-8 sm:!w-64' />
            </div>
            <Skeleton active paragraph={{ rows: 2 }} className='mt-3' />
          </div>

          {/* Content Skeletons - 3 Sections */}
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className='rounded-2xl bg-white p-3 shadow-lg sm:rounded-3xl sm:p-6'>
              {/* Section Header */}
              <div className='mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between'>
                <Skeleton.Input active size='default' className='!h-7 !w-48 sm:!h-8 sm:!w-64' />
                <Skeleton.Button active size='small' shape='round' className='!h-7 !w-24' />
              </div>

              {/* Steps Skeleton */}
              <div className='space-y-4'>
                {[1, 2, 3].map((_, stepIdx) => (
                  <div key={stepIdx} className='flex items-start gap-3 rounded-xl p-3 sm:p-4'>
                    {/* Icon Skeleton */}
                    <Skeleton.Avatar
                      active
                      shape='square'
                      size={40}
                      className='!rounded-xl sm:!h-12 sm:!w-12'
                    />

                    <div className='flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                      {/* Content Info */}
                      <div className='flex-1 space-y-2'>
                        <Skeleton.Input active size='default' className='!h-6 !w-full sm:!w-200' />
                        <div className='flex gap-2'>
                          <Skeleton.Button
                            active
                            size='small'
                            shape='round'
                            className='!h-5 !w-16'
                          />
                          <Skeleton.Button
                            active
                            size='small'
                            shape='round'
                            className='!h-5 !w-20'
                          />
                        </div>
                      </div>

                      {/* Action Button Skeleton */}
                      <Skeleton.Button
                        active
                        size='default'
                        shape='round'
                        className='!h-9 !w-32 sm:!h-10 sm:!w-36'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom Button Skeleton */}
          <Skeleton.Button active size='large' shape='round' block className='!h-12 sm:!h-14' />
        </div>
      </div>
    );
  };

  // Check if all required content is completed
  const isAllRequiredContentCompleted = () => {
    if (!moduleData.length) return false;

    // Filter only required content sections
    const requiredSections = moduleData.filter((section) => section.isRequiredContent);

    // If no required sections, allow test
    if (requiredSections.length === 0) return true;

    // Check if all required sections have all their attachments read
    return requiredSections.every((section) => {
      // Check if all attachments in this section are read
      return section.attachmentDetails.every((attachment) => attachment.isRead);
    });
  };

  const canStartTest = isAllRequiredContentCompleted();

  if (isPending) return <ModuleSkeleton />;

  if (error) {
    return (
      <div className='mx-auto w-full max-w-6xl p-3 sm:p-4'>
        <div className='rounded-2xl bg-white p-12 text-center shadow-lg sm:rounded-3xl sm:p-16'>
          <div className='mb-4 text-lg font-semibold text-red-500 sm:text-xl'>
            Xatolik yuz berdi
          </div>
          <p className='mb-6 text-sm text-gray-600 sm:text-base'>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className='rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:px-8 sm:py-3 sm:text-base'
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  if (!moduleData.length) {
    return (
      <div className='mx-auto w-full max-w-6xl p-3 sm:p-4'>
        <div className='rounded-2xl bg-white p-12 shadow-lg sm:rounded-3xl sm:p-16'>
          <Empty description={<span className='text-gray-500'>Ma`lumot topilmadi</span>} />
        </div>
      </div>
    );
  }

  const { title, desc } = location.state || {};

  return (
    <div className='mx-auto w-full max-w-6xl p-3 sm:p-4'>
      <div className='space-y-4 sm:space-y-6'>
        {/* Module Header */}
        <div className='rounded-2xl bg-white p-3 shadow-lg sm:rounded-3xl sm:p-6'>
          <div className='mb-2 flex items-center gap-2'>
            <BookOpenText size={20} className='text-blue-600 sm:h-6 sm:w-6' />
            <h2 className='text-xl font-bold text-[#013464] sm:text-2xl'>{title}</h2>
          </div>
          <p className='text-sm text-gray-600 sm:text-base'>{desc}</p>
        </div>

        {/* Module Sections */}
        {moduleData.map((section, i) => {
          const isCompleted = section.userContentStatus === 'COMPLETED';

          const sortedAttachments = section.attachmentDetails.sort(
            (a, b) => a.order_element - b.order_element
          );

          const firstUnreadIndex = sortedAttachments.findIndex((item) => !item.isRead);

          return (
            <div
              key={section.contentId}
              className='rounded-2xl bg-white p-3 shadow-lg sm:rounded-3xl sm:p-6'
            >
              {/* Section Header */}
              <div className='mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between'>
                <h3 className='text-lg font-bold text-[#013464] sm:text-xl'>
                  {i + 1}. {section.contentTitle}
                </h3>

                <span
                  className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${
                    isCompleted
                      ? 'bg-green-50 text-green-600'
                      : section.isRequiredContent
                        ? 'bg-red-50 text-red-600'
                        : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {isCompleted && <CheckCircle2 size={14} />}
                  {isCompleted
                    ? 'Tugallangan'
                    : section.isRequiredContent
                      ? 'Majburiy'
                      : 'Ixtiyoriy'}
                </span>
              </div>

              {/* Steps */}
              <Steps
                direction='vertical'
                current={firstUnreadIndex === -1 ? sortedAttachments.length : firstUnreadIndex}
                className='custom-steps'
                items={sortedAttachments.map((item, index) => ({
                  description: (
                    <div className='mb-4 rounded-xl bg-gray-50 p-2 transition-all hover:bg-gray-100'>
                      {/* Desktop Layout */}
                      <div className='hidden items-center justify-between gap-3 sm:flex'>
                        <div className='flex flex-1 items-start gap-3'>
                          <div
                            className={`rounded-xl p-2 ${
                              item.contentType === 'VIDEO' ? 'bg-blue-100' : 'bg-purple-100'
                            }`}
                          >
                            {item.contentType === 'VIDEO' ? (
                              <TvMinimalPlay
                                size={24}
                                className={item.contentType === 'VIDEO' ? 'text-blue-600' : ''}
                              />
                            ) : (
                              <BookOpenText
                                size={24}
                                className={item.contentType === 'TEXT' ? 'text-purple-600' : ''}
                              />
                            )}
                          </div>

                          <div className='flex-1'>
                            <h4 className='mb-1 text-base font-semibold text-gray-900 sm:text-lg'>
                              {item.title}
                            </h4>
                            <div className='flex items-center gap-3 text-xs text-gray-500 sm:text-xs'>
                              <span className='rounded-full bg-gray-200 px-1.5 py-0.5 font-medium'>
                                {item.contentType}
                              </span>
                              {item.videoDuration && (
                                <span className='flex items-center gap-1'>
                                  <TvMinimalPlay size={14} />
                                  {item.videoDuration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {item.isRead ? (
                          <button
                            onClick={() => handleStepClick(section.contentId, item)}
                            className='flex cursor-pointer items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-100'
                          >
                            <CheckCircle2 size={16} />
                            <span className='hidden sm:inline'>Tugallangan</span>
                          </button>
                        ) : index === firstUnreadIndex ? (
                          <button
                            onClick={() => handleStepClick(section.contentId, item, index)}
                            className='cursor-pointer rounded-xl bg-blue-600 px-9.5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 active:scale-95'
                          >
                            Boshlash
                          </button>
                        ) : null}
                      </div>

                      {/* Mobile Layout */}
                      <div className='flex flex-col gap-3 sm:hidden'>
                        <div className='flex items-start gap-3'>
                          <div
                            className={`rounded-xl p-2 ${
                              item.contentType === 'VIDEO' ? 'bg-blue-100' : 'bg-purple-100'
                            }`}
                          >
                            {item.contentType === 'VIDEO' ? (
                              <TvMinimalPlay size={24} className='text-blue-600' />
                            ) : (
                              <BookOpenText size={24} className='text-purple-600' />
                            )}
                          </div>

                          <div className='flex-1'>
                            <h4 className='mb-1 text-base font-semibold text-gray-900'>
                              {item.title}
                            </h4>
                            <div className='flex items-center gap-2 text-xs text-gray-500'>
                              <span className='rounded-full bg-gray-200 px-2 py-0.5 font-medium'>
                                {item.contentType}
                              </span>
                              {item.videoDuration && <span>{item.videoDuration}</span>}
                            </div>
                          </div>
                        </div>

                        {item.isRead ? (
                          <button
                            onClick={() => handleStepClick(section.contentId, item)}
                            className='flex w-full items-center justify-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600'
                          >
                            <CheckCircle2 size={16} />
                            Tugallangan
                          </button>
                        ) : index === firstUnreadIndex ? (
                          <button
                            onClick={() => handleStepClick(section.contentId, item, index)}
                            className='w-full rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white'
                          >
                            Boshlash
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ),
                }))}
              />
            </div>
          );
        })}

        {/* Test Button - Disabled until all required content is completed */}
        <div className='relative'>
          <button
            onClick={handleTestButtonClick}
            disabled={!canStartTest}
            className={`mt-6 w-full rounded-xl px-5 py-3 font-semibold shadow-lg transition-all ${
              canStartTest
                ? 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl active:scale-95'
                : 'cursor-not-allowed bg-gray-300 text-gray-500 opacity-60'
            }`}
          >
            Modul boyicha testni boshlash
          </button>

          {/* Warning message when button is disabled */}
          {!canStartTest && (
            <div className='mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700'>
              <AlertCircle size={18} className='flex-shrink-0' />
              <span>Testni boshlash uchun barcha majburiy mavzularni tugallang</span>
            </div>
          )}
        </div>
      </div>

      {/* Test Modal */}
      <Modal
        open={isTestModalOpen}
        onCancel={() => setIsTestModalOpen(false)}
        footer={null}
        centered
        width={600}
        className='test-modal'
      >
        <div className='p-4 sm:p-6'>
          <div className='mb-6 flex items-center gap-3'>
            <div className='rounded-full bg-blue-100 p-3'>
              <AlertCircle size={24} className='text-blue-600' />
            </div>
            <h3 className='text-xl font-bold text-[#013464] sm:text-2xl'>Test qoidalari</h3>
          </div>

          <div className='mb-6 space-y-4'>
            <div className='rounded-xl bg-gray-50 p-4'>
              <h4 className='mb-2 font-semibold text-gray-900'>Eslatma:</h4>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 text-blue-600'>•</span>
                  <span>Testni boshlashdan oldin barcha mavzularni diqqat bilan o`rganing</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 text-blue-600'>•</span>
                  <span>Har bir savol uchun belgilangan vaqt ichida javob bering</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 text-blue-600'>•</span>
                  <span>Test bir marta boshlanganidan keyin to`xtatib bo`lmaydi</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 text-blue-600'>•</span>
                  <span>O`tish balli: 70% va undan yuqori</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
            <button
              onClick={() => setIsTestModalOpen(false)}
              className='w-full rounded-xl border border-gray-300 px-6 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-50 sm:w-auto'
            >
              Bekor qilish
            </button>
            <button
              onClick={handleStartTest}
              disabled={startTest.isPending}
              className='w-full rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
            >
              {startTest.isPending ? 'Yuklanmoqda...' : 'Testni boshlash'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
