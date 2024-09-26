import { Typography } from "@mui/material";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Import play/pause icons

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause
  const [progress, setProgress] = useState(0); // State for audio progress
  const [isDragging, setIsDragging] = useState(false); // State for dragging progress
  const audioRef = useRef(null); // Reference to the audio element
  const progressBarRef = useRef(null); // Reference to the progress bar element

  // Play/Pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause audio if playing
    } else {
      audioRef.current.play(); // Play audio if paused
    }
    setIsPlaying((prev) => !prev); // Toggle play/pause state
  };

  // Update progress as the audio plays (useCallback ensures the function reference is stable)
  const updateProgress = useCallback(() => {
    if (!isDragging) { // Only update progress if not dragging
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
    }
  }, [isDragging]);

  // Handle seeking by clicking or dragging on the progress bar
  const handleSeek = (e) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect(); // Get the size and position of the progress bar
    const offsetX = e.clientX - rect.left; // Calculate the mouse's X position relative to the progress bar
    const progressBarWidth = rect.width; // Width of the progress bar
    const duration = audioRef.current.duration; // Audio duration
    const newTime = (offsetX / progressBarWidth) * duration;
    audioRef.current.currentTime = newTime; // Seek to the new time
    setProgress((offsetX / progressBarWidth) * 100); // Update the progress bar visually
  };

  // Handle drag start (useCallback to ensure the function reference is stable)
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    handleSeek(e); // Immediately seek to the position where the drag starts
  }, []);

  // Handle drag move (useCallback to ensure the function reference is stable)
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      handleSeek(e); // Update the position while dragging
    }
  }, [isDragging]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    // Listen to time update for the audio
    audioElement.addEventListener("timeupdate", updateProgress);

    // Add event listeners for drag functionality
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Cleanup the event listener on component unmount
      audioElement.removeEventListener("timeupdate", updateProgress);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, updateProgress]); // Include dependencies in useEffect

  return (
    <div style={{ zIndex: 2 }} className="absolute bottom-0 left-0 w-full">
      {/* Audio progress bar */}
      <div
        ref={progressBarRef}
        className="h-1 bg-[#e0d4fd] cursor-pointer"
        onMouseDown={handleMouseDown} // Start dragging
      >
        {/* Dynamic progress bar */}
        <div
          className="h-full bg-[#6a55ea]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Audio Player content */}
      <div className="bg-[#121226] w-full h-24 flex items-center p-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/image1.png`}
          className="w-16 h-16"
          alt="Audio thumbnail"
        />
        <div className="items-center mx-3 flex-grow">
          <Typography className="text-white text-xl font-medium">
            Harry Potter and the Sorcer...
          </Typography>
          <h1 className="text-white text-sm opacity-45">J.K. Rownlings</h1>
        </div>

        {/* Play/Pause Button */}
        <div className="ml-auto">
          <button onClick={togglePlayPause} className="text-white text-3xl">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef}>
        <source
          src={`${process.env.PUBLIC_URL}/audio/HedwigTheme.mp3`}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
