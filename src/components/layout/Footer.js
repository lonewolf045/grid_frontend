import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../logo.png';

/**
 * Footer component with proper links and information
 * Provides site navigation, company info, and legal links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-link" aria-label="Bhanumati ka Pitara - Home">
              <img 
                src={logo} 
                alt="Bhanumati ka Pitara Logo" 
                className="footer-logo"
              />
              <span className="footer-brand-text">
                Bhanumati ka Pitara
              </span>
            </Link>
            <p className="footer-brand-description">
              Your trusted online grocery store, bringing fresh products and convenience to your doorstep.
            </p>
            <div className="footer-social">
              <a 
                href="https://facebook.com" 
                className="footer-social-link"
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="footer-social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                className="footer-social-link"
                aria-label="Follow us on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="footer-social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                className="footer-social-link"
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="footer-social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav">
            <div className="footer-nav-section">
              <h3 className="footer-nav-title">Shop</h3>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/products" className="footer-nav-link">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer-nav-link">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="footer-nav-link">
                    Deals & Offers
                  </Link>
                </li>
                <li>
                  <Link to="/new-arrivals" className="footer-nav-link">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-section">
              <h3 className="footer-nav-title">Account</h3>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/login" className="footer-nav-link">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="footer-nav-link">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="footer-nav-link">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link to="/smart-bag" className="footer-nav-link">
                    Smart Bag
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-section">
              <h3 className="footer-nav-title">Support</h3>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/help" className="footer-nav-link">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-nav-link">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="footer-nav-link">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="footer-nav-link">
                    Returns & Refunds
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-nav-section">
              <h3 className="footer-nav-title">Company</h3>
              <ul className="footer-nav-list">
                <li>
                  <Link to="/about" className="footer-nav-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="footer-nav-link">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="footer-nav-link">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="footer-nav-link">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-newsletter">
            <h3 className="footer-newsletter-title">Stay Updated</h3>
            <p className="footer-newsletter-description">
              Subscribe to our newsletter for the latest deals and updates.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="footer-newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer-newsletter-input"
                  aria-label="Email address for newsletter"
                  required
                />
                <button 
                  type="submit" 
                  className="footer-newsletter-button"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="footer-newsletter-disclaimer">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <p className="footer-copyright">
                © {currentYear} Bhanumati ka Pitara. All rights reserved.
              </p>
              <div className="footer-legal-links">
                <Link to="/privacy" className="footer-legal-link">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="footer-legal-link">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="footer-legal-link">
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="footer-payment">
              <span className="footer-payment-text">We accept:</span>
              <div className="footer-payment-methods">
                <div className="footer-payment-method" aria-label="Visa">
                  <svg viewBox="0 0 40 24" className="footer-payment-icon">
                    <rect width="40" height="24" rx="4" fill="#1a1f71"/>
                    <text x="20" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">VISA</text>
                  </svg>
                </div>
                <div className="footer-payment-method" aria-label="Mastercard">
                  <svg viewBox="0 0 40 24" className="footer-payment-icon">
                    <rect width="40" height="24" rx="4" fill="#eb001b"/>
                    <circle cx="15" cy="12" r="7" fill="#ff5f00"/>
                    <circle cx="25" cy="12" r="7" fill="#f79e1b"/>
                  </svg>
                </div>
                <div className="footer-payment-method" aria-label="PayPal">
                  <svg viewBox="0 0 40 24" className="footer-payment-icon">
                    <rect width="40" height="24" rx="4" fill="#003087"/>
                    <text x="20" y="16" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PayPal</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;