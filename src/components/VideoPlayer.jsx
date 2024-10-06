import React, { useRef, useState, useEffect, useCallback } from 'react'; // Import useCallback
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute, FaCog } from 'react-icons/fa';

const VideoPlayer = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const settingsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);

  let timeoutId;

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleTimeUpdate = () => {
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume / 100;
    setIsMuted(newVolume === 0);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
    setShowSettings(false);
  };

  const hideControls = () => {
    setShowControls(false);
  };

  // Define resetInactivityTimer with useCallback
  const resetInactivityTimer = useCallback(() => {
    setShowControls(true);
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(hideControls, 3000);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('timeupdate', handleTimeUpdate);

    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('click', resetInactivityTimer);
      clearTimeout(timeoutId);
    };
  }, [resetInactivityTimer]); // Include resetInactivityTimer here

  const handleScreenClick = () => {
    handlePlayPause();
  };

  return (
    <div className={`relative w-full max-w-full mx-auto bg-[#131213] flex items-center justify-center ${isFullscreen ? 'h-screen' : ''}`}>
      {showControls && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center bg-transparent text-white opacity-75 hover:opacity-100 text-lg font-semibold py-1 px-3 z-10 cursor-pointer"
        >
          <MdArrowBack className="mr-2" />
          Back
        </button>
      )}

      <div className="relative w-full h-0 pb-[47.7%]">
        <video
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          className="absolute top-0 left-0 w-full h-full cursor-default"
          autoPlay
          muted={isMuted}
          onClick={handleScreenClick}
        >
          Your browser does not support the video tag.
        </video>

        {showControls && (
          <div className="absolute bottom-2 left-0 w-full flex flex-col justify-center items-center p-2 bg-white bg-opacity-50 rounded-lg shadow-lg">
            <div className="flex items-center mb-2 w-full justify-between px-4">
              <button
                onClick={handlePlayPause}
                className="text-white font-semibold py-1 px-3 rounded hover:bg-opacity-75 cursor-pointer"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <div className="flex items-center">
                <button onClick={toggleMute} className="text-white font-semibold py-1 px-3 rounded hover:bg-opacity-75 cursor-pointer">
                  {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="h-2 ml-2 w-16 appearance-none bg-gray-300 rounded-lg hover:bg-[#6e00ff] transition-all"
                />

                <button onClick={toggleFullscreen} className="text-white font-semibold py-1 px-3 rounded hover:bg-opacity-75 ml-2 cursor-pointer">
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>

                <button onClick={toggleSettings} className="text-white font-semibold py-1 px-3 rounded hover:bg-opacity-75 ml-2 cursor-pointer">
                  <FaCog />
                </button>
              </div>
            </div>

            {showSettings && (
              <div ref={settingsRef} className="absolute bottom-12 right-4 bg-white bg-opacity-50 p-3 rounded-lg text-white shadow-md w-48 z-20">
                <div className="mb-2">
                  <h3 className="text-sm mb-1">Playback Speed</h3>
                  <select
                    className="w-full bg-white text-black text-opacity-70 p-1 rounded"
                    value={playbackSpeed}
                    onChange={(e) => handlePlaybackSpeedChange(parseFloat(e.target.value))}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x (Normal)</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-sm mb-1">Video Quality</h3>
                  <select className="w-full bg-white text-black text-opacity-70 p-1 rounded">
                    <option>Auto</option>
                    <option>1080p</option>
                    <option>720p</option>
                    <option>480p</option>
                  </select>
                </div>
              </div>
            )}

            <input
              type="range"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-2 rounded-lg appearance-none bg-gray-300 hover:bg-[#6e00ff] transition-all duration-300 relative"
              style={{
                background: `linear-gradient(to right, #6e00ff ${progress}%, #333333 ${progress}%)`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
