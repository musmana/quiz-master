import React from 'react';
import { Navbar } from './Navbar';
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2026 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>);

}