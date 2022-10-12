import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COMMENT } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

const SingleComment = props => {
  const { id: commentId } = useParams();
  console.log(commentId);

  const { loading, data } = useQuery(QUERY_COMMENT, {
    variables: { id: commentId }
  });
  
  const comment = data?.comment || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='commentpages'>
      <div className="card mb-3">
        <div className="card-body">
        <p>{comment.commentText}</p>
          </div>
        <div className="card-body">
          <span style={{ fontWeight: 700 }} className="text-light">
            {comment.username}
          </span>{' '}
          Commented on {comment.createdAt}
        </div>
      </div>

      {comment.reactionCount > 0 && <ReactionList reactions={comment.reactions} />}
      {Auth.loggedIn() && <ReactionForm commentId={comment._id} />}

    </div>
  );
};

export default SingleComment;
