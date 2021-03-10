import React, {  useEffect, useState } from "react";
import Joke from "./Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "./JokeList.css";

const JokeList = () => {
   const defaultProps = {
    numJokesToGet: 10
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
  //     loading: false
  //   };
  //   this.seenJokes = new Set(this.state.jokes.map(j => j.text));
  //   console.log(this.seenJokes);
  //   this.handleClick = this.handleClick.bind(this);
  // }
  const [jokes, setJokes] = useState(JSON.parse(window.localStorage.getItem("jokes") || "[]"))
  const [loading, setLoading] = useState(false);
  let seenJokes = new Set(jokes.map(j => j.text));
  console.log(seenJokes)
  useEffect(() => {
    if (jokes.length === 0){
      getJokes()
    console.log(seenJokes)}
  }, [jokes])
   const getJokes= async () => {
    try {
      let jokesList = [];
      while (jokesList.length < defaultProps.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });
        let newJoke = res.data.joke;
        if (!seenJokes.has(newJoke)) {
          jokesList.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE!");
          console.log(newJoke);
        }
      }
     
      setLoading(false);
      setJokes(st=> [...st, ...jokesList])
      window.localStorage.setItem("jokes", JSON.stringify([...jokes, ...jokesList])) 
      console.log(setLoading)
      
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  }
  const handleVote = (id, delta) => {
    setJokes(st =>
      st.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
    ))
   
  }
  const handleClick = () => {
    setLoading(true);
    getJokes()
    
  }
  
    if (loading) {
      return (
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='JokeList-title'>Loading...</h1>
        </div>
      );
    }
    let jokess = jokes.sort((a, b) => b.votes - a.votes);

    // console.log('jokess', jokess);

    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            <span>Dad</span> Jokes
          </h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="images" />
          <button className='JokeList-getmore' onClick={() =>handleClick()}>
            Fetch Jokes
          </button>
        </div>

        <div className='JokeList-jokes'>
          {jokess.map((j, index) => <Joke
              key={index+1}
              votes={j.votes}
              text={j.text}
              upvote={() =>handleVote(j.id, 1)}
              downvote={() =>handleVote(j.id, -1)}
            />)}
        </div>
      </div>
    );
  
}
export default JokeList;
