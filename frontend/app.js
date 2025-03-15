
//frontend>app.js
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const getCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/cars`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

// Submit booking data
export const bookCar = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URL}/api/booking`, bookingData);
        return response.data;
    } catch (error) {
        console.error("Error booking car:", error.response?.data || error.message);
        throw error;
    }
};
// Submit feedback form
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_URL}/api/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};
//submit subscrition form
export const purchaseSubscription = async (subscriptionData) => {
    try {
        const response = await fetch('http://localhost:5000/api/subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscriptionData)
        });
        return response.json();
    } catch (error) {
        console.error("Error purchasing subscription:", error);
        throw new Error("Failed to purchase subscription. Please try again.");
    }
};

// Submit contact form 
export const contact = async (contactData) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact`, contactData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw new Error("Failed to send message. Please try again.");
  }
};