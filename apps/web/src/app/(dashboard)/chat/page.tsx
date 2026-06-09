"use client";

import { useState } from "react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ConversationList } from "@/components/chat/conversation-list";

export default function ChatPage() {
  const [activeId, setActiveId] = useState("1");

  return (
    <div className="grid h-[calc(100vh-10rem)] gap-6 xl:grid-cols-[380px_1fr]">
      <ConversationList activeId={activeId} onSelect={setActiveId} />
      <ChatPanel conversationId={activeId} />
    </div>
  );
}
