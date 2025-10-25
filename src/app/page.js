'use client'
import React, { useState, useEffect } from 'react';
import { Trophy, Brain, DollarSign, Clock, Users, Zap, Target, Copy, Check, Sparkles, TrendingUp, Crown } from 'lucide-react';

// Compact questions - 100 per category (400 total for demo)
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
    {"q": "Ethereum founder?", "options": ["Satoshi", "Vitalik Buterin", "Charles", "Gavin"], "correct": 1},
    {"q": "Bitcoin block time?", "options": ["1 min", "5 min", "10 min", "30 min"], "correct": 2},
    {"q": "Layer 2 solution?", "options": ["Ethereum", "Bitcoin", "Polygon", "Cardano"], "correct": 2},
    {"q": "What is staking?", "options": ["Selling", "Locking for rewards", "Mining", "Trading"], "correct": 1},
    {"q": "Blockchain is?", "options": ["Crypto type", "Distributed ledger", "Mining software", "Trading platform"], "correct": 1},
    {"q": "Uniswap is?", "options": ["Blockchain", "DEX", "Wallet", "Mining pool"], "correct": 1},
    {"q": "DEX stands for?", "options": ["Digital", "Decentralized Exchange", "Direct", "Distributed"], "correct": 1},
    {"q": "MetaMask is?", "options": ["Blockchain", "Crypto wallet", "Mining software", "Exchange"], "correct": 1},
    {"q": "Yield farming?", "options": ["Growing vegetables", "Earning via liquidity", "Mining Bitcoin", "Trading"], "correct": 1},
    {"q": "FOMO means?", "options": ["Fear Of Missing Out", "Financial Option", "First Open Market", "Free Online"], "correct": 0},
    {"q": "Crypto whale?", "options": ["Coin type", "Large holder", "Mining pool", "Trading bot"], "correct": 1},
    {"q": "ICO stands for?", "options": ["Initial Coin Offering", "International Crypto", "Internal Coin", "Investment Coin"], "correct": 0},
    {"q": "Hard fork is?", "options": ["Mining equipment", "Blockchain split", "Wallet type", "Trading strategy"], "correct": 1},
    {"q": "Proof of Work?", "options": ["Employment", "Consensus via computation", "Trading proof", "Wallet auth"], "correct": 1},
    {"q": "P2P means?", "options": ["Pay to Play", "Peer to Peer", "Profit to Price", "Platform Protocol"], "correct": 1},
    {"q": "Token burn?", "options": ["Destroying tokens", "Selling", "Mining", "Trading"], "correct": 0}
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
    {"q": "Largest mammal?", "options": ["Elephant", "Blue Whale", "Giraffe", "Bear"], "correct": 1},
    {"q": "Speed of light?", "options": ["300,000 km/s", "150,000", "450,000", "600,000"], "correct": 0},
    {"q": "H2O is?", "options": ["Hydrogen", "Water", "Oxygen", "Helium"], "correct": 1},
    {"q": "Telephone inventor?", "options": ["Edison", "Tesla", "Bell", "Franklin"], "correct": 2},
    {"q": "Solar system planets?", "options": ["7", "8", "9", "10"], "correct": 1},
    {"q": "Longest river?", "options": ["Amazon", "Nile", "Yangtze", "Mississippi"], "correct": 1},
    {"q": "First moon person?", "options": ["Aldrin", "Armstrong", "Gagarin", "Glenn"], "correct": 1},
    {"q": "Capital of Italy?", "options": ["Milan", "Venice", "Rome", "Florence"], "correct": 2},
    {"q": "Hexagon sides?", "options": ["5", "6", "7", "8"], "correct": 1},
    {"q": "Largest desert?", "options": ["Sahara", "Arabian", "Antarctic", "Gobi"], "correct": 2},
    {"q": "Sistine Chapel?", "options": ["da Vinci", "Michelangelo", "Raphael", "Botticelli"], "correct": 1},
    {"q": "Capital Spain?", "options": ["Barcelona", "Madrid", "Valencia", "Seville"], "correct": 1},
    {"q": "Hours in day?", "options": ["12", "20", "24", "28"], "correct": 2},
    {"q": "Smallest prime?", "options": ["0", "1", "2", "3"], "correct": 2},
    {"q": "1984 author?", "options": ["Orwell", "Huxley", "Bradbury", "Clarke"], "correct": 0},
    {"q": "Capital Canada?", "options": ["Toronto", "Vancouver", "Montreal", "Ottawa"], "correct": 3}
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
    {"q": "Marathon km?", "options": ["38", "40", "42", "44"], "correct": 2},
    {"q": "Wimbledon sport?", "options": ["Cricket", "Tennis", "Golf", "Rugby"], "correct": 1},
    {"q": "Olympic rings?", "options": ["3", "4", "5", "6"], "correct": 2},
    {"q": "Max bowling?", "options": ["100", "200", "250", "300"], "correct": 3},
    {"q": "Golf holes?", "options": ["9", "12", "18", "24"], "correct": 2},
    {"q": "Soccer half?", "options": ["40", "45", "50", "60"], "correct": 1},
    {"q": "The Greatest?", "options": ["Tyson", "Ali", "Mayweather", "Foreman"], "correct": 1},
    {"q": "Tour de France?", "options": ["Running", "Cycling", "Swimming", "Car"], "correct": 1},
    {"q": "Jordan titles?", "options": ["4", "5", "6", "7"], "correct": 2},
    {"q": "Baseball bases?", "options": ["2", "3", "4", "5"], "correct": 2},
    {"q": "NHL periods?", "options": ["2", "3", "4", "5"], "correct": 1},
    {"q": "Grass Slam?", "options": ["Australian", "French", "Wimbledon", "US"], "correct": 2},
    {"q": "Volleyball?", "options": ["5", "6", "7", "8"], "correct": 1},
    {"q": "Hoop height?", "options": ["8ft", "9ft", "10ft", "11ft"], "correct": 2},
    {"q": "Super Bowl?", "options": ["Basketball", "Baseball", "Football", "Hockey"], "correct": 2},
    {"q": "Slam sets?", "options": ["2", "3", "4", "5"], "correct": 1}
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
    {"q": "Vault Boy?", "options": ["Fallout", "Bioshock", "Metro", "Borderlands"], "correct": 0},
    {"q": "Fortnite currency?", "options": ["Gold", "Credits", "V-Bucks", "Coins"], "correct": 2},
    {"q": "Minecraft creator?", "options": ["Newell", "Notch", "Howard", "Spencer"], "correct": 1},
    {"q": "RPG means?", "options": ["Real Player", "Role Playing Game", "Rapid Point", "Random"], "correct": 1},
    {"q": "Still Alive?", "options": ["Half-Life", "Portal", "L4D", "TF"], "correct": 1},
    {"q": "Gordon Freeman?", "options": ["John", "Gordon Freeman", "Morgan", "Jones"], "correct": 1},
    {"q": "FPS means?", "options": ["First Person", "Frames Second", "Both", "Fast Paced"], "correct": 2},
    {"q": "Block building?", "options": ["Roblox", "Minecraft", "Terraria", "All"], "correct": 3},
    {"q": "LoL currency?", "options": ["RP", "BE", "IP", "LP"], "correct": 0},
    {"q": "Riot owner?", "options": ["Activision", "EA", "Tencent", "Microsoft"], "correct": 2},
    {"q": "Mario job?", "options": ["Chef", "Plumber", "Electrician", "Carpenter"], "correct": 1},
    {"q": "Covenant?", "options": ["Mass Effect", "Halo", "Destiny", "Warframe"], "correct": 1},
    {"q": "AFK means?", "options": ["Always Killing", "Away Keyboard", "After Kill", "All Friends"], "correct": 1},
    {"q": "CJ game?", "options": ["GTA IV", "GTA SA", "GTA V", "Vice City"], "correct": 1},
    {"q": "Fallout dog?", "options": ["Rex", "Dogmeat", "K-9", "Buddy"], "correct": 1},
    {"q": "GG means?", "options": ["Get Good", "Good Game", "Going Great", "Game Glory"], "correct": 1}
  ]
};

const TriviArena = () => {
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

  if (screen === 'challenge-setup') {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 pt-12">
        <button onClick={resetGame} className="text-slate-400 mb-8">← Back</button>
        <div className="max-w-2xl mx-auto bg-slate-900/70 p-10 rounded-3xl border border-pink-500/50">
          <Target className="w-8 h-8 text-pink-400 mb-4" />
          <h2 className="text-3xl font-black mb-8">Create Challenge</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-3">Stake Amount</label>
              <div className="grid grid-cols-3 gap-3">
                {[10, 50, 100].map(amount => (
                  <button key={amount} onClick={() => setStake(amount)}
                    className={`p-4 rounded-xl font-bold ${stake === amount ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-slate-800'}`}>
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-3">Category</label>
              <div className="grid grid-cols-2 gap-3">
                {[{id: 'crypto', name: 'Crypto', icon: '₿'}, {id: 'general', name: 'General', icon: '🌍'},
                  {id: 'sports', name: 'Sports', icon: '⚽'}, {id: 'gaming', name: 'Gaming', icon: '🎮'}].map(cat => (
                  <button key={cat.id} onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl font-bold flex items-center gap-3 ${category === cat.id ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-slate-800'}`}>
              
