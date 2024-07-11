// import React, { useState,useEffect } from "react";

// import { useDeletePost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutation";
// import { Models } from "appwrite"
// import { checkIsLiked } from "@/lib/utils";
// import Loader from "./Loader";


// type PostStatsProps ={
//     post? : Models.Document;
//     userId:string;

// }
 
// const PostStats = ({post,userId}:PostStatsProps) => {
  
//   const likesList = post?.likes.map((user:Models.Document)=>user.$id)

//   const[likes,setLikes] = useState(likesList);
//   const[isSaved,setIsSaved]= useState(false);


//   const{mutate:likePost}= useLikePost()


//   const {mutate:savePost ,isPending:isSavingPost} =useSavePost()

//   const{mutate:deleteSavedPost,isPending:isDeletingPost}= useDeletePost()

//   const{data:currentUser} =useGetCurrentUser();
//   const savedPostRecord = currentUser?.save.find(
//     (record: Models.Document) => record.post.$id === post?.$id
//   );

//   useEffect(() => {
//     setIsSaved(!!savedPostRecord);
//   }, [currentUser]);


//   const handleLikedPost =(e:React.MouseEvent)=>{
//     e.stopPropagation();

//     let newLike =[...likes];

//     const hasLiked = newLike.includes(userId)

//     if(hasLiked){
//       newLike = newLike.filter((id)=> id!=userId)

//     }else{
//       newLike.push(userId);

//     }

//     setLikes(newLike);
//     likePost({postId:post?.$id ||"ppostde", likesArray:newLike})
  
//   }
//   const handleSavedPost = (
//     e: React.MouseEvent<HTMLImageElement, MouseEvent>
//   ) => {
//     e.stopPropagation();

//     if (savedPostRecord) {
//       setIsSaved(false);
//       return deleteSavedPost(savedPostRecord.$id);
//     }

//     savePost({postId: post?.$id||'' ,userId: userId  });
//     setIsSaved(true);
//   };
//   return (
//     <div>
//         <div className="flex justify-between items-center z-20">
//             <div className="flex gap-2 mr-5">
//                 <img
//                 src={`${checkIsLiked(likes,userId)? "/assets/icons/liked.svg" :"/assets/icons/like.svg"}`}
//                 alt="like"
//                 width={20}
//                 height={20}
//                 onClick={handleLikedPost}
//                 className="cursor-pointer"
//                 />
//                  <p className="small-medium lg:base-medium">{likes.length}</p>
//             </div>


//             <div className="flex gap-2">
//   {isSavingPost|| isDeletingPost ? <Loader/>    :  <img
//           src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
//           alt="share"
//           width={20}
//           height={20}
//           className="cursor-pointer"
//           onClick={(e) => handleSavedPost(e)}
//         />}
//       </div>

//         </div>

        
      
//     </div>
//   )
// }

// export default PostStats


import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutation";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
   const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  );
};

export default PostStats;