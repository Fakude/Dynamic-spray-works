import React from "react";
import { Cookie, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-heading font-black text-primary-foreground text-lg">
                  CS
                </span>
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-sm leading-tight">
                  Coating Solutions
                </p>
                <p className="text-[10px] text-muted-foreground tracking-wider">
                  (Pty) Ltd
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Professional airless spray painting services. Let us make your house a
              home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "Services", href: "#services" },
                { label: "About Us", href: "#about" },
                { label: "Service Areas", href: "#areas" },
                { label: "FAQs", href: "#faq" },
                { label: "Free Quote", href: "#quote" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-body text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+27676244130"
                className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +27 67 624 4130
              </a>
              <a
                href="https://wa.me/27676244130"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                WhatsApp quotation
              </a>
              <div className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                South Africa
              </div>
              <a
                href="https://www.tiktok.com/@coatingsolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                TikTok: @coatingsolutions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs font-body text-muted-foreground">
            &copy; {new Date().getFullYear()} Coating Solutions. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("dsw-open-cookie-settings"))}
            className="flex items-center gap-2 text-xs text-muted-foreground transition hover:text-primary"
          >
            <Cookie className="h-4 w-4" /> Privacy & cookie choices
          </button>
        </div>
      </div>
    </footer>
  );
}
