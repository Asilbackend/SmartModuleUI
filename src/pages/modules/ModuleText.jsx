import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { getContentText, postTextContent } from 'src/api/modules.api';

const ModuleText = () => {
  const { state } = useLocation();
  const { data } = useQuery({
    queryKey: ['moduleText', state.title],
    queryFn: async () => {
      const res = await getContentText(state.title);
      return res.data || [];
    },
  });

  const TextContentMutation = useMutation({
    mutationFn: ({ title, contentId }) => postTextContent(title, contentId),
  });
  const postReed = () => {
    TextContentMutation.mutate({ title: state.title, contentId: state.contentId });
  };
  return (
    <>
      <div>{data && <div>Content: {data}</div>}</div>
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
