// import { useEffect } from 'react';
import { Button, Pagination } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const OptionButton = ({ option, idx, userAnswer, correctAnswer, onSelect, isFinished }) => {
  const isCorrect = option === correctAnswer;
  const isSelected = option === userAnswer;

  const buttonClass = clsx(
    'flex w-full cursor-pointer rounded-lg border border-[#F0F7FF] text-left text-[22px]',
    {
      // Javob belgilanmagan holat
      'border-[#F0F7FF] bg-white hover:bg-blue-50': !isFinished && !userAnswer,

      // Test tugagach to‘g‘ri/noto‘g‘ri ko‘rsatish
      'border border-[#27CB56] bg-[#CDF5C2]': isFinished && isCorrect,
      'border border-[#FF0000] bg-[#FFCFC6]': isFinished && isSelected && !isCorrect,

      // Belgilangan, lekin test tugamagan payt
      'border-2 !border-[#008CFF] bg-[#CCE2FE]': !isFinished && isSelected,
    }
  );

  const letterClass = clsx('mr-2 rounded-l-md p-4 px-6 font-semibold', {
    'bg-[#F0F7FF]': !isFinished && !userAnswer,
    'bg-[#008CFF] text-white': !isFinished && isSelected,

    'bg-[#27CB56] text-white': isFinished && isCorrect,
    'bg-[#FF0000] text-white': isFinished && isSelected && !isCorrect,
    'bg-white': isFinished && !isSelected && !isCorrect,
  });

  return (
    <button onClick={() => onSelect(option)} className={buttonClass} disabled={isFinished}>
      <span className={letterClass}>{String.fromCharCode(65 + idx)}</span>
      <span className='p-4'>{option}</span>
    </button>
  );
};

const TestComponent = ({ questions, duration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || isFinished) return setIsFinished(true);
    const interval = setInterval(() => setTimeLeft((prev) => prev - 50), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isFinished]);

  // Format time
  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  const currentQuestion = questions[currentIndex];
  const userAnswer = selectedAnswers[currentIndex];

  const handleAnswer = (option) => {
    if (userAnswer || isFinished) return; // qayta bosish yoki tugagach taqiqlanadi
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  return (
    <>
      {/* Savol raqamlari va Timer */}
      <div className='mb-6 rounded-2xl bg-white p-4 shadow-xs'>
        <div className='mb-4 hidden flex-wrap gap-2 md:flex'>
          {questions.map((_, idx) => {
            const answered = selectedAnswers[idx];
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={clsx(
                  'h-[60px] w-[60px] cursor-pointer rounded-md border-2 text-[24px] font-semibold',
                  {
                    'border-[#008CFF] text-[#008CFF]': idx === currentIndex, // aktiv savol
                    'border-[#008CFF] bg-[#CCE2FE] text-[#008CFF]':
                      answered && idx !== currentIndex, // javob berilgan savollar
                    'border-gray-400 text-gray-400 hover:bg-gray-300':
                      !answered && idx !== currentIndex, // javob berilmagan
                  }
                )}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className='mx-auto w-30 rounded-xl bg-[#F0F7FF] p-4 text-center text-2xl font-semibold'>
          {formatTime(timeLeft)}
        </div>
      </div>
      {/* Savol va variantlar */}
      <div className='rounded-2xl bg-white p-3 shadow-xs md:p-6'>
        <h2 className='mb-6 text-[24px] font-semibold md:text-[28px]'>
          {currentIndex + 1}. {currentQuestion.question}
        </h2>
        <div className='space-y-2'>
          {currentQuestion.options.map((opt, idx) => (
            <OptionButton
              key={idx}
              option={opt}
              idx={idx}
              userAnswer={userAnswer}
              correctAnswer={currentQuestion.answer}
              onSelect={handleAnswer}
              isFinished={isFinished}
            />
          ))}
        </div>

        {/* Tugatish tugmasi */}
        {!isFinished && (
          <div className='mt-6 text-center'>
            <Button
              onClick={handleFinish}
              size='large'
              className='rounded-lg bg-[#008CFF] px-6 py-3 font-semibold text-white hover:bg-[#0070cc]'
            >
              Tugatish
            </Button>
          </div>
        )}
      </div>
      <div className='mt-4 mb-4 flex justify-center md:hidden'>
        <Pagination
          pageSize={10}
          current={currentIndex + 1}
          total={questions.length * 10}
          onChange={(page) => setCurrentIndex(page - 1)}
          itemRender={(page, type, originalElement) => {
            if (type === 'page') {
              const isAnswered = !!selectedAnswers[page - 1];
              const isActive = currentIndex + 1 === page;
              // Har bir sahifa raqamiga class beramiz
              return (
                <button
                  className={clsx(
                    'h-10 w-10 rounded-md border text-center text-base font-semibold',
                    {
                      'border-[#008CFF] bg-[#CCE2FE] text-[#008CFF]': isAnswered && !isActive, // Javob berilgan
                      'border-[#008CFF] bg-[#008CFF] text-white': isActive, // Faol sahifa
                      'border-gray-300 bg-white text-gray-500': !isAnswered && !isActive, // Javobsiz
                    }
                  )}
                  onClick={() => setCurrentIndex(page - 1)}
                >
                  {page}
                </button>
              );
            }
            // if (type === 'prev') {
            //   return (
            //     <button className='p-1 text-2xl text-[#008CFF]'>
            //       <LeftOutlined style={{ fontSize: 22 }} />
            //     </button>
            //   );
            // }

            // // 🔹 Next icon
            // if (type === 'next') {
            //   return (
            //     <button className='p-1 text-2xl text-[#008CFF]'>
            //       <RightOutlined style={{ fontSize: 22 }} />
            //     </button>
            //   );
            // }

            return originalElement; // prev/next tugmalari o‘z holicha qolsin
          }}
        />
      </div>
    </>
  );
};

export default TestComponent;
