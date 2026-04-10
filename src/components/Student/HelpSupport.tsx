import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNotification } from '../../context/NotificationContext';
import Header from '../common/Header';
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  MessageSquare,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users,
  CreditCard,
  GraduationCap
} from 'lucide-react';
import './HelpSupport.css';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface ContactMethod {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  action?: string;
  link?: string;
}

interface Guide {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'How do I submit my thesis?',
    answer: 'Navigate to Academic > Thesis Submission and follow the step-by-step workflow. You will need to upload your thesis document, get supervisor approval, pay the submission fee, and receive confirmation.',
    category: 'Academic'
  },
  {
    id: 2,
    question: 'What payment methods are accepted?',
    answer: 'We accept FPX online banking, credit/debit cards, and bank transfers. All payments are processed securely through our payment gateway.',
    category: 'Financial'
  },
  {
    id: 3,
    question: 'How can I request an extension?',
    answer: 'Go to Academic > Extensions and fill out the extension request form. Your supervisor must endorse your request before it is submitted to SGS for approval.',
    category: 'Academic'
  },
  {
    id: 4,
    question: 'When is the convocation ceremony?',
    answer: 'Convocation ceremonies are held twice a year, typically in April and October. Check the Graduation section for specific dates and registration deadlines.',
    category: 'Graduation'
  },
  {
    id: 5,
    question: 'How do I update my personal information?',
    answer: 'Click on your profile picture in the top right corner, select "My Profile," and edit your information. Changes to critical information may require verification.',
    category: 'Account'
  },
  {
    id: 6,
    question: 'What should I do if I forgot my password?',
    answer: 'Click on "Forgot password" on the login page and follow the instructions. A password reset link will be sent to your registered email address.',
    category: 'Account'
  },
];

const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    title: 'Phone Support',
    value: '+603-9769 1234',
    description: 'Monday - Friday, 8:30 AM - 5:00 PM',
    action: 'Call now',
    link: 'tel:+60397691234'
  },
  {
    icon: Mail,
    title: 'Email Support',
    value: 'sgsportal@upm.edu.my',
    description: 'Response within 24-48 hours',
    action: 'Send email',
    link: 'mailto:sgsportal@upm.edu.my'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'School of Graduate Studies',
    description: 'Administration Building, 1st Floor',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    value: '8:30 AM - 5:00 PM',
    description: 'Monday - Friday (Closed on weekends)',
  },
];

const guides: Guide[] = [
  {
    icon: BookOpen,
    title: 'Student Handbook',
    description: 'Complete guide for postgraduate students',
    link: '#'
  },
  {
    icon: FileText,
    title: 'Thesis Guidelines',
    description: 'Formatting and submission requirements',
    link: '#'
  },
  {
    icon: CreditCard,
    title: 'Fee Structure',
    description: 'Tuition and other fees information',
    link: '#'
  },
  {
    icon: GraduationCap,
    title: 'Graduation Requirements',
    description: 'Steps to complete your degree',
    link: '#'
  },
];

export default function HelpSupport() {
  const { user } = useUser();
  const { showNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    message: ''
  });

  const categories = ['All', 'Academic', 'Financial', 'Graduation', 'Account'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Support ticket submitted successfully!', 'success');
    setShowTicketForm(false);
    setTicketForm({ subject: '', category: '', message: '' });
  };

  const startLiveChat = () => {
    showNotification('Connecting to live chat...', 'info');
  };

  return (
    <div className="dashboard-layout">
      <Header />
      
      <main className="main-content">
        <div className="content-container">
          {/* Welcome */}
          <div className="welcome-section">
            <h1>Help & Support</h1>
            <p className="welcome-subtitle">Find answers or get in touch with our support team</p>
          </div>

          {/* Quick Actions */}
          <div className="support-quick-actions">
            <button className="quick-action-card" onClick={startLiveChat}>
              <div className="quick-action-icon chat">
                <MessageSquare size={28} />
              </div>
              <h3>Live Chat</h3>
              <p>Chat with our support team in real-time</p>
            </button>
            <button className="quick-action-card" onClick={() => setShowTicketForm(true)}>
              <div className="quick-action-icon ticket">
                <FileText size={28} />
              </div>
              <h3>Submit Ticket</h3>
              <p>Create a support ticket for complex issues</p>
            </button>
            <a href="#guides" className="quick-action-card">
              <div className="quick-action-icon guide">
                <BookOpen size={28} />
              </div>
              <h3>Guides</h3>
              <p>Browse our comprehensive documentation</p>
            </a>
          </div>

          {/* FAQ Section */}
          <div className="faq-section card">
            <div className="card-header">
              <h3>Frequently Asked Questions</h3>
            </div>
            <div className="faq-content">
              {/* Search and Filter */}
              <div className="faq-filters">
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search FAQs"
                  />
                </div>
                <div className="category-filters" role="tablist" aria-label="FAQ categories">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                      role="tab"
                      aria-selected={selectedCategory === cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ List */}
              <div className="faq-list" role="tabpanel">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq) => (
                    <div 
                      key={faq.id} 
                      className={`faq-item ${expandedFAQ === faq.id ? 'expanded' : ''}`}
                    >
                      <button 
                        className="faq-question"
                        onClick={() => toggleFAQ(faq.id)}
                        aria-expanded={expandedFAQ === faq.id}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <span className="faq-category-tag">{faq.category}</span>
                        <h4>{faq.question}</h4>
                        {expandedFAQ === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div 
                          id={`faq-answer-${faq.id}`} 
                          className="faq-answer"
                        >
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <AlertCircle size={48} />
                    <p>No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h2>Contact Us</h2>
            <div className="contact-grid">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">
                    <method.icon size={24} />
                  </div>
                  <h4>{method.title}</h4>
                  <p className="contact-value">{method.value}</p>
                  <p className="contact-description">{method.description}</p>
                  {method.link && (
                    <a 
                      href={method.link} 
                      className="contact-action"
                      target={method.link.startsWith('http') ? '_blank' : undefined}
                      rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {method.action}
                      {method.link.startsWith('http') && <ExternalLink size={14} />}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Guides Section */}
          <div id="guides" className="guides-section">
            <h2>Helpful Guides</h2>
            <div className="guides-grid">
              {guides.map((guide, index) => (
                <a key={index} href={guide.link} className="guide-card">
                  <div className="guide-icon">
                    <guide.icon size={24} />
                  </div>
                  <h4>{guide.title}</h4>
                  <p>{guide.description}</p>
                  <span className="guide-link">Read more <ExternalLink size={14} /></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Support Ticket Modal */}
      {showTicketForm && (
        <div 
          className="modal-overlay"
          onClick={() => setShowTicketForm(false)}
          role="presentation"
          aria-hidden="true"
        >
          <div 
            className="modal-content ticket-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
          >
            <div className="modal-header">
              <h2 id="ticket-modal-title">Submit Support Ticket</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowTicketForm(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitTicket} className="ticket-form">
              <div className="form-group">
                <label htmlFor="ticket-subject">Subject *</label>
                <input
                  type="text"
                  id="ticket-subject"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  required
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ticket-category">Category *</label>
                <select
                  id="ticket-category"
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="academic">Academic Issues</option>
                  <option value="technical">Technical Problems</option>
                  <option value="financial">Payment & Fees</option>
                  <option value="account">Account Access</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ticket-message">Message *</label>
                <textarea
                  id="ticket-message"
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                  required
                  rows={5}
                  placeholder="Describe your issue in detail..."
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowTicketForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
