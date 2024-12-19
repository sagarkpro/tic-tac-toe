'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [blocks, setBlocks] = useState<(string | null)[][]>(Array.from({ length: 3 }, () => Array(3).fill(null)));
  const [currentStep, setCurrentStep] = useState("X");
  const [numMoves, setNumMoves] = useState<number>(0);
  const [status, setStatus] = useState<string | null>("Game in Progress");

  function playMove(i: number, j: number, value: string) {
    if (blocks[i][j] || status != "Game in Progress")
      return;
    const _blocks = JSON.parse(JSON.stringify(blocks));
    _blocks[i][j] = value;

    setBlocks(_blocks);
    setCurrentStep(currentStep == "X" ? "O" : "X");
    setNumMoves(prev => prev++);
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
      return "draw!";
    }
    return "Game in Progress";
  }

  useEffect(() => {
    setStatus(checkWinner());
  }, [blocks])

  return (
    <div className="flex w-full justify-center">
      <div className="p-4 text-lg font-semibold">
        <p>
          Current Move: {currentStep}
        </p>

        Status: {status}
      </div>
      <div className="flex justify-center">
        <div className="max-w-3xl flex w-full justify-center flex-wrap h-screen p-4">
          {
            blocks.map((block, i) => {
              return (
                block.map((innerBlock, j) => {
                  return (
                    <div className="border-2 text-9xl h-1/3 aspect-square flex justify-center items-center select-none" key={i + j} onClick={() => playMove(i, j, currentStep)}>
                      <p className={`${innerBlock === 'O' ? 'text-red-500' : 'text-blue-500'} `}>
                        {innerBlock}
                      </p>
                    </div>
                  )
                })
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
