import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { VideoImg } from 'src/api/attachment-controller.api';
import { postPictureContent } from 'src/api/modules.api';

const ModuleFile = () => {
  const { state } = useLocation();

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
      <div>{data?.url && <div>URL: {data.url}</div>}</div>
      <Button
        onClick={postReed}
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
