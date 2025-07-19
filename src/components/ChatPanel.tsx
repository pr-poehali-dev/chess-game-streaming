import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  userType: 'viewer' | 'commentator' | 'moderator';
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  isLive?: boolean;
}

export function ChatPanel({ messages, onSendMessage, isLive = true }: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isLive) {
      scrollToBottom();
    }
  }, [messages, isLive]);

  const handleSendMessage = () => {
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getUserBadge = (userType: string) => {
    switch (userType) {
      case 'commentator':
        return <Badge variant="default" className="text-xs">Комментатор</Badge>;
      case 'moderator':
        return <Badge variant="secondary" className="text-xs">Модератор</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={`transition-all duration-300 ${isExpanded ? 'h-96' : 'h-80'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Icon name="MessageCircle" size={18} className="mr-2" />
            Чат трансляции
          </CardTitle>
          <div className="flex items-center gap-2">
            {isLive && (
              <Badge variant="default" className="bg-red-600 hover:bg-red-700">
                <Icon name="Radio" size={10} className="mr-1" />
                LIVE
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3 max-h-60">
          {messages.map((msg) => (
            <div key={msg.id} className="group">
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">{msg.user}</span>
                    {getUserBadge(msg.userType)}
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm break-words">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Icon name="MessageCircle" size={24} className="mx-auto mb-2 opacity-50" />
              <p>Чат пока пуст. Начните обсуждение!</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Ввод сообщения */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Написать сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim()}
              size="sm"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Нажмите Enter для отправки</span>
            <span>{messages.length} сообщений</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChatPanel;