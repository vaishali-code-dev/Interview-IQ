import { Button } from "@/components/ui/button";
import {  ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Vector from "../utils/assets/Vector1.png";
import InterviewList from "../utils/assets/InterviewListDark.jpg";
import NewInterview from "../utils/assets/NewInterviewDark.jpg";
import InterviewFeedback from "../utils/assets/InterviewFeedbackDark.jpg";
import InterviewQuestionsPic from "../utils/assets/InterviewDark.jpg";
import HowItWorkCard from "./landing/HowItWorkCard";
import Footer from "./Footer";

export default function IndexPage() {
	const navigate = useNavigate();

	const handleClickTry = () => {
		navigate("/dashboard");
	};

	const HOW_IT_WORKS_CARDS_DATA = [
		{
			title: "Previous Interviews",
			description: "You can start and read feedbacks about your previous taken interviews.",
			imgSrc: InterviewList,
			isLeft: true,
		},
		{
			title: "Start New Interview",
			description: "Just upload your resume or fill the job role, skills and exerience to start a fresh interview.",
			imgSrc: NewInterview,
			isLeft: false,
		},
		{
			title: "Record Answers",
			description: "Enable webcam and record the answers",
			imgSrc: InterviewQuestionsPic,
			isLeft: true,
		},
		{
			title: "Rating and Feedbacks",
			description: "Check the rating and feedback for the overall and particular question also.",
			imgSrc: InterviewFeedback,
			isLeft: false,
		},
	];

	return (
		<div>
			<div className="flex flex-col lg:flex-row items-center lg:justify-normal lg:h-screen-minus-10rem  bg-gradient-to-r from-blue-200 to-blue-500">
				{/* bg-gradient-to-r from-slate-900 to-blue-800 */}
				<div className="p-8 lg:p-14">
					<h1 className="text-xl lg:text-2xl font-semibold mb-6">Interview IQ</h1>
					<h1 className="font-extrabold text-4xl lg:text-8xl ">Elevate your</h1>
					<h1 className="font-extrabold text-4xl lg:text-8xl ">
						tech <span className="text-primary"> interviews</span>
					</h1>

					<Button
						className="mt-12 bg-primary-foreground text-secondary-foreground hover:bg-secondary font-bold"
						onClick={handleClickTry}
					>
						Try it out <ArrowRight />
					</Button>
				</div>
				<div>
					<img src={Vector} alt="Decorative Vector" className=" w-[650px]" />
				</div>
			</div>

			<div className="flex flex-col justify-center mt-4 mb-8">
				<div className="flex justify-center">
					<ChevronDown className="text-muted-500 text-center" size={70} />
				</div>
				<div className="text-center">
					<h1 className="font-bold text-xl lg:text-3xl text-muted-foreground">How does it work?</h1>
				</div>

				<div className="flex flex-col items-center space-y-2 lg:space-y-8 justify-center mt-4">
					{HOW_IT_WORKS_CARDS_DATA.map((item, index) => (
						<HowItWorkCard {...item} key={index} />
					))}
				</div>
			</div>

			<Footer />
		</div>
	);
}