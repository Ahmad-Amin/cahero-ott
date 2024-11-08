// Community.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import LoginedNavbar from "../components/LoginedNavbar";
import Navbar from "../components/Navbar";
import CreatePostModal from "../components/CreatePostModal";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoodIcon from "@mui/icons-material/Mood";
import SendIcon from "@mui/icons-material/Send";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LoadingWrapper from "../components/ui/LoadingWrapper";
const drawerWidth = 280;

const Community = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingPost, setFetchingPosts] = useState(false);

  const members = [
    {
      id: 1,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: `${process.env.PUBLIC_URL}/images/Rectangle.png`,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: `${process.env.PUBLIC_URL}/images/Rectangle.png`,
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: `${process.env.PUBLIC_URL}/images/Rectangle.png`,
    },
  ];

  const fetchAllPosts = async () => {
    try {
      setFetchingPosts(true);
      const response = await axiosInstance.get("/posts");
      console.log(response.data);
      setCommunityPosts(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setFetchingPosts(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePostUpload = async (content, imageLink) => {
    try {
      await axiosInstance.post("/posts", {
        content,
        image: imageLink,
      });
      toast.success("Post created successfully");
      fetchAllPosts();
    } catch (e) {
      console.log("Error creating the post");
    } finally {
    }
  };

  const addCommentToPost = async (postId) => {
    try {
      setAddingComment(true);
      await axiosInstance.post(`/posts/${postId}/comments`, {
        comment: commentText,
      });
      toast.success("Comment added successfully");
      setCommentText("");
      fetchAllPosts();
    } catch (e) {
      console.log("Error creating the comment");
      toast.success("Error creating the comment");
    } finally {
      setCommentText("");
      setAddingComment(false);
    }
  };

  const handleDeleteMyComment = async (postId, commentId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
      toast.success("Comment deleted successfully");
      fetchAllPosts();
    } catch (e) {
      const errorMessage =
        e.response.data.message || "Error deleting the comment";
      console.log("Error deleting the comment", e);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#131213",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LoadingWrapper loading={fetchingPost} >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "70px",
              height: "100%",
              background:
                "linear-gradient(to right, #220e37 0%, rgba(34, 14, 55, 0) 100%)",
            }}
          />
          <div>{currentUser ? <LoginedNavbar /> : <Navbar />}</div>
          <div
            style={{ position: "relative" }}
            className="mt-5 flex flex-rows items-center"
          >
            <p className="flex-1 text-xl mx-8 text-white font-semibold">
              Community
            </p>
            <button
              className="bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 w-auto px-5 h-9 text-white font-semibold mr-10 rounded-lg "
              onClick={handleCreateClick}
            >
              Create
            </button>
          </div>

          <div className="flex flex-row mt-5">
            <div className="flex-1 flex-col mr-5 space-y-5 z-10 flex justify-center">
              {communityPosts.map((post) => (
                <div className="bg-[#101011] w-4/6 mx-8 rounded-lg border-2 border-[#404041]">
                  <div key={post.id}>
                    <div className="flex flex-row items-center bg-transparent w-full h-16 mt-2 border-b-2 border-[#232323]">
                      <div className="w-10 h-10 rounded-full overflow-hidden mx-5">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/Rectangle.png`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-4/5">
                        <h2 className="text-[#b1b1b1] font-semibold">
                          {post.createdBy.firstName}
                        </h2>
                      </div>
                    </div>
                    <div className="border-b-2 border-[#232323]">
                      <p className="text-white m-8 font-light ">
                        {post.content} {post?.hashtags}
                      </p>
                      {post.image && (
                        <div className=" w-full h-[500px] overflow-hidden px-8 my-8">
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full rounded-lg object-center"
                          />
                        </div>
                      )}
                      <div className="flex flex-row my-8">
                        <div className="flex flex-row">
                          <ThumbUpAltIcon className="text-white ml-8 mr-3" />
                          <p className="text-white">{post.likes || 0} Likes</p>
                        </div>
                        <div className="flex flex-row">
                          <CommentIcon className="text-white ml-8 mr-3" />
                          <p className="text-white">
                            {post.comments.length || 0} Comments
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <ShareIcon className="text-white ml-8 mr-3" />
                          <p className="text-white">
                            {post.shares || 0} Shares
                          </p>
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
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            type="text"
                            className="bg-black h-9 text-white rounded-full w-full border border-[#b1b1b1] resize-none outline-none pt-1 pl-3"
                            placeholder="Write your Comment.."
                          />
                        </div>
                      </div>
                      <div className="flex flex-row m-5 space-x-3">
                        {/* <div className="w-10 h-10 rounded-full border border-[#b1b1b1] flex items-center justify-center">
                        <AttachFileIcon className="text-[#b1b1b1]" />
                      </div> */}
                        {/* <div className="w-10 h-10 rounded-full border border-[#b1b1b1] flex items-center justify-center">
                        <MoodIcon className="text-[#b1b1b1]" />
                      </div> */}
                        <div
                          onClick={() => addCommentToPost(post.id)}
                          className="w-10 h-10 rounded-full border border-[#6a55ea] flex items-center justify-center cursor-pointer"
                        >
                          <SendIcon className="text-[#6a55ea]" />
                        </div>
                      </div>
                    </div>
                    <LoadingWrapper loading={loading}>
                      <div className="px-8 flex flex-col gap-5 my-5">
                        {post.comments.map((comment) => (
                          <div className="">
                            <div className="flex flex-row gap-3 items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                  src={comment.user.profileImageUrl}
                                  alt="Profile"
                                  className="w-full h-full object-center"
                                />
                              </div>
                              <div className="flex flex-row justify-between items-center flex-1">
                                <div className="text-white text-xs">
                                  <p className="text-sm">
                                    {comment.user.firstName +
                                      " " +
                                      comment.user.lastName}
                                  </p>
                                  <p className="text-slate-300">
                                    {comment.user.email}
                                  </p>
                                </div>
                                {comment.user.email === currentUser.email && (
                                  <div className="text-red-700">
                                    <DeleteOutlineIcon
                                      className="text-[#e53939] hover:text-[#b22c2c] cursor-pointer"
                                      onClick={() =>
                                        handleDeleteMyComment(
                                          post.id,
                                          comment.id
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="text-white mt-4">{comment.comment}</p>
                            <div className="border-b border-gray-600 mt-2"></div>
                          </div>
                        ))}
                      </div>
                    </LoadingWrapper>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="members-section flex flex-col w-1/4 mx-8 pl-5"
              style={{
                position: "fixed",
                right: "0px",
                top: "100px",
                paddingRight: "1rem",
                marginTop: "20px",
                overflowY: "auto",
                height: "calc(100vh - 100px)",
              }}
            >
              <h1 className="text-white text-lg font-semibold mb-2">Members</h1>
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-row items-center bg-black w-full h-16 border-b-2 border-[#232323]"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden mx-5">
                    <img
                      src={member.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-4/5">
                    <h2 className="text-[#b1b1b1] font-semibold">
                      {member.name}
                    </h2>
                    <p className="text-[#b1b1b1] font-light">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LoadingWrapper>
      </Box>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          handleCloseModal();
        }}
        onPost={handlePostUpload}
        itemType="post"
      />
    </>
  );
};

export default Community;
