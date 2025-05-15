import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const HomeIcon = getIcon('Home');
const AlertCircleIcon = getIcon('AlertCircle');

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <motion.div
            className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <AlertCircleIcon className="w-12 h-12 text-red-500" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-surface-900 dark:text-surface-50 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            404
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Page Not Found
          </motion.p>
          
          <motion.p 
            className="text-surface-600 dark:text-surface-400 mb-8 max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Go back home</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;