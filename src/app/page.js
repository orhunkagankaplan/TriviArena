'use client'

import React, { useState, useEffect } from 'react';
import { Trophy, Brain, DollarSign, Clock, Users, Zap, Target, Copy, Check, Sparkles, TrendingUp, Crown } from 'lucide-react';

const questionsDB = {
  crypto: [
    {"q": "What does HODL mean?", "options": ["Hold On Dear Life", "Hold Or Don't Lose", "Digital Ledger", "Digital Leaders"], "correct": 0},
    {"q": "Ethereum 2.0 consensus?", "options": ["Proof of Work", "Proof of Stake", "Proof of Authority", "Delegated PoS"], "correct": 1},
    {"q": "Bitcoin max supply?", "options": ["21 million", "100 million", "Unlimited", "50 million"], "correct": 0},
    {"q": "Who created Bitcoin?", "options": ["Vitalik", "Satoshi", "Charles", "CZ"], "correct": 1},
    {"q": "DeFi stands for?", "options": ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Default Finance"], "correct": 1},
    {"q": "What is smart contract?", "options": ["Legal doc", "Self-executing code", "Trading bot", "Wallet app"], "correct": 1},
    {"q": "USDC runs on?", "options": ["Bitcoin", "Ethereum", "Solana", "Multiple chains"], "correct": 3},
    {"q": "NFT stands for?", "options": ["New Financial Token", "Non-Fungible Token", "Network File", "Next Finance"], "correct": 1},
    {"q": "Ethereum gas is?", "options": ["Crypto type", "Transaction fee", "Mining reward", "Wallet type"], "correct": 1},
    {"q": "Ethereum founder?", "options": ["Satoshi", "Vitalik Buterin", "Charles", "Gavin"], "correct": 1}
  ],
  general: [
    {"q": "Capital of France?", "options": ["Lyon", "Marseille", "Paris", "Nice"], "correct": 2},
    {"q": "Red Planet?", "options": ["Venus", "Mars", "Jupiter", "Saturn"], "correct": 1},
    {"q": "How many continents?", "options": ["5", "6", "7", "8"], "correct": 2},
    {"q": "Largest ocean?", "options": ["Atlantic", "Indian", "Arctic", "Pacific"], "correct": 3},
    {"q": "Mona Lisa painter?", "options": ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], "correct": 1},
    {"q": "Smallest country?", "options": ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], "correct": 1},
    {"q": "Human bones?", "options": ["186", "206", "226", "246"], "correct": 1},
    {"q": "Capital of Japan?", "options": ["Osaka", "Kyoto", "Tokyo", "Hiroshima"], "correct": 2},
    {"q": "Romeo & Juliet author?", "options": ["Dickens", "Shakespeare", "Austen", "Twain"], "correct": 1},
    {"q": "Largest mammal?", "options": ["Elephant", "Blue Whale", "Giraffe", "Bear"], "correct": 1}
  ],
  sports: [
    {"q": "Basketball players?", "options": ["4", "5", "6", "7"], "correct": 1},
    {"q": "World Cup 2022?", "options": ["France", "Brazil", "Argentina", "Germany"], "correct": 2},
    {"q": "Olympic pool?", "options": ["25m", "50m", "75m", "100m"], "correct": 1},
    {"q": "Tennis Grand Slams?", "options": ["3", "4", "5", "6"], "correct": 1},
    {"q": "Puck sport?", "options": ["Baseball", "Hockey", "Cricket", "Rugby"], "correct": 1},
    {"q": "Touchdown points?", "options": ["5", "6", "7", "8"], "correct": 1},
    {"q": "First Olympics?", "options": ["1892", "1896", "1900", "1904"], "correct": 1},
    {"q": "Baseball players?", "options": ["8", "9", "10", "11"], "correct": 1},
    {"q": "Most World Cups?", "options": ["Germany", "Argentina", "Brazil", "Italy"], "correct": 2},
    {"q": "Marathon km?", "options": ["38", "40", "42", "44"], "correct": 2}
  ],
  gaming: [
    {"q": "Battle Royale?", "options": ["Fortnite", "PUBG", "Apex", "Warzone"], "correct": 1},
    {"q": "Minecraft year?", "options": ["2009", "2010", "2011", "2012"], "correct": 2},
    {"q": "Zelda hero?", "options": ["Zelda", "Link", "Ganon", "Mario"], "correct": 1},
    {"q": "PlayStation?", "options": ["Nintendo", "Microsoft", "Sony", "Sega"], "correct": 2},
    {"q": "Best-selling?", "options": ["GTA V", "Minecraft", "Tetris", "Wii Sports"], "correct": 1},
    {"q": "Master Chief?", "options": ["Halo", "Destiny", "CoD", "Titanfall"], "correct": 0},
    {"q": "Pokemon level?", "options": ["50", "75", "100", "150"], "correct": 2},
    {"q": "Kratos game?", "options": ["AC", "Dark Souls", "God of War", "DMC"], "correct": 2},
    {"q": "NPC means?", "options": ["New Player", "Non-Player Character", "Next Point", "Network"], "correct": 1},
    {"q": "Fortnite currency?", "options": ["Gold", "Credits", "V-Bucks", "Coins"], "correct": 2}
  ]
};

