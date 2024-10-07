import axios from 'axios';

const API_URL = 'http://localhost:5000/api/typingtest/results';

// Function to send typing test results to the backend
export const saveTypingTestResult = async (result) => {
    try {
        const response = await axios.post(`${API_URL}/results`, result);
        return response.data;
    } catch (error) {
        console.error('Error saving typing test result:', error);
        throw error;
    }
};

// Function to fetch previous typing test results
export const fetchTypingTestResults = async () => {
    try {
        const response = await axios.get(`${API_URL}/results`);
        return response.data;
    } catch (error) {
        console.error('Error fetching typing test results:', error);
        throw error;
    }
};
