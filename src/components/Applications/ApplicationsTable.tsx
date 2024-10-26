import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationsTable.module.css';

export function ApplicationsTable() {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filterType, setFilterType] = useState('All'); // State for filter type
  const [sortField, setSortField] = useState('appName'); // State for sorting field
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State for sort order
  const navigate = useNavigate();

  useEffect(() => {
    // Load applications from localStorage
    const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    // Add creation date if not available
    const applicationsWithDate = savedApplications.map((app: any) => ({
      ...app,
      createdAt: app.createdAt || new Date().toISOString(),
    }));
    
    setApplications(applicationsWithDate);
  }, []);

  // Delete function to remove an application
  const handleDelete = (name: string) => {
    const updatedApplications = applications.filter((app) => app.appName !== name);
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
  };

  // View function to navigate to a new page for selected app
  const handleView = (app: any) => {
    
    navigate(`/applications/${app.appName}`, { state: { app } });
  };

  // Handle sorting by a specific field (either 'appName' or 'createdAt')
  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  // Filter and sort applications based on search, filter, and sorting
  const filteredApplications = applications
    .filter((app) => {
      const appName = app.appName || ''; // Ensure that app.appName is defined
      const matchesSearch = appName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || app.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortField === 'appName') {
        const nameA = a.appName.toLowerCase();
        const nameB = b.appName.toLowerCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      } else if (sortField === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

  return (
    <div>
      <div>
        <section className="h-screen p-3 sm:p-5" style={{ backgroundImage: `url('https://bnbhomestay.in/assets/top_backgroud.avif')` }}>
          <div className="mx-auto max-w-screen- px-4 lg:px-12">
            <div className="bg-white h-fit dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              {/* Search Input */}
              <div className="mt-4 p-4 h-9">
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="mt-4 p-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="All">All Types</option>
                  <option value="Client">Client</option>
                  <option value="Server">Server</option>
                </select>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {/* Sortable columns */}
                      <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('appName')}>
                        Application Name {sortField === 'appName' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th scope="col" className="px-4 py-3">URL</th>
                      <th scope="col" className="px-4 py-3">Type</th>
                      <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('createdAt')}>
                        Date Created {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th scope="col" className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((app, index) => (
                        <tr key={index} className="border-b dark:border-gray-700">
                          <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {app.appName}
                          </th>
                          <td className="px-4 py-3">{app.url}</td>
                          <td className="px-4 py-3">{app.type}</td>
                          <td className="px-4 py-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3 flex items-center justify-start space-x-4">
                            <button
                              onClick={() => handleView(app)}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(app.appName)}
                              className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-3 text-center">
                          No applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ApplicationsTable;
