import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useJobStore from '../store/useJobStore';
import toast from 'react-hot-toast';
import { ChevronLeft } from 'lucide-react';

const PostJob = () => {
    const navigate = useNavigate();
    const { createJob } = useJobStore();
    const [companies, setCompanies] = useState([
        { _id: 'c1', name: 'TechGiant' },
        { _id: 'c2', name: 'DesignShip' }
    ]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: 'c1',
        location: '',
        type: 'full-time',
        salary: { min: '', max: '', currency: 'USD' },
        skills: '',
        experienceLevel: 'entry',
        category: '',
        deadline: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()),
                salary: {
                    ...formData.salary,
                    min: Number(formData.salary.min),
                    max: Number(formData.salary.max),
                }
            };
            await createJob(data);
            toast.success('Job posted successfully!');
            navigate('/employer/dashboard');
        } catch (err) {
            toast.error('Error posting job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
            </button>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
                <p className="text-gray-500 mb-8">Reach thousands of talented candidates today.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Senior Frontend Developer"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                            <select
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            >
                                {companies.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                            {companies.length === 0 && (
                                <p className="text-xs text-red-500 mt-1">Please create a company profile first.</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. New York, Remote"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="remote">Remote</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Experience Level</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.experienceLevel}
                                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                            >
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                                <option value="lead">Lead/Manager</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Salary Range (Min)</label>
                            <input
                                type="number"
                                placeholder="e.g. 80"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.salary.min}
                                onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, min: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Salary Range (Max)</label>
                            <input
                                type="number"
                                placeholder="e.g. 120"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={formData.salary.max}
                                onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, max: e.target.value } })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Skills (Comma separated)</label>
                        <input
                            type="text"
                            placeholder="React, Node.js, Tailwind..."
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
                        <textarea
                            required
                            rows="6"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || companies.length === 0}
                        className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 disabled:opacity-50"
                    >
                        {loading ? 'Posting...' : 'Post Job Listing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
