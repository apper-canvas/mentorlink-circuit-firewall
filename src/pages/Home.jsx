import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const BookOpen = getIcon('BookOpen');
const Users = getIcon('Users');
const Calendar = getIcon('Calendar');
const ChartLine = getIcon('LineChart');

const Home = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    toast.info(`Switched to ${tab} view`);
  };
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    const tempFunction = () => {
      console.log('abcd');
      temp();
    }

    tempFunction();
  }, [])

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-50 mb-2">
          MentorLink Dashboard
        </h1>
        <p className="text-surface-600 dark:text-surface-400 text-base md:text-lg max-w-2xl">
          Efficiently manage your student-teacher relationships and monitor learning progress
        </p>
      </header>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5 flex gap-4 items-center hover:shadow-lg transition-shadow">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Students</p>
            <p className="text-2xl font-semibold">28</p>
          </div>
        </div>
        
        <div className="card p-5 flex gap-4 items-center hover:shadow-lg transition-shadow">
          <div className="bg-secondary/10 dark:bg-secondary/20 p-3 rounded-lg">
            <BookOpen className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Teachers</p>
            <p className="text-2xl font-semibold">12</p>
          </div>
        </div>
        
        <div className="card p-5 flex gap-4 items-center hover:shadow-lg transition-shadow">
          <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Sessions Today</p>
            <p className="text-2xl font-semibold">8</p>
          </div>
        </div>
        
        <div className="card p-5 flex gap-4 items-center hover:shadow-lg transition-shadow">
          <div className="bg-green-500/10 dark:bg-green-500/20 p-3 rounded-lg">
            <ChartLine className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Completed</p>
            <p className="text-2xl font-semibold">85%</p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => handleTabChange('sessions')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'sessions'
                ? 'text-primary dark:text-primary-light'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            Sessions
            {activeTab === 'sessions' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                layoutId="activeTab"
              />
            )}
          </button>
          
          <button
            onClick={() => handleTabChange('students')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'students'
                ? 'text-primary dark:text-primary-light'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            Students
            {activeTab === 'students' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                layoutId="activeTab"
              />
            )}
          </button>
          
          <button
            onClick={() => handleTabChange('teachers')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'teachers'
                ? 'text-primary dark:text-primary-light'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            Teachers
            {activeTab === 'teachers' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                layoutId="activeTab"
              />
            )}
          </button>
          
          <button
            onClick={() => handleTabChange('progress')}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === 'progress'
                ? 'text-primary dark:text-primary-light'
                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200'
            }`}
          >
            Progress
            {activeTab === 'progress' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                layoutId="activeTab"
              />
            )}
          </button>
        </div>
        
        <MainFeature activeTab={activeTab} />
      </section>
    </motion.div>
  );
};

export default Home;
