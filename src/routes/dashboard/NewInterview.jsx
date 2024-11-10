import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { INTERVIEW_TYPES } from "@/utils/constants";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { model } from "@/api/geminiAi";
import { LoaderCircle } from "lucide-react";
import { parseJsonFromString } from "@/helpers";
import { useDispatch } from "react-redux";
import { addQuestions } from "@/redux/slices/questionsSlice";
import { createInterview, getInterviewList } from "@/api/interview";
import { useUser } from "@clerk/clerk-react";

const NewInterview = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [interviewType, setInterviewType] = useState(INTERVIEW_TYPES[1].id);
	const [formValues, setFormValues] = useState({
		jobPosition: "",
		techStack: "",
		experience: "",
		resume: null,
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useUser();

	const handleChange = (e) => {
		const { id, value, files } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[id]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const prompt = `Job role: ${formValues.jobPosition}, Tech Stack:${formValues.techStack} and Experience: ${formValues.experience} years. Please give me 5 interview questions with answers in json format. Please give only technical questions.`;

			const mockResult = await model.generateContent(prompt);
			const res = parseJsonFromString(mockResult.response.text());
			dispatch(addQuestions(res));

			const jsonResp = await createInterview({
				jsonMockResp: JSON.stringify(res),
				jobPosition: formValues.jobPosition,
				jobDesc: formValues.techStack,
				jobExperience: formValues.experience,
				createdBy: user.primaryEmailAddress.emailAddress,
			});

			if (jsonResp.mockId) {
				navigate(`/dashboard/interview/${jsonResp.mockId}`);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getFormOptions = () => {
		return (
			<form onSubmit={handleSubmit} className="mt-6">
				{interviewType === INTERVIEW_TYPES[0].id ? (
					<div className="grid w-full items-center gap-1.5">
						<Label htmlFor="email">Upload Resume here</Label>
						<Input id="resume" type="file" onChange={handleChange} />
					</div>
				) : (
					<div className="grid gap-4">
						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="jobPosition">Job Position/ Role Name</Label>
							<Input
								id="jobPosition"
								placeholder="Ex. Full Stack Developer"
								value={formValues.jobPosition}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="techStack">Tech Stack/ Skill Set</Label>
							<Textarea
								id="techStack"
								placeholder="Ex. React, JavaScript, NodeJs, Express.Js"
								value={formValues.techStack}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="experience">Experience</Label>
							<Input
								id="experience"
								placeholder="Ex. 5"
								type="number"
								min="0"
								max="50"
								value={formValues.experience}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				)}
				<div className="grid justify-end mt-4">
					<div className="flex gap-4">
						<Button onClick={() => setIsOpen(false)} variant="secondary" type="submit">
							Cancel
						</Button>
						<Button disabled={isLoading}>
							{isLoading ? (
								<span className="flex items-center gap-2">
									<LoaderCircle className="animate-spin" /> Starting Interview
								</span>
							) : (
								"Start Interview"
							)}
						</Button>
					</div>
				</div>
			</form>
		);
	};

	return (
		<div className="mt-2">
			<button
				onClick={() => setIsOpen(true)}
				className="h-24 w-72 bg-secondary shadow-lg rounded-lg flex justify-center items-center text-xl font-semibold hover:scale-105 transition-all"
			>
				+ New Interview
			</button>

			{/* Dialog for Interview type selection */}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-xl">Tell Us More About the Type of Interview</DialogTitle>
					</DialogHeader>

					<DialogDescription>
						<RadioGroup defaultValue={interviewType} orientation="horizontal" onValueChange={setInterviewType}>
							<div className="flex items-center space-x-4">
								{INTERVIEW_TYPES.map((item) => (
									<div key={item.id} className="flex items-center space-x-2">
										<RadioGroupItem value={item.id} id={item.id} />
										<Label htmlFor={item.id}>{item.label}</Label>
									</div>
								))}
							</div>
						</RadioGroup>

						{getFormOptions()}
					</DialogDescription>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default NewInterview;