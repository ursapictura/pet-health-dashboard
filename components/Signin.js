/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '100vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <img src="/logo.png" alt="logo" />

      <button type="submit" className="btn btn-outline btn-primary sign-in" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
