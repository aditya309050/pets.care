'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, ShieldAlert, Stethoscope, BookOpen, AlertCircle } from 'lucide-react';
import { AIAssistantMessage } from '@pets-care/types';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<AIAssistantMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your **pets.care AI Assistant** 🐾

I can help guide you on pet nutrition, immunization schedules, preventive care, and understanding common symptoms.

*⚠️ Medical Notice: I provide evidence-based guidance but cannot replace in-person physical exams or diagnose life-threatening emergencies.*`,
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "Bruno hasn't eaten since yesterday and seems tired.",
    'What vaccinations does my dog need before boarding?',
    'My dog ate chocolate, what should I do?',
    'How do I switch puppy food safely?',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: AIAssistantMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/api/ai-assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error('AI assistant response error');
      }

      const botMsg = await res.json();
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an issue connecting to the pet health service. Please try again or contact a clinic directly.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Pet Health Assistant</h1>
          </div>
          <p className="text-xs text-slate-500">
            Intelligent pet symptom triage, nutrition recommendations, and vaccine guidelines.
          </p>
        </div>

        <Link
          href="/emergency"
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200 transition-colors"
        >
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span>Emergency SOS</span>
        </Link>
      </div>

      {/* CHAT CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col h-[580px]">
        {/* MESSAGES LIST */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none space-y-3'
                }`}
              >
                <div className="whitespace-pre-line">{m.content}</div>

                {m.suggestedAction && (
                  <div className="pt-2 border-t border-slate-200/60">
                    <Link
                      href={m.suggestedAction.route}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                    >
                      <span>{m.suggestedAction.label}</span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-4 rounded-2xl bg-slate-100 text-slate-400 text-xs font-semibold animate-pulse">
                Analyzing veterinary guidance...
              </div>
            </div>
          )}
        </div>

        {/* SAMPLE PROMPT PILLS */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Suggested Pet Inquiries
          </div>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 rounded-full bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 text-slate-600 hover:text-emerald-800 text-[11px] font-semibold border border-slate-200 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 pt-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about symptoms, food toxicities, vaccines..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
