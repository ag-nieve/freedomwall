"use client";

import Image from "next/image";
import Link from "next/link";

type Post = {
  name: string;
  postTitle: string;
  avatar: string;
  id: string;
  comments?: {
    id:string
        createdAt: string
        postId: string
        userId: string
  }[];
};

export default function Post({ name, postTitle, avatar, id, comments }: Post) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </Link>
      </div>
    </div>
  );
}
