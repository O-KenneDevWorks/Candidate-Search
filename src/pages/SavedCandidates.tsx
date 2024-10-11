import { useState, useEffect } from 'react';
import { getSavedCandidates, removeCandidate } from '../utils/localStorageUtils';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = getSavedCandidates();
    setSavedCandidates(candidates);
  }, []);

  const handleRemoveCandidate = (id: number) => {
    removeCandidate(id);
    setSavedCandidates(getSavedCandidates()); // Update the state after removal
  };

  if (savedCandidates.length === 0) {
    return <p>No potential candidates saved.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img
                  src={candidate.avatar_url}
                  alt={`${candidate.login}'s avatar`}
                  style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '50px',
                    borderRadius: '25%'
                  }}
                />
              </td>
              <td>
                {candidate.name ? `${candidate.name} (${candidate.login})` : candidate.login}
              </td>
              <td>{candidate.location || 'N/A'}</td>
              <td>{candidate.email || 'N/A'}</td>
              <td>{candidate.company || 'N/A'}</td>
              <td>{candidate.bio || 'N/A'}</td>
              <td style={{
                textAlign: 'center',
                verticalAlign: 'middle'
              }}>
                <button
                  className="circle-btn-minus"
                  onClick={() => handleRemoveCandidate(candidate.id)}
                  style={{
                    height: '40px',
                    width: '40px',
                    fontSize: '30px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    lineHeight: '40px',
                  }}
                >
                  <code>&#8212;</code>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default SavedCandidates;
