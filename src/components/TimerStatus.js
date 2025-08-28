import React from 'react';
import { useTimer } from './TimerContext';

const TimerStatus = () => {
  const { isRunning, time, currentTask } = useTimer();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isRunning) return null;

  return (
    <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-sm text-green-700 font-medium">
        {formatTime(time)} - {currentTask}
      </span>
    </div>
  );
};

export default TimerStatus;