import { Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-8 lg:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-ink-soft leading-relaxed">
              Connecting FUTA alumni and students through meaningful mentorship
              and professional development.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-xs bg-surface-2 hover:bg-indigo hover:text-white transition-colors flex items-center justify-center text-ink-soft"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-xs bg-surface-2 hover:bg-indigo hover:text-white transition-colors flex items-center justify-center text-ink-soft"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-xs bg-surface-2 hover:bg-indigo hover:text-white transition-colors flex items-center justify-center text-ink-soft"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-xs bg-surface-2 hover:bg-indigo hover:text-white transition-colors flex items-center justify-center text-ink-soft"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-ink mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#about"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#roles"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  Roles
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm text-ink mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  Student Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  Mentor Handbook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-ink-soft hover:text-ink transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm text-ink mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-ink-soft">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a
                  href="mailto:info@futaverse.com"
                  className="hover:text-ink transition-colors"
                >
                  info@futaverse.com
                </a>
              </li>
              <li className="text-sm text-ink-soft">
                Federal University of Technology, Akure
              </li>
              <li className="text-sm text-ink-soft">
                Ondo State, Nigeria
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-faint text-center md:text-left">
            &copy; {new Date().getFullYear()} FUTAVerse. All rights reserved. Powered
            by FUTA Alumni Network.
          </p>
          <div className="flex gap-5 text-xs">
            <a
              href="#"
              className="text-ink-faint hover:text-ink transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-ink-faint hover:text-ink transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-ink-faint hover:text-ink transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
