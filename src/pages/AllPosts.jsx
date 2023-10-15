import { useState, useEffect } from "react";
import appwriteService from "../appwrite/blog";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  return (
    <div className="py-6 w-full">
      <Container>
        {posts.length === 0 && (
          <h2 className="text-center text-3xl">No posts to show! Create One</h2>
        )}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {posts &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
