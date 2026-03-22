import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useJobStore from '../store/useJobStore';
import useAuthStore from '../store/useAuthStore';
import useApplicationStore from '../store/useApplicationStore';
import toast from 'react-hot-toast';
import { Briefcase, MapPin, DollarSign, Calendar, Building, ChevronLeft } from 'lucide-react';

const JobDetails = () => {
    const { id } = useParams();
    const { currentJob, fetchJobById, loading } = useJobStore();
    const { user } = useAuthStore();
    const { applyToJob } = useApplicationStore();
    const [applying, setApplying] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [showApplyModal, setShowApplyModal] = useState(false);

    useEffect(() => {
        fetchJobById(id);
    }, [id, fetchJobById]);

    const handleApply = async (e) => {
        e.preventDefault();
        setApplying(true);
        try {
            await applyToJob(id, coverLetter);
            toast.success('Application submitted successfully!');
            setShowApplyModal(false);
        } catch (err) {
            toast.error('Error applying to job');
        } finally {
            setApplying(false);
        }
    };

    if (loading || !currentJob) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-10"></div>
                <div className="h-64 bg-gray-200 rounded mb-6"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <Link to="/jobs" className="flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Jobs
            </Link>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-gray-100 bg-gray-50 flex items-center gap-6">
                    {currentJob.company?.logo?.url ? (
                        <img src={currentJob.company.logo.url} alt={currentJob.company.name} className="w-20 h-20 rounded-lg object-contain border border-white shadow-sm" />
                    ) : (
                        <div className="w-20 h-20 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Building className="w-10 h-10 text-indigo-600" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{currentJob.title}</h1>
                        <p className="text-lg text-indigo-600 font-medium">{currentJob.company?.name}</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Location</p>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                {currentJob.location}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Job Type</p>
                            <div className="flex items-center text-gray-700">
                                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                                {currentJob.type}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Salary</p>
                            <div className="flex items-center text-gray-700">
                                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                                {currentJob.salary?.min}k - {currentJob.salary?.max}k
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Posted on</p>
                            <div className="flex items-center text-gray-700">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                {new Date(currentJob.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-700 mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                        <p className="whitespace-pre-line leading-relaxed">{currentJob.description}</p>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {currentJob.skills?.map((skill, index) => (
                                <span key={index} className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-10">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">About {currentJob.company?.name}</h4>
                            <p className="text-gray-500 text-sm max-w-md">{currentJob.company?.description?.substring(0, 100)}...</p>
                        </div>
                        {user?.role === 'seeker' ? (
                            <button
                                onClick={() => setShowApplyModal(true)}
                                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                            >
                                Apply Now
                            </button>
                        ) : !user ? (
                            <Link to="/login" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
                                Login to Apply
                            </Link>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Apply for {currentJob.title}</h2>
                        <p className="text-gray-500 text-sm text-center mb-6">Your resume from your profile will be auto-attached.</p>
                        <form onSubmit={handleApply} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter (Optional)</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[150px]"
                                    placeholder="Tell the employer why you're a good fit..."
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowApplyModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={applying}
                                    className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {applying ? 'Sending...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
