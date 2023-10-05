
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="text-center bg-white min-h-screen flex flex-col items-center justify-center text-[calc(10px+2vmin)]">
      <header>
      </header>
          <h1 className="font-mono text-5xl p-6">SuperQuizApp</h1>
          <Quiz/>
    </div>
  );
}

export default App;
