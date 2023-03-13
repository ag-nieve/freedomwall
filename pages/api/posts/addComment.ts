import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ message: "Please sign in" });

        // Add a comment
        try {

            const { title, postId } = req.body.data

            // Get User
            const prismaUser = await prisma.user.findUnique({
                where: { email: session.user?.email || "" },
            });

            if (!prismaUser)
                return res.status(401).json({ message: "Please sign in to make a comment" });

            if (title.length > 300)
                return res.status(403).json({ message: "Please right a shorter comment" });
            if (title.length <= 0)
                return res
                    .status(403)
                    .json({ message: "Please do not leave this empty" });

            const result = await prisma.comment.create({
                data: {
                    message: title,
                    userId: prismaUser.id,
                    postId: postId
                }
            });

            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({ err: "Error has occured while fetching posts" });
        }
    }
}
