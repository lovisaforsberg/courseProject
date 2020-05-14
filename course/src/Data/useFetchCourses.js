import { useState, useEffect } from "react";


function useFetchCourses(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Access-Control-Allow-Origin': '*'}
  };

  async function fetchUrl() {
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, [url]);
  return [data, loading];
}


export { useFetchCourses };