import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApplicationsTable.module.css';

export function ApplicationsTable() {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/project/allprojects");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications data:", error);
      }
    };
    fetchApplications();
  }, []);

  const handleView = (app: any) => {
    navigate(`/applications/${app.project_name}`, { state: { app } });
  };

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const filteredApplications = applications
    .filter((app) => {
      const appName = app.project_name || ''; // Fallback to empty string if name is undefined
      const matchesSearch = appName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || app.script_type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        const nameA = a.name ? a.name.toLowerCase() : ''; // Check for undefined
        const nameB = b.name ? b.name.toLowerCase() : ''; // Check for undefined
        return sortOrder === 'asc' ? (nameA < nameB ? -1 : 1) : (nameA > nameB ? -1 : 1);
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
              <div className="mt-4 p-4 h-9">
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>

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
                      <th scope="col" className="px-4 py-3 cursor-pointer" onClick={() => handleSort('name')}>
                        Application Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
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
                            {app.project_name || 'N/A'}
                          </th>
                          <td className="px-4 py-3">{app.project_description || 'N/A'}</td>
                          <td className="px-4 py-3">{app.script_type || 'N/A'}</td>
                          <td className="px-4 py-3">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td className="px-4 py-3 flex items-center justify-start space-x-4">
                            <button
                              onClick={() => handleView(app)}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              View
                            </button>
                            <button
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
