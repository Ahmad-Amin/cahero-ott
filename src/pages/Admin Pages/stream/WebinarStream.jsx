import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const WebinarStream = () => {
  const [peerId, setPeerId] = useState("");
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const mediaStreamRef = useRef(null);  // Store the media stream reference
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      if (mediaStreamRef.current) {
        // Answer the call with the current local stream (sending video/audio to clients)
        call.answer(mediaStreamRef.current);
      }
    });

    peerInstance.current = peer;
  }, []);

  const startStream = () => {
    const getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        mediaStreamRef.current = mediaStream;  // Store the media stream in ref
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.onloadedmetadata = () => {
            currentUserVideoRef.current.play();
          };
        }

        // Mark the stream as started
        setStreamStarted(true);
      })
      .catch((err) => {
        console.error("Failed to get media stream", err);
      });
  };

  const endStream = () => {
    // Stop all tracks (video and audio)
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;  // Clear the media stream reference
    }
  
    // Close all active calls/connections
    if (peerInstance.current) {
      const connections = peerInstance.current.connections;
      Object.keys(connections).forEach(peerId => {
        connections[peerId].forEach(call => {
          call.close(); // Close the peer-to-peer connection for each client
        });
      });
    }
  
    // Clear the video elements
    if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = null;
    }
  
    // Update stream status
    setStreamStarted(false);
  };

  return (
    <div className="App text-white">

      {!streamStarted ? (
        <button
          onClick={startStream}
          className="w-44 h-12 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300"
        >
          Start Stream
        </button>
      ) : (
        <button
          onClick={endStream}
          className="w-44 h-12 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300"
        >
          End Stream
        </button>
      )}

      {streamStarted && <h1 className="text-xl">
        <strong>Stream ID:</strong> {peerId}
      </h1>}
      <div>
        <video ref={currentUserVideoRef} playsInline autoPlay muted />
      </div>
    </div>
  );
};

export default WebinarStream;
