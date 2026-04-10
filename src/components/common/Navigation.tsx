import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { 
  LayoutDashboard, 
  FileText, 
  GraduationCap, 
  CreditCard, 
  MessageSquare, 
  HelpCircle,
  Users,
  Calendar,
  ClipboardList,
  BarChart3,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import './Navigation.css';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  children?: { path: string; label: string }[];
}

export default function Navigation() {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const studentNav: NavItem[] = [
    { path: '/student', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { 
      path: '/academic', 
      label: 'Academic', 
      icon: <FileText size={20} />,
      children: [
        { path: '/thesis', label: 'Thesis Submission' },
        { path: '/viva', label: 'Viva Schedule' },
        { path: '/progress', label: 'Progress Reports' },
      ]
    },
    { 
      path: '/financial', 
      label: 'Financial', 
      icon: <CreditCard size={20} />,
      children: [
        { path: '/fees', label: 'Fee Payment' },
        { path: '/receipts', label: 'Receipts' },
      ]
    },
    { 
      path: '/graduation', 
      label: 'Graduation', 
      icon: <GraduationCap size={20} />,
      children: [
        { path: '/application', label: 'Application' },
        { path: '/clearance', label: 'Clearance' },
      ]
    },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/help', label: 'Help', icon: <HelpCircle size={20} /> },
  ];

  const adminNav: NavItem[] = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/applications', label: 'Applications', icon: <ClipboardList size={20} /> },
    { path: '/admin/students', label: 'Students', icon: <Users size={20} /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { path: '/admin/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
  ];

  const supervisorNav: NavItem[] = [
    { path: '/supervisor', label: 'My Students', icon: <Users size={20} /> },
    { path: '/supervisor/meetings', label: 'Meetings', icon: <Calendar size={20} /> },
    { path: '/supervisor/reviews', label: 'Reviews', icon: <ClipboardList size={20} /> },
    { path: '/supervisor/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
  ];

  const navItems = user?.role === 'admin' ? adminNav : 
                   user?.role === 'supervisor' ? supervisorNav : 
                   studentNav;

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation */}
      <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-container">
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                {item.children ? (
                  <>
                    <button 
                      className="nav-link has-children"
                      onClick={() => toggleExpand(item.path)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      <ChevronDown 
                        size={16} 
                        className={`chevron ${expandedItems.includes(item.path) ? 'open' : ''}`}
                      />
                    </button>
                    {expandedItems.includes(item.path) && (
                      <ul className="submenu">
                        {item.children.map(child => (
                          <li key={child.path}>
                            <NavLink 
                              to={child.path}
                              className={({ isActive }) => 
                                isActive ? 'submenu-link active' : 'submenu-link'
                              }
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => 
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
