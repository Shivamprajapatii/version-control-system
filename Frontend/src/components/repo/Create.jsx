import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RepoIcon } from '@primer/octicons-react';

function CreateRepository() {

  console.log(localStorage.getItem('userId'))
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    visibility: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.name.trim()) {
        throw new Error('Repository name is required');
      }

      const response = await axios.post('http://localhost:3000/repo/create', {
        ...formData,
        owner: localStorage.getItem('userId'),
      });

      setSuccess('Repository created successfully!');
      setTimeout(() => {
        navigate(`/`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8">
          <div className="flex items-center mb-8">
            <RepoIcon className="h-8 w-8 text-green-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">Create New Repository</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-600 rounded-lg text-green-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Repository Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white 
                  focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="awesome-project"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description (optional)
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white 
                  focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="A short description of your repository"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white 
                  focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all h-32"
                placeholder="Add initial content for your repository..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white 
                  focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="public" className="bg-gray-800">Public</option>
                <option value="private" className="bg-gray-800">Private</option>
              </select>
              <p className="mt-2 text-sm text-gray-400">
                {formData.visibility === 'public'
                  ? 'All users will be able to see this repository'
                  : 'Only you and collaborators will see this repository'}
              </p>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 text-gray-300 hover:text-white border border-gray-600 rounded-lg
                  hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Create Repository
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>* Required fields</p>
          <p className="mt-2">By creating a repository, you agree to our terms of service</p>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateRepository;