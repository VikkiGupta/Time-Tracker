import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Save, Trash2, Clock, List } from 'lucide-react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [savedTasks, setSavedTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [showConfirmSave, setShowConfirmSave] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms
      .toString()
      .padStart(2, '0')}`;
  };

  const startStopwatch = () => {
    if (!taskDescription.trim()) {
      alert('Please enter a task description first');
      return;
    }
    setCurrentTask({
      id: Date.now(),
      description: taskDescription.trim(),
      startTime: new Date(),
      timeSpent: 0
    });
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    if (time > 0 && currentTask) {
      setShowConfirmSave(true);
    } else {
      performReset();
    }
  };

  const performReset = () => {
    setIsRunning(false);
    setTime(0);
    setCurrentTask(null);
    setTaskDescription('');
    setShowConfirmSave(false);
  };

  const saveTask = () => {
    if (!currentTask || time === 0) return;
    
    const savedTask = {
      ...currentTask,
      endTime: new Date(),
      timeSpent: time
    };
    
    setSavedTasks(prev => [savedTask, ...prev]);
    performReset();
  };

  const deleteTask = (taskId) => {
    setSavedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all task history?')) {
      setSavedTasks([]);
    }
  };

  const getTotalTime = () => {
    return savedTasks.reduce((total, task) => total + task.timeSpent, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Timer</h1>
          <p className="text-gray-600">Track your productivity with precision</p>
        </div>

        {/* Task Input */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Task Description
          </label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="What are you working on?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            disabled={isRunning}
          />
        </div>

        {/* Stopwatch Display */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          {currentTask && (
            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-800">Current Task</h3>
              </div>
              <p className="text-gray-700">{currentTask.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Started at {currentTask.startTime.toLocaleTimeString()}
              </p>
            </div>
          )}
          
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-8 tracking-wider">
              {formatTime(time)}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {!isRunning ? (
                <button
                  onClick={startStopwatch}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  Start Task
                </button>
              ) : (
                <button
                  onClick={pauseStopwatch}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
              )}
              
              <button
                onClick={resetStopwatch}
                className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <Square className="w-5 h-5" />
                Reset
              </button>
              
              {(currentTask && time > 0) && (
                <button
                  onClick={saveTask}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  Save Task
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmSave && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Save Progress?</h3>
              <p className="text-gray-600 mb-6">
                You have unsaved progress ({formatTime(time)}). Do you want to save this task before resetting?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={performReset}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Discard
                </button>
                <button
                  onClick={() => setShowConfirmSave(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Save & Reset
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Task History */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <List className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">Task History</h2>
              {savedTasks.length > 0 && (
                <span className="bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full">
                  {savedTasks.length} tasks
                </span>
              )}
            </div>
            {savedTasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {savedTasks.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                Total Time Tracked: <span className="font-mono text-indigo-600">{formatTime(getTotalTime())}</span>
              </p>
            </div>
          )}
          
          {savedTasks.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tasks saved yet</p>
              <p className="text-sm text-gray-400">Start tracking your first task above</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {savedTasks.map((task) => (
                <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 mb-1">{task.description}</h3>
                      <p className="text-sm text-gray-500">
                        {task.startTime.toLocaleDateString()} • {task.startTime.toLocaleTimeString()} - {task.endTime.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {formatTime(task.timeSpent)}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;