import React from 'react';
import { useEffect,useState } from 'react'
import axios from 'axios';
import "./Blog.css"

function Blog () {

    const [posts,setPosts]=useState([])
    const [comments,setComments]=useState([])
    const [users,setUsers]=useState([])
    const [seeComents,setSeeComents]=useState(false)
    useEffect(() => {
        const fetchData=async ()=>
         {
          const postsRes= await axios('https://jsonplaceholder.typicode.com/posts');
           setPosts(postsRes.data);

          const usersRes= await axios('https://jsonplaceholder.typicode.com/users');
          setUsers(usersRes.data);

           const commentsRes= await axios('https://jsonplaceholder.typicode.com/comments');
           setComments(commentsRes.data);

        }
          fetchData();
        }, [])

        return (
            <div className="WrapPost">
            {
            posts.map((item)=>
                    <div className="post">
                      {users.map((user)=>{
                            if (item.userId === user.id)
                            return ( <div> name: {user.name} </div>)
                            
                      })}

                        <h5>{item.title}</h5>
                        <p className="post-body">{item.body}</p>

                        {comments.map((comment) => {
                        if (comment.postId === item.id)
                        return ( <div className="comment-body">  {comment.body}<hr /> </div>)
                        
                    })}
                    
                    </div>)
            }
         </div>
        )
        
    
}

export default Blog