import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const WebinarStream = () => {
  const [peerId, setPeerId] = useState("");
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const mediaStreamRef = useRef(null); // Store the media stream reference
  const [streamStarted, setStreamStarted] = useState(false);
  const [viewersCount, setViewersCount] = useState(0);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      if (mediaStreamRef.current) {
        // Answer the call with the current local stream (sending video/audio to clients)
        call.answer(mediaStreamRef.current);

        // Increment viewer count when a new call is made
        setViewersCount((prevCount) => prevCount + 1);

        // Listen for when the call ends (viewer leaves)
        call.on("close", () => {
          setViewersCount((prevCount) => Math.max(prevCount - 1, 0)); // Ensure it doesn't go below 0
        });
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
        mediaStreamRef.current = mediaStream; // Store the media stream in ref
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
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null; // Clear the media stream reference
    }

    // Close all active calls/connections
    if (peerInstance.current) {
      const connections = peerInstance.current.connections;
      Object.keys(connections).forEach((peerId) => {
        connections[peerId].forEach((call) => {
          call.close(); // Close the peer-to-peer connection for each client
        });
      });
    }

    // Clear the video elements
    if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = null;
    }

    // Reset viewer count and update stream status
    setViewersCount(0);
    setStreamStarted(false);
  };

  // Function to copy PeerId to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(peerId)
      .then(() => {
        toast.success("Peer ID copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="App text-white">
      {!streamStarted ? (
        <div className="space-y-7 w-full h-auto ml-5">
          <h1 className="font-semibold text-white text-4xl mb-5">
            Create Or join Stream Session
          </h1>
          <div>
            <label className="font-semibold text-white text-xl">
              Enter Room Id to join
            </label>
            <p className="text-white font-medium text-base opacity-65">
              You can join rooms both as spectator and streamer
            </p>
          </div>
          <div>
            <input
              type="text"
              id="room_id"
              className=" w-2/5 h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
              placeholder="Enter Room Id"
            />
          </div>
          <div className="space-x-5">
            <button className="w-auto h-12 px-3 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300">
              Join Stream as Streamer
            </button>
            <button className="w-auto h-12 px-3 hover:bg-[#6a55ea] border-2 border-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300">
              Join Stream as Spectator
            </button>
          </div>
          <div className="pt-5">
            <h3 className="text-white text-xl font-semibold">
              Create your own Stream Session!
            </h3>
            <p className="text-white font-medium text-base opacity-65">
              Press Start Stream button to create your own streaming session
            </p>
          </div>
          <div>
            <button
              onClick={startStream}
              className="w-auto h-12 px-5 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300"
            >
              Start Stream
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-row justify-between items-center">
            <div className="pt-5">
              <h3 className="text-white text-xl font-semibold">
                Welcome to your Streaming Session
              </h3>
              <p className="text-white font-medium text-base opacity-65">
                You can End your Streaming Session just by pressing End Stream
                Button
              </p>
            </div>

            <button
              onClick={endStream}
              className="w-auto h-12 px-5 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300"
            >
              End Stream
            </button>
          </div>
        </div>
      )}

      {streamStarted && (
        <div className="space-y-5 mt-5">
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <h1 className="border-2 border-white rounded-lg flex items-center justify-center p-2 text-xl ">
              <strong>Stream ID:</strong>&nbsp; {peerId}
              <ContentCopyIcon
                className="ml-2 cursor-pointer text-white text-opacity-60 hover:text-opacity-100 ease-in-out transition duration-300"
                onClick={copyToClipboard}
                title="Copy Peer ID"
              />
            </h1>
          </div>

          <div className="flex justify-center">
            <h2 className="text-white text-xl">
              Viewers Count: {viewersCount}
            </h2>
          </div>
        </div>
      )}
      <video
        className=" mx-auto w-4/6 rounded-xl mt-3"
        ref={currentUserVideoRef}
        playsInline
        autoPlay
        muted
      />
    </div>
  );
};

export default WebinarStream;
