import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { MessageCircle, Heart, Share2 } from 'lucide-react';

const Community: React.FC = () => {
    const posts = [
        {
            id: 1,
            user: "Sarah M.",
            week: "Week 16",
            title: "Best pregnancy pillow recommendations?",
            content: "I'm starting to have trouble sleeping on my side. Any brands you swear by?",
            likes: 24,
            comments: 12
        },
        {
            id: 2,
            user: "Priya K.",
            week: "Week 20",
            title: "Feeling the first kicks!",
            content: "Just felt the baby move for the first time today. It feels like little bubbles popping!",
            likes: 156,
            comments: 43
        },
        {
            id: 3,
            user: "Medical Team",
            week: "Admin",
            title: "Live Q&A: Nutrition with Dr. Anjali",
            content: "Join us tomorrow at 5 PM for a live session on second-trimester nutrition.",
            likes: 89,
            comments: 5,
            isPinned: true
        }
    ];

    return (
        <div className="community-page container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                <h1 style={{ color: 'var(--secondary-color)' }}>Mom Community</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Connect, share, and grow with other expecting moms.</p>
                <Button style={{ marginTop: '1rem' }}>Start a Discussion</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {posts.map((post) => (
                    <Card key={post.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#666' }}>
                                    {post.user.charAt(0)}
                                </div>
                                <div>
                                    <span style={{ fontWeight: 600 }}>{post.user}</span>
                                    <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '0.5rem' }}>• {post.week}</span>
                                </div>
                            </div>
                            {post.isPinned && <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600 }}>Pinned</span>}
                        </div>

                        <h3 style={{ margin: '0.5rem 0' }}>{post.title}</h3>
                        <p style={{ color: '#444', lineHeight: 1.5 }}>{post.content}</p>

                        <div style={{ borderTop: '1px solid #eee', marginTop: '1rem', paddingTop: '1rem', display: 'flex', gap: '1.5rem', color: '#666' }}>
                            <button style={{ background: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center', color: 'inherit' }}><Heart size={18} /> {post.likes}</button>
                            <button style={{ background: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center', color: 'inherit' }}><MessageCircle size={18} /> {post.comments}</button>
                            <button style={{ background: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center', color: 'inherit', marginLeft: 'auto' }}><Share2 size={18} /></button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Community;
