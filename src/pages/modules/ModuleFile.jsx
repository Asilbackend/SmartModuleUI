import PdfViewer from '@components/ui/PdfViewer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { VideoImg } from 'src/api/attachment-controller.api';
import { postPictureContent } from 'src/api/modules.api';

const ModuleFile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const moduleId = pathParts[2];
  const { data } = useQuery({
    queryKey: ['moduleFile', state.attachmentId],
    queryFn: async () => {
      const res = await VideoImg(state.attachmentId);
      return res.data || [];
    },
    enabled: !!state.attachmentId,
  });

  const pictureContentMutation = useMutation({
    mutationFn: ({ attachmentId, contentId }) => postPictureContent(attachmentId, contentId),
  });

  const postReed = () => {
    pictureContentMutation.mutate({
      attachmentId: state.attachmentId,
      contentId: state.contentId,
    });
  };

  return (
    <>
      <div className='mx-auto my-8 w-full max-w-6xl px-4'>
        <Button className='mb-2' onClick={() => navigate(`/modules/${moduleId}`)}>
          Back
        </Button>
        {data?.url && (
          <PdfViewer pdf={data.url} attachType={data.attachType} fileName={data.fileName} />
        )}
      </div>
      <Button
        onClick={postReed}
        className='mb-12'
        disabled={
          state.finish || pictureContentMutation.isPending || pictureContentMutation.isSuccess
        }
      >
        {state.finish
          ? 'Already Read'
          : pictureContentMutation.isPending
            ? 'Marking...'
            : pictureContentMutation.isSuccess
              ? 'Marked as Read'
              : 'Mark as Read'}
      </Button>
    </>
  );
};
export default ModuleFile;
