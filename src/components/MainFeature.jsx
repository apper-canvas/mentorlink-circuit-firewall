import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const Calendar = getIcon('Calendar');
const Clock = getIcon('Clock');
const BookOpen = getIcon('BookOpen');
const Edit = getIcon('Edit');
const Trash = getIcon('Trash');
const Plus = getIcon('Plus');
const CheckCircle = getIcon('CheckCircle');
const XCircle = getIcon('XCircle');
const Student = getIcon('GraduationCap');
const Teacher = getIcon('Users');

// Initial sessions data
const initialSessions = [
  {
    id: 1,
    studentName: "Emma Thompson",
    teacherName: "Dr. Michael Chen",
    subject: "Mathematics",
    date: "2023-05-15",
    time: "10:00",
    duration: 60,
    status: "completed"
  },
  {
    id: 2,
    studentName: "James Wilson",
    teacherName: "Prof. Sarah Johnson",
    subject: "Physics",
    date: "2023-05-16",
    time: "14:30",
    duration: 45,
    status: "scheduled"
  },
  {
    id: 3,
    studentName: "Olivia Martinez",
    teacherName: "Dr. David Kim",
    subject: "Chemistry",
    date: "2023-05-17",
    time: "09:15",
    duration: 90,
    status: "scheduled"
  },
  {
    id: 4,
    studentName: "Noah Garcia",
    teacherName: "Prof. Emily Rodriguez",
    subject: "Biology",
    date: "2023-05-14",
    time: "16:00",
    duration: 60,
    status: "cancelled"
  }
];

const MainFeature = ({ activeTab }) => {
  const [sessions, setSessions] = useState(initialSessions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    teacherName: "",
    subject: "",
    date: "",
    time: "",
    duration: 60,
    status: "scheduled"
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  
  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) newErrors.studentName = "Student name is required";
    if (!formData.teacherName.trim()) newErrors.teacherName = "Teacher name is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.duration || formData.duration <= 0) newErrors.duration = "Valid duration is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editId !== null) {
      // Update existing session
      setSessions(sessions.map(session => 
        session.id === editId ? { ...formData, id: editId } : session
      ));
      toast.success("Session updated successfully!");
    } else {
      // Add new session
      const newSession = {
        ...formData,
        id: Date.now()
      };
      setSessions([...sessions, newSession]);
      toast.success("New session created!");
    }
    
    // Reset form
    setFormData({
      studentName: "",
      teacherName: "",
      subject: "",
      date: "",
      time: "",
      duration: 60,
      status: "scheduled"
    });
    setEditId(null);
    setIsFormOpen(false);
  };
  
  const handleEdit = (session) => {
    setFormData({
      studentName: session.studentName,
      teacherName: session.teacherName,
      subject: session.subject,
      date: session.date,
      time: session.time,
      duration: session.duration,
      status: session.status
    });
    setEditId(session.id);
    setIsFormOpen(true);
  };
  
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this session?")) {
      setSessions(sessions.filter(session => session.id !== id));
      toast.info("Session deleted");
    }
  };
  
  const handleCancel = () => {
    setFormData({
      studentName: "",
      teacherName: "",
      subject: "",
      date: "",
      time: "",
      duration: 60,
      status: "scheduled"
    });
    setEditId(null);
    setIsFormOpen(false);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };
  
  const getTabContent = () => {
    switch (activeTab) {
      case 'sessions':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Manage Sessions</h3>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Session</span>
              </button>
            </div>
            
            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="card p-6">
                    <h4 className="text-lg font-medium mb-4">
                      {editId !== null ? "Edit Session" : "Create New Session"}
                    </h4>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Student Name
                        </label>
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleInputChange}
                          className={`w-full ${errors.studentName ? 'border-red-500 dark:border-red-500' : ''}`}
                          placeholder="Enter student name"
                        />
                        {errors.studentName && (
                          <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Teacher Name
                        </label>
                        <input
                          type="text"
                          name="teacherName"
                          value={formData.teacherName}
                          onChange={handleInputChange}
                          className={`w-full ${errors.teacherName ? 'border-red-500 dark:border-red-500' : ''}`}
                          placeholder="Enter teacher name"
                        />
                        {errors.teacherName && (
                          <p className="text-red-500 text-xs mt-1">{errors.teacherName}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full ${errors.subject ? 'border-red-500 dark:border-red-500' : ''}`}
                          placeholder="Enter subject"
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className={`w-full ${errors.date ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.date && (
                          <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Time
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className={`w-full ${errors.time ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.time && (
                          <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          min="15"
                          step="15"
                          className={`w-full ${errors.duration ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.duration && (
                          <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full"
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2 flex gap-3 justify-end mt-4">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-4 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                          {editId !== null ? "Update Session" : "Create Session"}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="overflow-x-auto pb-2">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-100 dark:bg-surface-800 text-left">
                    <th className="p-3 rounded-tl-lg">Student</th>
                    <th className="p-3 hidden md:table-cell">Teacher</th>
                    <th className="p-3 hidden sm:table-cell">Subject</th>
                    <th className="p-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Date</span>
                      </div>
                    </th>
                    <th className="p-3 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Time</span>
                      </div>
                    </th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.length > 0 ? (
                    sessions.map((session) => (
                      <motion.tr
                        key={session.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800/60"
                      >
                        <td className="p-3">
                          <div className="font-medium">{session.studentName}</div>
                        </td>
                        <td className="p-3 hidden md:table-cell">{session.teacherName}</td>
                        <td className="p-3 hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span>{session.subject}</span>
                          </div>
                        </td>
                        <td className="p-3 hidden lg:table-cell">{session.date}</td>
                        <td className="p-3 hidden md:table-cell">{session.time}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                            {session.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {session.status === "cancelled" && <XCircle className="w-3 h-3 mr-1" />}
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(session)}
                              className="p-1.5 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
                              aria-label="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(session.id)}
                              className="p-1.5 text-surface-600 hover:text-red-500 dark:text-surface-400 dark:hover:text-red-400 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
                              aria-label="Delete"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-surface-500 dark:text-surface-400">
                        No sessions found. Create your first session.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="text-center p-8">
            <Student className="w-16 h-16 text-primary mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-semibold mb-2">Student Management</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
              This section is under development. You'll be able to manage your students here soon.
            </p>
            <button 
              onClick={() => handleTabChange('sessions')}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Return to Sessions
            </button>
          </div>
        );
      case 'teachers':
        return (
          <div className="text-center p-8">
            <Teacher className="w-16 h-16 text-secondary mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-semibold mb-2">Teacher Management</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
              This section is under development. You'll be able to manage your teachers here soon.
            </p>
            <button 
              onClick={() => handleTabChange('sessions')}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
            >
              Return to Sessions
            </button>
          </div>
        );
      case 'progress':
        return (
          <div className="text-center p-8">
            <div className="w-16 h-16 text-accent mx-auto mb-4 opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
              This section is under development. You'll be able to track student progress here soon.
            </p>
            <button 
              onClick={() => handleTabChange('sessions')}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-amber-600"
            >
              Return to Sessions
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="card overflow-hidden">
      {getTabContent()}
    </div>
  );
};

export default MainFeature;