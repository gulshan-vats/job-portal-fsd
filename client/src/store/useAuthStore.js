import { create } from 'zustand';

const MOCK_USER = {
    _id: '101',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'seeker',
    profile: {
        bio: 'Passionate software engineer with 5 years of experience in full-stack development. I love building products that solve real-world problems.',
        skills: ['JavaScript', 'React', 'Node.js', 'Tailwind CSS'],
        location: 'New York, NY',
    },
    savedJobs: [],
};

const useAuthStore = create((set) => ({
    user: MOCK_USER,
    loading: false,
    error: null,

    register: async (userData) => {
        set({ loading: true, error: null });
        setTimeout(() => {
            const newUser = { ...userData, _id: Date.now().toString(), profile: {} };
            set({ user: newUser, loading: false });
            localStorage.setItem('user', JSON.stringify(newUser));
        }, 1000);
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        setTimeout(() => {
            if (email.includes('employer')) {
                const employer = { ...MOCK_USER, role: 'employer', name: 'Tech Recruiter' };
                set({ user: employer, loading: false });
            } else {
                set({ user: MOCK_USER, loading: false });
            }
        }, 800);
    },

    logout: async () => {
        set({ user: null });
    },

    updateProfile: async (profileData) => {
        set({ loading: true });
        setTimeout(() => {
            set((state) => ({
                user: { ...state.user, ...profileData },
                loading: false
            }));
        }, 500);
    },
}));

export default useAuthStore;
