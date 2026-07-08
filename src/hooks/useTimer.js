import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "nexus-focus-timer";

const MODES = {
  pomodoro: { label: "Pomodoro", minutes: 25 },
  short: { label: "Short Break", minutes: 5 },
  long: { label: "Long Break", minutes: 15 },
};

const loadTimerState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return null;
};

const useTimer = () => {
  const savedState = loadTimerState();

  const [mode, setMode] = useState(savedState?.mode || "pomodoro");
  const [timeLeft, setTimeLeft] = useState(
    savedState?.timeLeft ?? MODES.pomodoro.minutes * 60
  );
  const [isRunning, setIsRunning] = useState(savedState?.isRunning || false);
  const [isBreak, setIsBreak] = useState(savedState?.isBreak || false);
  const intervalRef = useRef(null);
  const isBreakRef = useRef(isBreak);
  const modeRef = useRef(mode);

  useEffect(() => {
    isBreakRef.current = isBreak;
  }, [isBreak]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const totalTime = MODES[mode].minutes * 60;

  useEffect(() => {
    const state = {
      mode,
      timeLeft,
      isRunning,
      isBreak,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [mode, timeLeft, isRunning, isBreak]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setMode(parsed.mode);
          setTimeLeft(parsed.timeLeft);
          setIsRunning(parsed.isRunning);
          setIsBreak(parsed.isBreak);
        } catch {
          // ignore parse errors
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            const newIsBreak = !isBreakRef.current;
            isBreakRef.current = newIsBreak;
            const newMode = modeRef.current;
            const minutes = newIsBreak
              ? MODES[newMode].minutes
              : MODES.pomodoro.minutes;
            setTimeout(() => {
              setIsRunning(false);
              setIsBreak(newIsBreak);
              setTimeLeft(minutes * 60);
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const startTimer = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    const minutes = isBreak ? MODES[mode].minutes : MODES.pomodoro.minutes;
    setTimeLeft(minutes * 60);
  }, [mode, isBreak]);

  const switchMode = useCallback(
    (newMode) => {
      setIsRunning(false);
      setIsBreak(false);
      setMode(newMode);
      setTimeLeft(MODES[newMode].minutes * 60);
    },
    []
  );

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return {
    mode,
    modes: MODES,
    timeLeft,
    formattedTime,
    isRunning,
    isBreak,
    progress,
    totalTime,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
  };
};

export default useTimer;