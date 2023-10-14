import React from "react";
import appwriteService from "../appwrite/blog.services";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card-box w-80 rounded-md">
        <div className="image w-full">
          <img
            className="w-full rounded-md"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>
        <h2 className="font-semibold text-xl">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
