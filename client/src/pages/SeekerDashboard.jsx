import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import useApplicationStore from '../store/useApplicationStore';
import { Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';

const SeekerDashboard = () => {
    const { user } = useAuthStore();
    const { applications, loading, fetchMyApplications } = useApplicationStore();

    useEffect(() => {
        fetchMyApplications();
    }, [fetchMyApplications]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'reviewed': return 'bg-blue-100 text-blue-800';
            case 'shortlisted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, {user?.name}!</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">Total Applications</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">{applications.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">Shortlisted</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {applications.filter(a => a.status === 'shortlisted').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">Pending Review</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {applications.filter(a => a.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">Saved Jobs</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{user?.savedJobs?.length || 0}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Recent Applications</h2>
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>)}
                </div>
            ) : applications.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{app.job?.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{app.job?.company?.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                    <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                </div>
            )}
        </div>
    );
};

export default SeekerDashboard;
