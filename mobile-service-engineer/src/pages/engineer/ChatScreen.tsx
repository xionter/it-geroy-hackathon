import { useState } from 'react';
import { Send, Camera, Mic } from 'lucide-react';
import Header from '../../components/ui/Header';
import type { ChatMessage } from '../../types';

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'text',
    content: 'Доброе утро! Сегодня 5 заявок, первая — срочная на Ленина 12.',
    timestamp: '08:30',
    fromMe: false,
  },
  {
    id: '2',
    type: 'text',
    content: 'Принял, выезжаю на Ленина. Ремкомплект забрал.',
    timestamp: '08:32',
    fromMe: true,
  },
  {
    id: '3',
    type: 'text',
    content: 'Хорошо. Если нужна доп. деталь — пиши, отправлю курьера.',
    timestamp: '08:33',
    fromMe: false,
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (!text.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      type: 'text',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      fromMe: true,
    };
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      <Header title="Диспетчер" />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.fromMe
                  ? 'bg-blue-600 rounded-br-md'
                  : 'bg-zinc-800 rounded-bl-md'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={`text-[10px] mt-1 ${msg.fromMe ? 'text-blue-200' : 'text-zinc-500'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-3 pb-[env(safe-area-inset-bottom)] flex items-end gap-2">
        <button className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl active:bg-zinc-800">
          <Camera size={22} className="text-zinc-400" />
        </button>
        <button className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl active:bg-zinc-800">
          <Mic size={22} className="text-zinc-400" />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Сообщение..."
          className="flex-1 bg-zinc-800 rounded-xl px-4 py-3 text-sm outline-none placeholder-zinc-500 min-h-[44px]"
        />
        <button
          onClick={sendMessage}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-blue-600 active:bg-blue-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
