import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selecttorValue } from '../../app/selector';
import Joke from '../joke/Joke';
import './JokeList.css';
import {
  addVote,
  downVote,
  fetchJokes,
  sortVote,
  seenJokes,
} from './JokeListSlice';

const JokeList = () => {
  const dispatch = useDispatch();

  const show = useSelector(selecttorValue);
  const defaultProps = {
    numJokesToGet: 10,
  };
  const [jokes, setJokes] = useState(
    JSON.parse(window.localStorage.getItem('jokes') || '[]')
  );
  const [loading, setLoading] = useState(false);
  // let seenJokes = dispatch(seenJokes())
  useEffect(() => {
    dispatch(sortVote());

    if (show.length === 0) {
      getJokes();
    }
  }, [show]);
  const getJokes = () => {
    // try {
    //   let jokesList = [];
    //   while (jokesList.length < defaultProps.numJokesToGet) {
    //     let res = await axios.get("https://icanhazdadjoke.com/", {
    //       headers: { Accept: "application/json" },
    //     });
    //     let newJoke = res.data.joke;
    //     if (!seenJokes.has(newJoke)) {
    //       jokesList.push({ id: uuid(), text: newJoke, votes: 0 });
    //     } else {
    //       console.log("FOUND A DUPLICATE!");
    //       console.log(newJoke);
    //     }
    //   }
    //   setLoading(false);
    //   setJokes((st) => [...st, ...jokesList]);
    //   window.localStorage.setItem(
    //     "jokes",
    //     JSON.stringify([...show, ...jokesList])
    //   );
    //   console.log(setLoading);
    // } catch (e) {
    //   alert(e);
    //   setLoading(false);
    // }
  };

  const handleClick = () => {
    setLoading(true);
    getJokes();
    const cbDone = (isDone) => {
      if (isDone) {
        setLoading(false);
      }
    };
    dispatch(fetchJokes(null, cbDone));
  };

  if (loading) {
    return (
      <div className="JokeList-spinner">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1 className="JokeList-title">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1 className="JokeList-title">
          <span>Dad</span> Jokes
        </h1>
        <img
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          alt="images"
        />
        <button className="JokeList-getmore" onClick={() => handleClick()}>
          Fetch Jokes
        </button>
      </div>

      <div className="JokeList-jokes">
        {show.map((j, index) => (
          <Joke
            key={index + 1}
            votes={j.votes}
            text={j.joke}
            upvote={() => dispatch(addVote(j.id))}
            downvote={() => dispatch(downVote(j.id))}
          />
        ))}
      </div>
    </div>
  );
};
export default JokeList;
