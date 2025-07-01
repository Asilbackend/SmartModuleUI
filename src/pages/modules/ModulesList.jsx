import { Link } from 'react-router-dom';

const ModulesList = () => {
  const fetchModules = () => {
    // Simulated API response
    return [
      { id: 1, name: 'Module A', description: 'Core system module', status: 'Required' },
      { id: 2, name: 'Module B', description: 'Authentication module', status: 'Optional' },
      { id: 3, name: 'Module C', description: 'Payment processing', status: 'Required' },
      { id: 4, name: 'Module D', description: 'User management', status: 'Optional' },
      { id: 5, name: 'Module E', description: 'Analytics dashboard', status: 'Required' },
    ];
  };

  const modules = fetchModules();

  return (
    <div className='mx-auto max-w-7xl space-y-4 px-4 py-6 sm:px-6 lg:px-8'>
      {modules.map((module) => (
        <Link
          key={module.id}
          to={`/modules/${module.id}/content`}
          className='block rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md'
        >
          <div className='flex flex-col justify-between p-4 sm:flex-row sm:items-center sm:p-6'>
            <div className='flex-1'>
              <h3 className='truncate text-base font-semibold text-gray-900 sm:text-lg'>
                {module.name}
              </h3>
              <p className='mt-1 line-clamp-2 text-xs text-gray-600 sm:text-sm'>
                {module.description}
              </p>
            </div>
            <span
              className={`mt-2 rounded-full px-3 py-1 text-xs font-medium sm:mt-0 ${
                module.status === 'Required'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {module.status}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ModulesList;
