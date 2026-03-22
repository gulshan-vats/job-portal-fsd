import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        <Link to={`/jobs/${job._id}`} className="hover:text-indigo-600">
                            {job.title}
                        </Link>
                    </h3>
                    <p className="text-indigo-600 font-medium mb-3">{job.company?.name}</p>
                </div>
                {job.company?.logo?.url && (
                    <img src={job.company.logo.url} alt={job.company.name} className="w-12 h-12 rounded object-contain border border-gray-100" />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {job.type}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary?.min} - {job.salary?.max} {job.salary?.currency}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(job.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {job.skills?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {skill}
                    </span>
                ))}
                {job.skills?.length > 3 && (
                    <span className="text-gray-400 text-xs self-center">+{job.skills.length - 3} more</span>
                )}
            </div>

            <Link
                to={`/jobs/${job._id}`}
                className="block text-center bg-gray-50 text-indigo-600 py-2 rounded-md font-medium hover:bg-indigo-50 transition duration-150"
            >
                View Details
            </Link>
        </div>
    );
};

export default JobCard;
