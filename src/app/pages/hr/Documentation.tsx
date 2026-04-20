import { FileText, Upload, Download, Eye, AlertTriangle } from 'lucide-react';

export default function HRDocumentation() {
  const employeeDocs = [
    {
      id: 1,
      empId: 'NES/EMP/001',
      name: 'Rajesh Kumar',
      department: 'Production',
      documents: {
        aadhaar: { status: 'Uploaded', expiry: null },
        pan: { status: 'Uploaded', expiry: null },
        education: { status: 'Uploaded', expiry: null },
        experience: { status: 'Uploaded', expiry: null },
        medical: { status: 'Expiring Soon', expiry: '2026-05-15' },
        agreement: { status: 'Signed', expiry: null }
      },
      completeness: 95
    },
    {
      id: 2,
      empId: 'NES/EMP/002',
      name: 'Priya Sharma',
      department: 'Quality',
      documents: {
        aadhaar: { status: 'Uploaded', expiry: null },
        pan: { status: 'Uploaded', expiry: null },
        education: { status: 'Uploaded', expiry: null },
        experience: { status: 'Missing', expiry: null },
        medical: { status: 'Uploaded', expiry: '2027-01-10' },
        agreement: { status: 'Signed', expiry: null }
      },
      completeness: 83
    },
    {
      id: 3,
      empId: 'NES/EMP/003',
      name: 'Amit Singh',
      department: 'Sales',
      documents: {
        aadhaar: { status: 'Uploaded', expiry: null },
        pan: { status: 'Uploaded', expiry: null },
        education: { status: 'Uploaded', expiry: null },
        experience: { status: 'Uploaded', expiry: null },
        medical: { status: 'Uploaded', expiry: '2026-12-20' },
        agreement: { status: 'Pending', expiry: null }
      },
      completeness: 88
    },
  ];

  const expiringDocs = [
    { empId: 'NES/EMP/001', name: 'Rajesh Kumar', docType: 'Medical Certificate', expiryDate: '2026-05-15', daysLeft: 26 },
    { empId: 'NES/EMP/045', name: 'Sanjay Gupta', docType: 'Driving License', expiryDate: '2026-05-01', daysLeft: 12 },
    { empId: 'NES/EMP/089', name: 'Kavita Joshi', docType: 'Safety Training', expiryDate: '2026-04-28', daysLeft: 9 },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'uploaded':
      case 'signed':
        return 'bg-green-100 text-green-700';
      case 'expiring soon':
        return 'bg-orange-100 text-orange-700';
      case 'missing':
      case 'pending':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Employee Documentation</h1>
          <p className="text-sm text-gray-600">Manage employee documents and track expiry dates</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Upload className="size-4" />
          Upload Documents
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Employees</p>
            <FileText className="size-5 text-blue-500" />
          </div>
          <p className="font-bold text-gray-900">380</p>
          <p className="text-xs text-gray-500 mt-1">Active records</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Complete Profiles</p>
            <FileText className="size-5 text-green-500" />
          </div>
          <p className="font-bold text-gray-900">345</p>
          <p className="text-xs text-gray-500 mt-1">90.8% completion</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Expiring Soon</p>
            <AlertTriangle className="size-5 text-orange-500" />
          </div>
          <p className="font-bold text-gray-900">{expiringDocs.length}</p>
          <p className="text-xs text-gray-500 mt-1">Next 30 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Missing Docs</p>
            <AlertTriangle className="size-5 text-red-500" />
          </div>
          <p className="font-bold text-gray-900">12</p>
          <p className="text-xs text-gray-500 mt-1">Requires action</p>
        </div>
      </div>

      {/* Expiring Documents Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-orange-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-orange-900">Documents Expiring Soon</h3>
            <p className="text-sm text-orange-700 mt-1">The following documents will expire within 30 days. Please take necessary action.</p>
            <div className="mt-3 space-y-2">
              {expiringDocs.map((doc, idx) => (
                <div key={idx} className="bg-white rounded p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{doc.name} ({doc.empId})</p>
                    <p className="text-xs text-gray-600">{doc.docType} - Expires on {doc.expiryDate}</p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {doc.daysLeft} days left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Employee Documents Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Employee Document Status</h3>
          <p className="text-sm text-gray-600 mt-1">View and manage all employee documents</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm text-gray-600">Employee ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Department</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Aadhaar</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">PAN</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Education</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Experience</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Medical</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Agreement</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Completeness</th>
                <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeDocs.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{emp.empId}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{emp.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{emp.department}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(emp.documents.aadhaar.status)}`}>
                      {emp.documents.aadhaar.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(emp.documents.pan.status)}`}>
                      {emp.documents.pan.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(emp.documents.education.status)}`}>
                      {emp.documents.education.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(emp.documents.experience.status)}`}>
                      {emp.documents.experience.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(emp.documents.medical.status)}`}>
                      {emp.documents.medical.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(emp.documents.agreement.status)}`}>
                      {emp.documents.agreement.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            emp.completeness >= 90 ? 'bg-green-500' :
                            emp.completeness >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${emp.completeness}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{emp.completeness}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Eye className="size-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Download className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
