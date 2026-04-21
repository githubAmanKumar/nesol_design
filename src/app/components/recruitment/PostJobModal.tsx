// src/components/recruitment/PostJobModal.tsx
import { useState } from 'react';
import { X, Plus, Trash2, Upload, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { cn } from '../ui/utils';

interface PostJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface JobFormData {
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  ctcMin: string;
  ctcMax: string;
  salaryTemplate: string;
  budgetStatus: string;
  approvedBy: string;
  rolesResponsibilities: string;
  requiredSkills: string[];
  experienceMin: string;
  experienceMax: string;
  education: string;
  certifications: string[];
  numberOfOpenings: string;
  hiringManager: string;
  recruiter: string;
  expectedJoiningDate: string;
  jobStatus: string;
  postingDate: string;
  expiryDate: string;
  sourceChannels: string[];
  externalUrl: string;
  internalRef: string;
}

const initialFormData: JobFormData = {
  jobTitle: '',
  department: '',
  location: 'Plant - Roorkee',
  employmentType: 'Full-time',
  ctcMin: '',
  ctcMax: '',
  salaryTemplate: '',
  budgetStatus: 'Pending',
  approvedBy: '',
  rolesResponsibilities: '',
  requiredSkills: [],
  experienceMin: '',
  experienceMax: '',
  education: '',
  certifications: [],
  numberOfOpenings: '1',
  hiringManager: '',
  recruiter: '',
  expectedJoiningDate: '',
  jobStatus: 'Open',
  postingDate: new Date().toISOString().split('T')[0],
  expiryDate: '',
  sourceChannels: [],
  externalUrl: '',
  internalRef: '',
};

const departments = ['HR', 'Production', 'Sales', 'Finance', 'Procurement', 'Quality', 'R&D', 'Logistics'];
const locations = ['Plant - Roorkee', 'Office', 'Remote'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const budgetStatuses = ['Pending', 'Approved', 'Rejected'];
const jobStatuses = ['Open', 'Closed', 'On Hold', 'Filled'];
const sourceChannelOptions = ['Company Website', 'LinkedIn', 'Naukri', 'Indeed', 'Referral', 'Consultancy'];
const salaryTemplates = ['Standard - Level 1', 'Standard - Level 2', 'Standard - Level 3', 'Executive', 'Management'];
const skillSuggestions = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'];
const certificationOptions = ['PMP', 'Six Sigma', 'ISO 9001', 'Lean Manufacturing', 'CISA', 'CISSP'];

export function PostJobModal({ open, onOpenChange, onSuccess }: PostJobModalProps) {
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof JobFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof JobFormData, string>> = {};

    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.ctcMin) newErrors.ctcMin = 'Minimum CTC is required';
    if (!formData.ctcMax) newErrors.ctcMax = 'Maximum CTC is required';
    if (!formData.rolesResponsibilities) newErrors.rolesResponsibilities = 'Job description is required';
    if (formData.requiredSkills.length === 0) newErrors.requiredSkills = 'At least one skill is required';
    if (!formData.numberOfOpenings) newErrors.numberOfOpenings = 'Number of openings is required';
    if (!formData.hiringManager) newErrors.hiringManager = 'Hiring manager is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Job Posted:', formData);
    setIsSubmitting(false);
    onOpenChange(false);
    onSuccess?.();
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setNewSkill('');
    setNewCertification('');
    setErrors({});
  };

  const handleInputChange = (field: keyof JobFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      handleInputChange('requiredSkills', [...formData.requiredSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    handleInputChange('requiredSkills', formData.requiredSkills.filter(s => s !== skill));
  };

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      handleInputChange('certifications', [...formData.certifications, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const removeCertification = (cert: string) => {
    handleInputChange('certifications', formData.certifications.filter(c => c !== cert));
  };

  const toggleSourceChannel = (channel: string) => {
    const channels = formData.sourceChannels.includes(channel)
      ? formData.sourceChannels.filter(c => c !== channel)
      : [...formData.sourceChannels, channel];
    handleInputChange('sourceChannels', channels);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Post New Job</DialogTitle>
          <DialogDescription>
            Fill in the job details below. Job ID will be auto-generated upon submission.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Basic Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">
                  Job Title / Position <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="e.g., Production Engineer"
                  className={errors.jobTitle ? 'border-red-500' : ''}
                />
                {errors.jobTitle && <p className="text-xs text-red-500">{errors.jobTitle}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.department} onValueChange={(v) => handleInputChange('department', v)}>
                  <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={formData.location} onValueChange={(v) => handleInputChange('location', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(v) => handleInputChange('employmentType', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfOpenings">
                  Number of Openings <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="numberOfOpenings"
                  type="number"
                  min="1"
                  value={formData.numberOfOpenings}
                  onChange={(e) => handleInputChange('numberOfOpenings', e.target.value)}
                  className={errors.numberOfOpenings ? 'border-red-500' : ''}
                />
                {errors.numberOfOpenings && <p className="text-xs text-red-500">{errors.numberOfOpenings}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hiringManager">
                  Hiring Manager <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="hiringManager"
                  value={formData.hiringManager}
                  onChange={(e) => handleInputChange('hiringManager', e.target.value)}
                  placeholder="e.g., Rajesh Verma"
                  className={errors.hiringManager ? 'border-red-500' : ''}
                />
                {errors.hiringManager && <p className="text-xs text-red-500">{errors.hiringManager}</p>}
              </div>
            </div>
          </div>

          {/* Salary & Budget Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Salary & Budget</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctcMin">
                  CTC Min (₹) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ctcMin"
                  type="number"
                  value={formData.ctcMin}
                  onChange={(e) => handleInputChange('ctcMin', e.target.value)}
                  placeholder="e.g., 350000"
                  className={errors.ctcMin ? 'border-red-500' : ''}
                />
                {errors.ctcMin && <p className="text-xs text-red-500">{errors.ctcMin}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctcMax">
                  CTC Max (₹) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ctcMax"
                  type="number"
                  value={formData.ctcMax}
                  onChange={(e) => handleInputChange('ctcMax', e.target.value)}
                  placeholder="e.g., 500000"
                  className={errors.ctcMax ? 'border-red-500' : ''}
                />
                {errors.ctcMax && <p className="text-xs text-red-500">{errors.ctcMax}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryTemplate">Salary Structure Template</Label>
                <Select value={formData.salaryTemplate} onValueChange={(v) => handleInputChange('salaryTemplate', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryTemplates.map((template) => (
                      <SelectItem key={template} value={template}>{template}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetStatus">Budget Approval Status</Label>
                <Select value={formData.budgetStatus} onValueChange={(v) => handleInputChange('budgetStatus', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetStatuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approvedBy">Approved By</Label>
                <Input
                  id="approvedBy"
                  value={formData.approvedBy}
                  onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                  placeholder="e.g., Department Head"
                />
              </div>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Job Description</h3>
            
            <div className="space-y-2">
              <Label htmlFor="rolesResponsibilities">
                Roles & Responsibilities <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="rolesResponsibilities"
                value={formData.rolesResponsibilities}
                onChange={(e) => handleInputChange('rolesResponsibilities', e.target.value)}
                placeholder="Describe the key responsibilities..."
                rows={4}
                className={errors.rolesResponsibilities ? 'border-red-500' : ''}
              />
              {errors.rolesResponsibilities && <p className="text-xs text-red-500">{errors.rolesResponsibilities}</p>}
            </div>

            <div className="space-y-2">
              <Label>
                Required Skills <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill"
                  list="skill-suggestions"
                />
                <datalist id="skill-suggestions">
                  {skillSuggestions.map((skill) => (
                    <option key={skill} value={skill} />
                  ))}
                </datalist>
                <Button type="button" variant="outline" onClick={addSkill}>
                  <Plus className="size-4" />
                </Button>
              </div>
              {errors.requiredSkills && <p className="text-xs text-red-500">{errors.requiredSkills}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experienceMin">Experience Required (Years)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="experienceMin"
                    type="number"
                    min="0"
                    value={formData.experienceMin}
                    onChange={(e) => handleInputChange('experienceMin', e.target.value)}
                    placeholder="Min"
                    className="w-24"
                  />
                  <span className="text-gray-500">to</span>
                  <Input
                    type="number"
                    min="0"
                    value={formData.experienceMax}
                    onChange={(e) => handleInputChange('experienceMax', e.target.value)}
                    placeholder="Max"
                    className="w-24"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Qualification</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="e.g., B.Tech in Mechanical"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Certifications Required</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="gap-1">
                    {cert}
                    <button
                      type="button"
                      onClick={() => removeCertification(cert)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                  placeholder="Add a certification"
                  list="certification-options"
                />
                <datalist id="certification-options">
                  {certificationOptions.map((cert) => (
                    <option key={cert} value={cert} />
                  ))}
                </datalist>
                <Button type="button" variant="outline" onClick={addCertification}>
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Hiring Info Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Hiring Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recruiter">Recruiter Assigned</Label>
                <Input
                  id="recruiter"
                  value={formData.recruiter}
                  onChange={(e) => handleInputChange('recruiter', e.target.value)}
                  placeholder="e.g., HR Team"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedJoiningDate">Expected Joining Date</Label>
                <Input
                  id="expectedJoiningDate"
                  type="date"
                  value={formData.expectedJoiningDate}
                  onChange={(e) => handleInputChange('expectedJoiningDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Status & Timeline Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Status & Timeline</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobStatus">Job Status</Label>
                <Select value={formData.jobStatus} onValueChange={(v) => handleInputChange('jobStatus', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobStatuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postingDate">Posting Date</Label>
                <Input
                  id="postingDate"
                  type="date"
                  value={formData.postingDate}
                  onChange={(e) => handleInputChange('postingDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Source Channels Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Source Channels</h3>
            
            <div className="space-y-2">
              <Label>Posted On</Label>
              <div className="flex flex-wrap gap-2">
                {sourceChannelOptions.map((channel) => (
                  <Badge
                    key={channel}
                    variant={formData.sourceChannels.includes(channel) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleSourceChannel(channel)}
                  >
                    {channel}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="externalUrl">External Job Link URL</Label>
                <Input
                  id="externalUrl"
                  type="url"
                  value={formData.externalUrl}
                  onChange={(e) => handleInputChange('externalUrl', e.target.value)}
                  placeholder="https://"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="internalRef">Internal Reference Code</Label>
                <Input
                  id="internalRef"
                  value={formData.internalRef}
                  onChange={(e) => handleInputChange('internalRef', e.target.value)}
                  placeholder="e.g., REF-2026-001"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="mr-2">Posting...</span>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                'Post Job'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}