import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timerState, setTimerState] = useState({
    time: 0,
    isRunning: false,
    currentTask: '',
    tasks: []
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerState.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          time: prev.time + 1
        }));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerState.isRunning]);

  const startTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: true }));
  };

  const pauseTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: false }));
  };

  const stopTimer = () => {
    setTimerState(prev => ({ 
      ...prev, 
      isRunning: false, 
      time: 0,
      currentTask: ''
    }));
  };

  const saveTask = () => {
    if (timerState.currentTask.trim() && timerState.time > 0) {
      const newTask = {
        id: Date.now(),
        name: timerState.currentTask,
        duration: timerState.time,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      
      setTimerState(prev => ({
        ...prev,
        tasks: [newTask, ...prev.tasks],
        time: 0,
        currentTask: '',
        isRunning: false
      }));
    }
  };

  const deleteTask = (taskId) => {
    setTimerState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId)
    }));
  };

  const setCurrentTask = (task) => {
    setTimerState(prev => ({ ...prev, currentTask: task }));
  };

  return (
    <TimerContext.Provider value={{
      ...timerState,
      startTimer,
      pauseTimer,
      stopTimer,
      saveTask,
      deleteTask,
      setCurrentTask
    }}>
      {children}
    </TimerContext.Provider>
  );
};
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};