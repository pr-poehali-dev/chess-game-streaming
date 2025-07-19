import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

interface ChessSquare {
  piece: string | null;
  color: 'light' | 'dark';
}

const INITIAL_BOARD: ChessSquare[][] = [
  [
    { piece: '♜', color: 'dark' }, { piece: '♞', color: 'light' }, { piece: '♝', color: 'dark' }, { piece: '♛', color: 'light' },
    { piece: '♚', color: 'dark' }, { piece: '♝', color: 'light' }, { piece: '♞', color: 'dark' }, { piece: '♜', color: 'light' }
  ],
  [
    { piece: '♟', color: 'light' }, { piece: '♟', color: 'dark' }, { piece: '♟', color: 'light' }, { piece: '♟', color: 'dark' },
    { piece: '♟', color: 'light' }, { piece: '♟', color: 'dark' }, { piece: '♟', color: 'light' }, { piece: '♟', color: 'dark' }
  ],
  [
    { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' },
    { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' }
  ],
  [
    { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' },
    { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' }
  ],
  [
    { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' },
    { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' }
  ],
  [
    { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' },
    { piece: null, color: 'light' }, { piece: null, color: 'dark' }, { piece: null, color: 'light' }, { piece: null, color: 'dark' }
  ],
  [
    { piece: '♙', color: 'dark' }, { piece: '♙', color: 'light' }, { piece: '♙', color: 'dark' }, { piece: '♙', color: 'light' },
    { piece: '♙', color: 'dark' }, { piece: '♙', color: 'light' }, { piece: '♙', color: 'dark' }, { piece: '♙', color: 'light' }
  ],
  [
    { piece: '♖', color: 'light' }, { piece: '♘', color: 'dark' }, { piece: '♗', color: 'light' }, { piece: '♕', color: 'dark' },
    { piece: '♔', color: 'light' }, { piece: '♗', color: 'dark' }, { piece: '♘', color: 'light' }, { piece: '♖', color: 'dark' }
  ]
];

interface ChessBoardProps {
  moves?: string[];
  currentMove?: number;
}

export function ChessBoard({ moves = [], currentMove = 0 }: ChessBoardProps) {
  const [board] = useState<ChessSquare[][]>(INITIAL_BOARD);
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare?.row === row && selectedSquare?.col === col) {
      setSelectedSquare(null);
    } else {
      setSelectedSquare({ row, col });
    }
  };

  const getSquareClasses = (row: number, col: number, square: ChessSquare) => {
    const baseClasses = "w-12 h-12 flex items-center justify-center text-2xl cursor-pointer transition-colors relative";
    const colorClass = square.color === 'light' ? 'bg-amber-100' : 'bg-amber-800';
    const selectedClass = selectedSquare?.row === row && selectedSquare?.col === col ? 'ring-4 ring-blue-500' : '';
    const hoverClass = 'hover:brightness-110';
    
    return `${baseClasses} ${colorClass} ${selectedClass} ${hoverClass}`;
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <Card className="p-4 bg-amber-50">
      <div className="flex flex-col">
        {/* Координаты сверху */}
        <div className="flex mb-1">
          <div className="w-6"></div>
          {files.map(file => (
            <div key={file} className="w-12 h-6 flex items-center justify-center text-sm font-semibold text-amber-800">
              {file}
            </div>
          ))}
        </div>
        
        {/* Доска с координатами */}
        <div className="flex">
          {/* Координаты слева */}
          <div className="flex flex-col">
            {ranks.map(rank => (
              <div key={rank} className="w-6 h-12 flex items-center justify-center text-sm font-semibold text-amber-800">
                {rank}
              </div>
            ))}
          </div>
          
          {/* Сама доска */}
          <div className="border-2 border-amber-900">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((square, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={getSquareClasses(rowIndex, colIndex, square)}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {square.piece && (
                      <span className="select-none drop-shadow-sm">
                        {square.piece}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Координаты снизу */}
        <div className="flex mt-1">
          <div className="w-6"></div>
          {files.map(file => (
            <div key={file} className="w-12 h-6 flex items-center justify-center text-sm font-semibold text-amber-800">
              {file}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default ChessBoard;