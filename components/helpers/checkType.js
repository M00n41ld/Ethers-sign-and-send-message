import React from "react";
import Image from "next/image";

const checkType = (prize) => {
  if (!prize) {
    return (<span>Nothing to render</span>);
  }

  const imageRegex = /(jpg|webp|png)/;
  const audioRegex = /(mp3|wav|ogg)/;
  const videoRegex = /(mp4|avi|mkv|mov)/;
  const gifRegex = /(gif)/;

  switch (true) {
    case imageRegex.test(prize):
      return (
        <img
          className="media"
          width={300}
          height={200}
          src={prize}
          alt="prize description"
        />
      );
    case audioRegex.test(prize):
      return <audio className="media" controls src={prize} />;
    case videoRegex.test(prize):
      return (
        <video className="media" width={300} height={200} controls>
          <source src={prize} type={`video/${prize.split(".").pop()}`} />
        </video>
      );
    case gifRegex.test(prize):
      return (
        <img
          className="media"
          width={300}
          height={200}
          src={prize}
          alt="prize description"
        />
      );
    default:
      return <iframe className="media" width={300} height={200} src={prize} />;
  }
};

export default checkType;
