import React, { useState } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const AISupport: React.FC = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello! I'm NurtureBot. How are you feeling today? I can help with symptom checks, nutrition tips, or just a friendly chat." }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages([...messages, { id: Date.now(), sender: 'user', text: input }]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: "That sounds important. While I can offer general guidance, always consult your doctor for medical concerns. Would you like some tips on safe remedies for common symptoms?"
            }]);
        }, 1000);
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
                </div>

                {/* Input Area */}
                <div style={{ padding: '1rem', backgroundColor: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '25px',
                            border: '1px solid #e0e0e0',
                            outline: 'none',
                            fontSize: '1rem'
                        }}
                    />
                    <Button onClick={handleSend} style={{ borderRadius: '50%', padding: '0.75rem', width: '48px', height: '48px' }}>
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
