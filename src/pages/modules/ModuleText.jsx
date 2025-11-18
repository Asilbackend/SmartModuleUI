import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { postTextContent } from 'src/api/modules.api';

const ModuleText = () => {
  const { state } = useLocation();
  const TextContentMutation = useMutation({
    mutationFn: ({ title, contentId }) => postTextContent(title, contentId),
  });
  const postReed = () => {
    TextContentMutation.mutate({ title: state.title, contentId: state.contentId });
  };
  return (
    <>
      <div>ModuleText: {state.title}</div>
      <Button
        onClick={postReed}
        disabled={state.finish || TextContentMutation.isPending || TextContentMutation.isSuccess}
      >
        {state.finish
          ? 'Already Read'
          : TextContentMutation.isPending
            ? 'Marking...'
            : TextContentMutation.isSuccess
              ? 'Marked as Read'
              : 'Mark as Read'}
      </Button>
    </>
  );
};

export default ModuleText;
