import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment } from '../api/comments';

type Props = {
  post: Post | null;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  loadingComments: boolean;
  errorLoadComments: boolean;
  writeCommen: boolean;
  setWriteCommen: (writeCommen: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  setComments,
  loadingComments,
  errorLoadComments,
  writeCommen,
  setWriteCommen,
}) => {
  function removeDelete(comment: Comment) {
    setComments([...comments.filter(commentary => commentary !== comment)]);
    deleteComment(comment.id).catch(() => setComments([...comments]));
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {errorLoadComments && !loadingComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !errorLoadComments && !loadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loadingComments && !!comments.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!loadingComments &&
            !!comments.length &&
            comments.map(comment => {
              const { id, email, name, body } = comment;

              return (
                <article
                  key={id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => removeDelete(comment)}
                    />
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              );
            })}

          {!writeCommen && !errorLoadComments && !loadingComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteCommen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeCommen && (
          <NewCommentForm
            postId={post?.id}
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
