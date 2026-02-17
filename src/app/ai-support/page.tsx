"use client";

import React, { useState } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface Message {
    id: number;
    sender: 'user' | 'ai';
    text: string;
}

const AISupport: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'ai', text: "Hello! I'm NurtureBot. How are you feeling today? I can help with symptom checks, nutrition tips, or just a friendly chat." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        const userMessageObj: Message = { id: Date.now(), sender: 'user', text: userMessage };

        setMessages(prev => [...prev, userMessageObj]);
        setInput('');
        setIsLoading(true);

        try {
            // Build conversation history for context
            const conversationHistory = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));

            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: data.response
            }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-support-page container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                <h1 style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Sparkles /> Smart Support
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>24/7 AI Companion for your pregnancy questions.</p>
            </div>

            <Card padding="none" style={{ display: 'flex', flexDirection: 'column', height: '60vh', overflow: 'hidden' }}>
                {/* Chat Window */}
                <div style={{
                    flex: 1,
                    padding: '1.5rem',
                    overflowY: 'auto',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                display: 'flex',
                                gap: '0.5rem',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div style={{
                                width: '32px', height: '32px',
                                borderRadius: '50%',
                                backgroundColor: msg.sender === 'user' ? 'var(--secondary-color)' : 'var(--primary-color)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {msg.sender === 'user' ? <User size={16} color="white" /> : <Sparkles size={16} color="white" />}
                            </div>
                            <div style={{
                                backgroundColor: msg.sender === 'user' ? 'var(--primary-color)' : 'white',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-color)',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                borderBottomRightRadius: msg.sender === 'user' ? '4px' : 'var(--radius-lg)',
                                borderBottomLeftRadius: msg.sender === 'ai' ? '4px' : 'var(--radius-lg)'
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div style={{
                            alignSelf: 'flex-start',
                            maxWidth: '80%',
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                width: '32px', height: '32px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-color)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Sparkles size={16} color="white" />
                            </div>
                            <div style={{
                                backgroundColor: 'white',
                                color: 'var(--text-color)',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                borderBottomLeftRadius: '4px'
                            }}>
                                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                                    <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>●</span>
                                    <span style={{ animation: 'pulse 1.5s ease-in-out 0.2s infinite' }}>●</span>
                                    <span style={{ animation: 'pulse 1.5s ease-in-out 0.4s infinite' }}>●</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div style={{ padding: '1rem', backgroundColor: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "NurtureBot is thinking..." : "Ask anything..."}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '25px',
                            border: '1px solid #e0e0e0',
                            outline: 'none',
                            fontSize: '1rem',
                            opacity: isLoading ? 0.6 : 1,
                            cursor: isLoading ? 'not-allowed' : 'text'
                        }}
                    />
                    <Button
                        onClick={handleSend}
                        disabled={isLoading}
                        style={{
                            borderRadius: '50%',
                            padding: '0.75rem',
                            width: '48px',
                            height: '48px',
                            opacity: isLoading ? 0.6 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <Send size={20} />
                    </Button>
                </div>
            </Card>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#999', marginTop: '1rem' }}>
                AI Bot is a support tool and does not provide medical advice.
            </p>
        </div>
    );
};

export default AISupport;
