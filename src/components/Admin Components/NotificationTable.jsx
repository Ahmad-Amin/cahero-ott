import React from 'react';

const NotificationTable = ({ onViewNotification }) => {
  const notifications = [
    {
      id: 1,
      name: 'Notification 1',
      recipient: 'User A',
      dataSent: 'Data 1',
      timeSent: '10:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Notification 2',
      recipient: 'User B',
      dataSent: 'Data 2',
      timeSent: '11:00 AM',
      status: 'Sent',
    },
    {
      id: 3,
      name: 'Notification 3',
      recipient: 'User C',
      dataSent: 'Data 3',
      timeSent: '12:00 PM',
      status: 'Sent',
    },
    {
      id: 4,
      name: 'Notification 4',
      recipient: 'User D',
      dataSent: 'Data 4',
      timeSent: '12:00 PM',
      status: 'Failed',
    },
    {
      id: 5,
      name: 'Notification 5',
      recipient: 'User E',
      dataSent: 'Data 5',
      timeSent: '12:00 PM',
      status: 'Sent',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FFEA00'; // Color for Pending
      case 'Sent':
        return '#46d133'; // Color for Sent
      case 'Failed':
        return '#ff0726'; // Color for Failed
      default:
        return 'white'; // Default color
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md ml-10">
      <table className="w-full text-base text-left rtl:text-right text-white">
        <thead className="text-lg text-white uppercase bg-transparent">
          <tr>
            <th scope="col" className="px-6 py-3">
              Notification type
            </th>
            <th scope="col" className="px-6 py-3">
              Recipient
            </th>
            <th scope="col" className="px-6 py-3">
              Data Sent
            </th>
            <th scope="col" className="px-6 py-3">
              Time Sent
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id} className="bg-transparent border-b border-[#878788]">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                {notification.name}
              </th>
              <td className="px-6 py-4">{notification.recipient}</td>
              <td className="px-6 py-4">{notification.dataSent}</td>
              <td className="px-6 py-4">{notification.timeSent}</td>
              <td className="px-6 py-4" style={{ color: getStatusColor(notification.status) }}>
                {notification.status}
              </td>
              <td className="px-6 py-4">
                <button
                  className="font-medium text-white bg-[#6a55ea] hover:bg-[#5242b6] mr-2 rounded-lg h-8 w-auto px-3 ease-in-out transition duration-200"
                  onClick={() => onViewNotification(notification)} // Call the prop function
                >
                  View
                </button>
                <button className="font-medium text-[#6a55ea] hover:bg-[#6a55ea] border border-[#6a55ea] hover:text-white rounded-lg h-8 w-auto px-3 ease-in-out transition duration-200">
                  Resend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;