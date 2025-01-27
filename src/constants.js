export const API_BASE_URL = 'http://localhost:8000/api/v1';
// You can add specific endpoints as needed, for example:
export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    // Add more endpoints as needed
};

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export const EXERCISE_LIST = [
    'Push-ups', 'Pull-ups', 'Squats', 'Deadlifts', 'Bench Press',
    'Shoulder Press', 'Lunges', 'Planks', 'Bicep Curls'
];