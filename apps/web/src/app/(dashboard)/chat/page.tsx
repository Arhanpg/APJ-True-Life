"use client";

import { useState } from "react";
import { ConversationList } from "@/components/chat/conversation-list";
import { ChatPanel } from "@/components/chat/chat-panel";

export default function ChatPage() {
  const [activeId, setActiveId] = useState<string>("1");

  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <ConversationList activeId={activeId} onSelect={setActiveId} />
      <ChatPanel />
    </div>
  );
}
