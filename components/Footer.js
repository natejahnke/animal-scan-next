import React from "react";
import { LogoGithub, LogoReact } from "react-ionicons";

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-gray-200 bg-slate-50">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex justify-center space-x-6 text-green-900">
            <a
              href="https://github.com/natejahnke/animal-scan-next"
              className="hover:text-[#3B71CA] transition-colors duration-300 flex items-center space-x-1"
            >
              <LogoGithub className="" />
              <span>Github</span>
            </a>
            <span className="flex space-x-1 text-gray-600">
              Built with
              <LogoReact className="w-4 h-4" />
              <span>
                Next.js, Tailwind CSS, OpenAI, and Azure Computer Vision
              </span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
