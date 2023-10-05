
type ResultsType = {
    totalQuestions: number;
    totalScore: number;
    correctAnswers: number;
    wrongAnswers: number;
}

const ResultsSummary: React.FC<ResultsType> = ({ totalQuestions, totalScore, correctAnswers, wrongAnswers }) => {
  return (
    <div className="rounded-lg shadow-lg px-16 py-10">
        <h2 className="py-6 text-5xl">Result</h2>
        <p>Total Question: <span>{totalQuestions}</span></p>
        <p>Total Score:<span> {totalScore} / {totalQuestions}</span></p>
        <p>Correct Answers:<span> {correctAnswers}</span></p>
        <p>Wrong Answers:<span> {wrongAnswers}</span></p>
    </div>
  )
}

export default ResultsSummary;
