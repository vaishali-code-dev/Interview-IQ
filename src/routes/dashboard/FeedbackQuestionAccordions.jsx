import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FeedbackQuestionAccordions = ({ questionsList }) => {
	return (
		<div className="mt-6">
			<Accordion type="multiple">
				{questionsList.map((item) => (
					<AccordionItem value={item.id}>
						<AccordionTrigger>
							<h1 className="text-start">
								Question: {item?.question} <strong className="text-primary">(Rating: {item.rating}/10)</strong>
							</h1>
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col gap-2">
								<div className="border-2 border-green-300 bg-green-100 text-green-600 p-2 rounded-lg">
									<h1 className="text-start text-base">
										<strong>Actual Answer:</strong> {item?.correctAns}
									</h1>
								</div>
								<div className="border-2 border-blue-300 bg-blue-100 text-blue-600 p-2 rounded-lg">
									<h1 className="text-start">
										<strong>Your Answer:</strong> {item?.userAns}
									</h1>
								</div>
								<div className="border-2 border-yellow-300 bg-yellow-100 text-yellow-600 p-2 rounded-lg">
									<h1 className="text-start">
										<strong>Improvements:</strong> {item?.feedback}
									</h1>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default FeedbackQuestionAccordions;