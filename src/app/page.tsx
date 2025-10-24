// app/page.tsx
"use client";
import '../globals.css';
import React, { useState, useEffect } from 'react';
import { Trophy, Users, Sparkles, Copy, Check } from 'lucide-react';

// Sadece örnek sorular, productionda questionsDB'yi tam olarak ekle
const questionsDB = {
  crypto: [
    { q: "What does 'HODL' stand for?", options: ["Hold On for Dear Life", "Hold Or Don't Lose"], correct: 0 },
    { q: "Which consensus mechanism does Ethereum 2.0 use?", options: ["Proof of Work", "Proof of Stake"], correct: 1 },
  ],
  general: [
    { q: "Capital of Australia?", options: ["Sydney", "Canberra"], correct: 1 },
    { q: "Largest ocean?", options: ["Atlantic", "Pacific"], correct: 1 },
  ]
};

const TriviArena = () => {
  const [screen, setScreen] = useState<'home' | 'category' | 'quiz' | 'result' | 'challenge-setup' | 'challenge-created'>('home');
  const [mode, setMode] = useState<'solo' | '1v1' | 'challenge' | null>(null);
  const [stake, setStake] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [opponentScore, setOpponentScore] = useState(0);
  const [challengeAddress, setChallengeAddress] = useState('');
  const [challengeLink, setChallengeLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (screen === 'quiz' && timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) handleTimeout();
  }, [timeLeft, screen, answered]);

  const startGame = (selectedMode: 'solo' | '1v1' | 'challenge', selectedStake: number | null = null) => {
    setMode(selectedMode);
    setStake(selectedStake);
    if (selectedMode === 'challenge') setScreen('challenge-setup');
    else setScreen('category');
  };

  const createChallenge = () => {
    if (!challengeAddress || !category || !stake) return;
    const mockLink = `https://triviarena.io/c/${Math.random().toString(36).substring(2, 9)}`;
    setChallengeLink(mockLink);
    setScreen('challenge-created');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(challengeLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const startQuiz = (cat: string) => {
    setCategory(cat);
    setQuestions(questionsDB[cat]);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(20);
    setAnswered(false);
    setSelectedAnswer(null);
    if (mode === '1v1' || mode === 'challenge') setOpponentScore(Math.floor(Math.random() * 3));
    setScreen('quiz');
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === questions[currentQ].correct) setScore(score + 1);
    if ((mode === '1v1' || mode === 'challenge') && Math.random() > 0.3) setOpponentScore(opponentScore + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setTimeLeft(20);
        setAnswered(false);
        setSelectedAnswer(null);
      } else setScreen('result');
    }, 1500);
  };

  const handleTimeout = () => {
    setAnswered(true);
    if ((mode === '1v1' || mode === 'challenge') && Math.random() > 0.3) setOpponentScore(opponentScore + 1);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setTimeLeft(20);
        setAnswered(false);
        setSelectedAnswer(null);
      } else setScreen('result');
    }, 1500);
  };

  const resetGame = () => {
    setScreen('home');
    setMode(null);
    setStake(null);
    setCategory(null);
    setQuestions([]);
    setCurrentQ(0);
    setScore(0);
    setOpponentScore(0);
    setChallengeAddress('');
    setChallengeLink('');
  };

  // HOME SCREEN
  if (screen === 'home') return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <Trophy className="w-12 h-12 text-purple-400" />
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">TriviArena</h1>
        </div>
        <p className="text-slate-300 text-lg">Compete. Win. Earn.</p>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button onClick={() => startGame('solo')} className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold">Solo</button>
          <button onClick={() => startGame('1v1')} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">1v1</button>
          <button onClick={() => startGame('challenge')} className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-semibold">Challenge</button>
        </div>
      </div>
    </div>
  );

  // CATEGORY SELECTION
  if (screen === 'category') return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white flex flex-col items-center justify-center gap-8 p-6">
      <h2 className="text-3xl font-bold mb-4">Select Category</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(questionsDB).map(cat => (
          <button key={cat} onClick={() => startQuiz(cat)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition font-semibold capitalize">{cat}</button>
        ))}
      </div>
      <button onClick={resetGame} className="mt-8 px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">Back</button>
    </div>
  );

  // QUIZ SCREEN
  if (screen === 'quiz') {
    const q = questions[currentQ];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white flex flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-2xl font-bold">{category} Quiz</h2>
        <div className="text-lg">Time Left: {timeLeft}s</div>
        <div className="max-w-xl w-full bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl">
          <p className="mb-4 text-xl">{q.q}</p>
          <div className="flex flex-col gap-3">
            {q.options.map((opt: string, i: number) => (
              <button key={i} onClick={() => handleAnswer(i)}
                className={`px-4 py-2 rounded-lg transition text-left ${answered ? (i === q.correct ? 'bg-green-600' : i === selectedAnswer ? 'bg-red-600' : 'bg-slate-700/50') : 'bg-slate-700/50 hover:bg-slate-600/70'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-6 mt-4 text-lg">
          {(mode === '1v1' || mode === 'challenge') && <div>Opponent Score: {opponentScore}</div>}
          <div>Your Score: {score}</div>
        </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (screen === 'result') return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-4xl font-bold">Quiz Finished!</h2>
      <p className="text-2xl">Your Score: {score}</p>
      {(mode === '1v1' || mode === 'challenge') && <p className="text-xl">Opponent Score: {opponentScore}</p>}
      <button onClick={resetGame} className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition font-semibold">Play Again</button>
    </div>
  );

  // CHALLENGE SETUP
  if (screen === 'challenge-setup') return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-3xl font-bold">Setup Challenge</h2>
      <input type="text" placeholder="Opponent Address" value={challengeAddress}
        onChange={e => setChallengeAddress(e.target.value)}
        className="px-4 py-2 rounded-lg text-black w-80"/>
      <input type="number" placeholder="Stake" value={stake ?? ''} onChange={e => setStake(Number(e.target.value))}
        className="px-4 py-2 rounded-lg text-black w-80"/>
      <button onClick={createChallenge} className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl transition font-semibold">Create Challenge</button>
      <button onClick={resetGame} className="mt-4 px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">Back</button>
    </div>
  );

  // CHALLENGE CREATED
  if (screen === 'challenge-created') return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-3xl font-bold">Challenge Created!</h2>
      <p className="text-lg break-all">{challengeLink}</p>
      <button onClick={copyLink} className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl transition font-semibold flex items-center gap-2">
        {linkCopied ? <Check className="w-5 h-5"/> : <Copy className="w-5 h-5"/>} {linkCopied ? 'Copied!' : 'Copy Link'}
      </button>
      <button onClick={resetGame} className="mt-4 px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">Back</button>
    </div>
  );

  return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
};

export default TriviArena;
