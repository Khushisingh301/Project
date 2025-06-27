import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  ArrowUpRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Company */}
          <div>
            <img
              src="images.svg"
              alt="Heineken Logo"
              className="w-28 mb-4"
            />
            <p className="text-sm text-slate-400">
              Brewing quality, consistency, and sustainability into every collaboration.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/company" className="hover:text-white transition">Company</a></li>
              <li><a href="/leadership" className="hover:text-white transition">Leadership</a></li>
              <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="/sustainability" className="hover:text-white transition">Sustainability</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/workflow" className="hover:text-white transition">Workflow</a></li>
              <li><a href="/collaboration" className="hover:text-white transition">Collaboration</a></li>
              <li><a href="/projects" className="hover:text-white transition">Project Management</a></li>
              <li><a href="/integrations" className="hover:text-white transition">Integrations</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/support" className="hover:text-white transition">Support</a></li>
              <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
              <li><a href="/api" className="hover:text-white transition">API Docs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@heineken.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +1 (800) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Amsterdam, Netherlands
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Heineken & Adobe Workfront. All rights reserved.
          </p>

          {/* Logos and Socials */}
          <div className="flex items-center gap-3">
            <img
    src="image6.png" // Replace with the actual image path
    alt="Adobe Workfront Logo"
    className="h-8"
  />
  <span className="text-sm font-semibold text-slate-300">
    Adobe Workfront
  </span>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={20} className="hover:text-white transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} className="hover:text-white transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} className="hover:text-white transition" />
              </a>
              <a href="https://heineken.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
                <Globe size={20} className="hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
