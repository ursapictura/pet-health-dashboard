/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <div className="navbar bg-base-300" data-theme="emerald">
      <div className="flex-1">
        <a href="/"><img src="/logo.png" alt="logo" style={{ width: '100px', marginLeft: '15px', marginRight: '20px' }} /></a>
      </div>
      <div className="flex-none">
        <a href="/">
          <button type="submit" className="btn btn-ghost">View Pets</button>
        </a>
        <button type="submit" className="btn  btn-outline btn-accent sign-out" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
