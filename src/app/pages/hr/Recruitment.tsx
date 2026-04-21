// src/app/pages/hr/Recruitment.jsx
import { useState } from 'react';
import { Plus, Search, Filter, Eye, Calendar, Users, Briefcase } from 'lucide-react';
import { PostJobModal } from '../../components/recruitment/PostJobModal';

export default function HRRecruitment() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applicants' | 'interviews'>('jobs');
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const jobPostings = [
    {
      id: 'JOB-001',
      title: 'Production Engineer',
      department: 'Production',
      location: 'Plant - Roorkee',
      type: 'Full-time',
      openings: 2,
      ctc: '₹3.5L - ₹5L',
      status: 'Open',
      applicants: 45,
      posted: '2026-04-10'
    },
    {
      id: 'JOB-002',
      title: 'Quality Inspector',
      department: 'Quality',
      location: 'Plant - Roorkee',
      type: 'Full-time',
      openings: 3,
      ctc: '₹2.5L - ₹3.5L',
      status: 'Open',
      applicants: 67,
      posted: '2026-04-05'
    },
    {
      id: 'JOB-003',
      title: 'Sales Executive',
      department: 'Sales',
      location: 'Office',
      type: 'Full-time',
      openings: 5,
      ctc: '₹3L - ₹4.5L',
      status: 'Open',
      applicants: 89,
      posted: '2026-04-01'
    },
    {
      id: 'JOB-004',
      title: 'R&D Chemist',
      department: 'R&D',
      location: 'Plant - Roorkee',
      type: 'Full-time',
      openings: 1,
      ctc: '₹4L - ₹6L',
      status: 'Closed',
      applicants: 23,
      posted: '2026-03-20'
    },
  ];

  const applicants = [
    {
      id: 'CAND-1001',
      name: 'Rahul Kumar',
      email: 'rahul.k@email.com',
      phone: '+91 98765 43210',
      job: 'Production Engineer',
      experience: '3 years',
      currentSalary: '₹3.2L',
      expectedSalary: '₹4.5L',
      stage: 'Interview Scheduled',
      appliedDate: '2026-04-12'
    },
    {
      id: 'CAND-1002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43211',
      job: 'Quality Inspector',
      experience: '2 years',
      currentSalary: '₹2.8L',
      expectedSalary: '₹3.5L',
      stage: 'Shortlisted',
      appliedDate: '2026-04-11'
    },
    {
      id: 'CAND-1003',
      name: 'Amit Singh',
      email: 'amit.s@email.com',
      phone: '+91 98765 43212',
      job: 'Sales Executive',
      experience: '4 years',
      currentSalary: '₹3.5L',
      expectedSalary: '₹4.5L',
      stage: 'Interviewed',
      appliedDate: '2026-04-10'
    },
  ];

  const interviews = [
    {
      id: 'INT-001',
      candidate: 'Rahul Kumar',
      job: 'Production Engineer',
      round: '1st Round',
      type: 'Technical',
      date: '2026-04-22',
      time: '10:00 AM',
      mode: 'Offline',
      interviewer: 'Mr. Rajesh Verma',
      status: 'Scheduled'
    },
    {
      id: 'INT-002',
      candidate: 'Neha Gupta',
      job: 'Quality Inspector',
      round: '2nd Round',
      type: 'HR Discussion',
      date: '2026-04-21',
      time: '02:00 PM',
      mode: 'Online',
      interviewer: 'Ms. Anjali Mehta',
      status: 'Scheduled'
    },
    {
      id: 'INT-003',
      candidate: 'Amit Singh',
      job: 'Sales Executive',
      round: 'Final Round',
      type: 'Final Discussion',
      date: '2026-04-20',
      time: '11:30 AM',
      mode: 'Offline',
      interviewer: 'Mr. Sunil Kumar',
      status: 'Completed'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'shortlisted': return 'bg-yellow-100 text-yellow-700';
      case 'interview scheduled': return 'bg-blue-100 text-blue-700';
      case 'interviewed': return 'bg-purple-100 text-purple-700';
      case 'selected': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleJobPosted = () => {
    // Refresh job listings or show success notification
    console.log('Job posted successfully!');
    // You can add a toast notification here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Recruitment Management</h1>
          <p className="text-sm text-gray-600">Manage job postings, applicants, and interviews</p>
        </div>
        <button onClick={() => setIsPostJobModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="size-4" />
          Post New Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="font-bold text-gray-900">{jobPostings.filter(j => j.status === 'Open').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Applicants</p>
              <p className="font-bold text-gray-900">{applicants.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="size-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Scheduled Interviews</p>
              <p className="font-bold text-gray-900">{interviews.filter(i => i.status === 'Scheduled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="size-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Offers Pending</p>
              <p className="font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'jobs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('applicants')}
              className={`py-4 px-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'applicants'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Applicants (ATS)
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`py-4 px-2 border-b-2 text-sm font-medium transition-colors ${activeTab === 'interviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Interviews
            </button>
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="size-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'jobs' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Job ID</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Title</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Department</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Openings</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">CTC Range</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Applicants</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobPostings.map((job) => (
                    <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800">{job.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">{job.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{job.department}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{job.location}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{job.openings}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{job.ctc}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{job.applicants}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'applicants' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Applied For</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Experience</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Expected CTC</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Stage</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr key={applicant.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800">{applicant.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">{applicant.name}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <p className="text-gray-800">{applicant.email}</p>
                          <p className="text-gray-500 text-xs">{applicant.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{applicant.job}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{applicant.experience}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{applicant.expectedSalary}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${getStageColor(applicant.stage)}`}>
                          {applicant.stage}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Candidate</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Position</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Round</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Date & Time</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Interviewer</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((interview) => (
                    <tr key={interview.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800">{interview.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">{interview.candidate}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{interview.job}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{interview.round}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{interview.type}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <p className="text-gray-800">{interview.date}</p>
                          <p className="text-gray-500 text-xs">{interview.time} ({interview.mode})</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{interview.interviewer}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(interview.status)}`}>
                          {interview.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <PostJobModal
        open={isPostJobModalOpen}
        onOpenChange={setIsPostJobModalOpen}
        onSuccess={handleJobPosted}
      />
    </div>
  );
}
