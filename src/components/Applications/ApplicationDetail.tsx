import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export function ApplicationDetail() {
  const { appName } = useParams(); // Get appName from the URL
  const location = useLocation();
  const [app, setApp] = useState(location.state?.app || null); // Use state to hold the app details

  useEffect(() => {
    if (!app) {
      // If app is not passed through location, load it from localStorage
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const foundApp = savedApplications.find((application: any) => application.appName === appName);
      setApp(foundApp);
    }
  }, [appName, app]);

  return (
    
    <div className="p-8 " style={{backgroundImage:`url('https://bnbhomestay.in/assets/top_backgroud.avif')`}}>
      {app ? (
        <>
          <h1 className="text-2xl font-bold">Application: {appName}</h1>
          <p><strong>URL:</strong>  {app.url}</p>
          <p><strong>Type:</strong> {app.type}</p>
        </>
      ) : (
        <p>Application data not found.</p>
      )}
    </div>
  );
}

export default ApplicationDetail;
