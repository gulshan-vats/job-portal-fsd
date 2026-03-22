import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useJobStore from '../store/useJobStore';
import { Plus, Users, Layout, Building } from 'lucide-react';
import toast from 'react-hot-toast';

const EmployerDashboard = () => {
    const { user } = useAuthStore();
    const { jobs, loading } = useJobStore();
    const stats = { totalJobs: jobs.length, totalApplicants: 12 };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Employer Center</h1>
                <Link
                    to="/employer/post-job"
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                >
                    <Plus className="w-5 h-5" />
                    Post New Job
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                        <Layout className="text-indigo-600 w-6 h-6" />
                    </div>
                    <p className="text-gray-500 font-medium">Total Jobs Posted</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalJobs}</p>
                </div>
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                        <Users className="text-green-600 w-6 h-6" />
                    </div>
                    <p className="text-gray-500 font-medium">Total Applicants</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalApplicants}</p>
                </div>
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                        <Building className="text-blue-600 w-6 h-6" />
                    </div>
                    <p className="text-gray-500 font-medium">Active Companies</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">1</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Job Listings</h2>
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl"></div>)}
                </div>
            ) : jobs.length > 0 ? (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div key={job._id} className="bg-white p-6 rounded-xl border border-gray-200 flex justify-between items-center hover:shadow-md transition">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                <div className="flex gap-4 mt-2">
                                    <span className="text-gray-500 text-sm">{job.location}</span>
                                    <span className="text-gray-500 text-sm border-l pl-4 font-medium text-indigo-600">{job.type}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link to={`/jobs/${job._id}`} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">
                                    View Job
                                </Link>
                                <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100">
                                    Manage Applicants
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500 mb-6 text-lg">You haven't posted any jobs yet.</p>
                    <Link to="/employer/post-job" className="text-indigo-600 font-bold hover:underline">
                        Get started by posting your first job
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EmployerDashboard;
