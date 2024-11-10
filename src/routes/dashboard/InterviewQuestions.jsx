import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterview, postUserAnswerAPI } from "@/api/interview";
import { addQuestions } from "@/redux/slices/questionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { Lightbulb, LoaderCircle, Mic, StopCircle, StopCircleIcon } from "lucide-react";
import { RECORD_INFO } from "@/utils/constants";
import Webcam from "react-webcam";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { model } from "@/api/geminiAi";
import { getUserAnswersPayload, parseJsonFromString } from "@/helpers";
import { useUser } from "@clerk/clerk-react";

const InterviewQuestions = () => {
	const questions = useSelector((state) => state?.questions?.questions) || [];
	const dispatch = useDispatch();
	const { mockId } = useParams();
	const [loading, setLoading] = useState(false);
	const [currentQuestionIdx, setCurrentQuestionIdx] = useState(1);
	const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
	const [postAnswerLoading, setPostAnswerLoading] = useState(false);
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
	const { user } = useUser();
	const navigate = useNavigate();

	const getInterviewData = async () => {
		try {
			setLoading(true);
			const res = await getInterview(mockId);
			console.log(res);

			if (!questions.length) {
				dispatch(addQuestions(res.jsonMockResp));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!questions.length) getInterviewData();
	}, []);

	const handlePrev = () => {
		setCurrentQuestionIdx((prev) => Math.max(1, prev - 1));
	};

	const handleNext = () => {
		setCurrentQuestionIdx((prev) => Math.min(questions.length, prev + 1));
	};

	const getFeedbackFromAI = async () => {
		try {
			setPostAnswerLoading(true);
			const prompt = `I am taking the interview of candidate. The question is ${
				questions[currentQuestionIdx - 1]?.question
			}, the actual answer is - ${
				questions[currentQuestionIdx - 1]?.answer
			} and the candidate has given the answer - ${transcript}. Give me the rating from 0 to 10 for the candidate answer and feedback for the candidate in 1 or 2 lines in JSON format. `;
			const mockResult = await model.generateContent(prompt);
			const res = parseJsonFromString(mockResult.response.text());

			postUserAnswer(res);
		} catch (error) {
			console.log(error);
			setPostAnswerLoading(false);
		}
	};

	const postUserAnswer = async (aiFeedback) => {
		try {
			const currQuestionAns = questions[currentQuestionIdx - 1];
			const userResObj = getUserAnswersPayload(currQuestionAns, transcript, aiFeedback, user, mockId);

			const { data } = await postUserAnswerAPI(userResObj);
			setUserAnswers((prev) => {
				let cloneArr = [...prev];
				cloneArr[currentQuestionIdx - 1] = data;
				return cloneArr;
			});
			resetTranscript();
		} catch (error) {
			console.log(error);
		} finally {
			setPostAnswerLoading(false);
		}
	};

	const handleRecord = () => {
		if (listening) {
			SpeechRecognition.stopListening();
			getFeedbackFromAI();
		} else {
			resetTranscript();
			SpeechRecognition.startListening({ continuous: true });
		}
	};

	const getAnswerOrTranscript = (transcript) => {
		if (!!userAnswers[currentQuestionIdx - 1]) {
			return userAnswers[currentQuestionIdx - 1]?.userAns;
		} else {
			return transcript;
		}
	};

	const getRecordButtonContent = (postAnswerLoading, listening) => {
		if (postAnswerLoading) {
			return (
				<>
					<LoaderCircle className="animate-spin" /> Saving
				</>
			);
		} else if (listening) {
			return (
				<>
					<StopCircleIcon /> Save Answer
				</>
			);
		} else if (!!userAnswers[currentQuestionIdx - 1]) {
			return "Answer Saved";
		} else {
			return (
				<>
					<Mic /> Record Answer
				</>
			);
		}
	};

	const getDisabledStateForRecordBtn = () => {
		if (postAnswerLoading) {
			return true;
		}

		const disabledIfAlreadySubmit = !!userAnswers[currentQuestionIdx - 1];
		return disabledIfAlreadySubmit;
	};

	const getSubmitInterviewState = () => {
		const disabled = userAnswers.some((item) => !item);
		return disabled;
	};

	const handleSubmitInterview = () => {
		navigate(`/dashboard/interview/${mockId}/feedback`);
	};

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	if (loading) return <LoaderCircle className="animate-spin" />;

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-20 mt-2 lg:mt-6 lg:gap-8">
				{/* Left panel for left side questions */}
				<div className="border-2 border-secondary rounded-lg shadow-sm p-6">
					<div className="flex gap-4 flex-wrap">
						{questions.map((item, index) => (
							<Button
								variant="secondary"
								className={classNames(
									"border border-gray-300 shadow-sm hover:scale-105 transition-transform p-1 px-4 rounded-2xl font-semibold",
									{
										"bg-primary text-primary-foreground hover:text-background hover:bg-primary": currentQuestionIdx === index + 1,
									}
								)}
								onClick={() => setCurrentQuestionIdx(index + 1)}
							>{`Question ${index + 1}`}</Button>
						))}
					</div>

					<h1 className="mt-6 text-lg font-medium h-40">{questions?.[currentQuestionIdx - 1]?.["question"]}</h1>

					<div className="flex justify-between">
						<Button variant="secondary" className="mt-6 justify-self-center hover:scale-105" onClick={handlePrev}>
							Previous
						</Button>
						<Button variant="secondary" className="mt-6 justify-self-center hover:scale-105" onClick={handleNext}>
							Next
						</Button>
					</div>

					<div className="p-4 border border-blue-300 bg-blue-100 rounded-lg text-base grid gap-2 mt-8 text-blue-500">
						<span className="flex gap-2">
							<Lightbulb /> <strong>Note</strong>
						</span>
						<p>{RECORD_INFO}</p>
					</div>
				</div>

				{/* Right panel for webcam */}
				<div className="flex flex-col items-center justify-center">
					<Webcam mirrored className="max-h-96" />
					<div className="h-32 overflow-y-auto mt-2">
						<p>{getAnswerOrTranscript(transcript)}</p>
					</div>
					<Button
						variant="secondary"
						className={classNames("mt-6 justify-self-center hover:scale-105", {
							"bg-destructive text-primary-foreground hover:text-destructive": listening,
						})}
						disabled={getDisabledStateForRecordBtn()}
						onClick={handleRecord}
					>
						{getRecordButtonContent(postAnswerLoading, transcript)}
					</Button>
				</div>
			</div>
			<div className="grid justify-end">
				<Button
					disabled={getSubmitInterviewState()}
					onClick={handleSubmitInterview}
					className="hover:scale-105"
				>
					Submit Interview
				</Button>
			</div>
		</>
	);
};

export default InterviewQuestions;