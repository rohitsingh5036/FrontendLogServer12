import { useState } from 'react';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconArrowAutofitRight } from '@tabler/icons-react';

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  // Load credentials and current user from localStorage
  const users = JSON.parse(localStorage.getItem('credentials') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  // If there's no current user, show an error
  if (!currentUser.email) {
    return <Text color="red">No user is currently logged in.</Text>;
  }
  
  const storedPassword = currentUser.password; // Access the current user's password

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate the current password
    if (currentPassword !== storedPassword) {
      setError('Current password is incorrect.');
      return;
    }

    // Update the password for the current user in the users list
    const updatedUsers = users.map((user: any) =>
      user.email === currentUser.email
        ? { ...user, password: newPassword } // Update password for the current user (matched by email)
        : user
    );

    // Save updated users list and current user back to localStorage
    localStorage.setItem('credentials', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, password: newPassword }));

    setSuccess('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    navigate('/dashboard')
  };

  return (
    <div className="relative flex flex-col justify-center gap-4">
      <div
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
        style={{ backgroundImage: `url('https://bnbhomestay.in/assets/top_backgroud.avif')` }}
      >
        <div className="bg-white p-6 rounded-md w-full max-w-md">
          <div className="flex justify-center">
            <img
              src="https://message-attachments.s3.amazonaws.com/2856927dfe56406a91bbdfaa086d74c9.png"
              alt="Logo"
            />
          </div>
          <form onSubmit={handleChangePassword} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="current-password"
                  className="text-base font-medium"
                  style={{ color: '#18132f' }}
                >
                  Current Password
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                    type="password"
                    placeholder="Current Password"
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="text-base font-medium"
                  style={{ color: '#18132f' }}
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                    type="password"
                    placeholder="New Password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <p className="text-red-600">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white"
                  style={{ backgroundColor: '#191430' }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
          <div className='bg-[#191430] mt-3 flex justify-center rounded-md'>
            <button className='inline-flex w-full items-center justify-center  px-3.5 py-2.5 font-semibold leading-7 text-white gap-3' onClick={()=>{ navigate('/dashboard')}}>
              Dashboard <IconArrowAutofitRight color='white'/>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
