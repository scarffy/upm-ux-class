import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useNotification } from "../../context/NotificationContext";
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Shield,
  Lock,
  LayoutDashboard,
  BookOpen,
  Wallet,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  ClipboardList,
  Users,
  Calendar,
  FileText,
  BarChart3,
} from "lucide-react";
import UPMLogo from "./UPMLogo";
import "./Header.css";

export default function Header() {
  const { user, logout } = useUser();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAcademicMenu, setShowAcademicMenu] = useState(false);
  const [showFinancialMenu, setShowFinancialMenu] = useState(false);
  const [showGraduationMenu, setShowGraduationMenu] = useState(false);

  // Refs for focus management
  const notificationBtnRef = React.useRef<HTMLButtonElement>(null);
  const profileBtnRef = React.useRef<HTMLButtonElement>(null);

  // Refs for menu timeout (prevent premature closing)
  const academicTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const financialTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const graduationTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Refs for detecting clicks outside dropdowns
  const notificationsWrapperRef = React.useRef<HTMLDivElement>(null);
  const profileWrapperRef = React.useRef<HTMLDivElement>(null);

  const MENU_CLOSE_DELAY = 150; // ms delay before closing menu

  const handleMenuEnter = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setter(true);
  };

  const handleMenuLeave = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  ) => {
    timeoutRef.current = setTimeout(() => {
      setter(false);
    }, MENU_CLOSE_DELAY);
  };

  const handleLogout = () => {
    logout();
    showNotification("Logged out successfully", "info");
    navigate("/");
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close notifications if clicked outside
      if (
        showNotifications &&
        notificationsWrapperRef.current &&
        !notificationsWrapperRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }

      // Close profile if clicked outside
      if (
        showProfile &&
        profileWrapperRef.current &&
        !profileWrapperRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, showProfile]);

  const notifications = [
    {
      id: 1,
      title: "Thesis deadline approaching",
      time: "2 days remaining",
      urgent: true,
    },
    {
      id: 2,
      title: "Payment confirmed",
      time: "Today, 10:30 AM",
      urgent: false,
    },
    { id: 3, title: "Supervisor commented", time: "Yesterday", urgent: false },
  ];

  return (
    <header className={`main-header role-${user?.role || "guest"}`}>
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <UPMLogo size={48} className="upm-logo" />
            <div className="header-title-group">
              <span className={`header-title role-${user?.role || "guest"}`}>
                {user?.role === "student" && "Graduate Portal"}
                {user?.role === "admin" && "Admin Portal"}
                {user?.role === "supervisor" && "Supervisor Portal"}
                {!user && "Student Portal"}
              </span>
              <span className="header-motto">Berilmu untuk Kemanusiaan</span>
              {user && (
                <span className="header-role-badge">
                  {user?.role === "student" && "Student Access"}
                  {user?.role === "admin" && "Administrator"}
                  {user?.role === "supervisor" && "Supervisor"}
                </span>
              )}
            </div>
          </div>

          {/* Role-specific quick info */}
          {user?.role === "admin" && (
            <div className="role-quick-info admin-info">
              <span className="quick-stat">
                <span className="quick-stat-value">127</span>
                <span className="quick-stat-label">Pending</span>
              </span>
              <span className="quick-stat">
                <span className="quick-stat-value">2,845</span>
                <span className="quick-stat-label">Students</span>
              </span>
            </div>
          )}
          {user?.role === "supervisor" && (
            <div className="role-quick-info supervisor-info">
              <span className="quick-stat">
                <span className="quick-stat-value">8</span>
                <span className="quick-stat-label">My Students</span>
              </span>
              <span className="quick-stat">
                <span className="quick-stat-value">3</span>
                <span className="quick-stat-label">To Review</span>
              </span>
            </div>
          )}
          {user?.role === "student" && (
            <div className="role-quick-info student-info">
              <span className="quick-stat">
                <span className="quick-stat-value">Year 3</span>
                <span className="quick-stat-label">PhD CS</span>
              </span>
              <span className="quick-stat">
                <span className="quick-stat-value">75%</span>
                <span className="quick-stat-label">Progress</span>
              </span>
            </div>
          )}
        </div>

        <div className="header-right">
          {/* Search - Hidden for admin, shown for others */}
          {user?.role !== "admin" && (
            <div className="header-search">
              <Search size={18} className="search-icon" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search portal"
                id="header-search"
              />
            </div>
          )}

          {/* Admin quick actions */}
          {user?.role === "admin" && (
            <div className="admin-quick-actions">
              <button className="btn-quick-action">
                <FileText size={18} />
                <span>Applications</span>
              </button>
              <button className="btn-quick-action">
                <Users size={18} />
                <span>Students</span>
              </button>
            </div>
          )}

          {/* Notifications */}
          <div className="notifications-wrapper" ref={notificationsWrapperRef}>
            <button
              ref={notificationBtnRef}
              className="icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifications, ${notifications.length} unread`}
              aria-expanded={showNotifications}
              aria-haspopup="true"
              aria-controls="notifications-dropdown"
            >
              <Bell size={20} aria-hidden="true" />
              <span className="badge" aria-hidden="true">
                3
              </span>
            </button>

            {showNotifications && (
              <div
                id="notifications-dropdown"
                className="dropdown notifications-dropdown"
                role="region"
                aria-label="Notifications panel"
              >
                <div className="dropdown-header">
                  <h3 id="notifications-heading">Notifications</h3>
                  <button
                    className="text-btn"
                    aria-label="Mark all notifications as read"
                  >
                    Mark all read
                  </button>
                </div>
                <div
                  className="notification-list"
                  role="list"
                  aria-labelledby="notifications-heading"
                >
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`notification-item ${n.urgent ? "urgent" : ""}`}
                      role="listitem"
                      tabIndex={0}
                      aria-label={`${n.urgent ? "Urgent: " : ""}${n.title}, ${n.time}`}
                    >
                      <div
                        className={`notification-icon ${n.urgent ? "bg-red-100" : "bg-blue-100"}`}
                        aria-hidden="true"
                      >
                        {n.urgent ? <Shield size={16} /> : <Bell size={16} />}
                      </div>
                      <div className="notification-content">
                        <p className="title">{n.title}</p>
                        <p className="time">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#"
                  className="view-all"
                  aria-label="View all notifications"
                >
                  View all notifications
                </a>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="profile-wrapper" ref={profileWrapperRef}>
            <button
              ref={profileBtnRef}
              className="profile-btn"
              onClick={() => setShowProfile(!showProfile)}
              aria-label={`User menu for ${user?.name || "User"}`}
              aria-expanded={showProfile}
              aria-haspopup="true"
              aria-controls="profile-dropdown"
            >
              <div className="avatar" aria-hidden="true">
                {user?.avatar || "U"}
              </div>
              <span className="name">
                {user?.name?.split(" ")[0] || "User"}
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>

            {showProfile && (
              <div
                id="profile-dropdown"
                className="dropdown profile-dropdown"
                role="menu"
                aria-label="User profile menu"
              >
                <div className="profile-header">
                  <div className="avatar large">{user?.avatar || "U"}</div>
                  <div className="info">
                    <p className="full-name">{user?.name}</p>
                    <p className="id">{user?.id}</p>
                    {user?.program && (
                      <span className="role">{user.program}</span>
                    )}
                  </div>
                </div>
                <div className="menu-items" role="none">
                  <button className="menu-item" role="menuitem">
                    <User size={16} aria-hidden="true" />
                    My Profile
                  </button>
                  <button className="menu-item" role="menuitem">
                    <Settings size={16} aria-hidden="true" />
                    Settings
                  </button>
                  <div className="divider" role="separator"></div>
                  <button
                    className="menu-item logout"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    <LogOut size={16} aria-hidden="true" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust badges for login page */}
      {!user && (
        <div
          className="trust-badges"
          role="complementary"
          aria-label="Security information"
        >
          <div className="badge">
            <Lock size={14} aria-hidden="true" />
            <span>Secure SSL</span>
          </div>
          <div className="badge">
            <Shield size={14} aria-hidden="true" />
            <span>Encrypted</span>
          </div>
        </div>
      )}

      {/* Navigation - Only show when logged in */}
      {user && (
        <nav className="main-nav" aria-label="Main navigation">
          <div className="nav-container">
            <ul className="nav-menu" role="menubar">
              {/* Admin Navigation */}
              {user?.role === "admin" && (
                <>
                  <li
                    className={`nav-item ${location.pathname === "/admin" ? "active" : ""}`}
                    role="none"
                  >
                    <Link
                      to="/admin"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/admin" ? "page" : undefined
                      }
                    >
                      <LayoutDashboard size={20} aria-hidden="true" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="none">
                    <Link
                      to="/admin/applications"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/admin/applications"
                          ? "page"
                          : undefined
                      }
                    >
                      <FileText size={20} aria-hidden="true" />
                      <span>Applications</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="none">
                    <Link
                      to="/admin/students"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/admin/students"
                          ? "page"
                          : undefined
                      }
                    >
                      <Users size={20} aria-hidden="true" />
                      <span>Students</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="none">
                    <Link
                      to="/admin/reports"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/admin/reports"
                          ? "page"
                          : undefined
                      }
                    >
                      <BarChart3 size={20} aria-hidden="true" />
                      <span>Reports</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="none">
                    <Link
                      to="/messages"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/messages" ? "page" : undefined
                      }
                    >
                      <MessageSquare size={20} aria-hidden="true" />
                      <span>Messages</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="none">
                    <Link
                      to="/support"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/support" ? "page" : undefined
                      }
                    >
                      <HelpCircle size={20} aria-hidden="true" />
                      <span>Help &amp; Support</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Supervisor Navigation */}
              {user?.role === "supervisor" && (
                <>
                  <li
                    className={`nav-item ${location.pathname === "/supervisor" ? "active" : ""}`}
                    role="none"
                  >
                    <Link
                      to="/supervisor"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/supervisor" ? "page" : undefined
                      }
                    >
                      <LayoutDashboard size={20} aria-hidden="true" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${location.pathname === "/supervisor/reviews" ? "active" : ""}`}
                    role="none"
                  >
                    <Link
                      to="/supervisor/reviews"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/supervisor/reviews"
                          ? "page"
                          : undefined
                      }
                    >
                      <ClipboardList size={20} aria-hidden="true" />
                      <span>Reviews</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="none">
                    <Link
                      to="/messages"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/messages" ? "page" : undefined
                      }
                    >
                      <MessageSquare size={20} aria-hidden="true" />
                      <span>Messages</span>
                    </Link>
                  </li>
                  <li className="nav-item" role="none">
                    <Link
                      to="/support"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/support" ? "page" : undefined
                      }
                    >
                      <HelpCircle size={20} aria-hidden="true" />
                      <span>Help &amp; Support</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Student Navigation */}
              {user?.role === "student" && (
                <>
                  <li
                    className={`nav-item ${location.pathname === "/student" ? "active" : ""}`}
                    role="none"
                  >
                    <Link
                      to="/student"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/student" ? "page" : undefined
                      }
                    >
                      <LayoutDashboard size={20} aria-hidden="true" />
                      <span>Dashboard</span>
                    </Link>
                  </li>

                  <li
                    className={`nav-item has-dropdown ${location.pathname.includes("/student/academic") || location.pathname.includes("/student/thesis") || location.pathname.includes("/student/viva") || location.pathname.includes("/student/progress") ? "active" : ""}`}
                    onMouseEnter={() =>
                      handleMenuEnter(setShowAcademicMenu, academicTimeoutRef)
                    }
                    onMouseLeave={() =>
                      handleMenuLeave(setShowAcademicMenu, academicTimeoutRef)
                    }
                    role="none"
                  >
                    <Link
                      to="/student/academic"
                      className="nav-link"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={showAcademicMenu}
                      aria-current={
                        location.pathname.includes("/student/academic")
                          ? "page"
                          : undefined
                      }
                    >
                      <BookOpen size={20} aria-hidden="true" />
                      <span>Academic</span>
                      <ChevronDown
                        size={16}
                        className={`nav-arrow ${showAcademicMenu ? "open" : ""}`}
                        aria-hidden="true"
                      />
                    </Link>
                    {showAcademicMenu && (
                      <ul
                        className="nav-submenu"
                        role="menu"
                        aria-label="Academic submenu"
                        onMouseEnter={() =>
                          handleMenuEnter(
                            setShowAcademicMenu,
                            academicTimeoutRef,
                          )
                        }
                        onMouseLeave={() =>
                          handleMenuLeave(
                            setShowAcademicMenu,
                            academicTimeoutRef,
                          )
                        }
                      >
                        <li role="none">
                          <Link to="/student/thesis" role="menuitem">
                            Thesis Submission
                          </Link>
                        </li>
                        <li role="none">
                          <Link to="/student/viva" role="menuitem">
                            Viva Schedule
                          </Link>
                        </li>
                        <li role="none">
                          <Link to="/student/progress" role="menuitem">
                            Progress Reports
                          </Link>
                        </li>
                        <li role="none">
                          <Link
                            to="/student/academic#extensions"
                            role="menuitem"
                          >
                            Extensions
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li
                    className={`nav-item has-dropdown ${location.pathname === "/student/financial" ? "active" : ""}`}
                    onMouseEnter={() =>
                      handleMenuEnter(setShowFinancialMenu, financialTimeoutRef)
                    }
                    onMouseLeave={() =>
                      handleMenuLeave(setShowFinancialMenu, financialTimeoutRef)
                    }
                    role="none"
                  >
                    <Link
                      to="/student/financial"
                      className="nav-link"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={showFinancialMenu}
                      aria-current={
                        location.pathname === "/student/financial"
                          ? "page"
                          : undefined
                      }
                    >
                      <Wallet size={20} aria-hidden="true" />
                      <span>Financial</span>
                      <ChevronDown
                        size={16}
                        className={`nav-arrow ${showFinancialMenu ? "open" : ""}`}
                        aria-hidden="true"
                      />
                    </Link>
                    {showFinancialMenu && (
                      <ul
                        className="nav-submenu"
                        role="menu"
                        aria-label="Financial submenu"
                        onMouseEnter={() =>
                          handleMenuEnter(
                            setShowFinancialMenu,
                            financialTimeoutRef,
                          )
                        }
                        onMouseLeave={() =>
                          handleMenuLeave(
                            setShowFinancialMenu,
                            financialTimeoutRef,
                          )
                        }
                      >
                        <li role="none">
                          <Link to="/student/financial#fees" role="menuitem">
                            Fee Payment
                          </Link>
                        </li>
                        <li role="none">
                          <Link
                            to="/student/financial#receipts"
                            role="menuitem"
                          >
                            Receipts
                          </Link>
                        </li>
                        <li role="none">
                          <Link
                            to="/student/financial#scholarships"
                            role="menuitem"
                          >
                            Scholarships
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li
                    className={`nav-item has-dropdown ${location.pathname === "/student/graduation" ? "active" : ""}`}
                    onMouseEnter={() =>
                      handleMenuEnter(
                        setShowGraduationMenu,
                        graduationTimeoutRef,
                      )
                    }
                    onMouseLeave={() =>
                      handleMenuLeave(
                        setShowGraduationMenu,
                        graduationTimeoutRef,
                      )
                    }
                    role="none"
                  >
                    <Link
                      to="/student/graduation"
                      className="nav-link"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={showGraduationMenu}
                      aria-current={
                        location.pathname === "/student/graduation"
                          ? "page"
                          : undefined
                      }
                    >
                      <GraduationCap size={20} aria-hidden="true" />
                      <span>Graduation</span>
                      <ChevronDown
                        size={16}
                        className={`nav-arrow ${showGraduationMenu ? "open" : ""}`}
                        aria-hidden="true"
                      />
                    </Link>
                    {showGraduationMenu && (
                      <ul
                        className="nav-submenu"
                        role="menu"
                        aria-label="Graduation submenu"
                        onMouseEnter={() =>
                          handleMenuEnter(
                            setShowGraduationMenu,
                            graduationTimeoutRef,
                          )
                        }
                        onMouseLeave={() =>
                          handleMenuLeave(
                            setShowGraduationMenu,
                            graduationTimeoutRef,
                          )
                        }
                      >
                        <li role="none">
                          <Link
                            to="/student/graduation#application"
                            role="menuitem"
                          >
                            Graduation Application
                          </Link>
                        </li>
                        <li role="none">
                          <Link
                            to="/student/graduation#clearance"
                            role="menuitem"
                          >
                            Clearance
                          </Link>
                        </li>
                        <li role="none">
                          <Link
                            to="/student/graduation#convocation"
                            role="menuitem"
                          >
                            Convocation
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="nav-item" role="none">
                    <Link
                      to="/messages"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/messages" ? "page" : undefined
                      }
                    >
                      <MessageSquare size={20} aria-hidden="true" />
                      <span>Messages</span>
                    </Link>
                  </li>

                  <li className="nav-item" role="none">
                    <Link
                      to="/support"
                      className="nav-link"
                      role="menuitem"
                      aria-current={
                        location.pathname === "/support" ? "page" : undefined
                      }
                    >
                      <HelpCircle size={20} aria-hidden="true" />
                      <span>Help &amp; Support</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
