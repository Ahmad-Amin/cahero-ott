import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const WebinarStream = () => {
  const [peerId, setPeerId] = useState("");
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const mediaStreamRef = useRef(null);
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("Peer connection opened with ID:", id);
    });

    peer.on("call", (call) => {
      if (mediaStreamRef.current) {
        console.log("Answering call...");
        call.answer(mediaStreamRef.current); // Send current media stream
        call.on("stream", (remoteStream) => {
          console.log("Received remote stream");
          // Handle received stream from another peer if needed (e.g., spectators)
        });
      }
    });

    peer.on("error", (err) => {
      console.error("PeerJS error:", err);
    });

    peerInstance.current = peer;
  }, []);

  const startStream = () => {
    setStreamStarted(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        mediaStreamRef.current = mediaStream;
        // Mark the stream as started

        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.onloadedmetadata = () => {
            currentUserVideoRef.current.play();
          };
        }

        
      })
      .catch((err) => {
        console.error("Failed to get media stream:", err);
      });
  };

  const endStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (peerInstance.current) {
      Object.keys(peerInstance.current.connections).forEach((peerId) => {
        peerInstance.current.connections[peerId].forEach((call) => {
          call.close();
        });
      });
    }

    if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = null;
    }

    setStreamStarted(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(peerId)
      .then(() => {
        alert("Peer ID copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="App text-white">
      {!streamStarted ? (
        <div className="space-y-7 w-full h-auto ml-5">
          <h1 className="font-semibold text-white text-4xl mb-5">
            Create Or Join Stream Session
          </h1>
          <div>
            <label className="font-semibold text-white text-xl">
              Enter Room Id to join
            </label>
            <p className="text-white font-medium text-base opacity-65">
              You can join rooms both as a spectator or streamer
            </p>
          </div>
          <div>
            <input
              type="text"
              id="room_id"
              className="w-2/5 h-16 rounded-xl border-2 border-white bg-transparent px-3 text-white"
              placeholder="Enter Room Id"
            />
          </div>
          <div className="space-x-5">
            <button className="w-auto h-12 px-3 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg">
              Join Stream as Streamer
            </button>
            <button className="w-auto h-12 px-3 hover:bg-[#6a55ea] border-2 border-[#6a55ea] text-white text-lg font-semibold rounded-lg">
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
              className="w-auto h-12 px-5 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg"
            >
              Start Stream
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
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
            className="w-auto h-12 px-5 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl"
          >
            End Stream
          </button>
        </div>
      )}

      {streamStarted && (
        <div className="space-y-5 mt-5">
          <div className="flex justify-center">
            <video
              className="w-1/2 border-2 border-white rounded-xl"
              ref={currentUserVideoRef}
              playsInline
              autoPlay
              muted
            />
          </div>
          <div className="flex justify-center">
            <h1 className="border-2 border-white rounded-lg w-2/5 flex items-center justify-center h-16 text-xl ">
              <strong>Stream ID:</strong>&nbsp; {peerId}
              <ContentCopyIcon
                className="ml-2 cursor-pointer text-white"
                onClick={copyToClipboard}
                title="Copy Peer ID"
              />
            </h1>
          </div>
          <div className="flex justify-center">
            <p className="text-white font-medium text-base opacity-65">
              You can simply copy your Stream ID to invite others
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebinarStream;
