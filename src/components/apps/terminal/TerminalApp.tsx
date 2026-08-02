"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { commands, type TerminalContext } from "@/components/apps/terminal/commands";
import { useOSStore } from "@/store/os-store";
import { profile } from "@/data/profile";

interface HistoryLine {
  type: "input" | "output";
  text: string;
}

const WELCOME_LINES: HistoryLine[] = [
  { type: "output", text: `${profile.name}'s Terminal — type 'help' to get started.` },
];

export function TerminalApp() {
  const openApp = useOSStore((state) => state.openApp);
  const minimizeWindow = useOSStore((state) => state.minimizeWindow);

  const [lines, setLines] = useState<HistoryLine[]>(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    const nextLines: HistoryLine[] = [...lines, { type: "input", text: raw }];

    if (!trimmed) {
      setLines(nextLines);
      return;
    }

    const [name, ...args] = trimmed.split(/\s+/);
    const command = commands[name.toLowerCase()];

    if (!command) {
      setLines([...nextLines, { type: "output", text: `Command not found: ${name}. Type 'help' for a list.` }]);
      return;
    }

    const ctx: TerminalContext = {
      openApp,
      clear: () => setLines([]),
      minimizeSelf: () => minimizeWindow("terminal"),
    };
    const result = command.run(args, ctx);

    if (name.toLowerCase() === "clear") {
      // ctx.clear() already reset `lines` above — don't re-append the "> clear" input line after it.
      return;
    }

    const outputLines = (Array.isArray(result) ? result : [result]).filter(Boolean);
    setLines([...nextLines, ...outputLines.map((text) => ({ type: "output" as const, text }))]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (input.trim()) setHistory((h) => [...h, input]);
      setHistoryIndex(null);
      runCommand(input);
      setInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  return (
    <div
      className="flex h-full flex-col bg-zinc-950 p-3 font-mono text-sm text-emerald-300"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-0.5 overflow-y-auto pb-2">
        {lines.map((line, index) => (
          <div key={index} className={line.type === "input" ? "text-white" : "whitespace-pre-wrap text-emerald-300"}>
            {line.type === "input" ? `> ${line.text}` : line.text}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-t border-white/10 pt-2">
        <span aria-hidden="true" className="text-white">
          {">"}
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          aria-label="Terminal input"
          className="flex-1 bg-transparent text-white outline-none"
        />
      </div>
    </div>
  );
}
