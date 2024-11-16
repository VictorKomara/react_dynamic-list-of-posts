import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  userSelected: User | null;
  setUserSelected: (userSelected: User) => void;
  getPostUser: (user: User) => void;
  setOpenPostDetails: (openPostDetails: number) => void;
  setWriteCommen: (writeCommen: boolean) => void;
  setPosts: ([]) => void;
  setPost: (post: null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  userSelected,
  setUserSelected,
  getPostUser,
  setOpenPostDetails,
  setWriteCommen,
  setPosts,
  setPost,
}) => {
  const [clickedDropdown, setClickedDropdown] = useState<boolean>(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': clickedDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setClickedDropdown(!clickedDropdown)}
          onBlur={() => setClickedDropdown(false)}
        >
          {userSelected ? (
            <span>{userSelected.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': userSelected?.id === user.id,
              })}
              onMouseDown={() => {
                setUserSelected(user);
                setClickedDropdown(false);
                getPostUser(user);
                setOpenPostDetails(0);
                setWriteCommen(false);
                setPosts([]);
                setPost(null);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
