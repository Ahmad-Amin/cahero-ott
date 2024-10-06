import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

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
          offerToReceiveVideo: true
        }
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
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      {!inCall ? (
        <>
          <input
            type="text"
            value={remotePeerIdValue}
            onChange={(e) => setRemotePeerIdValue(e.target.value)}
            placeholder="Enter Admin's Stream ID"
          />
          <button onClick={() => call(remotePeerIdValue)}>Join Stream</button>
        </>
      ) : (
        <button onClick={endCall}>Leave Stream</button>
      )}

      <div>
        <video ref={remoteVideoRef} playsInline autoPlay />
      </div>
    </div>
  );
};

export default JoinStream;
