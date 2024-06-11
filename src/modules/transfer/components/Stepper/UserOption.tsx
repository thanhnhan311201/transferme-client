import React from 'react';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Receiver } from '../../utils/receiver-instance';

const UserOption: React.FC<{
	onHandleAllowToContinue: (isAllow: boolean) => void;
	onlineDevices: {
		id: string;
		clientId: string;
		profilePhoto: string;
		username: string;
		email: string;
	}[];
}> = (props) => {
	const [user, setUser] = useState<string>(Receiver.getInstance().receiver);

	const handleChange = (e: SelectChangeEvent) => {
		setUser(e.target.value);

		if (e.target.value) {
			Receiver.getInstance().receiver = e.target.value;
			props.onHandleAllowToContinue(true);
		} else {
			props.onHandleAllowToContinue(false);
			Receiver.getInstance().receiver = '';
		}
	};

	useEffect(() => {
		if (!Receiver.getInstance().receiver) {
			props.onHandleAllowToContinue(false);
			return;
		}

		props.onHandleAllowToContinue(true);
	}, [Receiver.getInstance().receiver]);

	return (
		<>
			<Box>
				<FormControl fullWidth>
					<InputLabel id="select-user-error-label">Select user *</InputLabel>
					<Select
						labelId="select-user-error-label"
						id="user-option-error"
						value={user}
						label="Select user *"
						onChange={handleChange}
					>
						<MenuItem value={''}>None</MenuItem>
						{props.onlineDevices.map((device) => (
							<MenuItem key={device.id} value={device.clientId}>
								{device.clientId}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</>
	);
};

export default UserOption;
