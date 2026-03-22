import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Building, Globe, MapPin, AlignLeft, Send } from 'lucide-react';

const CompanySetup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        description: '',
        location: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            toast.success('Company profile created!');
            setLoading(false);
            navigate('/employer/dashboard');
        }, 800);
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                <div className="text-center mb-8">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building className="text-indigo-600 w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create Company Profile</h1>
                    <p className="text-gray-500 mt-2 text-sm text-balance">You need a company profile before you can post job openings.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                        <input
                            required
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="e.g. Acme Corp"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="url"
                                    className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    placeholder="https://"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    placeholder="City, Country"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                        <div className="relative">
                            <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                                required
                                rows="4"
                                className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                placeholder="Describe your company..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    >
                        <Send className="w-5 h-5" />
                        {loading ? 'Creating...' : 'Register Company'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
