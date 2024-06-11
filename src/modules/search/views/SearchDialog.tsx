import React, { useCallback, useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';

import { IconContext } from 'react-icons';
import { IoSearch } from 'react-icons/io5';

import { useAppSelector, useAppDispatch } from '@/store';
import { closeSearchDialog } from '../core/search.slice';
import useInput from '@/modules/common/hooks/useInput';

import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import AllTab from '../components/AllTab';
import UsersTab from '../components/UsersTab';
import FilesTab from '../components/FilesTab';

export enum SEARCHING_TAB {
	ALL = 'all',
	USERS = 'users',
	FILES = 'files',
}

const userList = [
	{
		id: 1,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: true,
	},
	{
		id: 2,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: true,
	},
	{
		id: 3,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
];

const SearchDialog: React.FC = () => {
	const [selectedSearchingTab, setSelectedSearchingTab] =
		useState<SEARCHING_TAB>(SEARCHING_TAB.ALL);

	const searchValue = useInput();

	const { isOpenSearchDialog } = useAppSelector((state) => state.search);
	const dispatch = useAppDispatch();

	const handleCloseSearchDialog = useCallback(() => {
		dispatch(closeSearchDialog());
	}, []);

	const handleSelectSearchingTab = (tab: SEARCHING_TAB): void => {
		setSelectedSearchingTab(tab);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			console.log(searchValue.value);
		} catch (error: any) {
			searchValue.inputRef.current!.focus();
			toast.error(
				error?.message ||
					'There was an error during the process. Please double check your password and try again.',
			);
		}
	};

	const renderedTab = useMemo(() => {
		switch (selectedSearchingTab) {
			case SEARCHING_TAB.ALL:
				return <AllTab userList={userList} />;
			case SEARCHING_TAB.USERS:
				return <UsersTab userList={userList} />;
			case SEARCHING_TAB.FILES:
				return <FilesTab />;
			default:
				return <div></div>;
		}
	}, [selectedSearchingTab, userList]);

	useEffect(() => {
		if (!isOpenSearchDialog) {
			searchValue.resetValue();
		}
	}, [isOpenSearchDialog]);

	return (
		<Dialog isOpen={isOpenSearchDialog} onClose={handleCloseSearchDialog}>
			<div className="bg-modal h-[58rem] w-[37.5rem] rounded-3xl dark:shadow-[inset_0_0_0_0.0625rem_#232627,0_2rem_4rem_-1rem_rgba(0,0,0,0.33)]">
				<div className="flex h-full w-full flex-col justify-start">
					<form onSubmit={handleSubmit} className="shrink-0">
						<div className="relative">
							<Input
								className={classNames(
									'text-main-text-color placeholder:text-grey/50 !h-[5.5rem] w-full rounded-xl border-none bg-transparent !pl-24 !pr-5 font-["Inter"] !text-2xl !font-semibold outline-none transition-colors',
								)}
								placeholder="Search"
								type="text"
								value={searchValue.value}
								onChange={searchValue.handleValueChange}
								onBlur={searchValue.handleInputBlur}
								ref={searchValue.inputRef}
								extraElement={
									<button className="group absolute left-10 top-2/4 -translate-y-2/4">
										<IconContext.Provider
											value={{
												className:
													'transition-colors fill-grey/50 group-hover:fill-main-text-color',
												style: {
													verticalAlign: 'middle',
													width: '2rem',
													height: '2rem',
													display: 'inline-block',
												},
											}}
										>
											<IoSearch />
										</IconContext.Provider>
									</button>
								}
							/>
						</div>
					</form>
					<div
						className={classNames(
							'border-border-color before:bg-border-btn-color-selected relative flex w-full border-b bg-transparent px-10 before:absolute before:-bottom-[0.0625rem] before:h-[.0625rem] before:w-[calc((100%-5rem)/3)] before:transition-all before:duration-200',
							selectedSearchingTab === SEARCHING_TAB.ALL
								? 'before:left-[2.5rem]'
								: selectedSearchingTab === SEARCHING_TAB.USERS
									? 'before:left-2/4 before:-translate-x-2/4'
									: 'before:right-[2.5rem]',
						)}
					>
						<button
							className={classNames(
								'font-base text-main-text-color hover:text-accent-color-2 group flex h-8 basis-1/3 items-center justify-center font-semibold transition-colors',
								selectedSearchingTab === SEARCHING_TAB.ALL
									? 'text-accent-color-2'
									: 'text-main-text-color',
							)}
							onClick={() => handleSelectSearchingTab(SEARCHING_TAB.ALL)}
						>
							All
						</button>
						<button
							className={classNames(
								'font-base text-main-text-color hover:text-accent-color-2 group flex h-8 basis-1/3 items-center justify-center font-semibold transition-colors',
								selectedSearchingTab === SEARCHING_TAB.USERS
									? 'text-accent-color-2'
									: 'text-main-text-color',
							)}
							onClick={() => handleSelectSearchingTab(SEARCHING_TAB.USERS)}
						>
							Users
						</button>
						<button
							className={classNames(
								'font-base text-main-text-color hover:text-accent-color-2 group flex h-8 basis-1/3 items-center justify-center font-semibold transition-colors',
								selectedSearchingTab === SEARCHING_TAB.FILES
									? 'text-accent-color-2'
									: 'text-main-text-color',
							)}
							onClick={() => handleSelectSearchingTab(SEARCHING_TAB.FILES)}
						>
							Files
						</button>
					</div>
					<div className="grow px-10 pb-6 pt-5">
						<AnimatePresence>{renderedTab}</AnimatePresence>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default SearchDialog;
