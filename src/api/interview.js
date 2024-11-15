const BASE_URL = import.meta.env.VITE_BASE_URL;

const createInterview = async (interviewData) => {
	const response = await fetch(`${BASE_URL}/interviews`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(interviewData),
	});

	if (!response.ok) {
		throw new Error("Failed to create interview");
	}
	const jsonResponse = await response.json();
	return jsonResponse;
};

const getInterview = async (mockId) => {
	const response = await fetch(`${BASE_URL}/interviews/${mockId}`, {
		method: "GET",
	});

	const jsonResponse = await response.json();
	return jsonResponse;
};

const getInterviewList = async (userEmail) => {
	const response = await fetch(`${BASE_URL}/interviewList/${userEmail}`, {
		method: "GET",
	});

	const jsonResponse = await response.json();
	return jsonResponse;
};

const postUserAnswerAPI = async (userAnswer) => {
	const response = await fetch(`${BASE_URL}/interviews/userAnswer`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userAnswer),
	});

	const jsonResponse = await response.json();
	return jsonResponse;
};

const getFeedbackAPI = async (mockId) => {
	const response = await fetch(`${BASE_URL}/feedback/${mockId}`, {
		method: "GET",
	});

	const jsonResponse = await response.json();
	return jsonResponse;
};

const postResume = async (formData) => {
	const response = await fetch(`${BASE_URL}/upload-resume`, {
		method: "POST",
		body: formData, // Pass FormData directly as the body
	});

	if (!response.ok) {
		throw new Error("Failed to upload resume");
	}

	const jsonResponse = await response.json();
	return jsonResponse;
};

export { createInterview, getInterview, getInterviewList, postUserAnswerAPI, getFeedbackAPI, postResume };