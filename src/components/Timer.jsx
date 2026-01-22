import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"


export default function Timer() {
    const { setTheme } = useTheme();
    const getModeDuration = (value) => {
      switch (value) {
        case "work":
          return 1 * 60;
        case "longBreak":
          return 15 * 60;
        case "shortBreak":
        case "break":
          return 5 * 60;
        default:
          return 25 * 60;
      }
    };

    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1 * 60);
    const [mode, setMode] = useState("work");
    const [cycle, setCycle] = useState(0);

     const handleTimerEnd = () => {
    if (mode === "work") {
      const nextMode = cycle < 3 ? "shortBreak" : "longBreak";
      setMode(nextMode);
      setCycle(prev => (cycle < 3 ? prev + 1 : 0));
      setTimeLeft(getModeDuration(nextMode));
    } else {
      setMode("work");
      setTimeLeft(getModeDuration("work"));
    }
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isRunning, setTheme]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 0) {
          handleTimerEnd();
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getModeDuration(mode));
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(70vh-6rem)]">
        <div className="w-[35rem] h-[35rem] bg-transparent mt-52">
                <div className="flex items-center w-full gap-2">
                    <Button
                        className={`flex-1  ${mode === "work" 
                            ? "dark:bg-[#f1f1f1] bg-[#1f1f1f] dark:text-black text-white"   // Work active → solid
                            : "bg-transparent border border-gray-200 dark:text-white text-black" // Work inactive → outline
                            }`}
                        onClick={() => {
                        setMode("work");
                        setTimeLeft(getModeDuration("work"));
                        setIsRunning(false); 
                        }}
                    >
                        Deep Work
                    </Button>
                    <Button
                        variant="outline"
                        className={`flex-1  ${mode === "shortBreak"
                                ? "dark:bg-[#f1f1f1] bg-[#1f1f1f] dark:text-black text-white" // Break active → solid
                                : "bg-transparent border border-gray-200 dark:text-white" // Break inactive → outline
                                }`}
                        onClick={() => {
                         setMode("shortBreak");
                        setTimeLeft(getModeDuration("shortBreak"));
                        setIsRunning(false); 
                        }}
                    >
                        Break
                    </Button>

                   
                </div>
                <div className="w-full text-center font-mono mt-5">
                    <h1 className="w-full text-center font-bold text-[9.5vw] leading-none">
                        {formatTime(timeLeft)}
                    </h1>
                </div>

                <div className="flex items-center w-full gap-2 mt-5">
                    <Button className="flex-1 h-12" onClick={() => setIsRunning(!isRunning)}> {isRunning ? <Pause />  : <Play />} </Button>
                </div>

                <div className="flex items-center justify-center mt-5" onClick={resetTimer}> <RotateCcw size={20}/> </div>
        </div>
    </div>

  )
}
