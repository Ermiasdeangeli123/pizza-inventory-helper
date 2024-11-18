import { useState, useEffect } from 'react';

export function useFeedbackTiming() {
  const [shouldShowFeedback, setShouldShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string>('general');

  useEffect(() => {
    // Check if enough time has passed since the last feedback
    const lastFeedbackTime = localStorage.getItem('lastFeedbackTime');
    const now = Date.now();
    const timeThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days

    if (!lastFeedbackTime || now - parseInt(lastFeedbackTime) > timeThreshold) {
      // Show feedback dialog after 5 minutes of session
      const timer = setTimeout(() => {
        setShouldShowFeedback(true);
      }, 5 * 60 * 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const recordFeedbackTime = () => {
    localStorage.setItem('lastFeedbackTime', Date.now().toString());
    setShouldShowFeedback(false);
  };

  return {
    shouldShowFeedback,
    setShouldShowFeedback,
    feedbackType,
    setFeedbackType,
    recordFeedbackTime,
  };
}