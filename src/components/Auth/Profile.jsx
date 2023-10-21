import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";
import appwriteService from "../../appwrite/blog";

import { useNavigate } from "react-router-dom";

function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData === null) navigate("/");

    if (myPosts && myPosts.length === 0) {
      setLoader(true);
      appwriteService
        .getPostsByUser(userData.$id)
        .then((posts) => {
          if (posts) setMyPosts(posts.documents);
        })
        .finally(() => setLoader(false));
    }
  }, [myPosts, navigate, userData]);

  loader && (
    <p className="text-base font-medium text-center my-4">Loading...</p>
  );

  return (
    <>
      <div className="flex space-x-4 mb-6">
        <div className="left-box  py-4 ">
          <div className="bg-yellow-200 p-2 w-32 h-32 rounded-full flex justify-center items-center">
            <h3 className="text-5xl capitalize">
              {userData && userData.name[0]}
            </h3>
          </div>
        </div>

        <div className="right-box  p-4 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3">
            {userData && userData.name}
          </h1>
          <h4 className="font-medium">Email: {userData && userData.email}</h4>
          <h4 className="font-medium">Posts: {myPosts && myPosts.length}</h4>
        </div>
      </div>

      {/* posts section */}
      <div className="posts">
        <div>
          <h3 className="text-xl font-bold mb-3">Your Posts:</h3>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {myPosts &&
            myPosts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
