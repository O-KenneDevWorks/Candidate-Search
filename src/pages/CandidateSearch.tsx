import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { saveCandidate } from '../utils/localStorageUtils';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<string[]>([]); // Store only the usernames initially
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null); // Store detailed candidate info
  const [currentIndex, setCurrentIndex] = useState(0); // Track current candidate index
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
        
        // If the candidate is valid, display their details; otherwise, skip
        if (candidateData && candidateData.id) {
          setCurrentCandidate(candidateData);
        } else {
          console.log("Failed to gather account: ", candidates[currentIndex])
          handleNextCandidate(); // Skip invalid candidate
        }
        setLoading(false);
      };

      fetchCandidateDetails();
    }
  }, [currentIndex, candidates]);

  // Save the current candidate and move to the next
  const handleSaveCandidate = (candidate: Candidate) => {
    saveCandidate(candidate);
    handleNextCandidate(); // Move to the next candidate
  };

  // Move to the next candidate
  const handleNextCandidate = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleSkipCandidate = () => {
    handleNextCandidate(); // Skip the current candidate
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
      <div style={{ width: '300px', margin: '0 auto', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', borderRadius: '10px', overflow: 'hidden' }}>
          <img
            src={currentCandidate.avatar_url}
            alt={`${currentCandidate.login}'s avatar`}
            style={{
              width: '300px',
              height: '100%',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          />
          <div
            style={{
              width: '300px',
              flexGrow: 1,
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
            }}
          >
            <p style={{ marginLeft: 15 }}>
              Name: {`${currentCandidate.name || 'N/A'} (${currentCandidate.login})`}
            </p>
            <p style={{ marginLeft: 15 }}>Location: {currentCandidate.location || 'N/A'}</p>
            <p style={{ marginLeft: 15 }}>Email: {currentCandidate.email || 'N/A'}</p>
            <p style={{ marginLeft: 15 }}>Company: {currentCandidate.company || 'N/A'}</p>
            <p style={{ marginLeft: 15 }}>Bio: {currentCandidate.bio || 'N/A'}</p>
          </div>
        </div>

        <div
          className="button-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '300px',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          <button onClick={handleSkipCandidate} className="circle-btn-minus">
            <code>&#8212;</code>
          </button>
          <button onClick={() => handleSaveCandidate(currentCandidate)} className="circle-btn-plus">
            +
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
