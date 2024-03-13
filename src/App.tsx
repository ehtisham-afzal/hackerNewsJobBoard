import { useState, useEffect } from "react";
import "./index.css";

type storieType = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

function JobStorie({ storie }: { storie: number }) {
  const [storieData, setStorieData] = useState<storieType | null>(null);
  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${storie}.json`)
      .then((res) => res.json())
      .then((data) => setStorieData(data))
      .catch((err) => console.error(err));
      
  }, []);
  return (
    <div className="jobStorie">
      {storieData ? (
        <>
          {storieData.url ? (
            <a
              target="__blank"
              href={storieData?.url}
              className="jobStorieHeadingLink"
            >
              {storieData?.title}
            </a>
          ) : (
            <p className="jobStorieHeading">{storieData?.title}</p>
          )}
          <div className="jobStorieDiscription">
            <p className="recruiter">By {storieData?.by} &middot; </p>
            <p>{new Date(storieData?.time * 1000).toLocaleString()}</p>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default function App({ jobStories }: { jobStories: number[] }) {
  const [allJobStories] = useState<number[] | []>(jobStories);
  const [currentJobStries, setCurrentJobStries] = useState<number[] | []>(
    jobStories.slice(0, 6)
  );

  // useEffect(() => {
  //   fetch("https://hacker-news.firebaseio.com/v0/allJobStories.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllJobStories(data);
  //       setCurrentJobStries(data.slice(0, 6));
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const handleLoadMore = () => {
    setCurrentJobStries([
      ...currentJobStries,
      ...allJobStories.slice(
        currentJobStries.length,
        currentJobStries.length + 6
      ),
    ]);
  };

  return (
    <div className="mainContainer">
      <div className="jobsContainer">
        <h2 className="h2Heading">Hacker News Jobs Board</h2>
        {currentJobStries.length > 0 ? (
          currentJobStries.map((storie, i) => (
            <JobStorie key={i} storie={storie} />
          ))
        ) : (
          <p>Loaing</p>
        )}
        <button
          disabled={allJobStories <= currentJobStries}
          onClick={() => handleLoadMore()}
          className="loadMoreButton"
        >
          {currentJobStries < allJobStories
            ? "Load more jobs"
            : "No More Jobs Availible"}
        </button>
      </div>
    </div>
  );
}
