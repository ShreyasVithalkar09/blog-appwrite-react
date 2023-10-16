import { useState, useEffect } from "react";
import appwriteService from "../appwrite/blog";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/features/postSlice";

function AllPosts() {
  // const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  // fetch from redux
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    if (posts && posts.length === 0) {
      setLoader(true);
      appwriteService
        .getPosts([])
        .then((posts) => {
          // if (posts) setPosts(posts.documents);
          if (posts) dispatch(setPosts(posts.documents));
        })
        .finally(() => setLoader(false));
    }
  }, [dispatch, posts]);

  return loader ? (
    <p className="text-base font-medium text-center my-4">Loading...</p>
  ) : (
    <div className="py-6 w-full">
      <Container>
        {posts && posts.length === 0 && (
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
