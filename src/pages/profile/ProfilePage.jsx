import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Empty, Modal, Progress, Skeleton } from 'antd';
import { Award, Check, Clock, Eye, PlayCircle, TrendingUp, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getLastViewedVideos,
  getModuleIdByContentId,
  getModuleStatus,
  getStudentData,
} from 'src/api/profile-controller.api';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('COMPLETED');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getProfile = useQuery({
    queryKey: ['studentProfile'],
    queryFn: async () => {
      const res = await getStudentData();
      return res.data || {};
    },
  });

  const lastVideos = useQuery({
    queryKey: ['lastViewedVideos'],
    queryFn: async () => {
      const res = await getLastViewedVideos();
      return res.data || {};
    },
  });

  const getStatus = useQuery({
    queryKey: ['moduleStatus', activeTab],
    queryFn: async () => {
      const res = await getModuleStatus(activeTab);
      return res.data || [];
    },
  });

  const setModuleStatus = (status) => {
    setActiveTab(status);
  };

  const leftInfo = [
    { label: 'Ism', value: getProfile.data?.firstname },
    { label: 'Familiya', value: getProfile.data?.lastname },
    { label: 'Yo`nalish', value: getProfile.data?.direction },
    { label: 'O`qish tili', value: getProfile.data?.lang },
    { label: 'Guruh', value: getProfile.data?.groupName },
  ];

  const validVideos = lastVideos.data?.content?.filter((v) => v.progress !== null) || [];
  const latestVideo = validVideos[0];

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'FAILED':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'IN_PROGRESS':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <Check size={16} className="text-green-600" />;
      case 'FAILED':
        return <X size={16} className="text-red-600" />;
      case 'IN_PROGRESS':
        return <TrendingUp size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  async function routeToVideo(contentId, attachmentId, title) {
    const moduleId = await queryClient.fetchQuery({
      queryKey: ['moduleId', contentId],
      queryFn: () =>
        getModuleIdByContentId(contentId).then(res => res.data.moduleId),
    });
    navigate(`/modules/${moduleId}/video/${attachmentId}`, {
      state: {
        title: title,
      },
    });
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-3 sm:p-4">
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
          {/* Last Viewed Video Block */}
          <div className="rounded-2xl bg-white shadow-lg sm:rounded-3xl lg:col-span-5">
            {lastVideos.isLoading ? (
              <Skeleton.Image
                active
                className="!h-48 !w-full rounded-t-2xl sm:!h-64 sm:rounded-t-3xl"
              />
            ) : latestVideo ? (
              <div
                className="group relative cursor-pointer overflow-hidden rounded-t-2xl sm:rounded-t-3xl"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img
                  src={latestVideo.thumbnailImageUrl}
                  alt={latestVideo.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-64"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex flex-col items-center gap-2 text-white">
                    <PlayCircle size={48} strokeWidth={1.5} className="sm:h-14 sm:w-14" />
                    <span className="px-2 text-center text-xs font-medium sm:text-sm">
                      Barcha videolarni korish
                    </span>
                  </div>
                </div>
                <div
                  className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:top-4 sm:right-4 sm:px-3 sm:py-1.5">
                  {latestVideo.progress}% korildi
                </div>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-t-2xl bg-gray-100 sm:h-64 sm:rounded-t-3xl">
                <div className="text-center text-gray-400">
                  <Clock size={40} className="mx-auto mb-2 sm:h-12 sm:w-12" />
                  <p className="text-sm sm:text-base">Hali video korilmagan</p>
                </div>
              </div>
            )}

            <div className="px-3 py-3 sm:px-4 sm:pt-4 sm:pb-4">
              <div className="mb-2 flex items-center gap-2">
                <Clock size={16} className="text-blue-600 sm:h-[18px] sm:w-[18px]" />
                <h3 className="text-base font-bold text-[#013464] sm:text-lg">
                  Oxirgi korilgan video
                </h3>
              </div>
              {latestVideo ? (
                <>
                  <h4 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl">
                    {latestVideo.title}
                  </h4>
                  <p className="mb-3 text-xs text-gray-600 sm:text-sm">
                    {latestVideo.description || 'Tavsif mavjud emas'}
                  </p>
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:rounded-xl sm:py-2.5"
                  >
                    <Eye size={16} className="sm:h-[18px] sm:w-[18px]" />
                    <span className="hidden sm:inline">
                      Barcha videolarni korish ({validVideos.length})
                    </span>
                    <span className="sm:hidden">Videolar ({validVideos.length})</span>
                  </button>
                </>
              ) : (
                <p className="text-xs text-gray-500 sm:text-sm">
                  Siz hali birorta ham video kormadingiz
                </p>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="rounded-2xl bg-white p-3 shadow-lg sm:rounded-3xl sm:p-4 lg:col-span-7">
            {getProfile.isLoading ? (
              <div className="flex flex-col gap-3 sm:gap-4 xl:flex-row">
                <div className="flex items-center justify-center xl:w-1/3">
                  <Skeleton.Avatar
                    active
                    size={160}
                    shape="square"
                    className="!h-32 !w-32 sm:!h-40 sm:!w-40 md:!h-48 md:!w-48"
                  />
                </div>
                <div className="xl:w-2/3">
                  <Skeleton active paragraph={{ rows: 5 }} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:gap-4 xl:flex-row">
                <div className="flex items-center justify-center xl:w-1/3">
                  <img
                    src={getProfile.data?.userImageUrl || '/image.png'}
                    alt="Talaba rasmi"
                    className="h-32 w-32 rounded-xl object-cover shadow-md sm:h-40 sm:w-40 sm:rounded-2xl md:h-48 md:w-48"
                  />
                </div>
                <div className="xl:w-2/3">
                  <h2 className="mb-3 text-lg font-bold text-[#013464] sm:mb-4 sm:text-xl md:text-2xl">
                    Shaxsiy malumotlar
                  </h2>
                  <div className="space-y-1.5 sm:space-y-2">
                    {leftInfo.map((item) => (
                      <div
                        key={item.label}
                        className="flex border-b border-gray-100 py-1.5 text-sm sm:py-2 sm:text-base"
                      >
                        <span className="w-28 font-semibold text-gray-700 sm:w-32">
                          {item.label}:
                        </span>
                        <span className="flex-1 text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modules Section */}
        <div className="col-span-12">
          {/* Tabs */}
          <div
            className="flex justify-between gap-1 rounded-xl bg-white px-2 py-2 shadow-lg sm:gap-2 sm:rounded-2xl sm:px-4">
            <button
              className={`flex-1 cursor-pointer rounded-xl px-2 py-2 text-xs font-semibold transition sm:px-4 sm:py-3 sm:text-sm md:text-base ${
                activeTab === 'COMPLETED'
                  ? 'bg-[#F0F7FF] text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setModuleStatus('COMPLETED')}
            >
              COMPLETED
            </button>

            <button
              className={`flex-1 cursor-pointer rounded-xl px-2 py-2 text-xs font-semibold transition sm:px-4 sm:py-3 sm:text-sm md:text-base ${
                activeTab === 'FAILED'
                  ? 'bg-[#F0F7FF] text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setModuleStatus('FAILED')}
            >
              FAILED
            </button>

            <button
              className={`flex-1 cursor-pointer rounded-xl px-2 py-2 text-xs font-semibold transition sm:px-4 sm:py-3 sm:text-sm md:text-base ${
                activeTab === 'IN_PROGRESS'
                  ? 'bg-[#F0F7FF] text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setModuleStatus('IN_PROGRESS')}
            >
              IN PROGRESS
            </button>
          </div>

          {/* Module Cards with Loading and Empty States */}
          {getStatus.isLoading ? (
            // Loading Skeleton
            <div
              className="mt-4 rounded-2xl bg-white px-3 py-4 shadow-lg sm:mt-6 sm:rounded-3xl sm:px-4 sm:py-6 md:px-6">
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ) : getStatus.data && getStatus.data.length > 0 ? (
            // Module Cards - NEW DESIGN
            <div className="mt-4 space-y-4 sm:mt-6">
              {getStatus.data.map((modul) => (
                <div
                  key={modul.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:rounded-3xl"
                >
                  {/* Header Section */}
                  <div
                    className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Award size={20} className="text-blue-600 sm:h-6 sm:w-6" />
                          <h2 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                            {modul.moduleName}
                          </h2>
                        </div>
                        <p className="text-sm text-gray-600 sm:text-base">
                          {modul.moduleDescription}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm ${getStatusColor(modul.moduleState)}`}
                      >
                        {getStatusIcon(modul.moduleState)}
                        <span>{modul.moduleState}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="px-4 py-4 sm:px-6 sm:py-5">
                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700 sm:text-base">
                          Tugallanish foizi
                        </span>
                        <span className="text-lg font-bold text-blue-600 sm:text-xl">
                          {modul.readPercentage || 0}%
                        </span>
                      </div>
                      <Progress
                        percent={modul.readPercentage || 0}
                        strokeWidth={12}
                        strokeColor={{
                          '0%': '#93c5fd',
                          '100%': '#2563eb',
                        }}
                        trailColor="#e5e7eb"
                        showInfo={false}
                        className="sm:strokeWidth-14"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                      <Button
                        type="default"
                        icon={<Check size={18} strokeWidth={2} />}
                        size="large"
                        iconPosition="end"
                        className="flex-1 rounded-xl border-green-200 bg-green-50 font-semibold text-green-700 transition-all hover:!border-green-300 hover:!bg-green-100 hover:!text-green-800"
                      >
                        Tugallangan
                      </Button>
                      <Button
                        type="primary"
                        icon={<Eye size={18} strokeWidth={2} />}
                        size="large"
                        iconPosition="end"
                        onClick={() => setIsOpen(true)}
                        className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 font-semibold shadow-md transition-all hover:!from-blue-700 hover:!to-blue-800 hover:shadow-lg"
                      >
                        Sertifikatni korish
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div
              className="mt-4 rounded-2xl bg-white px-3 py-12 shadow-lg sm:mt-6 sm:rounded-3xl sm:px-4 sm:py-16 md:px-6">
              <Empty
                description={
                  <span className="text-gray-500">
                    {activeTab === 'COMPLETED' && 'Tugallangan modullar yo\'q'}
                    {activeTab === 'FAILED' && 'Muvaffaqiyatsiz modullar yo\'q'}
                    {activeTab === 'IN_PROGRESS' && 'Jarayondagi modullar yo\'q'}
                  </span>
                }
              />
            </div>
          )}
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 p-3 backdrop-blur-sm sm:p-4">
            <img
              src="/sertifikat.png"
              className="max-h-[90vh] w-full max-w-4xl rounded-xl shadow-2xl sm:rounded-2xl"
              alt="Sertifikat"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-24 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-red-600 sm:top-6 sm:right-6 sm:h-12 sm:w-12 md:top-24 md:right-18"
            >
              <X size={24} strokeWidth={2} className="sm:h-7 sm:w-7" />
            </button>
          </div>
        )}

        {/* Videos Modal */}
        <Modal
          open={isVideoModalOpen}
          onCancel={() => setIsVideoModalOpen(false)}
          footer={null}
          width={900}
          centered
          className="videos-modal"
          title={
            <div className="flex items-center gap-2 text-lg sm:text-xl">
              <Clock size={20} className="text-blue-600 sm:h-6 sm:w-6" />
              <span>Oxirgi korilgan videolar ({validVideos.length})</span>
            </div>
          }
        >
          <div className="max-h-[60vh] space-y-3 overflow-y-auto p-1 sm:max-h-[70vh] sm:space-y-4 sm:p-2">
            {validVideos.length === 0 ? (
              <div className="py-8 text-center sm:py-12">
                <Clock size={40} className="mx-auto mb-3 text-gray-300 sm:h-12 sm:w-12" />
                <p className="text-sm text-gray-500 sm:text-base">Hali video korilmagan</p>
              </div>
            ) : (
              validVideos.map((video) => (
                <div
                  key={video.attachmentId}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl sm:rounded-2xl"
                  onClick={() => routeToVideo(video.contentId, video.attachmentId, video.title)}
                >
                  <div className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 sm:p-4">
                    <div className="relative overflow-hidden rounded-lg sm:w-44 sm:rounded-xl md:w-48">
                      <img
                        src={video.thumbnailImageUrl}
                        alt={video.title}
                        className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-110 sm:h-24 md:h-28"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                        <PlayCircle
                          size={32}
                          className="text-white sm:h-10 sm:w-10"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div
                        className="absolute right-1.5 bottom-1.5 rounded-full bg-blue-600 px-1 py-0.5 text-xs font-bold text-white sm:right-2 sm:bottom-2 sm:px-1.5 sm:py-0.5">
                        {video.progress}%
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-2 text-base font-semibold text-gray-900 group-hover:text-blue-600 sm:text-lg">
                        {video.title}
                      </h3>
                      <p className="mb-2 line-clamp-2 text-xs text-gray-600 sm:mb-3 sm:text-sm">
                        {video.description || 'Tavsif mavjud emas'}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 sm:gap-4">
                        <span className="flex items-center gap-1">
                          <Check size={12} className="text-green-600 sm:h-3.5 sm:w-3.5" />
                          Korildi
                        </span>
                        <span className="hidden sm:inline">ID: {video.attachmentId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                    <Progress
                      percent={video.progress}
                      strokeColor={{
                        '0%': '#bedbff',
                        '100%': '#2b7fff',
                      }}
                      strokeWidth={6}
                      showInfo={false}
                      className="sm:strokeWidth-8"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;
