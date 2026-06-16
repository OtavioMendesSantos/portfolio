import {
    styled,
    Typography,
    TypographyProps as MuiTypographyProps,
    Card
} from "@mui/material";
import { handleOpacityColor } from "../../utils/utils";

interface CustomTypographyProps extends MuiTypographyProps {
    indicate?: boolean;
}

export const StyledTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'indicate',
    // Esta função é usada para controlar quais props devem ser passadas ao DOM. 
    // Nesse caso, estamos dizendo que a prop indicate não deve ser passada ao DOM. 
    // Isso é importante porque indicate não é um atributo HTML válido, e o React emitiria um aviso se tentássemos passá-lo para o DOM.
})<CustomTypographyProps>(({ theme, indicate }) => ({
    ...(indicate && {
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none',
        '&::before': {
            content: '""',
            position: 'absolute',
            left: '-4px',
            bottom: '-6px',
            transform: 'translateY(-50%)',
            width: '15px',
            height: '15px',
            zIndex: -1,
            backgroundColor: theme.palette.primary.main,
            borderRadius: '3px', 
            pointerEvents: 'none',
        },
    })
}))

export const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: handleOpacityColor(theme.palette.primary.main, 0),
    backdropFilter: 'blur(1px)',
    flex: '1 0 400px',
    minHeight: '350px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
        flexBasis: '100%',
    },
    '& .MuiCardContent-root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    ...theme.applyStyles('light', {
        boxShadow: theme.shadows[2],
    }),
}));
