// app/page.tsx
"use client";
import '../globals.css'; 
import React, { useState, useEffect } from 'react';
import { Trophy, Users, Sparkles } from 'lucide-react';

// FULL 500 QUESTIONS DATABASE (Örnek: crypto, general, sports, gaming)
const questionsDB = { /* senin questionsDB burada */ };

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
    } else if (timeLeft === 0 && !answered) {
      handleTimeout();
    }
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
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-950 to-blue-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              TriviArena
            </h1>
          </div>
          <p className="text-slate-300 text-lg">Compete. Win. Earn.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button onClick={() => startGame('solo')} className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold">
              Solo
            </button>
            <button onClick={() => startGame('1v1')} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
              1v1
            </button>
            <button onClick={() => startGame('challenge')} className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 transition font-semibold">
              Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Diğer ekranlar için category, quiz, result, challenge-setup, challenge-created componentlerini de benzer şekilde gradient ve Tailwind ile tasarlayabilirim.
  return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
};

export default TriviArena;
