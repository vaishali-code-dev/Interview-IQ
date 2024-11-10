import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { Lightbulb, LoaderCircle, WebcamIcon } from "lucide-react";
import { getInterview } from "@/api/interview";
import { Button } from "@/components/ui/button";
import { MICROPHONE_INFORMATION } from "@/utils/constants";

const InterviewInformation = () => {
	const questions = useSelector((state) => state?.questions?.questions);
	const [interviewData, setInterviewData] = useState({});
	const [loading, setLoading] = useState(false);
	const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
	const { mockId } = useParams();
	const navigate = useNavigate();

	const getInterviewData = async () => {
		try {
			setLoading(true);
			const res = await getInterview(mockId);
			setInterviewData(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getInterviewData();
	}, []);

	const handleStartInterview = () => {
		navigate(`/dashboard/interview/${mockId}/start`);
	};

	return (
		<div className="px-4 lg:px-20 mt-2 lg:mt-6 grid">
			<h1 className="text-2xl font-bold text-center">Let's Get Started</h1>

			{loading ? (
				<LoaderCircle className="animate-spin" />
			) : (
				<>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div className="grid-cols-1">
							<div className="p-4 border border-secondary rounded-lg text-lg grid gap-2 mt-6">
								<h1>
									<strong>Job Position/ Role Name:</strong> {interviewData?.jobPosition}
								</h1>
								<h1>
									<strong>Tech Stack/ Skill Set:</strong> {interviewData?.jobDesc}
								</h1>
								<h1>
									<strong>Experience:</strong> {interviewData?.jobExperience} years
								</h1>
							</div>
							<div className="p-4 border border-yellow-300 bg-yellow-100 rounded-lg text-base grid gap-2 mt-6 text-yellow-500">
								<span className="flex gap-2">
									<Lightbulb /> <strong>Information</strong>
								</span>
								<p>{MICROPHONE_INFORMATION}</p>
							</div>
						</div>

						<div className="grid-cols-1 mt-6 grid">
							{isWebcamEnabled ? (
								<Webcam mirrored onUserMedia={() => setIsWebcamEnabled(true)} onUserMediaError={() => setIsWebcamEnabled(false)} />
							) : (
								<WebcamIcon className="h-96 w-full bg-secondary py-24 rounded-lg" />
							)}
							<Button
								className="mt-6 justify-self-center"
								variant="secondary"
								onClick={() => setIsWebcamEnabled(!isWebcamEnabled)}
							>
								{isWebcamEnabled ? "Disable" : "Enable"} Webcam and Microphone
							</Button>
						</div>
					</div>
					<Button className="mt-6 lg:mt-10 justify-self-end" onClick={handleStartInterview} disabled={!isWebcamEnabled}>
						Start Interview
					</Button>
				</>
			)}
		</div>
	);
};

export default InterviewInformation;