import { Divider, IconButton, Stack, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface HeaderModalProps {
    title: string
    onClose: () => void,
}

const HeaderModal = ({ title, onClose }: HeaderModalProps) => {
    return (
        <>
            <Stack
                direction="row"
                sx={{ position: 'relative', p: 2, justifyContent: 'center', alignItems: 'center' }}
            >
                <Typography variant="h2" sx={{ px: 4, textAlign: 'center' }}>
                    {title}
                </Typography>
                <IconButton onClick={onClose} color='primary' sx={{ position: 'absolute', right: 10 }}>
                    <CloseRoundedIcon />
                </IconButton>
            </Stack>
            <Divider />
        </>
    )
}

export default HeaderModal