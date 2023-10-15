import { useState, useEffect } from "react";
import appwriteService from "../appwrite/blog";
import { Container, Button } from "../components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import convertTime from "../utils/convertTime";

function Post() {
  const [post, setPost] = useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    if (window.confirm("Are you sure to delete this post?")) {
      appwriteService.deletePost(post.$id).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };

  return post ? (
    <div className="py-6">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600" className="mr-3">
                  Edit
                </Button>
              </Link>

              <Button bgColor="bg-red-600" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <h4>
            Posted by:{" "}
            <span className="font-medium capitalize">{post.author} </span>
            on {convertTime(post.$createdAt)}
          </h4>
        </div>

        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
