import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFeedbackAPI } from "@/api/interview";
import { calculateAverageRating } from "@/helpers";
import FeedbackQuestionAccordions from "./FeedbackQuestionAccordions";
import { Button } from "@/components/ui/button";

const Feedback = () => {
	const [questionsList, setQuestionsList] = useState([]);
	const { mockId } = useParams();
	const navigate = useNavigate();

	const fetchQuestionsList = async () => {
		try {
			const res = await getFeedbackAPI(mockId);
			setQuestionsList(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchQuestionsList();
	}, []);

	const handleClickGoToDashboard = () => {
		navigate("/dashboard");
	};

	return (
		<div className="px-4 lg:px-20 mt-2 lg:mt-6 grid">
			<h1 className="text-2xl font-bold ">Here is your Interview Feedback!</h1>

			<p className="text-lg mt-6 font-semibold text-primary">
				Your Average Rating is: {calculateAverageRating(questionsList)}/10
			</p>
			<p className="text-base mt-2">
				Below are the correct answers for the questions with individual ratings and some feedbacks for improvements
			</p>

			<FeedbackQuestionAccordions questionsList={questionsList} />

			<Button className="justify-self-center mt-6" variant="secondary" onClick={handleClickGoToDashboard}>
				Go to Dashboard
			</Button>
		</div>
	);
};

export default Feedback;