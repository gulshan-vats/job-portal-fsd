import { create } from 'zustand';

const MOCK_JOBS = [
    {
        _id: '1',
        title: 'Senior Frontend Developer',
        description: 'We are looking for an expert React developer to join our core team. You will work on building high-performance web applications using the latest technologies.',
        company: { name: 'TechGiant', logo: { url: 'https://cdn-icons-png.flaticon.com/512/2111/2111432.png' }, location: 'San Francisco, CA' },
        location: 'Remote',
        type: 'full-time',
        salary: { min: 120, max: 180, currency: 'USD' },
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        experienceLevel: 'senior',
        category: 'Software Development',
        createdAt: new Date().toISOString(),
    },
    {
        _id: '2',
        title: 'Product Designer',
        description: 'Shape the future of our products. We need a creative UI/UX designer who can translate complex requirements into intuitive user journeys.',
        company: { name: 'DesignShip', logo: { url: 'https://cdn-icons-png.flaticon.com/512/732/732190.png' }, location: 'New York, NY' },
        location: 'New York, NY',
        type: 'full-time',
        salary: { min: 90, max: 140, currency: 'USD' },
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        experienceLevel: 'mid',
        category: 'Design',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        _id: '3',
        title: 'Backend Engineer (Node.js)',
        description: 'Build scalable APIs and microservices. Experience with MongoDB and distributed systems is a plus.',
        company: { name: 'ScaleUp', logo: { url: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' }, location: 'Austin, TX' },
        location: 'Austin, TX',
        type: 'full-time',
        salary: { min: 110, max: 160, currency: 'USD' },
        skills: ['Node.js', 'Express', 'MongoDB', 'Redis'],
        experienceLevel: 'mid',
        category: 'Software Development',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
        _id: '4',
        title: 'Marketing Manager',
        description: 'Lead our marketing campaigns and grow our user base. We need a data-driven marketer with experience in B2B SaaS.',
        company: { name: 'GrowthCo', logo: { url: 'https://cdn-icons-png.flaticon.com/512/281/281769.png' }, location: 'Chicago, IL' },
        location: 'Chicago, IL',
        type: 'part-time',
        salary: { min: 60, max: 90, currency: 'USD' },
        skills: ['SEO', 'SEM', 'Content Strategy', 'Analytics'],
        experienceLevel: 'mid',
        category: 'Marketing',
        createdAt: new Date(Date.now() - 259200000).toISOString(),
    }
];

const useJobStore = create((set, get) => ({
    jobs: MOCK_JOBS,
    currentJob: null,
    loading: false,
    error: null,
    pages: 1,
    currentPage: 1,

    fetchJobs: async (params = {}) => {
        set({ loading: true });
        // Simulate network delay
        setTimeout(() => {
            let filtered = [...MOCK_JOBS];
            if (params.keyword) {
                filtered = filtered.filter(j => j.title.toLowerCase().includes(params.keyword.toLowerCase()));
            }
            if (params.location) {
                filtered = filtered.filter(j => j.location.toLowerCase().includes(params.location.toLowerCase()));
            }
            if (params.type) {
                filtered = filtered.filter(j => j.type === params.type);
            }
            if (params.category) {
                filtered = filtered.filter(j => j.category === params.category);
            }
            set({ jobs: filtered, loading: false });
        }, 500);
    },

    fetchJobById: async (id) => {
        set({ loading: true });
        setTimeout(() => {
            const job = MOCK_JOBS.find(j => j._id === id);
            set({ currentJob: job, loading: false });
        }, 300);
    },

    createJob: async (jobData) => {
        set({ loading: true });
        setTimeout(() => {
            const newJob = { ...jobData, _id: Date.now().toString(), createdAt: new Date().toISOString() };
            MOCK_JOBS.unshift(newJob);
            set({ jobs: [...MOCK_JOBS], loading: false });
        }, 500);
        return true;
    },
}));

export default useJobStore;
