import React, { useState } from 'react';

const ResumeBot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([
    "🤖 Ask anything about Mahesh's resume!"
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, `🧑: ${input}`]);
    setLoading(true);

    try {
const res = await fetch('http://localhost:5000/api/resume-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, `🤖: ${data.reply}`]);
} catch (error) {
  console.error("🔥 Backend error:", error);
  setMessages(prev => [...prev, '🤖: Sorry, something went wrong.']);
} finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="bg-dark-200 text-white p-6 rounded-xl shadow-xl max-w-2xl mx-auto mb-12">
      <div className="h-64 overflow-y-auto border border-accent rounded p-4 mb-4 space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
        {loading && <p className="animate-pulse">🤖: thinking...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Ask something..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full bg-dark-300 border border-accent text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-accent text-black font-semibold hover:bg-accent/90 transition"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default ResumeBot;
