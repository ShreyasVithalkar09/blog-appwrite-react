import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteServie from "../../appwrite/blog.services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData);

	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});

	const submit = async (data) => {
		if (post) {
			// update
			const file = data.image[0]
				? await appwriteServie.uploadFile(data.image[0])
				: null;

			if (file) {
				// delete old file
				await appwriteServie.deleteFile(post.featuredImage);
			}

			const dbPost = await appwriteServie.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			});

			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			// create
			const file = data.image[0]
				? await appwriteServie.uploadFile(data.image[0])
				: null;

			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;

				const dbPost = await appwriteServie.createPost({
					...data,
					userId: userData.$id,
				});

				if (dbPost) navigate(`/post/${dbPost.$id}`);
			}
		}
	};

	return <div>PostForm</div>;
}

export default PostForm;
