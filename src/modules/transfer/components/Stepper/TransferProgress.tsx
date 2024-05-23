import React from 'react';

import Box from '@mui/material/Box';
import LinearProgress, {
	LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const TransferProgressWithLabel: React.FC<
	LinearProgressProps & { value: number }
> = (props) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress color="inherit" variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="inherit">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

export default TransferProgressWithLabel;
