/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <div className="navbar bg-base-300" data-theme="emerald">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">Pet Companion</a>
      </div>
      <div className="flex-none">
        <a href="/">
          <button type="submit" className="btn btn-square btn-ghost">Pets</button>
        </a>
        <button type="submit" className="btn  btn-outline btn-accent sign-out" onClick={signOut}>Sign Out</button>
        {/* <button type="button" aria-label="Save" className="btn btn-square btn-ghost icon-save">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
        </button> */}
      </div>
    </div>

  // <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  // <Navbar.Collapse id="responsive-navbar-nav">
  //   <Nav className="me-auto">
  //     {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
  //     <Link passHref href="/">
  //       <Nav.Link>Pets</Nav.Link>
  //     </Link>
  //     <Button variant="danger" onClick={signOut}>Sign Out</Button>
  //   </Nav>
  // </Navbar.Collapse>
  );
}
