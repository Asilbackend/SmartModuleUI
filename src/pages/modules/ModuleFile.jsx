import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { postPictureContent } from 'src/api/modules.api';

const ModuleFile = () => {
  const { state } = useLocation();
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
      <div>ModuleFile: {state.attachmentId}</div>
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
