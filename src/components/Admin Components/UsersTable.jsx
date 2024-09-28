import React from 'react';

const UsersTable = ({ onViewUser }) => {
  const users = [
    {
      id: 1,
      fullName: 'John Doe',
      userType: 'Admin',
      phoneNumber: '123-456-7890',
      email: 'john.doe@example.com',
      status: 'Active',
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      userType: 'Participant',
      phoneNumber: '234-567-8901',
      email: 'jane.smith@example.com',
      status: 'Active',
    },
    {
      id: 3,
      fullName: 'Alice Johnson',
      userType: 'Host',
      phoneNumber: '345-678-9012',
      email: 'alice.johnson@example.com',
      status: 'Active',
    },
    {
      id: 4,
      fullName: 'Bob Brown',
      userType: 'Participant',
      phoneNumber: '456-789-0123',
      email: 'bob.brown@example.com',
      status: 'Active',
    },
    {
      id: 5,
      fullName: 'Charlie Black',
      userType: 'Admin',
      phoneNumber: '567-890-1234',
      email: 'charlie.black@example.com',
      status: 'Active',
    },
  ];

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'Host':
        return '#FFEA00';
      case 'Admin':
        return '#46d133';
      case 'Participant':
        return '#6a55ea';
      default:
        return 'white';
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md ml-10">
      <table className="w-full text-base text-left rtl:text-right text-white">
        <thead className="text-lg text-white uppercase bg-transparent">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Full Name</th>
            <th scope="col" className="px-6 py-3">User Type</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="bg-transparent border-b border-[#878788]">
              <td className="px-6 py-4">{index + 1}</td>
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                {user.fullName}
              </th>
              <td className="px-6 py-4" style={{ color: getUserTypeColor(user.userType) }}>
                {user.userType}
              </td>
              <td className="px-6 py-4">{user.phoneNumber}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.status}</td>
              <td className="px-6 py-4">
                <button 
                  className="font-medium text-white bg-[#6a55ea] hover:bg-[#5242b6] rounded-lg h-8 w-auto px-5 ease-in-out transition duration-200"
                  onClick={() => onViewUser(user)} // Call the handler with the user
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
