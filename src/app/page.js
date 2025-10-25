'use client'
import React, { useState } from 'react';
import { Trophy, Brain, DollarSign, Users, Zap, Target, Crown, Sparkles } from 'lucide-react';

export default function TriviArena() {
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
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold">
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
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold">
              Start Training
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-purple-500/50">
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h2 className="text-2xl font-black mb-2">Quick Match</h2>
            <p className="text-purple-100/80 mb-6 text-sm">Instant battles</p>
            <div className="space-y-3">
              {[10, 50, 100].map(amount => (
                <button key={amount}
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
            <button className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-xl font-bold">
              ⚔️ Create Challenge
            </button>
            <div className="mt-4 text-xs text-slate-500 text-center">24h window</div>
          </div>
        </div>

        <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 border-dashed">
          <Crown className="w-6 h-6 text-yellow-500/50 inline mr-3" />
          <span className="text-slate-400 font-bold">Tournament Mode - Coming Soon</span>
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>💎 Built on Base • Skill-based quiz battles with real stakes</p>
          <p className="mt-2">Demo Version - Full functionality coming soon!</p>
        </div>
      </div>
    </div>
  );
}
