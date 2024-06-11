import React from 'react';

import { motion } from 'framer-motion';
import classNames from 'classnames';

import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import Input from '@/components/Input';

const ProfileTab: React.FC = () => {
	const userName = 'Phan Nguyễn Thành Nhân';
	const email = 'nhanpnt.dev@gmail.com';
	const profilePhoto =
		'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/437918699_3781431168759185_919186230840647234_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YSAu2Ddpc6EQ7kNvgGePJYH&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYAYOTLa2mjWjOH_la28r0CrNkXqLXjqpZX63E8CoOlTOA&oe=665D2BFF';

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex h-full w-full flex-col justify-start gap-8"
		>
			<div className="text-main-text-color shrink-0 font-['Inter'] text-3xl font-bold tracking-tight">
				Profile
			</div>
			<div className="flex grow flex-col justify-start gap-6">
				<div className="flex flex-col justify-start gap-3">
					<div className="font-base text-main-text-color font-semibold">
						Avatar
					</div>
					<div className="bg-setting-dialog__input-bg-color w-28 shrink-0 basis-28 rounded-full">
						<img
							className="w-full rounded-full"
							src={profilePhoto}
							alt="User avatar"
							referrerPolicy="no-referrer"
							crossOrigin="anonymous"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
				<div className="flex flex-col justify-start gap-2">
					<div className="font-base text-main-text-color font-semibold">
						Name
					</div>
					<Input
						className={classNames(
							'bg-setting-dialog__input-bg-color placeholder:text-grey/50 border-setting-dialog__input-bg-color rounded-xl border-2 outline-none transition-colors focus:bg-transparent',
						)}
						placeholder="Name"
						type="text"
						value={userName}
						disabled
						icon={
							<IconContext.Provider
								value={{
									style: {
										verticalAlign: 'middle',
										width: '1.5rem',
										height: '1.5rem',
										fill: userName
											? 'rgba(108, 114, 117)'
											: 'rgba(108, 114, 117, 0.5)',
									},
								}}
							>
								<FaUser />
							</IconContext.Provider>
						}
					/>
				</div>
				<div className="flex flex-col justify-start gap-2">
					<div className="font-base text-main-text-color font-semibold">
						Email
					</div>
					<Input
						className={classNames(
							'bg-setting-dialog__input-bg-color placeholder:text-grey/50 border-setting-dialog__input-bg-color rounded-xl border-2 outline-none transition-colors focus:bg-transparent',
						)}
						placeholder="Email"
						type="text"
						value={email}
						disabled
						icon={
							<IconContext.Provider
								value={{
									style: {
										verticalAlign: 'middle',
										width: '1.5rem',
										height: '1.5rem',
										fill: email
											? 'rgba(108, 114, 117)'
											: 'rgba(108, 114, 117, 0.5)',
									},
								}}
							>
								<MdEmail />
							</IconContext.Provider>
						}
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default ProfileTab;
