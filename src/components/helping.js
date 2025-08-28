import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Clock, MessageCircle, Send, Bot, User, LogOut, Sparkles, HelpCircle, Menu, X } from "lucide-react";

function Help() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        const userMessage = { text: input, sender: "user", timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        try {
            const response = await mockGeminiCall(input);
            const aiMessage = { text: response, sender: "ai", timestamp: new Date() };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { text: "Sorry, I couldn't process your request. Please try again.", sender: "ai", timestamp: new Date() };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const mockGeminiCall = async (query) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`I'm here to help you with your time tracking and productivity needs! You asked: "${query}". I can assist you with setting up time tracking workflows, productivity tips, analyzing your work patterns, and much more. How can I help you be more productive today?`);
            }, 1000);
        });
    };

    const suggestedQuestions = [
        "How can I track my time more effectively?",
        "What are some productivity tips?",
        "How do I analyze my work patterns?",
        "Help me set up time tracking workflows"
    ];

    const handleSuggestionClick = (question) => {
        setInput(question);
    };

    const menuItems = [
        { icon: Clock, label: 'Time Tracker', to: '/time', active: false },
        { icon: HelpCircle, label: 'Help & AI', to: '/Help', active: true },
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
                                <p className="text-sm font-medium text-gray-900">AI Assistant</p>
                                <p className="text-xs text-gray-500">Ready to help you!</p>
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
                                <Link
                                    key={index}
                                    to={item.to}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        item.active 
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

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
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">AI Productivity Assistant</h1>
                                    <p className="text-gray-600">Get intelligent help with time tracking and productivity</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Interface */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-white">AI Assistant</h2>
                                        <p className="text-blue-100 text-sm">Ready to help you be more productive</p>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Messages Container */}
                            <div className="h-96 overflow-y-auto p-6 bg-gray-50">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                                            <MessageCircle className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a conversation</h3>
                                        <p className="text-gray-500 mb-6">Ask me anything about productivity and time tracking</p>
                                        
                                        {/* Suggested Questions */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                                            {suggestedQuestions.map((question, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSuggestionClick(question)}
                                                    className="p-3 text-left bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm text-gray-700 hover:text-blue-700"
                                                >
                                                    <HelpCircle className="w-4 h-4 inline mr-2 text-gray-400" />
                                                    {question}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {messages.map((message, index) => (
                                            <div 
                                                key={index} 
                                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`flex items-start space-x-3 max-w-xs md:max-w-md lg:max-w-lg ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                    {/* Avatar */}
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' 
                                                        ? 'bg-blue-600' 
                                                        : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}>
                                                        {message.sender === 'user' ? 
                                                            <User className="w-4 h-4 text-white" /> : 
                                                            <Bot className="w-4 h-4 text-white" />
                                                        }
                                                    </div>
                                                    
                                                    {/* Message Bubble */}
                                                    <div className={`rounded-2xl px-4 py-3 ${message.sender === 'user' 
                                                        ? 'bg-blue-600 text-white rounded-br-md' 
                                                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'}`}>
                                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                                        <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                                            {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {/* Loading Indicator */}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                                        <Bot className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                                        <div className="flex space-x-2">
                                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>
                            
                            {/* Input Form */}
                            <div className="border-t border-gray-100 bg-white p-6">
                                <div className="flex space-x-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleSubmit(e);
                                                }
                                            }}
                                            placeholder="Type your question here..."
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                                        disabled={isLoading || !input.trim()}
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                        <span className="hidden sm:inline">{isLoading ? 'Sending...' : 'Send'}</span>
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Press Enter to send • AI responses are simulated for demo purposes
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

 export default Help;//git rm --cached .parcel-cache/data.mdb
// git rm --cached node_modules/@parcel/rust-win32-x64-msvc/parcel-node-bindings.win32-x64-msvc.node

// git lfs install
// git lfs track "*.mdb"  # Track .mdb files
// git lfs track "*.node" # Track .node files

// git add .gitattributes