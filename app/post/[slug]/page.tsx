"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { SinglePostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

type URL = {
  params: {
    slug: string;
  };
};

export default function PostDetail(url: URL) {
  const { data, isLoading, isError } = useQuery<SinglePostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  if (isLoading) return "Loading....";
  if (isError) return "Failed to fetch post";

  console.log(data);

  return (
    <div>
      <Post
        name={data.user.name}
        postTitle={data.title}
        avatar={data.user.image}
        id={data.id}
        comments={data.Comment}
      />
      <AddComment id={data.id} />
      {data?.Comment?.map((comment) => (
        <div key={comment.id}>
          <div className="my-6 bg-white p-8 rounded-md">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full"
                width={24}
                height={24}
                src={comment.user?.image}
                alt="avatar"
              />
              <h3 className="font-bold">{comment?.user.name}</h3>
              <h3 className="text-sm">
                {new Date(comment.createdAt).toLocaleDateString()}{" "}
                {new Date(comment.createdAt).toLocaleTimeString()}
              </h3>
            </div>
            <div className="py-4">{comment.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
