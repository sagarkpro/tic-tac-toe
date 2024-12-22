'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [blocks, setBlocks] = useState<(string | null)[][]>(Array.from({ length: 3 }, () => Array(3).fill(null)));
  const [currentStep, setCurrentStep] = useState("X");
  const [numMoves, setNumMoves] = useState<number>(0);
  const [status, setStatus] = useState<string | null>("Game in Progress");
  const redShadow = { textShadow: '0 0 5px #ef4444, 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 40px #ef4444, 0 0 80px #ef4444' };
  const blueShadow = { textShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 40px #3b82f6, 0 0 80px #3b82f6' };

  function playMove(i: number, j: number, value: string) {
    if (blocks[i][j] || status != "Game in Progress")
      return;
    const _blocks = JSON.parse(JSON.stringify(blocks));
    _blocks[i][j] = value;

    setBlocks(_blocks);
    setCurrentStep(currentStep == "X" ? "O" : "X");
    setNumMoves(prev => ++prev);
  }

  function checkWinner(): string | null | "draw" {
    const size = blocks.length;
    for (let i = 0; i < size; i++) {
      if (blocks[i].every(cell => cell === blocks[i][0] && cell !== null)) {
        return `${blocks[i][0]} has WON!`;
      }

      if (blocks.every(row => row[i] === blocks[0][i] && row[i] !== null)) {
        return `${blocks[0][i]} has WON!`;
      }
    }

    if (blocks.every((row, i) => row[i] === blocks[0][0] && row[i] !== null)) {
      return `${blocks[0][0]} has WON!`;
    }

    if (blocks.every((row, i) => row[size - 1 - i] === blocks[0][size - 1] && row[size - 1 - i] !== null)) {
      return `${blocks[0][size - 1]} has WON!`;
    }

    if (numMoves >= 9) {
      return "It's a Draw!";
    }
    return "Game in Progress";
  }

  useEffect(() => {
    setStatus(checkWinner());
  }, [blocks])

  return (
    <div className="w-full">
      <div className="p-4 text-lg font-semibold min-w-64 absolute">
        <p>
          Current Move: {currentStep}
        </p>

        <p>
          Status: {status}
        </p>

        <p>
          Number of moves: {numMoves}
        </p>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex justify-center w-full h-screen items-center">
          <div className="max-w-full max-h-[700px] 2xsm:h-80 xsm:h-svh aspect-square flex justify-center flex-wrap p-1">
            <table className="border-2 border-collapse w-full">
              {
                blocks.map((block, i) => {
                  return (
                    <thead key={i} className="w-1/3 aspect-square" style={{height: `calc(33.33%)`}}>
                      <tr>
                        {
                          block.map((innerBlock, j) => {
                            return (
                              <td className="xsm:text-8xl sm:text-9xl text-6xl border-2 text-center h-1/3 aspect-square w-1/3" key={i + j} onClick={() => playMove(i, j, currentStep)}>
                                <p className={`${innerBlock === 'O' ? 'text-red-500' : 'text-blue-500'} `} style={innerBlock === 'O' ? blueShadow : redShadow}>
                                  {innerBlock}
                                </p>
                              </td>
                            )
                          })
                        }
                      </tr>
                    </thead>
                  )
                })
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
