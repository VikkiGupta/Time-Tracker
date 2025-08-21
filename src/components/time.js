import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, Square, Save, Trash2, List, HelpCircle, LogOut, Menu, X, Timer } from 'lucide-react';
import Stopwatch from './stop';

// Main Time Component
function Time() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const menuItems = [
    { icon: Clock, label: 'Time Tracker', to: '', active: true },
    { icon: HelpCircle, label: 'Help & AI', to: '/Help' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Menu Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">TimeTracker</span>
              </div>
            </div>
            
            {/* Right side - User info */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500">Ready to track your time?</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          
          <div className="flex flex-col h-full">
            <div className="flex-1 px-4 py-6 space-y-2">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 px-2">Dashboard</h2>
                <p className="text-sm text-gray-600 px-2">Manage your productivity</p>
              </div>
              
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.to}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
              <a
                href="/login"
                className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </a>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Tracker</h1>
              <p className="text-gray-600">Track your tasks and boost your productivity</p>
            </div>
            
            {/* Stopwatch Component */}
            <Stopwatch />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Time;