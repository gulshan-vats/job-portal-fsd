import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { User, Briefcase, GraduationCap, MapPin, Save } from 'lucide-react';

const ProfileSetup = () => {
    const { user, updateProfile, loading } = useAuthStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    const [formData, setFormData] = useState({
        profile: {
            bio: user?.profile?.bio || '',
            location: user?.profile?.location || '',
            skills: user?.profile?.skills?.join(', ') || '',
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            profile: {
                ...formData.profile,
                skills: formData.profile.skills.split(',').map(s => s.trim())
            }
        };
        await updateProfile(data);
        toast.success('Profile updated successfully!');
        navigate('/seeker/dashboard');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-indigo-600 p-8 text-white">
                    <h1 className="text-3xl font-bold">Complete Your Profile</h1>
                    <p className="text-indigo-100 mt-2">Help employers find you by sharing your experience and skills.</p>
                </div>

                <div className="p-8">
                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-10">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center flex-1 last:flex-none">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {s === 1 && <User className="w-5 h-5" />}
                                    {s === 2 && <Briefcase className="w-5 h-5" />}
                                    {s === 3 && <GraduationCap className="w-5 h-5" />}
                                </div>
                                {s < 3 && <div className={`flex-1 h-1 mx-4 ${step > s ? 'bg-indigo-600' : 'bg-gray-100'}`}></div>}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Basic Information</h2>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="e.g. San Francisco, CA"
                                            value={formData.profile.location}
                                            onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, location: e.target.value } })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Short Bio</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
                                        placeholder="Tell us about yourself..."
                                        value={formData.profile.bio}
                                        onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, bio: e.target.value } })}
                                    />
                                </div>
                                <button type="button" onClick={() => setStep(2)} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
                                    Next: Skills & Experience
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Skills & Keywords</h2>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Skills (Comma separated)</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g. React, Node.js, Python, Figma"
                                        value={formData.profile.skills}
                                        onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, skills: e.target.value } })}
                                    />
                                    <p className="text-xs text-gray-500 mt-2 italic">These keywords help match you with the right jobs.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                                        Back
                                    </button>
                                    <button type="button" onClick={() => setStep(3)} className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
                                        Next: Finalize
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Complete Setup</h2>
                                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                                    <p className="text-indigo-900 font-medium mb-2">Ready to go!</p>
                                    <p className="text-indigo-700 text-sm">Once you save, your profile will be visible to employers. You can always update this information later from your dashboard.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                                        Back
                                    </button>
                                    <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                                        <Save className="w-5 h-5" />
                                        {loading ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
