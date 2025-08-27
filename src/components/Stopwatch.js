import React from 'react';
import { Clock, Play, Pause, Square, Save, Trash2, List, Timer } from 'lucide-react';
import { useTimer } from './TimerContext';

const Stopwatch = () => {
  const { 
    time, 
    isRunning, 
    currentTask, 
    tasks, 
    startTimer, 
    pauseTimer, 
    stopTimer, 
    saveTask, 
    deleteTask, 
    setCurrentTask 
  } = useTimer();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Timer className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Time Tracker</h2>
            {isRunning && (
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-100">Recording...</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-mono font-bold text-gray-900 mb-4 bg-gray-50 rounded-xl py-6 border-2 border-dashed border-gray-200">
              {formatTime(time)}
            </div>
 
            <div className="mb-6">
              <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="What are you working on?"
                className="w-full max-w-md px-4 py-3 text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  disabled={!currentTask.trim()}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
              )}
              
              <button
                onClick={stopTimer}
                disabled={time === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Square className="w-5 h-5" />
                <span>Stop</span>
              </button>
              
              <button
                onClick={saveTask}
                disabled={!currentTask.trim() || time === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <List className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Task History</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {tasks.length} tasks
            </span>
          </div>
        </div>
        
        <div className="p-6">
          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tasks recorded yet</p>
              <p className="text-sm text-gray-400">Start tracking your time to see your productivity!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-blue-600 font-medium">
                        {formatDuration(task.duration)}
                      </span>
                      <span className="text-sm text-gray-500">{task.date}</span>
                      <span className="text-sm text-gray-500">{task.time}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;