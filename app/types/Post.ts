export type SinglePostType = {
    title: string
    id: string
    createdAt: string
    user: {
        name: string
        image: string
        id:string
        email:string
    }
    Comment? : {
        id:string
        createdAt: string
        postId: string
        userId: string
        message:string
        user: {
            email:string
            id:string
            image:string
            name:string
        }
    }[]
}