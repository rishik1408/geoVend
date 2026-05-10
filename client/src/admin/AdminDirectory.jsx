import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldAlert, Ban } from 'lucide-react';

const AdminDirectory = () => {
  const { vendors } = useAppContext();

  return (
    <div className="admin-directory">
      <div className="table-container glass-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Business Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Coordinates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor.id}>
                <td>#{vendor.id.toString().slice(-4)}</td>
                <td><strong>{vendor.name}</strong></td>
                <td>{vendor.type}</td>
                <td>
                  <span className={`status-badge ${vendor.status}`}>
                    {vendor.status}
                  </span>
                </td>
                <td className="code-font">{vendor.lat.toFixed(4)}, {vendor.lng.toFixed(4)}</td>
                <td className="action-cell">
                  <button className="btn-icon warning" title="Issue Warning">
                    <ShieldAlert size={16} />
                  </button>
                  <button className="btn-icon danger" title="Suspend Account">
                    <Ban size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {vendors.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">No vendors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDirectory;
