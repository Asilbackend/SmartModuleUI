import { Button, Empty, Pagination } from 'antd';
import clsx from 'clsx';
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight, Clock, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const OptionButton = ({ option, idx, userAnswer, correctAnswer, onSelect, isFinished }) => {
  const isCorrect = option === correctAnswer;
  const isSelected = option === userAnswer;

  const buttonClass = clsx(
    'group relative flex w-full cursor-pointer items-center overflow-hidden rounded-xl border-2 text-left transition-all',
    {
      // Test tugamagan - oddiy holat
      'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50': !isFinished && !isSelected,

      // Test tugamagan - tanlangan variant
      'border-blue-500 bg-blue-50 shadow-sm': !isFinished && isSelected,

      // Test tugagan - to'g'ri javob
      'border-green-400 bg-green-50': isFinished && isCorrect,

      // Test tugagan - noto'g'ri tanlangan javob
      'border-red-400 bg-red-50': isFinished && isSelected && !isCorrect,

      // Test tugagan - boshqa variantlar
      'border-gray-200 bg-white': isFinished && !isCorrect && !isSelected,
    }
  );

  const letterClass = clsx(
    'flex h-full min-w-[50px] items-center justify-center px-4 py-3 text-lg font-bold transition-all sm:min-w-[60px]',
    {
      // Test tugamagan - oddiy
      'bg-gray-50 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600':
        !isFinished && !isSelected,

      // Test tugamagan - tanlangan
      'bg-blue-500 text-white': !isFinished && isSelected,

      // Test tugagan - to'g'ri javob
      'bg-green-500 text-white': isFinished && isCorrect,

      // Test tugagan - noto'g'ri tanlangan
      'bg-red-500 text-white': isFinished && isSelected && !isCorrect,

      // Test tugagan - boshqa variantlar
      'bg-gray-50 text-gray-600': isFinished && !isSelected && !isCorrect,
    }
  );

  return (
    <button onClick={() => onSelect(option)} className={buttonClass} disabled={isFinished}>
      <span className={letterClass}>{String.fromCharCode(65 + idx)}</span>
      <span className='flex-1 px-4 py-3 text-sm font-medium text-gray-900 sm:text-base'>
        {option}
      </span>
      {isFinished && isCorrect && (
        <div className='mr-3'>
          <CheckCircle2 size={22} className='text-green-600' />
        </div>
      )}
      {isFinished && isSelected && !isCorrect && (
        <div className='mr-3'>
          <XCircle size={22} className='text-red-600' />
        </div>
      )}
    </button>
  );
};

