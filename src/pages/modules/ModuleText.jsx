import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Card, Skeleton } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { getContentText, postTextContent } from 'src/api/modules.api';

const ModuleText = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split('/');
  const moduleId = pathParts[2];

  const { data, isLoading } = useQuery({
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
    <div className='mx-auto my-8 w-full max-w-6xl px-4'>
      <Button className='mb-2' onClick={() => navigate(`/modules/${moduleId}`)}>
        Back
      </Button>

      <Card
        title={
          <div className='mb-2 text-center text-2xl font-semibold text-[#1890ff]'>
            {state.title}
          </div>
        }
      >
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 12 }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data }} />
        )}
      </Card>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button
          type='primary'
          size='large'
          onClick={postReed}
          disabled={
            isLoading || // data yuklanmagan
            state.finish ||
            TextContentMutation.isPending ||
            TextContentMutation.isSuccess
          }
          style={{ minWidth: '180px' }}
        >
          {state.finish
            ? 'Already Read'
            : TextContentMutation.isPending
              ? 'Marking...'
              : TextContentMutation.isSuccess
                ? 'Marked as Read'
                : 'Mark as Read'}
        </Button>
      </div>
    </div>
  );
};

export default ModuleText;
