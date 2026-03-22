import { create } from 'zustand';

const MOCK_APPLICATIONS = [
    {
        _id: 'app1',
        job: { title: 'Senior Frontend Developer', company: { name: 'TechGiant' } },
        status: 'shortlisted',
        createdAt: new Date().toISOString(),
    },
    {
        _id: 'app2',
        job: { title: 'Product Designer', company: { name: 'DesignShip' } },
        status: 'pending',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
];

const useApplicationStore = create((set) => ({
    applications: MOCK_APPLICATIONS,
    loading: false,

    fetchMyApplications: async () => {
        set({ loading: true });
        setTimeout(() => {
            set({ applications: MOCK_APPLICATIONS, loading: false });
        }, 500);
    },

    applyToJob: async (jobId, coverLetter) => {
        set({ loading: true });
        setTimeout(() => {
            set({ loading: false });
        }, 500);
        return true;
    }
}));

export default useApplicationStore;
