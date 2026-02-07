import React, { useState, useEffect } from 'react';

// --- ICONS (Embedded for stability) ---
const Icon = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);
const Clock = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);
const CheckCircle = (props) => (
  <Icon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Icon>
);
const AlertCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Icon>
);
const ChevronRight = (props) => (
  <Icon {...props}>
    <polyline points="9 18 15 12 9 6" />
  </Icon>
);
const ChevronLeft = (props) => (
  <Icon {...props}>
    <polyline points="15 18 9 12 15 6" />
  </Icon>
);
const FileCheck = (props) => (
  <Icon {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </Icon>
);

// --- CONFIGURATION ---
const TEACHER_GOOGLE_SCRIPT_URL =
  'https://script.google.com/machttps://script.google.com/macros/s/AKfycbyVnVhyI3R6kcTusDbnDMjssDKsZL-8GgK2GH-VrRD08zQhrQ9MSB500jAMarPX8TF1Gg/execros/s/AKfycbwWx9qHWhttps://script.google.com/macros/s/AKfycbyVnVhyI3R6kcTusDbnDMjssDKsZL-8GgK2GH-VrRD08zQhrQ9MSB500jAMarPX8TF1Gg/exech8BxPPwKxr35PIZ6TN0_rKRtQdPndZuGiQkiSA8UbpGTy3DjHpuXW2JdUo2IQ/exec';

// --- DATA: QUESTIONS ---
const QUESTIONS = [
  // --- SECTION 1: FRAMEWORKS (CASE STUDIES) ---
  {
    id: 1,
    type: 'mcq',
    section: 'Frameworks: PHDA Case',
    caseStudy:
      "Scenario: An e-commerce CEO notices revenue dropped 15% last month. He immediately asks you to 'Pull a report on server latency.' You pause to apply the PHDA framework.",
    question:
      "According to PHDA, what is the flaw in the CEO's request, and what should be your first step?",
    options: {
      A: 'Flaw: He is blaming IT. Step: Analyze marketing data instead.',
      B: 'Flaw: He jumped to Analysis/Hypothesis. Step: Define the Problem statement first.',
      C: "Flaw: He didn't ask for a chart. Step: Create a visualization.",
      D: 'Flaw: None. Step: Pull the server latency data immediately.',
    },
    correct: 'B',
  },
  {
    id: 2,
    type: 'mcq',
    section: 'Frameworks: OSCAR Case',
    caseStudy:
      'Scenario: You are scoping a project to predict employee churn. You have been given access to HR data, but you are strictly forbidden from using private email contents or home addresses due to privacy laws.',
    question:
      'In the OSCAR framework, which category does this privacy restriction fall under?',
    options: { A: 'Objectives', B: 'Scope', C: 'Constraints', D: 'Resources' },
    correct: 'C',
  },
  {
    id: 3,
    type: 'mcq',
    section: 'Frameworks: Analytical Mindset',
    caseStudy:
      "Scenario: You find a dataset showing that 'Ice Cream Sales' and 'Forest Fires' are highly correlated (they both go up at the same time).",
    question: 'Applying an Analytical Mindset, what is your conclusion?',
    options: {
      A: 'Ice cream causes forest fires.',
      B: 'We should ban ice cream to stop the fires.',
      C: 'Correlation does not imply causation; a third variable (Heat/Summer) likely causes both.',
      D: ' The data must be fake.',
    },
    correct: 'C',
  },
  {
    id: 4,
    type: 'mcq',
    section: 'Frameworks: PHDA Problem Definition',
    question:
      'You are defining the problem for a logistics company. Which is the MOST effective Problem Statement?',
    options: {
      A: 'Deliveries are too slow.',
      B: 'We need to hire more drivers to fix the delays.',
      C: 'Customer complaints regarding late deliveries in the Lagos region have increased by 20% in Q3, impacting retention.',
      D: 'Why are the trucks breaking down?',
    },
    correct: 'C',
  },

  // --- SECTION 2: EXCEL TEXT FUNCTIONS (TYPING REQUIRED) ---
  {
    id: 5,
    type: 'text',
    section: 'Excel: Text Formulas',
    question:
      'Cell A2 contains the text "Apex Academy". Write the formula to extract the first 4 characters ("Apex") from this cell.',
    correct: '=LEFT(A2,4)',
  },
  {
    id: 6,
    type: 'text',
    section: 'Excel: Text Formulas',
    question:
      'Cell B5 contains the ID "EMP-992". Write a formula to find the total number of characters in this text string.',
    correct: '=LEN(B5)',
  },
  {
    id: 7,
    type: 'text',
    section: 'Excel: Text Formulas',
    question:
      'Cell A1 is "John" and B1 is "Doe". Write a TEXTJOIN formula to combine them with a space (" ") as the delimiter. Ignore empty cells.',
    correct: '=TEXTJOIN(" ",TRUE,A1,B1)',
  },
  {
    id: 8,
    type: 'text',
    section: 'Excel: Text Formulas',
    question:
      'You need to find the position of the "@" symbol in an email address located in cell C3. Write the formula.',
    correct: '=SEARCH("@",C3)',
  },

  // --- SECTION 3: EXCEL AGGREGATES & LOGIC (TYPING REQUIRED) ---
  {
    id: 9,
    type: 'text',
    section: 'Excel: Aggregates',
    question:
      'Write a formula to calculate the average sales value for the range D2 through D50.',
    correct: '=AVERAGE(D2:D50)',
  },
  {
    id: 10,
    type: 'text',
    section: 'Excel: Aggregates',
    question:
      'Write a formula to find the highest (maximum) value in the range A1:A100.',
    correct: '=MAX(A1:A100)',
  },
  {
    id: 11,
    type: 'text',
    section: 'Excel: Logic',
    question:
      'Cell B2 contains a student score. Write an IF formula: If B2 is greater than 50, return "Pass", otherwise return "Fail".',
    correct: '=IF(B2>50,"Pass","Fail")',
  },
  {
    id: 12,
    type: 'text',
    section: 'Excel: Logic',
    question:
      'You want to sum the values in range B2:B10 ONLY if the corresponding value in range A2:A10 equals "Sales". Write the SUMIF formula.',
    correct: '=SUMIF(A2:A10,"Sales",B2:B10)',
  },

  // --- SECTION 4: MIXED CONCEPTS ---
  {
    id: 13,
    type: 'mcq',
    section: 'Excel Features',
    question:
      'You have a column of sales data and want to automatically turn the cell background RED if the value is below $1,000. Which tool do you use?',
    options: {
      A: 'Data Validation',
      B: 'Conditional Formatting',
      C: 'Cell Styles',
      D: 'Filter',
    },
    correct: 'B',
  },
  {
    id: 14,
    type: 'text',
    section: 'Excel: Text Splitting',
    question:
      'Which modern Excel formula would you use to spill text from one cell into multiple columns based on a delimiter (like a comma)?',
    correct: '=TEXTSPLIT',
  },
  {
    id: 15,
    type: 'text',
    section: 'Excel: Text Formulas',
    question:
      'Cell A1 contains "Data-Analysis". Write a formula using MID to extract "Analysis" (starting at character 6, length 8).',
    correct: '=MID(A1,6,8)',
  },
];

export default function App() {
  const [gameState, setGameState] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [submissionStatus, setSubmissionStatus] = useState('pending');

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStart = () => {
    if (!userData.name) {
      alert('Please enter your name.');
      return;
    }
    setGameState('playing');
  };

  const handleAnswerChange = (val) => {
    setAnswers((prev) => ({
      ...prev,
      [QUESTIONS[currentQuestionIndex].id]: val,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1)
      setCurrentQuestionIndex((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1);
  };
  const handleJumpTo = (index) => setCurrentQuestionIndex(index);

  // Logic to normalize text answers (remove spaces, uppercase) for flexible grading
  const normalize = (str) =>
    str ? str.toString().replace(/\s/g, '').toUpperCase() : '';

  const calculateScore = () => {
    return QUESTIONS.reduce((acc, q) => {
      const userAnswer = answers[q.id];
      if (!userAnswer) return acc;

      if (q.type === 'mcq') {
        return userAnswer === q.correct ? acc + 1 : acc;
      } else if (q.type === 'text') {
        // Check if normalized user answer matches normalized correct answer
        // Special case for TEXTSPLIT (just checking function name availability)
        if (
          q.correct === '=TEXTSPLIT' &&
          normalize(userAnswer).includes('TEXTSPLIT')
        )
          return acc + 1;
        if (
          q.correct === '=SEARCH("@",C3)' &&
          (normalize(userAnswer) === 'SEARCH("@",C3)' ||
            normalize(userAnswer) === '=SEARCH("@",C3)')
        )
          return acc + 1;

        return normalize(userAnswer) === normalize(q.correct) ? acc + 1 : acc;
      }
      return acc;
    }, 0);
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleFinishQuiz = async () => {
    setGameState('submitting');
    const score = calculateScore();
    const total = QUESTIONS.length;
    const timeTakenStr = `${Math.floor((20 * 60 - timeLeft) / 60)}m ${
      (20 * 60 - timeLeft) % 60
    }s`;
    let sheetSuccess = false;
    if (TEACHER_GOOGLE_SCRIPT_URL) {
      try {
        const formData = new URLSearchParams();
        formData.append('name', userData.name);
        formData.append('email', userData.email || '');
        formData.append('score', score);
        formData.append('total', total);
        formData.append('timeTaken', timeTakenStr);
        await fetch(TEACHER_GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });
        sheetSuccess = true;
      } catch (e) {
        console.error('Sheet Error', e);
      }
    } else {
      sheetSuccess = 'not_configured';
    }
    setSubmissionStatus(sheetSuccess);
    setGameState('result');
  };

  // --- VIEWS ---
  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          <div className="bg-blue-600 p-6 text-center">
            <h2 className="text-sm font-semibold text-blue-200 tracking-wider mb-1 uppercase">
              APEX TECH ACADEMY
            </h2>
            <h1 className="text-2xl font-bold text-white">Week 2 Quiz</h1>
            <p className="text-blue-100 mt-2">Analytical Frameworks & Excel</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold">Instructions:</p>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>
                    You have <strong>20 minutes</strong>.
                  </li>
                  <li>
                    There are <strong>15 questions</strong>.
                  </li>
                  <li>
                    Some questions require <strong>typing formulas</strong>.
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleStart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Start Examination <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const question = QUESTIONS[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row h-screen overflow-hidden font-sans text-slate-800">
        <div className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col h-auto md:h-full">
          <div className="p-4 border-b border-slate-200 bg-slate-100">
            <div className="mb-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Apex Tech Academy
              </div>
              <div className="font-bold text-slate-700">Week 2 Quiz</div>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Clock className="w-5 h-5 text-blue-600" />
              <span
                className={`text-xl ${
                  timeLeft < 60 ? 'text-red-600 animate-pulse' : ''
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Candidate: {userData.name}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Question Navigator
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleJumpTo(idx)}
                  className={`w-full aspect-square flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                    currentQuestionIndex === idx
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1'
                      : answers[q.id]
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleFinishQuiz}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium py-2 rounded-lg transition-colors text-sm"
            >
              Submit Exam
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <div className="h-1.5 w-full bg-slate-200">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / QUESTIONS.length) * 100
                }%`,
              }}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-24">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide mb-2">
                  {question.section}
                </span>

                {/* Case Study Box */}
                {question.caseStudy && (
                  <div className="bg-slate-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg text-slate-600 italic">
                    {question.caseStudy}
                  </div>
                )}

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight mb-6">
                  <span className="text-slate-400 mr-2">
                    {currentQuestionIndex + 1}.
                  </span>
                  {question.question}
                </h2>

                {/* Question Rendering Logic */}
                <div className="space-y-3">
                  {question.type === 'mcq' &&
                    Object.entries(question.options).map(([key, value]) => (
                      <label
                        key={key}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all group ${
                          answers[question.id] === key
                            ? 'border-blue-500 bg-blue-50/50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={key}
                            checked={answers[question.id] === key}
                            onChange={() => handleAnswerChange(key)}
                            className="sr-only"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                              answers[question.id] === key
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-slate-300 text-slate-500 group-hover:border-slate-400'
                            }`}
                          >
                            {key}
                          </div>
                        </div>
                        <span
                          className={`flex-1 text-lg ${
                            answers[question.id] === key
                              ? 'text-slate-900 font-medium'
                              : 'text-slate-600'
                          }`}
                        >
                          {value}
                        </span>
                      </label>
                    ))}

                  {question.type === 'text' && (
                    <div className="mt-2">
                      <p className="text-sm text-slate-500 mb-2 font-medium">
                        Type your Excel formula below (start with =):
                      </p>
                      <input
                        type="text"
                        className="w-full p-4 text-lg font-mono bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        placeholder="=FORMULA(...)"
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        Example: =SUM(A1:A10)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
              <div className="text-sm text-slate-500 hidden md:block">
                Question {currentQuestionIndex + 1} of {QUESTIONS.length}
              </div>
              {currentQuestionIndex === QUESTIONS.length - 1 ? (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium shadow-sm shadow-green-200 flex items-center gap-2"
                >
                  Finish <CheckCircle className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-sm shadow-blue-200 flex items-center gap-2"
                >
                  Next <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'submitting') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-slate-800">
            Submitting Assessment...
          </h2>
          <p className="text-slate-500 mt-2">
            Please wait while we save your results.
          </p>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const score = calculateScore();
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-start font-sans text-slate-800">
        <div className="max-w-2xl w-full space-y-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div
              className={`p-8 text-center ${
                percentage >= 50
                  ? 'bg-gradient-to-br from-blue-600 to-blue-800'
                  : 'bg-gradient-to-br from-red-600 to-red-800'
              }`}
            >
              <h2 className="text-white text-lg font-medium opacity-90">
                Assessment Complete
              </h2>
              <div className="mt-4 text-6xl font-bold text-white tracking-tighter">
                {score} / {QUESTIONS.length}
              </div>
              <p className="text-white text-xl mt-2 font-medium">
                {percentage}%
              </p>
              <div className="mt-6 inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
                Candidate: {userData.name}
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 flex flex-col gap-3">
              {submissionStatus !== 'not_configured' && (
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      submissionStatus === true
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800">
                      Instructor Records
                    </h3>
                    <p className="text-xs text-slate-500">
                      {submissionStatus === true
                        ? 'Sent to class gradebook.'
                        : 'Failed to connect. Ensure you updated the Script and deployed a "New version".'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 text-slate-500 hover:text-slate-700 font-medium"
          >
            Start New Test
          </button>
        </div>
      </div>
    );
  }
  return null;
}
