import { useState, useEffect } from 'react';

// Custom hook for formatting message timestamps
export const useMessageTimestamp = (timestamp) => {
    // State to store the formatted timestamp
    const [formattedTimestamp, setFormattedTimestamp] = useState({ hour: '', day: '' });

    useEffect(() => {
        // Set the formatted timestamp
        setFormattedTimestamp(formatTimestamp());
    }, [timestamp]);


    // Function to format the timestamp
    const formatTimestamp = () => {
        const messageDate = new Date(timestamp);
        const currentDate = new Date();
  
        // Calculate the time difference in milliseconds
        const timeDiff = currentDate - messageDate;
  
        // Convert time difference to days
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
        // Format the hour in 24-hour format
        const formattedHour = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  
        if (daysDiff === 0) {
          // Message sent today
          return { hour: formattedHour, day: 'today' };
        } else if (daysDiff === 1) {
          // Message sent yesterday
          return { hour: formattedHour, day: 'yesterday' };
        } else if (daysDiff <= 7) {
          // Message sent in the past week
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayOfWeek = daysOfWeek[messageDate.getDay()];
          return { hour: formattedHour, day: dayOfWeek };
        } else {
          // Message sent more than a week ago
          return { hour: formattedHour, day: messageDate.toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric' }) };
        }
      };
  

    return [formattedTimestamp, formatTimestamp, setFormattedTimestamp]
}