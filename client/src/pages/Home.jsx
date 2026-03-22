import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, Building } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-indigo-900 h-[500px] flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Find Your Dream Job <span className="text-indigo-400">Today</span>
                    </h1>
                    <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                        Connecting talented professionals with the world's leading companies. Browse thousands of job openings in every industry.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/jobs" className="bg-white text-indigo-900 px-8 py-3 rounded-md font-bold text-lg hover:bg-indigo-50 transition">
                            Browse Jobs
                        </Link>
                        <Link to="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-indigo-700 transition">
                            Post a Job
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="text-indigo-600 w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">12k+</h3>
                        <p className="text-gray-500">Active Jobs</p>
                    </div>
                    <div>
                        <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Users className="text-green-600 w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">8k+</h3>
                        <p className="text-gray-500">Talented Seekers</p>
                    </div>
                    <div>
                        <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Building className="text-blue-600 w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                        <p className="text-gray-500">Top Companies</p>
                    </div>
                    <div>
                        <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Search className="text-purple-600 w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">20k+</h3>
                        <p className="text-gray-500">Daily Searches</p>
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Popular Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Software Development', 'Design', 'Marketing', 'Sales', 'Finance', 'Customer Support', 'Management', 'Data Science'].map((category) => (
                            <Link key={category} to={`/jobs?category=${category}`} className="bg-white p-6 rounded-lg text-center border border-gray-200 hover:border-indigo-600 hover:shadow-sm transition">
                                <h4 className="font-semibold text-gray-900">{category}</h4>
                                <p className="text-gray-500 text-sm mt-1">100+ open positions</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
