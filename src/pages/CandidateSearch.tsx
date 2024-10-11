import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<string[]>([]); // Store only the usernames initially
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null); // Store detailed candidate info
  const [currentIndex, setCurrentIndex] = useState(0); // Track current candidate index
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]); // Track saved candidates
  const [loading, setLoading] = useState(true); // Loading state for fetching candidates

  // Fetch a list of candidate usernames on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data.map((candidate: { login: string }) => candidate.login)); // Save only the usernames
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  // Fetch detailed candidate info by username
  useEffect(() => {
    if (candidates.length > 0 && currentIndex < candidates.length) {
      const fetchCandidateDetails = async () => {
        setLoading(true);
        const candidateData = await searchGithubUser(candidates[currentIndex]);
        setCurrentCandidate(candidateData); // Set the detailed candidate data
        setLoading(false);
      };

      fetchCandidateDetails();
    }
  }, [currentIndex, candidates]);

  // Save the current candidate and move to the next
  const handleSaveCandidate = () => {
    if (currentCandidate) {
      setSavedCandidates([...savedCandidates, currentCandidate]);
    }
    handleNextCandidate();
  };

  // Move to the next candidate
  const handleNextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentCandidate(null); // Set to null when no more candidates are available
    }
  };

  // Check if there are no more candidates
  if (loading) {
    return <p>Loading candidate details...</p>;
  }

  if (currentIndex >= candidates.length || !currentCandidate) {
    return <p>No more candidates available.</p>;
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div>
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
          <h2>{currentCandidate.name || currentCandidate.login}</h2>
          <p>Location: {currentCandidate.location || 'N/A'}</p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <p>Email: {currentCandidate.email || 'N/A'}</p>
          <p>GitHub: <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">{currentCandidate.html_url}</a></p>
          <button onClick={handleSaveCandidate}>Save</button>
          <button onClick={handleNextCandidate}>Next</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
