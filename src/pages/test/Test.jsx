import TestComponent from '@components/ui/TestComponent';

import { Questions } from '../../data/sampleQuestions ';

function Test() {
  return (
    <>
      <div className='min-h-screen py-3 sm:px-4 sm:py-6 md:px-8'>
        <TestComponent questions={Questions} duration={60 * 20} />
      </div>
    </>
  );
}

export default Test;
