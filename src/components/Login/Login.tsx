import { useState, useRef } from 'react';
import { useAuthStore } from './Store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // State for storing token

  const authRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/logsystem/login", { email, password });
      const receivedToken = response.data; // Assuming token is in response.data
      const decodedToken = jwtDecode(receivedToken);
      const currentTime = Date.now() / 1000;
      const expiry = (decodedToken as any)?.exp ?? 0;

      setToken(receivedToken); // Set the token in state for display
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token).then(() => {
        alert('Token copied to clipboard!');
        navigate("/dashboard"); // Navigate to the dashboard after copying
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center gap-4">
      <div
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
        style={{ backgroundImage: `url('https://bnbhomestay.in/assets/top_backgroud.avif')` }}
      >
        <div ref={authRef} className="bg-white p-6 rounded-md w-full max-w-md">
          <div className="flex justify-center">
            <img
              src="https://message-attachments.s3.amazonaws.com/2856927dfe56406a91bbdfaa086d74c9.png"
              alt=""
            />
          </div>

          <form onSubmit={handleSignIn} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white"
                style={{ backgroundColor: '#191430' }}
              >
                Get started
              </button>
            </div>
          </form>

          {token && (
            <div className="mt-4">
              <label className="text-base font-medium text-gray-900">Your Token</label>
              <input
                type="text"
                value={token}
                readOnly
                onClick={handleCopyToken}
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm text-gray-700 bg-gray-100 cursor-pointer focus:outline-none"
                title="Click to copy token"
              />
              <p className="text-sm text-gray-500 mt-1">Click to copy your token</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
