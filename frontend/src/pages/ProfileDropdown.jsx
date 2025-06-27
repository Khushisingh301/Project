import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';

const ProfileDropdown = ({ isOpen, onClose, onLogout, onProfile }) => {
  return (
    <div
      className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {/* User Info */}
      <div className="p-3 border-b border-gray-100">
        <p className="font-semibold text-gray-900">John Doe</p>
        <p className="text-sm text-gray-500">john.doe@company.com</p>
      </div>

      {/* Actions */}
      <div className="py-2">
        {/* Profile Button */}
        <button
          onClick={() => {
            onProfile();
            onClose();
          }}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <User className="w-4 h-4 mr-3" />
          Profile
        </button>

        {/* Settings Button */}
        <button
          onClick={onClose}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </button>

        <hr className="my-2" />

        {/* Logout Button */}
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
