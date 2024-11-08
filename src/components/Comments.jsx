import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Comments = () => {
  const commentsData = [
    {
      id: 1,
      name: "Alicia",
      date: "10/04/2024",
      comment:
        "Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi non arcu risus quis varius.",
      likes: 10,
      replies: 20,
      rating: 4.5,
    },
    {
      id: 2,
      name: "John",
      date: "10/05/2024",
      comment:
        "Nulla facilisi. Donec ac odio tempor orci dapibus ultrices in iaculis. In fermentum posuere urna nec tincidunt.",
      likes: 5,
      replies: 8,
      rating: 4,
    },
  ];

  return (
    <div>
      {commentsData.map((comment) => (
        <div
          key={comment.id}
          className="bg-[#101011] mx-8 my-4 rounded-lg border-2 border-[#404041]"
        >
          <div>
            <div className="flex flex-row items-center bg-transparent w-full h-16 mt-2">
              <div className="w-10 h-10 rounded-full overflow-hidden mx-5">
                <img
                  src={`${process.env.PUBLIC_URL}/images/Rectangle.png`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-4/5">
                <h2 className="text-[#b1b1b1] font-semibold">{comment.name}</h2>
                <div className="flex flex-row space-x-2 items-center">
                  <p className="text-yellow-400 flex items-center">
                    {[...Array(Math.round(comment.rating))].map((_, index) => (
                      <StarIcon key={index} fontSize="small" />
                    ))}
                  </p>
                  <p className="font-light text-white text-xs">
                    {comment.date}
                  </p>
                </div>
              </div>
              <div className="text-white flex justify-end ml-10">
                    <MoreVertIcon/>
              </div>
            </div>
            <div className="border-b-2 border-[#232323]">
              <p className="text-white m-5 font-light">{comment.comment}</p>
              <div className="flex flex-row my-5">
                <div className="flex flex-row">
                  <ThumbUpAltIcon className="text-white ml-8 mr-3" />
                  <p className="text-white">{comment.likes} Likes</p>
                </div>
                <div className="flex flex-row">
                  <ChatIcon className="text-white ml-8 mr-3" />
                  <p className="text-white">{comment.replies} Replies</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex-1">
                <div className="flex items-center m-5">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/Rectangle.png`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <textarea
                    type="text"
                    className="bg-black h-10 rounded-full w-full border border-[#b1b1b1] resize-none outline-none pt-1 pl-3"
                    placeholder="Write your Comment.."
                  />
                </div>
              </div>
              <div className="flex flex-row m-5 space-x-3">
                <div className="w-10 h-10 rounded-full border border-[#b1b1b1] flex items-center justify-center">
                  <MoodIcon className="text-[#b1b1b1]" />
                </div>
                <div className="w-10 h-10 rounded-full border border-[#6a55ea] flex items-center justify-center">
                  <SendIcon className="text-[#6a55ea]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
