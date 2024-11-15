import React from "react";
import classNames from "classnames";

const HowItWorkCard = ({ isLeft = true, imgSrc, title = "Default", description = "Default Desc", customClassname }) => {
	return (
		<div
			className={classNames("flex  flex-col lg:flex-row justify-center gap-2 lg:gap-12 p-6 w-full lg:w-3/4", customClassname, {
				"lg:flex-row-reverse": !isLeft,
			})}
		>
			<div>
				<img src={imgSrc} alt="Pic" className="lg:max-w-[700px] rounded-2xl" />
			</div>

			<div className="flex flex-col gap-2 justify-center items-start">
				<h1 className="text-xl text-primary font-semibold">{title}</h1>
				<h1>{description}</h1>
			</div>
		</div>
	);
};

export default HowItWorkCard;