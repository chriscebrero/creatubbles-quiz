
import Quiz from './Quiz';
import './App.css';

function App() {
  return (
    <div className="text-center bg-white min-h-screen flex flex-col items-center justify-center text-[calc(10px+2vmin)]">
      <header className="">
      </header>
              {/* Header */}
        <div>
          <h1 className="font-mono">SuperQuizApp</h1>
        </div>
        {/* Quiz */}
        <div>
          <Quiz/>
        </div>
    </div>
  );
}

export default App;
