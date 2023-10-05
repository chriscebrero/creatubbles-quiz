import React from 'react';
import QuizChoice from './QuizChoice';
import ResultsSummary from './ResultsSummary';

type QuizSet = {
    question: string;
    options: string[];
    answer: number;
    imageUrl: string;
}

const Quiz = () => {
    const [questions, setQuestions] = React.useState<QuizSet[]>([]);
    const [activeQuestion, setActiveQuestion] = React.useState(0)
    const [selectedAnswer, setSelectedAnswer] = React.useState(false)
    const [showResult, setShowResult] = React.useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(-1)
    const [result, setResult] = React.useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })
    const [isQuizActive, setQuizActive] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [timer, setTimer] = React.useState(10);
    
    const {question, options, answer, imageUrl } = questions[activeQuestion] || {};
    
    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://scs-interview-api.herokuapp.com/questions');
                const data = await response.json();
                setQuestions(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    
    React.useEffect(() => {
        let timeout: string | number | NodeJS.Timeout | undefined;
        if (timer > 0 && isQuizActive) {
            timeout = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }
        
        if (timer === 0 && activeQuestion !== questions.length - 1) {
            setLoading(true);
            setTimeout(() => {
                setSelectedAnswer(false);
                setActiveQuestion((prev) => prev + 1);
                setTimer(10);
                setLoading(false);
                handleNextQuestion();
            }, 4000)
        }
        
        if (timer === 0 && activeQuestion === questions.length - 1) {
            setLoading(true);
            setTimeout(() => {
                handleNextQuestion();
                setShowResult(true);
            }, 4000)
        }
        
        return () => clearTimeout(timeout);
    }, [timer, isQuizActive, setQuizActive])
    
    const handleNextQuestion = () => {
        setSelectedAnswerIndex(-1)
        setResult((prev) =>
        selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )
        if (activeQuestion === questions.length - 1) {
            setShowResult(true)
        }
    }
    
    const onAnswerSelected = (index: number) => {
        if (!isQuizActive) setQuizActive(true);
        setSelectedAnswerIndex(index)
        if (index === answer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }
    
    const addLeadingZero = (number: number) => (number > 9 ? number : `0${number}`)
    return (
        <div className="quiz-container">
        {!showResult ? (
            <div>
            <div>
            <span className="active-question-no">Question {addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
            </div>
            
            <div className="flex justify-center shadow-lg">
            <img className='w-80 h-80' src={imageUrl} alt="image_url"/>
            </div>
            <h2 className="bg-black text-white rounded-2xl p-4 shadow-lg my-6">{question}</h2>
            <div>
                <h3>
                    Timer: {timer} sec.
                </h3>
            </div>
            <ul>
            {options?.map((option: string, index: number) => 
                <div>
                <li onClick={() => onAnswerSelected(index)} key={option}>
                <QuizChoice choice={option} isSelected={index === selectedAnswerIndex} isCorrect={answer === index} index={index} isLoading={loading}/>
                </li>
                </div>
                )}
                </ul>
                </div>
                ) : (
                    <ResultsSummary totalQuestions={questions.length} correctAnswers={result.correctAnswers} wrongAnswers={result.wrongAnswers} totalScore={result.score}/>
                    )}
                    </div>
                    )
                }
                
                export default Quiz;
                