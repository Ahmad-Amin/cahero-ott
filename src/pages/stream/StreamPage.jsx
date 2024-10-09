import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"; // Import useParams
import { useNavigate } from "react-router-dom";

const StreamPage = () => {
  const { id } = useParams(); // Destructure the id from the parameters
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [inCall, setInCall] = useState(false); 
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const callInstance = useRef(null); 
  const navigate = useNavigate(); // To navigate to the streaming page

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peerInstance.current = peer;

    // Set the remotePeerIdValue when the component mounts
    if (id) {
      setRemotePeerIdValue(id); // Set the remote peer ID from URL parameters
    }

    // Handle incoming call requests
    peer.on("call", (call) => {
      call.answer(); // Answer the call with an empty stream

      // Handle the incoming remote stream
      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.onloadedmetadata = () => {
            remoteVideoRef.current.play();
          };
        }
      });

      call.on("close", () => {
        console.log("The stream has been ended by the admin.");
        toast.error("The stream has been ended");
        handleStreamEnd(); // Handle UI and state reset when stream ends
      });

      callInstance.current = call; // Save the call instance
      setInCall(true); // Mark as in call
    });

    return () => {
      peer.disconnect(); // Clean up the peer connection on component unmount
    };
  }, [id]); // Include id in dependency array to update when it changes

  const call = (remotePeerIdValue) => {
    const emptyStream = new MediaStream();

    try {
      let call = peerInstance.current.call(remotePeerIdValue, emptyStream, {
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

      // Handle call closure and errors
      call.on("close", handleStreamEnd);
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
    navigate("/"); // Navigate back to the main page
  };

  const endCall = () => {
    if (callInstance.current) {
      callInstance.current.close(); // End the call
      handleStreamEnd(); // Handle UI and state reset
    }
  };

  // Add a handler to initiate the call via a button click
  const initiateCall = () => {
    if (remotePeerIdValue) {
      call(remotePeerIdValue);
    } else {
      toast.error("No remote peer ID found!");
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
          <div className="w-full h-full mt-32 ml-5">
            <div className="space-y-5">
              <div className="flex flex-row items-center justify-between">
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
            </div>
            <div className="flex justify-center mt-3 ">
              <video
                className="w-4/6 rounded-xl"
                ref={remoteVideoRef}
                playsInline
                autoPlay
              />
            </div>

            {!inCall && (
              <div className="flex justify-center mt-5">
                <button
                  onClick={initiateCall}
                  className="w-auto h-12 px-5 bg-[#4caf50] text-white text-lg font-semibold rounded-xl"
                >
                  Join Stream
                </button>
              </div>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default StreamPage;
