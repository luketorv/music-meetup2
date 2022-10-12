import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments}) => {
  if (!comments.length) {
    return <h3>No comments Yet</h3>;
  }

  return (
    <div>
      {comments &&
        comments.map(comment => (

          <div key={comment._id} className="card mb-3">
         
            <div className="card-body">
              <Link to={`/comment/${comment._id}`}>
                <p>{comment.commentText}</p>
    
                <p className="mb-0">
                <Link
                to={`/profile/${comment.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {comment.username}
              </Link>  ||
                   
                  Replies: {comment.reactionCount} || {' '}
                  {comment.reactionCount ? 'View' : 'Engage'}
                </p>
              </Link>
              <h6> {comment.createdAt} </h6> 
            </div>
  
          </div>
          
        ))}
      
    </div>

  );
};

export default CommentList;