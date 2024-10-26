// src/components/ApplicationsGrid.tsx

import { useEffect, useState } from 'react';
import AppCard from './AppCard'; // Import the AppCard component

export function ApplicationsGrid() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    // Load applications from localStorage
    const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    setApplications(savedApplications);
  }, []);

  // Delete function to remove an application
  const handleDelete = (name: string) => {
    const updatedApplications = applications.filter((app) => app.name !== name);
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };

  return (
    <div className="h-[80vh]  flex flex-col overflow-y-hidden" style={{
      backgroundImage: `url('https://bnbhomestay.in/assets/top_backgroud.avif')`,
      
    }}>
      <section
        className="h-[55vh] p-3 sm:p-5 bg-cover bg-center"
        
      >
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12 h-full">
          <h2 className="text-2xl font-semibold mb-4">Applications</h2>
          <div 
            className="relative grid grid-cols-2 auto-rows-[48vh] gap-x-5 gap-y-4 h-full overflow-y-scroll scrollbar-hide"
          >
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <AppCard 
                  key={index}
                  name={app.name}
                  url={app.url}
                  type={app.type}
                  onDelete={handleDelete} // Pass the delete function to the AppCard
                />
              ))
            ) : (
              <p>No applications found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApplicationsGrid;
