import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { Box } from "@mui/material";
const JoinStream = () => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [inCall, setInCall] = useState(false); // Track whether user is in the call
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const callInstance = useRef(null); // Reference to the call instance

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    // Create an empty MediaStream, as we are not sending any local media
    const emptyStream = new MediaStream();

    try {
      // Attempt to call the remote peer and pass the offer constraints
      let call = peerInstance.current.call(remotePeerId, emptyStream, {
        constraints: {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        },
      });

      if (!call) {
        throw new Error("Failed to initiate a call. Please check the peer ID.");
      }

      callInstance.current = call; // Save the current call instance for later use
      setInCall(true); // Mark as in call

      // Handle the incoming remote stream
      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.onloadedmetadata = () => {
            remoteVideoRef.current.play();
          };
        }
      });

      // Handle remote stream closure from the admin
      call.on("close", () => {
        alert("The stream has been ended by the admin.");
        handleStreamEnd(); // Handle UI and state reset when stream ends
      });

      // Handle call errors
      call.on("error", (err) => {
        console.error("An error occurred during the call:", err);
        alert("Failed to connect to the stream. Please check the peer ID.");
        handleStreamEnd(); // Reset the UI
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleStreamEnd = () => {
    setInCall(false); // Reset the state to not in call
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null; // Clear the video element
    }
  };

  const endCall = () => {
    if (callInstance.current) {
      callInstance.current.close(); // End the call
      handleStreamEnd(); // Handle UI and state reset
    }
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
        <div className="App flex items-center w-full h-3/5">
          {!inCall ? (
            <>
              <div className="space-y-5 ml-5 w-full">
                <div>
                  <h1 className="font-semibold text-white text-4xl mb-5">
                    Join Stream Session
                  </h1>
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
                    value={remotePeerIdValue}
                    onChange={(e) => setRemotePeerIdValue(e.target.value)}
                    placeholder="Enter Admin's Stream ID"
                    className=" w-2/5 h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
                  />
                </div>
                <button
                  className="w-auto h-12 px-3 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300"
                  onClick={() => call(remotePeerIdValue)}
                >
                  Join Stream
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full mt-32 ml-5">
              <div className="space-y-5">
                <div className="">
                  <h3 className="text-white text-xl font-semibold">
                    Welcome to the Stream!
                  </h3>
                  <p className="text-white font-medium text-base opacity-65">
                    You can Leave Any time just by pressing End Stream Button
                  </p>
                </div>

                <button
                  onClick={endCall}
                  className="w-auto h-12 px-5 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300"
                >
                  End Stream
                </button>
              </div>
              <div className="flex justify-center ">
                <video
                  className="w-1/2 border-2 border-white rounded-xl"
                  ref={remoteVideoRef}
                  playsInline
                  autoPlay
                />
              </div>
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default JoinStream;
