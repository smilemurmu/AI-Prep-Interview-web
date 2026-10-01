import {
  createContext,
  useContext,
  useState,
} from "react";

export const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [currentInterview, setCurrentInterview] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  function startInterview(interview) {
    setCurrentInterview(interview);
    setCurrentQuestionIndex(0);
  }

  function clearInterview() {
    setCurrentInterview(null);
    setCurrentQuestionIndex(0);
  }

  return (
    <InterviewContext.Provider
      value={{
        currentInterview,
        setCurrentInterview,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        startInterview,
        clearInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}
