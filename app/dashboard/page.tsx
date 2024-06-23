import React from 'react'

const Dashboard = () => {
  return (
    <div className='w-full px-4 py-5'>
      <h1 className='text-3xl font-semibold'>Dashboard</h1>
      <div className='mt-6 p-10 bg-gradient-to-br from-sky-700 rounded-xl max-w-sm'>
        <h2 className='text-xl'>Total number of registered students: 12</h2>
      </div>
      <div className='mt-6 font-medium text-lg'>
        <h2>Count per course:</h2>
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <div className='bg-gray-900 p-5 rounded-xl'>
            <p>Software Development:</p>
            <p>5</p>
          </div>
          <div className='bg-gray-900 p-5 rounded-xl'>
            <p>Graphic Design:</p>
            <p>5</p>
          </div>
          <div className='bg-gray-900 p-5 rounded-xl'>
            <p>Photography:</p>
            <p>5</p>
          </div>{" "}
          <div className='bg-gray-900 p-5 rounded-xl'>
            <p>Public Speaking:</p>
            <p>5</p>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default Dashboard