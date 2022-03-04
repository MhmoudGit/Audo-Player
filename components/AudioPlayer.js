import { useState, useRef, useEffect } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaPause, FaPlay } from "react-icons/fa";

const AudioPlayer = () => {
  //state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  //refrences
  const audioPlayer = useRef(); //for the audio component
  const progressBar = useRef(); //for progress bar
  const animationRef = useRef(); // for the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const calculateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secs = Math.floor(seconds % 60);
    const returnedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${returnedMinutes}:${returnedSecs}`;
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) - 30;
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  };

  return (
    <div className="audioPlayer">
      <audio
        ref={audioPlayer}
        src='naruto.mp3'
        preload="metadata"
        loop
      ></audio>

      {/* progress bar*/}
      <div className="cont">
        {/* current time*/}
        <div className="currentTime">{calculateTime(currentTime)}</div>

        <input
          type="range"
          className="progressBar"
          defaultValue={0}
          ref={progressBar}
          onChange={changeRange}
        />

        {/* duration */}
        <div className="duration">
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>

      {/* btns */}
      <div className="btns">
        <button className="forwardBackward" onClick={backThirty}>
          30 <BsArrowLeftShort />
        </button>
        <button className="playPause" onClick={togglePlayPause}>
          {!isPlaying ? <FaPlay className="play" /> : <FaPause />}
        </button>
        <button className="forwardBackward" onClick={forwardThirty}>
          <BsArrowRightShort /> 30
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
