function parseJsonFromString(jsonString) {
	try {
		// Remove leading/trailing backticks and extra spaces
		let cleanedString = jsonString.trim();
		if (cleanedString.startsWith("```json")) {
			cleanedString = cleanedString.slice(7, -3).trim();
		}

		// Parse the cleaned string into a JSON object
		const parsedObject = JSON.parse(cleanedString);

		return parsedObject;
	} catch (error) {
		console.error("Error parsing JSON:", error);
		return null;
	}
}

const getUserAnswersPayload = (currQuestionAns, transcript, aiFeedback, user, mockId) => {
	let userResObj = {};

	userResObj["question"] = currQuestionAns.question;
	userResObj["correctAns"] = currQuestionAns.answer;
	userResObj["userAns"] = transcript;
	userResObj["feedback"] = aiFeedback?.feedback;
	userResObj["rating"] = aiFeedback?.rating;
	userResObj["userEmail"] = user.primaryEmailAddress.emailAddress;
	userResObj["mockId"] = mockId;

	return userResObj;
};

function calculateAverageRating(feedbackData) {
	if (!feedbackData || feedbackData.length === 0) {
		return 0; // Return 0 if the data is empty
	}

	const totalRating = feedbackData.reduce((sum, item) => {
		return sum + (parseInt(item.rating) || 0); // Parse rating as integer, default to 0 if invalid
	}, 0);

	const averageRating = totalRating / feedbackData.length;

	// Scale the average to a 10-point system (assuming original rating is out of 5)
	const scaledRating = (averageRating / 5) * 10;

	return Math.round(scaledRating); // Round to nearest integer
}

function formatTimestamp(isoString) {
	const date = new Date(isoString);

	const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with 0 if needed
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
	const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
	const hours = String(date.getHours()).padStart(2, "0"); // Get hours and pad with 0 if needed
	const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes and pad with 0 if needed

	return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export { parseJsonFromString, getUserAnswersPayload, calculateAverageRating, formatTimestamp };