import React from 'react';

const Transfer: React.FC = () => {
	return (
		<div className="bg-main-bg h-screen">
			<div className="h-full grid grid-cols-3-for-mainLayout">
				<div className="h-full w-full bg-333">
					<div className="flex justify-center items-start">
						<div className="h-full w-[7.5rem] shrink-0 bg-[rgba(29, 32, 62, 0.30)] backdrop-blur-[10px]">
							<div className="h-full w-full"></div>
						</div>
						<div className="h-full w-[22.5rem] shrink-0 bg-[rgba(44, 47, 72, 0.50)]">
							<div className="h-full w-full"></div>
						</div>
					</div>
				</div>
				<div className="h-full w-full bg-555"></div>
				<div className="h-full w-full bg-777"></div>
			</div>
		</div>
	);
};

export default Transfer;
