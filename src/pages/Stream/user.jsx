import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useState } from 'react';
import { Box } from '@mui/material';
export default function UserHome() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [roomId, setRoomId] = useState('');

  const joinRoomAsSpectator = () => {
    if (roomId) {
      navigate(`/user-lobby/${roomId}?role=spectator`); // Navigate as spectator
    } else {
      alert('Please provide a valid room ID'); // Alert if room ID is invalid
    }
  };

  return (
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#131213",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
    <div className="p-5 mx-5 bg-transparent text-white mt-24">
    <h1 className="text-xl font-semibold">Join Live Webinar Sessions</h1>
    <div className="mt-3 w-full h-full">
      <input
        className="w-1/2 h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      </div>
      <div className='space-x-5 mt-3'>
      <button className="bg-white w-44 h-14 text-black font-semibold hover:bg-[#cccccc] py-2 px-2 rounded ease-in-out transition duration-300" onClick={joinRoomAsSpectator}>
        Join Now
      </button>
    </div>
  </div>
  </Box>
  );
}