export default function TriviArena() {
  const [screen, setScreen] = useState('home');
  const [mode, setMode] = useState(null);
  const [stake, setStake] = useState(null);
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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

  const startGame = (selectedMode, selectedStake = null) => {
    setMode(selectedMode);
    setStake(selectedStake);
    if (selectedMode === 'challenge') {
      setScreen('challenge-setup');
    } else {
      setScreen('category');
    }
  };

  const createChallenge = () => {
    if (!challengeAddress || !category || !stake) return;
    const mockLink = `https://triviarena.io/c/${Math.random().toString(36).substr(2, 9)}`;
    setChallengeLink(mockLink);
    setScreen('challenge-created');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(challengeLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const startQuiz = (cat) => {
    setCategory(cat);
    const catQuestions = questionsDB[cat];
    setQuestions(catQuestions.slice(0, 10));
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(20);
    setAnswered(false);
    setSelectedAnswer(null);
    if (mode === '1v1' || mode === 'challenge') {
      setOpponentScore(Math.floor(Math.random() * 3));
    }
    setScreen('quiz');
  };

  const handleAnswer = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }
    if ((mode === '1v1' || mode === 'challenge') && Math.random() > 0.3) {
      setOpponentScore(opponentScore + 1);
    }
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setTimeLeft(20);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setScreen('result');
      }
    }, 1500);
  };

  const handleTimeout = () => {
    setAnswered(true);
    if ((mode === '1v1' || mode === 'challenge') && Math.random() > 0.3) {
      setOpponentScore(opponentScore + 1);
    }
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setTimeLeft(20);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setScreen('result');
      }
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

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-blue-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-16 pt-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-12 h-12 text-purple-400" />
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  TriviArena
                </h1>
                <p className="text-slate-400 text-sm">Compete. Win. Earn.</p>
              </div>
            </div>
            <button className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Connect Wallet
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800">
              <Users className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-3xl font-black">1,247</div>
              <div className="text-slate-400 text-sm">Active Players</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800">
              <DollarSign className="w-5 h-5 text-green-400 mb-2" />
              <div className="text-3xl font-black">$12,450</div>
              <div className="text-slate-400 text-sm">Prize Pool</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800">
              <Zap className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-3xl font-black">843</div>
              <div className="text-slate-400 text-sm">Games Played</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900/70 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800">
              <Brain className="w-8 h-8 text-blue-400 mb-4" />
              <h2 className="text-2xl font-black mb-2">Practice</h2>
              <p className="text-slate-400 mb-6 text-sm">Train without risk</p>
              <button onClick={() => startGame('practice')} className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold">
                Start Training
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-purple-500/50">
              <Zap className="w-8 h-8 text-purple-400 mb-4" />
              <h2 className="text-2xl font-black mb-2">Quick Match</h2>
              <p className="text-purple-100/80 mb-6 text-sm">Instant battles</p>
              <div className="space-y-3">
                {[10, 50, 100].map(amount => (
                  <button key={amount} onClick={() => startGame('1v1', amount)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold flex justify-between px-4">
                    <span>${amount}</span>
                    <span className="text-green-300">Win ${(amount * 1.9).toFixed(0)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800">
              <Target className="w-8 h-8 text-pink-400 mb-4" />
              <h2 className="text-2xl font-black mb-2">Challenge</h2>
              <p className="text-slate-400 mb-6 text-sm">Direct opponent duel</p>
              <button onClick={() => startGame('challenge')} className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl font-bold">
                ⚔️ Create Challenge
              </button>
              <div className="mt-4 text-xs text-slate-500 text-center">24h window</div>
            </div>
          </div>

          <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 border-dashed">
            <Crown className="w-6 h-6 text-yellow-500/50 inline mr-3" />
            <span className="text-slate-400 font-bold">Tournament Mode - Coming Soon</span>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'category') {
    const cats = [
      {id: 'crypto', name: 'Crypto/Web3', icon: '₿', color: 'from-orange-500 to-yellow-500'},
      {id: 'general', name: 'General', icon: '🌍', color: 'from-blue-500 to-cyan-500'},
      {id: 'sports', name: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-500'},
      {id: 'gaming', name: 'Gaming', icon: '🎮', color: 'from-purple-500 to-pink-500'}
    ];
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 pt-12">
        <button onClick={resetGame} className="text-slate-400 mb-8">← Back</button>
        <h2 className="text-4xl font-black text-center mb-12">Choose Category</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {cats.map(cat => (
            <button key={cat.id} onClick={() => startQuiz(cat.id)}
              className={`bg-gradient-to-br ${cat.color} p-10 rounded-3xl shadow-2xl hover:scale-105 transition`}>
              <div className="text-7xl mb-4">{cat.icon}</div>
              <div className="text-3xl font-black text-white">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (screen === 'quiz') {
    const question = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between mb-8">
            <span className="text-sm">Q {currentQ + 1}/{questions.length}</span>
            <span className="text-xl font-black">{timeLeft}s</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full mb-10">
            <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{width: `${progress}%`}}></div>
          </div>
          <div className="bg-slate-900/70 p-10 rounded-3xl mb-6">
            <h3 className="text-3xl font-black mb-10">{question.q}</h3>
            <div className="space-y-4">
              {question.options.map((option, idx) => {
                let bg = 'bg-slate-800';
                if (answered) {
                  if (idx === question.correct) bg = 'bg-green-600';
                  else if (idx === selectedAnswer) bg = 'bg-red-600';
                }
                return (
                  <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered}
                    className={`w-full p-6 rounded-2xl ${bg} text-left font-bold`}>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    const won = mode === 'practice' || score > opponentScore;
    const winAmount = won && (mode === '1v1' || mode === 'challenge') ? stake * 1.9 : 0;
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-3xl w-full text-center">
          <Trophy className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-5xl font-black mb-4">{won ? 'VICTORY!' : 'DEFEAT'}</h2>
          {(mode === '1v1' || mode === 'challenge') && (
            <div className="text-4xl font-black text-green-400 mb-8">
              {won ? `+$${winAmount.toFixed(2)}` : `-$${stake}`}
            </div>
          )}
          <div className="bg-slate-900/70 p-10 rounded-3xl mb-6">
            <div className="text-5xl font-black text-green-400 mb-2">{score}/10</div>
            <button onClick={resetGame} className="mt-8 w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold">
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
    }
