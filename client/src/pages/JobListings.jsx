import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useJobStore from '../store/useJobStore';
import JobCard from '../components/JobCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Search, MapPin, Filter } from 'lucide-react';

const JobListings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { jobs, loading, fetchJobs, pages, currentPage } = useJobStore();
    
    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        location: searchParams.get('location') || '',
        type: searchParams.get('type') || '',
        category: searchParams.get('category') || '',
    });

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        fetchJobs(params);
    }, [searchParams, fetchJobs]);

    const handleSearch = (e) => {
        e.preventDefault();
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== '')
        );
        setSearchParams(activeFilters);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
                        <div className="flex items-center gap-2 mb-6 font-bold text-gray-900">
                            <Filter className="w-5 h-5" />
                            Filters
                        </div>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Keyword</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        className="pl-9 w-full border border-gray-300 rounded-md py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Job title, skills..."
                                        value={filters.keyword}
                                        onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        className="pl-9 w-full border border-gray-300 rounded-md py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="City, remote..."
                                        value={filters.location}
                                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                <select
                                    className="w-full border border-gray-300 rounded-md py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={filters.type}
                                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                                >
                                    <option value="">All Types</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="remote">Remote</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition font-medium"
                            >
                                Apply Filters
                            </button>
                        </form>
                    </div>
                </div>

                {/* Job List */}
                <div className="w-full md:w-3/4">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Recommended Jobs</h2>
                        <span className="text-gray-500 text-sm">{jobs.length} jobs found</span>
                    </div>

                    {loading ? (
                        <LoadingSkeleton count={5} />
                    ) : jobs.length > 0 ? (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                            
                            {/* Pagination */}
                            {pages > 1 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    {Array.from({ length: pages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSearchParams({ ...filters, page: i + 1 })}
                                            className={`px-4 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white p-12 text-center rounded-lg border border-gray-200">
                            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                            <button onClick={() => setSearchParams({})} className="mt-4 text-indigo-600 hover:underline">Clear all filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobListings;
