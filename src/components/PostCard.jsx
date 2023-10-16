import React from "react";
import appwriteService from "../appwrite/blog";
import { Link } from "react-router-dom";
import convertTime from "../utils/convertTime";

function PostCard({ $id, title, featuredImage, $createdAt }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card-box w-80 max-h-80 h-56 rounded-md border border-gray-400 p-3 bg-[#FEFCF3] box-">
        <div className="image w-72 h-2/3 border rounded-md mb-2 box-border">
          <img
            className="w-full h-full object-cover rounded-md box-border"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>
        <h2 className="font-semibold text-xl mb-2">{title}</h2>
        <p className="text-xs">{convertTime($createdAt)}</p>
      </div>
    </Link>
  );
}

export default PostCard;
