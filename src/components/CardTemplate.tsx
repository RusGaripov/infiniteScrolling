import React from 'react';
import './CardTemplate.css';


/**This type describes users data */
type User2 = {
  email: string;
  name: { title: string; first: string; last: string };
  picture: { large: string; medium: string; thumbnail: string };
};

type User = {
  user: User2;
};

const CardTemplate = (user: User) => {
  const { title, first, last } = user.user.name;
  const { medium, large, thumbnail } = user.user.picture;
  const { email } = user.user;

  return (
    <div className="card">
      <figure className="card__shape">
        <img
          className="card__img"
          srcSet={`${thumbnail} 600w ,${medium} 900w , ${large} 1200w`}
          src={large}
          alt="photo"
        />
      </figure>
      <div className="card__text">
        <h3>{`${title} ${first} ${last}`}</h3>
        <p>{`${email}`}</p>
      </div>
    </div>
  );
};

export default React.memo(CardTemplate);
