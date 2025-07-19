import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import LiveGame from "@/components/LiveGame";
import ChatPanel from "@/components/ChatPanel";

export default function LiveStream() {
  const gameData = {
    whitePlayer: {
      name: "Магнус Карлсен",
      rating: 2830,
      country: "Норвегия",
      title: "GM",
      time: "1:23:45"
    },
    blackPlayer: {
      name: "Ян Непомнящий",
      rating: 2792,
      country: "Россия", 
      title: "GM",
      time: "1:18:22"
    },
    moves: [
      { number: 1, white: "e4", black: "e5", time: "1:00" },
      { number: 2, white: "Nf3", black: "Nc6", time: "0:45" },
      { number: 3, white: "Bb5", black: "a6", time: "2:15" },
      { number: 4, white: "Ba4", black: "Nf6", time: "1:30" },
      { number: 5, white: "O-O", black: "Be7", time: "3:20" },
      { number: 6, white: "Re1", black: "b5", time: "2:45" },
      { number: 7, white: "Bb3", black: "d6", time: "4:10" },
      { number: 8, white: "c3", black: "O-O", time: "1:55" }
    ],
    status: 'live' as const,
    viewers: 15420
  };

  const [chatMessages] = useState([
    {
      id: "1",
      user: "ШахМастер2024",
      message: "Отличная защита Непомнящего!",
      timestamp: "19:45",
      userType: "viewer" as const
    },
    {
      id: "2", 
      user: "Андрей Волков",
      message: "Карлсен играет очень точно в дебюте. Испанская партия в классическом исполнении.",
      timestamp: "19:46",
      userType: "commentator" as const
    },
    {
      id: "3",
      user: "chess_fan",
      message: "Кто думает, что будет дальше?",
      timestamp: "19:47", 
      userType: "viewer" as const
    },
    {
      id: "4",
      user: "Модератор",
      message: "Напоминаем о правилах чата - только конструктивные комментарии о партии",
      timestamp: "19:48",
      userType: "moderator" as const
    },
    {
      id: "5",
      user: "GM_Petrov",
      message: "Интересная позиция после 8 ходов. Белые получили небольшое преимущество в развитии.",
      timestamp: "19:49",
      userType: "commentator" as const
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Навигация */}
      <nav className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Icon name="Crown" size={24} className="text-primary" />
              <h1 className="text-xl font-bold text-foreground">
                CHESS STREAMS
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="default" className="bg-red-600 hover:bg-red-700">
                <Icon name="Radio" size={12} className="mr-1" />
                В ЭФИРЕ
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Users" size={14} className="mr-1" />
                {gameData.viewers.toLocaleString()}
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Share" size={14} className="mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Заголовок трансляции */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-2" style={{fontFamily: 'Times New Roman, serif'}}>
              Чемпионат мира по шахматам 2024
            </h1>
            <p className="text-xl text-amber-700">
              Финальная партия: {gameData.whitePlayer.name} vs {gameData.blackPlayer.name}
            </p>
            <div className="flex justify-center items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-amber-600" />
                <span className="text-amber-700">Дубай, ОАЭ</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Trophy" size={16} className="text-amber-600" />
                <span className="text-amber-700">Призовой фонд: $2,000,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-amber-600" />
                <span className="text-amber-700">Классический контроль</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Игра занимает 3 колонки */}
          <div className="xl:col-span-3">
            <LiveGame {...gameData} />
          </div>
          
          {/* Чат занимает 1 колонку */}
          <div className="xl:col-span-1">
            <ChatPanel 
              messages={chatMessages}
              onSendMessage={(message) => console.log('Новое сообщение:', message)}
              isLive={true}
            />
          </div>
        </div>
      </div>

      {/* Статистика и дополнительная информация */}
      <div className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">8</div>
              <div className="text-slate-600">Сыгранных ходов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">45:32</div>
              <div className="text-slate-600">Время партии</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">15,420</div>
              <div className="text-slate-600">Зрителей онлайн</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}