import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from './Store';
import { z } from 'zod';
import { credentialsSchema } from './Validation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [login,setLogin]=useState({email:"",password:""})

  const authRef = useRef<HTMLDivElement | null>(null);
  

  const { addCredential, signIn } = useAuthStore();
  const navigate = useNavigate();


  

  const toggleSignUp = () => {
    setIsSignUp(true);
    setName(''); // Reset name field as well
    setEmail('');
    setPassword('');
    setError(null);
  };

  const toggleSignIn = () => {
    setIsSignUp(false);
    setEmail('');
    setPassword('');
    setError(null);
  };

  useEffect(() => {
    toggleSignIn(); // Default view is Sign In when the component mounts
  }, []);

  // Handle Sign Up
  const handleSignUp = () => {
    try {
      credentialsSchema.parse({ name, email, password }); // Validate using Zod
      addCredential(name, email, password); // Add name, email, and password to the store
      alert('Account created successfully!');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  // Handle Sign In
  const handleSignIn = () => {
    try {
      credentialsSchema.omit({ name: true }).parse({ email, password }); // Validate using Zod without name
      if (signIn(email, password)) {
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  // const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
  //   const [name,value]=event.target;
  //      setLogin((prevData)=>({...prevData,[name]:value}))
  // }
   async function  handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log("password",password,"email",email)
try{
  const response= await axios.post("http://192.168.30.129:3000/logsystem/login",{email:email,password:password})
  console.log("response in login",response)
}catch(error){
  console.log("error",error)
}
 
  }

  return (
    <div className="relative flex flex-col justify-center gap-4">
      <div
        className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 "
        style={{ backgroundImage: `url('https://bnbhomestay.in/assets/top_backgroud.avif')` }}
      >
        <div ref={authRef} className="bg-white p-6 rounded-md w-full max-w-md">
          <div className="flex justify-center">
            <img
              src="https://message-attachments.s3.amazonaws.com/2856927dfe56406a91bbdfaa086d74c9.png"
              alt=""
              srcSet=""
            />
          </div>
          {isSignUp ? (
            <div>
              <p className="mt-2 text-center text-base text-gray-600">
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={toggleSignIn}
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                 Log In
                </a>
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium"
                      style={{ color: '#18132f' }}
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Name"
                        autoComplete="off"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium "
                      style={{ color: '#18132f' }}
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                  <div>
                    <button
                      type="button"
                      onClick={handleSignUp}
                      className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white"
                      style={{ backgroundColor: '#191430' }}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <p className="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a
                  href="#"
                  onClick={toggleSignUp}
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Create a free account
                </a>
              </p>
              <form onSubmit={handleSubmit}  className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                  <div>
                    <button
                      type="submit"
                      // onClick={handleSignIn}
                      className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      style={{ backgroundColor: '#191430' }}
                    >
                      Get started
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
