import Loading from "@/components/Loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";



import Comment from "@/components/Comment";

import { decode } from 'entities'
import moment from "moment";
import RelatedBlog from "@/components/RelatedBlog";
import { getEnv } from "@/helpers/getenv";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import LikeCount from "@/components/LikeCount";
import CommentCount from "@/components/CommentCounts";
import React, { useState } from "react";



const SingleBlogDetails = () => {
  const { blog, category } = useParams();
  const [refreshComments, setRefreshComments] = useState(0);

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },[blog, category]
  );

  if (loading) return <Loading />;
  return (
    <div className="md:flex-nowrap flex-wrap flex justify-between gap-20">
      {data && data.blog && (
        <>
          <div className="border rounded md:w-[70%] w-full ">
            <h1 className="text-2xl font-bold pl-4 mt-2">{data.blog.title}</h1>
            <div className="flex justify-between items-center gap-4">
              <div className="flex justify-between items-center gap-4">
                <Avatar className="ml-4">
                  <AvatarImage
                    className="rounded"
                    src={data.blog.author.avatar}
                  />
                </Avatar>
                <div>
                  <p className="font-bold">{data.blog.author.name}</p>
                  <p>
                    Date: {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-2 mr-4">
                <LikeCount props ={{blogid: data.blog._id }} />
               <CommentCount props= {{blogid: data.blog._id}} refresh={refreshComments} />
              </div>
            </div>
            <div className=" flex justify-center items-center my-5 ">
              <img
                src={data.blog.featuredImage}
                className="flex justify-center w-[95%] shadow-lg shadow-slate-400  rounded "
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decode(data.blog.blogContent) || "",
              }}
            ></div>
            <div className="border-t mt-5 pt-5">
              <Comment props={{ blogid: data.blog._id }} onNewComment={() => setRefreshComments(prev => prev + 1)} />
            </div>
            {/* <div className="border-t mt-5 pt-5">
          <CommentList props={{ blogid: data.blog._id }} />
            </div> */}
          </div>
        </>
      )}
      <div className="border rounded md:w-[30%] w-full">
        <RelatedBlog props={{ category: category, currentBlog: blog}}/>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
