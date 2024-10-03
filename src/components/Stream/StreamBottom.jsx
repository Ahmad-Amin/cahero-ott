import { Mic, Video, PhoneOff, MicOff, VideoOff } from 'lucide-react';

const StreamBottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div className="absolute flex justify-between bottom-5 left-0 right-0 mx-auto w-[300px]">
      {muted ? (
        <MicOff
          className="p-4 rounded-full text-black cursor-pointer bg-white hover:bg-buttonPrimary"
          onClick={toggleAudio}
          size={25}
        />
      ) : (
        <Mic
          className="p-4 rounded-full text-black cursor-pointer bg-white hover:bg-buttonPrimary"
          onClick={toggleAudio}
          size={25}
        />
      )}
      {playing ? (
        <Video
          className="p-4 rounded-full text-black cursor-pointer bg-white hover:bg-buttonPrimary"
          onClick={toggleVideo}
          size={25}
        />
      ) : (
        <VideoOff
          className="p-4 rounded-full text-black cursor-pointer bg-white hover:bg-buttonPrimary"
          onClick={toggleVideo}
          size={25}
        />
      )}
      <PhoneOff
        className="p-4 rounded-full text-black cursor-pointer bg-secondary hover:bg-buttonPrimary"
        onClick={leaveRoom}
        size={25}
      />
    </div>
  );
};

export default StreamBottom;
