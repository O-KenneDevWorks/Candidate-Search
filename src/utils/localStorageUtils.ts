import { Candidate } from '../interfaces/Candidate.interface';

// const LOCAL_STORAGE_KEY = 'savedCandidates';

// Function to get saved candidates from local storage
export const getSavedCandidates = (): Candidate[] => {
  const savedCandidates = localStorage.getItem('savedCandidates');
  return savedCandidates ? JSON.parse(savedCandidates) : [];
};

// Function to save candidates to local storage
export const saveCandidate = (candidate: Candidate) => {
  const currentCandidates = getSavedCandidates();
  const updatedCandidates = [...currentCandidates, candidate];
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};

// Function to remove a candidate by id
export const removeCandidate = (id: number) => {
  const currentCandidates = getSavedCandidates();
  const updatedCandidates = currentCandidates.filter(
    (candidate: Candidate) => candidate.id !== id
  );
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};