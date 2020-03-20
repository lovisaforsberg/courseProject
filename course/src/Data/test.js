import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";



function Test() {
  const [page, setPage] = useState(1);
  const [commitHistory, setCommitHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreCommit = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetch(
      `https://api.kth.se/api/kopps/v2/courses`,
      {
        method: "GET",
        headers: "Origin"
        
      }
    )
      .then(res => res.json())
      .then(response => {
        setCommitHistory(response.items);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page]);

  return (
    <div>
      <h1> API calls with React Hooks </h1>
      {isLoading && <p>Wait I'm Loading comments for you</p>}

      {commitHistory.map((c, index) => (
        <div key={index}>
          {c.code && (
            <>
              <div>
                <h2 style={{ textDecoration: "Underline" }}>
                  {c.department}
                </h2>
              </div>
              <hr />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Test