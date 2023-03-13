"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

type Comment = {
    title:string
    postId:string
}

export default function AddComment({ id }: Props) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToasId: string;

  const { mutate } = useMutation(
    async (data: Comment) => axios.post("/api/posts/addComment", { data }),
    {
      onMutate: () => {
        commentToasId = toast.loading("Saving Comment...", {
          id: commentToasId,
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("There was an error adding comment", {
            id: commentToasId,
          });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        queryClient.invalidateQueries(['detail-post']);
        toast.success("Added your comment", { id: commentToasId });
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className={`flex items-center justify-between gap-2 `}>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          type="submit"
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white px-6 py-2 rounded-lg disabled:opacity-25"
        >
          Add Comment
        </button>
      </div>
    </form>
  );
}
