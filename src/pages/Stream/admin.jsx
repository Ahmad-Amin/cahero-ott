import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useState } from 'react';

export default function AdminHome() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [roomId, setRoomId] = useState('');

  const createAndJoin = () => {
    const newRoomId = uuidv4(); // Generate a new room ID
    navigate(`/dashboard/webinars/webinar-lobby/${newRoomId}?role=streamer`); // Navigate to the new room
  };

  const joinRoomAsSpectator = () => {
    if (roomId) {
      navigate(`/dashboard/webinars/webinar-lobby/${roomId}?role=spectator`); // Navigate as a spectator
    } else {
      alert('Please provide a valid room ID'); // Alert if room ID is invalid
    }
  };

  const joinRoomAsStreamer = () => {
    if (roomId) {
      navigate(`/dashboard/webinars/webinar-lobby/${roomId}?role=streamer`); // Navigate as a streamer
    } else {
      alert('Please provide a valid room ID'); // Alert if room ID is invalid
    }
  };

  return (
    <div className="p-5 bg-transparent text-white">
      <h1 className="text-xl font-semibold">Join Live Webinar Sessions</h1>
      <div className="mt-3 w-full h-full">
        <input
          className="w-1/2 h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)} // Update room ID state
        />
        </div>
        <div className='space-x-5 mt-3'>
        <button className="bg-white w-44 h-14 text-black font-semibold hover:bg-[#cccccc] py-2 px-2 rounded ease-in-out transition duration-300" onClick={joinRoomAsSpectator}>
          Join as Spectator
        </button>
        <button className="bg-white w-44 h-14 text-black font-semibold hover:bg-[#cccccc] py-2 px-2 rounded mt-2 ease-in-out transition duration-300" onClick={joinRoomAsStreamer}>
          Join as Streamer
        </button>
      </div>
      <h2 className="mt-10 text-xl font-semibold">Start Your Own Webinar</h2>
      <button className="bg-white h-14 mt-3 w-auto text-black font-semibold hover:bg-[#6a55ea] py-2 px-4 rounded ease-in-out transition duration-300" onClick={createAndJoin}>
        Create and Join as Streamer
      </button>
    </div>
  );
}
