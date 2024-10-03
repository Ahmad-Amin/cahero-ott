import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSocket } from '../../Context/Socket';
import usePeer from '../../hooks/usePeer';
import useMediaStream from '../../hooks/useMediaStream';
import AdminRoom from './AdminRoom';  // New component handling the stream

const RoomValidation = () => {
  const router = useRouter();
  const roomId = router.query.roomId;
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const [isRoomValid, setIsRoomValid] = useState(false);

  useEffect(() => {
    if (!roomId || !socket || !peer || !stream) {
      setIsRoomValid(false);
      return;
    }

    socket.emit('check-room-validity', roomId, (isValid) => {
      if (isValid) {
        setIsRoomValid(true);
      } else {
        alert('Room not valid');
        router.push('/');  
      }
    });
  }, [roomId, socket, peer, stream, router]);

  if (!isRoomValid) {
    return <p>Loading...</p>; 
  }

  return <AdminRoom roomId={roomId} peer={peer} myId={myId} stream={stream} socket={socket} />;
};

export default RoomValidation;
