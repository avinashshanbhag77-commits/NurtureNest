"use client";

import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { MessageCircle, Heart, Share2, Send, X, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

const Community: React.FC = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<any[]>([]);
    const [showPostModal, setShowPostModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/community/posts');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async () => {
        if (!newPost.title || !newPost.content) return;
        setLoading(true);
        try {
            const res = await fetch('/api/community/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });
            if (res.ok) {
                setShowPostModal(false);
                setNewPost({ title: '', content: '' });
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to create post', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this discussion?')) return;

        // Optimistic UI: remove from list immediately
        const originalPosts = [...posts];
        setPosts(posts.filter(p => (p._id || p.id) !== id));

        try {
            const res = await fetch(`/api/community/posts/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                // Rollback on error
                setPosts(originalPosts);
                alert('Failed to delete post');
            }
        } catch (error) {
            setPosts(originalPosts);
            console.error('Failed to delete post', error);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>Community</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Connect, share, and grow with other expecting moms.</p>
                <Button style={{ marginTop: '1rem' }} onClick={() => setShowPostModal(true)}>Start a Discussion</Button>
            </div>

            {/* Post Modal */}
            {showPostModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Start a Discussion</h3>
                            <button onClick={() => setShowPostModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                placeholder="Topic Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                            />
                            <textarea
                                placeholder="What's on your mind?"
                                rows={5}
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', resize: 'none' }}
                            />
                            <Button fullWidth onClick={handleCreatePost} disabled={loading}>
                                {loading ? 'Posting...' : 'Post to Community'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <AnimatePresence>
                    {posts.map((post) => (
                        <motion.div
                            key={post._id || post.id}
                            initial={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card style={{ padding: '1.5rem 2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#666' }}>
                                            {post.userName?.charAt(0) || post.user?.charAt(0) || '?'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <span style={{ fontWeight: 600 }}>{post.userName || post.user}</span>
                                                    <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '0.5rem' }}>• {post.userWeek || post.week}</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                    {post.isPinned && <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600 }}>Pinned</span>}
                                                    {session?.user?.name === (post.userName || post.user) && (
                                                        <button
                                                            onClick={() => handleDeletePost(post._id || post.id)}
                                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b', opacity: 0.7 }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3 style={{ margin: '0.5rem 0', paddingLeft: '0.5rem' }}>{post.title}</h3>
                                <p style={{ color: '#444', lineHeight: 1.5, paddingLeft: '0.5rem' }}>{post.content}</p>

                                <div style={{ borderTop: '1px solid #eee', marginTop: '1rem', paddingTop: '1rem', display: 'flex', gap: '1.5rem', color: '#666', paddingLeft: '0.5rem' }}>
                                    <button style={{ background: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center', color: 'inherit', border: 'none', cursor: 'pointer' }}>
                                        <Heart size={18} /> {post.likes}
                                    </button>
                                    <button style={{ background: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center', color: 'inherit', border: 'none', cursor: 'pointer' }}>
                                        <MessageCircle size={18} /> {post.comments?.length || 0}
                                    </button>
                                    <button style={{ background: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center', color: 'inherit', marginLeft: 'auto', border: 'none', cursor: 'pointer' }}>
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Community;
