import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_COMMENTS } from "../utils/queries";
import CommentList from "../components/CommentList";
import FriendList from '../components/FriendList';
import CommentForm from '../components/CommentForm';

import { QUERY_ME_BASIC, YOUTUBEID } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_COMMENTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const { data: videoData } = useQuery(YOUTUBEID);
  const comments = data?.comments || [];
  console.log("video data", videoData);
  const loggedIn = Auth.loggedIn();
  return (
<main>
  {videoData && <iframe id="ytplayer" type="text/html" width="640" height="360" src={`https://www.youtube.com/embed/${videoData.youtube}`} title="Music Video of the Day"></iframe>}
  <div className="flex-row justify-space-between">
    {loggedIn && (
      <div className="col-12 mb-3">
        <CommentForm />
      </div>
    )}
    <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CommentList
              comments={comments}
              title="Some Feed for Comment(s)..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
