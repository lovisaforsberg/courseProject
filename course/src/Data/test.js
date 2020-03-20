import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";



function Test() {
  const [page, setPage] = useState(1);
  const [commitHistory, setCommitHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreCommit = () => {
    setPage(page + 1);
  };
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const url = `https://api.kth.se/api/kopps/v2/courses`
  useEffect(() => {
    fetch(proxy+url
      ,
      {
        method: "GET",
        
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response)
        setCommitHistory(response.items);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page]);

  return (
    <div>
      <h1> API calls with React Hooks </h1>
      {isLoading && <p>Wait I'm Loading comments for you</p>}

    </div>
  );
}

export default Test