const TestComponent = ({ questions, duration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || isFinished) {
      setIsFinished(true);
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isFinished]);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const currentQuestion = questions[currentIndex];
  const userAnswer = selectedAnswers[currentIndex];

  const handleAnswer = (option) => {
    if (isFinished) return; // Faqat test tugaganda o'zgartirishni bloklash
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Statistika hisoblash
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // To'g'ri javoblar soni (test tugagach)
  let correctCount = 0;
  if (isFinished) {
    correctCount = questions.filter((q, idx) => selectedAnswers[idx] === q.answer).length;
  }

  if (!questions || questions.length === 0) {
    return (
      <div className='mx-auto max-w-5xl p-3 sm:p-4'>
        <div className='rounded-2xl bg-white p-12 shadow-sm sm:rounded-3xl'>
          <Empty description={<span className='text-gray-500'>Test savollari topilmadi</span>} />
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-5xl space-y-4 p-3 sm:space-y-6 sm:p-4'>
      {/* Header Card - Timer & Progress */}
      <div className='overflow-hidden rounded-2xl bg-white shadow-lg sm:rounded-3xl'>
        {/* Timer Section */}
        <div className='border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white p-4 sm:p-5'>
          <div className='flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4'>
            {/* Timer */}
            <div className='flex items-center gap-3'>
              <div className='rounded-xl bg-blue-100 p-2'>
                <Clock size={20} className='text-blue-600 sm:h-6 sm:w-6' />
              </div>
              <div>
                <p className='text-xs font-medium text-gray-600 sm:text-sm'>Qolgan vaqt</p>
                <p
                  className={clsx('text-2xl font-bold sm:text-3xl', {
                    'text-gray-900': timeLeft > 300,
                    'text-orange-600': timeLeft <= 300 && timeLeft > 60,
                    'text-red-600': timeLeft <= 60,
                  })}
                >
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>

            {/* Natijalar (test tugagandan keyin) */}
            {isFinished && (
              <div className='flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 sm:px-6'>
                <div className='text-center'>
                  <p className='text-xs font-medium text-gray-600 sm:text-sm'>Natija</p>
                  <p className='text-2xl font-bold text-green-600 sm:text-3xl'>
                    {correctCount} / {questions.length}
                  </p>
                </div>
                <div className='text-center'>
                  <p className='text-xs font-medium text-gray-600 sm:text-sm'>Foiz</p>
                  <p className='text-2xl font-bold text-green-600 sm:text-3xl'>
                    {Math.round((correctCount / questions.length) * 100)}%
                  </p>
                </div>
              </div>
            )}

            {/* Progress (test davom etayotganda) */}
            {!isFinished && (
              <div className='flex items-center gap-3 sm:gap-4'>
                <div className='text-right'>
                  <p className='text-xs font-medium text-gray-600 sm:text-sm'>Jarayonda</p>
                  <p className='text-xl font-bold text-gray-900 sm:text-2xl'>
                    {answeredCount} / {questions.length}
                  </p>
                </div>
                <div className='relative h-14 w-14 sm:h-16 sm:w-16'>
                  <svg className='h-14 w-14 -rotate-90 transform sm:h-16 sm:w-16'>
                    <circle
                      cx='28'
                      cy='28'
                      r='24'
                      stroke='currentColor'
                      strokeWidth='5'
                      fill='none'
                      className='text-gray-200'
                    />
                    <circle
                      cx='28'
                      cy='28'
                      r='24'
                      stroke='currentColor'
                      strokeWidth='5'
                      fill='none'
                      strokeDasharray={`${progressPercent * 1.51} 151`}
                      className='text-blue-600'
                      strokeLinecap='round'
                    />
                  </svg>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-xs font-bold text-gray-900 sm:text-sm'>
                      {progressPercent}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Question Numbers - Desktop */}
        <div className='hidden border-b border-gray-100 p-4 sm:p-5 md:block'>
          <div className='flex flex-wrap gap-2'>
            {questions.map((_, idx) => {
              const answered = selectedAnswers[idx];
              const isCorrectAnswer = isFinished && answered === questions[idx].answer;
              const isWrongAnswer = isFinished && answered && answered !== questions[idx].answer;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={clsx(
                    'flex h-11 w-11 items-center justify-center rounded-xl border-2 text-base font-bold transition-all sm:h-12 sm:w-12',
                    {
                      // Aktiv savol
                      'border-blue-500 bg-blue-500 text-white shadow-md':
                        idx === currentIndex && !isFinished,

                      // Test tugagach - to'g'ri javob
                      'border-green-500 bg-green-500 text-white':
                        isCorrectAnswer && idx === currentIndex,
                      'border-green-400 bg-green-100 text-green-700':
                        isCorrectAnswer && idx !== currentIndex,

                      // Test tugagach - noto'g'ri javob
                      'border-red-500 bg-red-500 text-white': isWrongAnswer && idx === currentIndex,
                      'border-red-400 bg-red-100 text-red-700':
                        isWrongAnswer && idx !== currentIndex,

                      // Test davom etayotganda - javob berilgan
                      'border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100':
                        answered && idx !== currentIndex && !isFinished,

                      // Javob berilmagan
                      'border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:bg-gray-50':
                        !answered && idx !== currentIndex && !isFinished,

                      // Test tugagach - javob berilmagan
                      'border-gray-300 bg-gray-50 text-gray-400':
                        !answered && isFinished && idx !== currentIndex,
                      'border-gray-400 bg-gray-100 text-gray-500':
                        !answered && isFinished && idx === currentIndex,
                    }
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className='overflow-hidden rounded-2xl bg-white shadow-lg sm:rounded-3xl'>
        <div className='border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6'>
          <div className='mb-3 flex items-start gap-2 sm:gap-3'>
            <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white sm:h-9 sm:w-9 sm:text-base'>
              {currentIndex + 1}
            </div>
            <div className='flex-1'>
              <p className='mb-1 text-xs font-medium text-gray-600 sm:text-sm'>
                Savol {currentIndex + 1} / {questions.length}
              </p>
              <h2 className='text-lg leading-relaxed font-bold text-gray-900 sm:text-xl'>
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          {!userAnswer && !isFinished && (
            <div className='flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2'>
              <AlertCircle size={16} className='text-yellow-600' />
              <p className='text-xs font-medium text-yellow-800 sm:text-sm'>Javobingizni tanlang</p>
            </div>
          )}

          {isFinished && userAnswer === currentQuestion.answer && (
            <div className='flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2'>
              <CheckCircle2 size={16} className='text-green-600' />
              <p className='text-xs font-medium text-green-800 sm:text-sm'>To'g'ri javob! 🎉</p>
            </div>
          )}

          {isFinished && userAnswer && userAnswer !== currentQuestion.answer && (
            <div className='flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2'>
              <XCircle size={16} className='text-red-600' />
              <p className='text-xs font-medium text-red-800 sm:text-sm'>
                Noto'g'ri javob. To'g'ri javob: {currentQuestion.answer}
              </p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className='space-y-2 p-4 sm:space-y-3 sm:p-6'>
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

        {/* Navigation Footer */}
        <div className='border-t border-gray-100 bg-gray-50 p-4 sm:p-5'>
          <div className='flex items-center justify-between gap-3'>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className='flex items-center gap-1.5 rounded-xl border-2 border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-4 sm:py-2.5'
            >
              <ChevronLeft size={18} />
              <span className='hidden sm:inline'>Orqaga</span>
            </button>

            {!isFinished ? (
              <Button
                onClick={handleFinish}
                size='large'
                className='!rounded-xl bg-gradient-to-r from-red-500 to-red-600 !px-5 !py-5 !text-sm font-bold !text-white shadow-md transition-all hover:!from-red-600 hover:!to-red-700 hover:shadow-lg sm:!px-6 sm:!text-base'
              >
                Testni yakunlash
              </Button>
            ) : (
              <div className='flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 sm:px-5 sm:py-2.5'>
                <CheckCircle2 size={18} className='text-green-700' />
                <span className='text-sm font-bold text-green-700 sm:text-base'>
                  Test yakunlandi
                </span>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className='flex items-center gap-1.5 rounded-xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-4 sm:py-2.5'
            >
              <span className='hidden sm:inline'>Keyingi</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className='flex justify-center md:hidden'>
        <Pagination
          current={currentIndex + 1}
          total={questions.length}
          pageSize={1}
          onChange={(page) => setCurrentIndex(page - 1)}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === 'page') {
              const isAnswered = !!selectedAnswers[page - 1];
              const isActive = currentIndex + 1 === page;
              const isCorrectAnswer =
                isFinished && selectedAnswers[page - 1] === questions[page - 1].answer;
              const isWrongAnswer =
                isFinished &&
                selectedAnswers[page - 1] &&
                selectedAnswers[page - 1] !== questions[page - 1].answer;

              return (
                <button
                  className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-bold transition-all',
                    {
                      'border-green-500 bg-green-100 text-green-700': isCorrectAnswer && !isActive,
                      'border-green-600 bg-green-500 text-white': isCorrectAnswer && isActive,
                      'border-red-500 bg-red-100 text-red-700': isWrongAnswer && !isActive,
                      'border-red-600 bg-red-500 text-white': isWrongAnswer && isActive,
                      'border-blue-400 bg-blue-50 text-blue-600':
                        isAnswered && !isActive && !isFinished,
                      'border-blue-500 bg-blue-500 text-white shadow-md': isActive && !isFinished,
                      'border-gray-300 bg-white text-gray-500':
                        !isAnswered && !isActive && !isFinished,
                    }
                  )}
                  onClick={() => setCurrentIndex(page - 1)}
                >
                  {page}
                </button>
              );
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  );
};

export default TestComponent;
