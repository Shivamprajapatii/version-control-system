import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl shadow-md border border-white border-opacity-30 py-12 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {/* About Section */}
        <div>
          <h4 className="text-2xl font-semibold text-gray-800 mb-3">About Us</h4>
          <p className="text-gray-600 leading-relaxed">
            We empower developers worldwide with intuitive tools and vibrant communities to build, share, and collaborate on cutting-edge projects.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-2xl font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-700 hover:text-blue-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/explore" className="text-gray-700 hover:text-blue-500 transition">
                Explore Repositories
              </a>
            </li>
            <li>
              <a href="/create" className="text-gray-700 hover:text-blue-500 transition">
                Create Repo
              </a>
            </li>
            <li>
              <a href="/profile" className="text-gray-700 hover:text-blue-500 transition">
                Your Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h4 className="text-2xl font-semibold text-gray-800 mb-3">Stay Connected</h4>
          <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 p-3 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social & Logo */}
        <div className="flex flex-col items-start">
          <h4 className="text-2xl font-semibold text-gray-800 mb-3">Follow Us</h4>
          <div className="flex items-center space-x-4 mb-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
              <Github size={24} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Twitter size={24} />
            </a>
            <a href="mailto:support@shivam.com" className="hover:text-red-500">
              <Mail size={24} />
            </a>
          </div>
          <img
            src="/assets/logo-footer.svg"
            alt="Logo"
            className="w-24 opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 border-t border-white border-opacity-30 pt-6 text-center px-6">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} GitHubClone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;