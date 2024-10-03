import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Peer from "peerjs";
import io from "socket.io-client";
import Player from "../../components/Stream/Player";
import CopySection from "../../components/Stream/CopySection";
import { cloneDeep } from "lodash";
import { Box } from "@mui/material";
import ControlButton from "../../components/Stream/ControlButton";

const Stream = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role");
  const navigate = useNavigate();

  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const [stream, setStream] = useState(null);
  const [originalStream, setOriginalStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState({});
  const [users, setUsers] = useState([]);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false); // Track mic state

  const playerHighlighted = players[myId];

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      host: "your-peer-server.com",
      port: 9000,
      path: "/myapp",
    });
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      setMyId(id);
    });

    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);
        setOriginalStream(userStream);
        setPlayers((prev) => ({
          ...prev,
          [myId]: {
            url: userStream,
            muted: true,
            playing: true,
          },
        }));
      });

    return () => {
      newPeer.destroy();
      newSocket.disconnect();
    };
  }, [myId]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = (newUser) => {
      const call = peer.call(newUser, stream);
      call.on("stream", (incomingStream) => {
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });

      setUsers((prev) => ({
        ...prev,
        [newUser]: call,
      }));
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, socket, stream]);

  useEffect(() => {
    if (!socket) return;

    const handleToggleAudio = (userId) => {
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      users[userId]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, socket, users]);

  useEffect(() => {
    if (!peer) return;

    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });

      setUsers((prev) => ({
        ...prev,
        [callerId]: call,
      }));
    });
  }, [peer, stream]);

  const viewerCount = Object.keys(users).length;

  const toggleAudio = () => {
    setPlayers((prev) => ({
      ...prev,
      [myId]: { ...prev[myId], muted: !prev[myId].muted },
    }));
  };

  const toggleVideo = () => {
    setPlayers((prev) => ({
      ...prev,
      [myId]: { ...prev[myId], playing: !prev[myId].playing },
    }));
  };

  const toggleMic = () => {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled; // Toggle mic state
    });
    setIsMicMuted(!isMicMuted); // Update mic state
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach((track) => track.stop()); // Stop the webcam video

      // Replace the current stream with the screen stream
      setStream(screenStream);
      setPlayers((prev) => ({
        ...prev,
        [myId]: {
          ...prev[myId],
          url: screenStream,
          playing: true, // Ensure video is playing
        },
      }));

      // When screen sharing stops, revert back to the webcam stream
      screenStream.getTracks().forEach((track) => {
        track.onended = () => {
          setStream(originalStream);
          setPlayers((prev) => ({
            ...prev,
            [myId]: {
              ...prev[myId],
              url: originalStream,
            },
          }));
        };
      });

      setIsScreenSharing(true); // Update screen sharing state
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const stopScreenSharing = () => {
    setStream(originalStream);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        ...prev[myId],
        url: originalStream,
      },
    }));
    setIsScreenSharing(false); // Update screen sharing state
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // Stop all media tracks
      setStream(null);
    }

    if (isScreenSharing) {
      stopScreenSharing(); // Ensure the screen sharing is properly stopped
    }

    if (peer) {
      peer.destroy(); // Destroy peer connections and media streams
    }

    if (socket) {
      socket.disconnect();
    }

    setPeer(null);
    setOriginalStream(null);
    setSocket(null);
    setPlayers({});
    setUsers([]);
    setIsScreenSharing(false);
    setIsSpeakerMuted(false);

    if (socket) {
      socket.emit("user-leave", myId);
    }

    navigate(-1);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#131213",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="absolute top-4 right-4 bg-[#404041] text-white px-4 py-2 rounded-md shadow-md">
          Viewers: {viewerCount + 1}
        </div>

        <div className="w-full left-0 right-0 mx-auto top-[20px] bottom-[50px] h-[calc(100vh-20px-100px)] mt-5">
          {playerHighlighted && (
            <Player
              url={playerHighlighted.url}
              muted={playerHighlighted.muted}
              playing={playerHighlighted.playing}
              isActive
            />
          )}
        </div>

        {role === "streamer" && (
          <div className="flex justify-center items-center space-x-5 mt-4 ">
            <div className="w-1/4">
              <CopySection roomId={roomId} />
            </div>
            <ControlButton
              active={!players[myId]?.muted}
              onClick={toggleAudio}
              tooltip="Toggle Audio"
              icon="mic"
            />
            <ControlButton
              active={players[myId]?.playing}
              onClick={toggleVideo}
              tooltip="Toggle Video"
              icon="camera"
            />
            <ControlButton
              active={!isMicMuted} // Toggle mic mute state
              onClick={toggleMic}
              tooltip={isMicMuted ? "Unmute Mic" : "Mute Mic"}
              icon="microphone"
            />
            {!isScreenSharing ? (
              <ControlButton
                active={isScreenSharing}
                onClick={shareScreen}
                tooltip="Share Screen"
                icon="desktop"
              />
            ) : (
              <ControlButton
                active={isScreenSharing}
                onClick={stopScreenSharing}
                tooltip="Stop Screen Sharing"
                icon="desktop"
              />
            )}

            <ControlButton
              active={false}
              onClick={endCall}
              tooltip="End Stream"
              icon="end-call"
            />
          </div>
        )}
        {role === "spectator" && (
          <div className="flex justify-center items-center space-x-5 mt-4 ">
            <div className="w-1/4">
              <CopySection roomId={roomId} />
            </div>
            <ControlButton
              active={!players[myId]?.muted}
              onClick={toggleAudio}
              tooltip="Toggle Audio"
              icon="mic"
            />
            <ControlButton
              active={false}
              onClick={endCall}
              tooltip="End Stream"
              icon="end-call"
            />
          </div>
        )}
      </Box>
    </>
  );
};

export default Stream;
