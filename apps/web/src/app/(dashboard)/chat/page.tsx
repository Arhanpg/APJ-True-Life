'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  return (
    <div className="-m-6 h-[calc(100vh-64px)] flex">
      {/* Conversation list */}
      <div className="w-80 border-r border-outline-variant bg-white flex flex-col">
        <div className="p-4 border-b border-outline-variant">
          <h2 className="font-semibold text-gray-800">Messages</h2>
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full mt-3 border border-outline rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
          <span className="text-4xl mb-3">💬</span>
          <p className="font-medium">No active chats</p>
          <p className="text-sm mt-1">Chats appear when a treatment plan is activated</p>
        </div>
      </div>

      {/* Chat panel */}
      <div className="flex-1 flex flex-col bg-surface">
        {selected ? (
          <></>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <span className="text-5xl mb-4">💬</span>
            <p className="font-medium text-gray-600">Select a conversation</p>
            <p className="text-sm mt-1">Choose a patient chat from the list</p>
          </div>
        )}
        <div className="p-4 border-t border-outline-variant bg-white">
          <div className="flex gap-3 items-center">
            <button className="text-gray-400 hover:text-gray-600 p-2">📎</button>
            <input
              value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-outline rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm hover:bg-primary-dark transition-colors disabled:opacity-40" disabled={!message.trim()}>
              Send
            </button>
          </div>
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            ⚠️ Chat messages are permanently deleted when a treatment is completed.
          </p>
        </div>
      </div>
    </div>
  );
}
