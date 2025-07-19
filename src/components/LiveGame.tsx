import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import ChessBoard from "./ChessBoard";

interface Player {
  name: string;
  rating: number;
  country: string;
  title: string;
  time: string;
}

interface Move {
  number: number;
  white: string;
  black?: string;
  time: string;
}

interface LiveGameProps {
  whitePlayer: Player;
  blackPlayer: Player;
  moves: Move[];
  status: 'live' | 'paused' | 'finished';
  viewers: number;
}

export function LiveGame({ whitePlayer, blackPlayer, moves, status, viewers }: LiveGameProps) {
  const [currentMove, setCurrentMove] = useState(moves.length);
  const [isFollowingLive, setIsFollowingLive] = useState(true);

  useEffect(() => {
    if (isFollowingLive && status === 'live') {
      setCurrentMove(moves.length);
    }
  }, [moves.length, isFollowingLive, status]);

  const handleMoveNavigation = (moveIndex: number) => {
    setCurrentMove(moveIndex);
    setIsFollowingLive(false);
  };

  const goToLive = () => {
    setCurrentMove(moves.length);
    setIsFollowingLive(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4">
      {/* Левая панель - доска */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant={status === 'live' ? 'default' : 'secondary'} 
                       className={status === 'live' ? 'bg-red-600 hover:bg-red-700' : ''}>
                  {status === 'live' && <Icon name="Radio" size={12} className="mr-1" />}
                  {status === 'live' ? 'В ЭФИРЕ' : status === 'finished' ? 'ЗАВЕРШЕНА' : 'ПАУЗА'}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Users" size={14} className="mr-1" />
                  {viewers.toLocaleString()} зрителей
                </div>
              </div>
              
              {!isFollowingLive && (
                <Button onClick={goToLive} size="sm" variant="outline">
                  <Icon name="SkipForward" size={14} className="mr-1" />
                  К последнему ходу
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-center">
              <ChessBoard moves={moves.map(m => `${m.white} ${m.black || ''}`)} currentMove={currentMove} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Правая панель - информация и ходы */}
      <div className="space-y-6">
        {/* Игроки */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Участники</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Черные сверху */}
            <div className="flex items-center justify-between p-3 bg-slate-900 text-white rounded">
              <div>
                <div className="font-semibold">{blackPlayer.title} {blackPlayer.name}</div>
                <div className="text-sm opacity-80">{blackPlayer.country} • {blackPlayer.rating}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono">{blackPlayer.time}</div>
                <div className="text-xs opacity-80">⚫ Черные</div>
              </div>
            </div>
            
            <Separator />
            
            {/* Белые снизу */}
            <div className="flex items-center justify-between p-3 bg-slate-50 border rounded">
              <div>
                <div className="font-semibold">{whitePlayer.title} {whitePlayer.name}</div>
                <div className="text-sm text-muted-foreground">{whitePlayer.country} • {whitePlayer.rating}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono">{whitePlayer.time}</div>
                <div className="text-xs text-muted-foreground">⚪ Белые</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Управление */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Icon name="Play" size={18} className="mr-2" />
              Управление
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Button size="sm" variant="outline" onClick={() => handleMoveNavigation(0)}>
                <Icon name="SkipBack" size={14} />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleMoveNavigation(Math.max(0, currentMove - 1))}>
                <Icon name="ChevronLeft" size={14} />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleMoveNavigation(Math.min(moves.length, currentMove + 1))}>
                <Icon name="ChevronRight" size={14} />
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleMoveNavigation(moves.length)}>
                <Icon name="SkipForward" size={14} />
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground text-center">
              Ход {currentMove} из {moves.length}
            </div>
          </CardContent>
        </Card>

        {/* История ходов */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Icon name="List" size={18} className="mr-2" />
              Ходы партии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto space-y-1">
              {moves.map((move, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    currentMove > index ? 'bg-primary/10' : 'hover:bg-muted'
                  }`}
                  onClick={() => handleMoveNavigation(index + 1)}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm w-8">{move.number}.</span>
                    <span className="font-mono">{move.white}</span>
                    {move.black && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="font-mono">{move.black}</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{move.time}</span>
                </div>
              ))}
              
              {moves.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Icon name="Clock" size={24} className="mx-auto mb-2 opacity-50" />
                  <p>Партия еще не началась</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LiveGame;