import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNotification } from '../../context/NotificationContext';
import Header from '../common/Header';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  ChevronLeft,
  CheckCheck,
  Clock
} from 'lucide-react';
import './Messages.css';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  { id: 1, name: 'Dr. Ahmad Hassan', role: 'Supervisor', avatar: 'AH', lastMessage: 'Please submit your draft by Friday', timestamp: '10:30 AM', unread: 2, online: true },
  { id: 2, name: 'SGS Helpdesk', role: 'Admin', avatar: 'SG', lastMessage: 'Your payment has been confirmed', timestamp: 'Yesterday', unread: 0, online: true },
  { id: 3, name: 'Nurul Ain', role: 'Student', avatar: 'NA', lastMessage: 'Thanks for the notes!', timestamp: 'Yesterday', unread: 0, online: false },
  { id: 4, name: 'Prof. Mohd Faizal', role: 'Examiner', avatar: 'MF', lastMessage: 'Viva scheduled for next week', timestamp: 'Mon', unread: 1, online: false },
  { id: 5, name: 'Library Services', role: 'Support', avatar: 'LS', lastMessage: 'Your book reservation is ready', timestamp: 'Apr 5', unread: 0, online: true },
];

const messagesData: Record<number, Message[]> = {
  1: [
    { id: 1, sender: 'Dr. Ahmad Hassan', content: 'Hi, how is your thesis progress going?', timestamp: '10:00 AM', isMe: false, status: 'read' },
    { id: 2, sender: 'Me', content: 'Going well, Dr. I\'m working on Chapter 4 now.', timestamp: '10:05 AM', isMe: true, status: 'read' },
    { id: 3, sender: 'Dr. Ahmad Hassan', content: 'Great! Please submit your draft by Friday so I can review it over the weekend.', timestamp: '10:30 AM', isMe: false, status: 'delivered' },
  ],
  2: [
    { id: 1, sender: 'SGS Helpdesk', content: 'We have received your payment of RM 850.00', timestamp: 'Yesterday', isMe: false, status: 'read' },
    { id: 2, sender: 'Me', content: 'Thank you for the confirmation', timestamp: 'Yesterday', isMe: true, status: 'read' },
  ],
};

export default function Messages() {
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const selectedConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = selectedChat ? messagesData[selectedChat] || [] : [];

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    
    showNotification('Message sent', 'success');
    setMessageInput('');
  };

  const handleChatSelect = (id: number) => {
    setSelectedChat(id);
    setMobileView('chat');
  };

  const handleBackToList = () => {
    setMobileView('list');
    setSelectedChat(null);
  };

  return (
    <div className="dashboard-layout messages-layout">
      <Header />
      
      <main className="main-content messages-main">
        <div className="content-container messages-container">
          {/* Welcome */}
          <div className="welcome-section">
            <h1>Messages</h1>
            <p className="welcome-subtitle">Communicate with supervisors, staff, and peers</p>
          </div>

          {/* Messages Interface */}
          <div className="messages-interface">
            {/* Conversation List */}
            <div className={`conversation-list ${mobileView === 'chat' ? 'mobile-hidden' : ''}`}>
              <div className="conversation-header">
                <h2>Conversations</h2>
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="conversations" role="list" aria-label="Conversation list">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={`conversation-item ${selectedChat === conv.id ? 'active' : ''} ${conv.unread > 0 ? 'unread' : ''}`}
                    onClick={() => handleChatSelect(conv.id)}
                    role="listitem"
                    aria-label={`Conversation with ${conv.name}, ${conv.role}. ${conv.unread > 0 ? `${conv.unread} unread messages` : 'No unread messages'}`}
                    aria-current={selectedChat === conv.id ? 'true' : undefined}
                  >
                    <div className="conversation-avatar">
                      <span>{conv.avatar}</span>
                      {conv.online && <span className="online-indicator" aria-label="Online" />}
                    </div>
                    <div className="conversation-info">
                      <div className="conversation-top">
                        <h3>{conv.name}</h3>
                        <span className="timestamp">{conv.timestamp}</span>
                      </div>
                      <div className="conversation-bottom">
                        <p className="role">{conv.role}</p>
                        <p className="last-message">{conv.lastMessage}</p>
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <span className="unread-badge" aria-label={`${conv.unread} unread`}>{conv.unread}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`chat-area ${mobileView === 'list' ? 'mobile-hidden' : ''}`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="chat-header">
                    <button 
                      className="back-btn mobile-only" 
                      onClick={handleBackToList}
                      aria-label="Back to conversation list"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <div className="chat-header-info">
                      <div className="chat-avatar">
                        <span>{selectedConversation.avatar}</span>
                        {selectedConversation.online && <span className="online-indicator" />}
                      </div>
                      <div className="chat-header-text">
                        <h3>{selectedConversation.name}</h3>
                        <p className="chat-status">
                          {selectedConversation.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="chat-actions">
                      <button aria-label="Voice call"><Phone size={20} /></button>
                      <button aria-label="Video call"><Video size={20} /></button>
                      <button aria-label="More options"><MoreVertical size={20} /></button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="messages-list" role="log" aria-live="polite" aria-label="Message history">
                    {currentMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`message ${msg.isMe ? 'sent' : 'received'}`}
                        role="article"
                        aria-label={`Message from ${msg.sender} at ${msg.timestamp}`}
                      >
                        <div className="message-content">
                          <p>{msg.content}</p>
                          <div className="message-meta">
                            <span className="message-time">{msg.timestamp}</span>
                            {msg.isMe && (
                              <span className="message-status" aria-label={`Status: ${msg.status}`}>
                                {msg.status === 'read' ? <CheckCheck size={14} /> : <Clock size={14} />}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="chat-input-area">
                    <button className="attach-btn" aria-label="Attach file">
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="text"
                      className="message-input"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      aria-label="Message input"
                    />
                    <button 
                      className="send-btn" 
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-chat-selected">
                  <div className="no-chat-icon">
                    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <h3>Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
