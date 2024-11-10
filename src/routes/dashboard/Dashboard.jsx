import { useEffect, useState } from "react";
import NewInterview from "./NewInterview";
import { getInterviewList } from "@/api/interview";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "@/helpers";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
	const [interviewList, setInterviewList] = useState([]);
	const { user } = useUser();
	const navigate = useNavigate();

	const fetchInterviewList = async () => {
		try {
			const res = await getInterviewList(user.primaryEmailAddress.emailAddress);
			setInterviewList(res);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchInterviewList();
	}, []);

	const handleClickPreviousInterview = (mockId) => {
		navigate(`/dashboard/interview/${mockId}/feedback`);
	};

	return (
		<div className="px-4 lg:px-32 lg:pt-14 flex flex-col gap-2">
			<h1 className="text-2xl font-bold text-primary">Dashboard</h1>
			<h1>Create and start your Interview</h1>

			<NewInterview />

			{interviewList && interviewList.length ? <h1 className="text-xl font-semibold mt-14">Previous Interviews</h1> : null}

			<div className="flex gap-5 mt-2 flex-wrap">
				{interviewList && interviewList.length
					? interviewList.map((item) => (
							<div
								key={item.id}
								onClick={handleClickPreviousInterview.bind(this, item.mockId)}
								className="min-w-72 border-2 border-secondary shadow-lg rounded-lg flex flex-col gap-2 justify-start text-xl font-semibold hover:scale-105 transition-all p-6 cursor-pointer"
							>
								<p className="text-lg text-primary">
									<strong className="font-bold">{item.jobPosition}</strong>
								</p>
								<p className="text-base">
									<strong className="font-bold">Experience: </strong>
									{item.jobExperience} years
								</p>
								<p className="text-base">
									<strong className="font-bold">Created on: </strong>
									{formatTimestamp(item.createdAt)}
								</p>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}