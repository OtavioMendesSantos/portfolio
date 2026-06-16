import { Box, Link, Stack, styled, Theme, Typography } from '@mui/material'
import { LinkedIn } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      sx={(theme: Theme)=>({
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: 'background.default',
        boxShadow: theme.shadows[24],
      })}
    >
        <Typography align="center">
          {t('footer.developedBy')}
        <Link
          href="https://github.com/OtavioMendesSantos"
          target="_blank" 
          rel="noreferrer noopen"
          sx={{ ml: '1ch' }}
        >
          @OtavioMendesSantos
        </Link>
      </Typography>
      <Stack
        direction="row"
        useFlexGap
        sx={{ mt: 2, flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}
      >
        <Link href="https://www.linkedin.com/in/otaviomendessantos/" target="_blank" rel="noreferrer noopen">
          <StyledBox>
            <LinkedIn />
            <Typography>Linkedin</Typography>
          </StyledBox>
        </Link>
        <Link href="mailto:dev.otavioms@gmail.com" target="_blank" rel="noreferrer noopen">
          <StyledBox>
            <EmailIcon />
            <Typography>Email</Typography>
          </StyledBox>
        </Link>
        <Link href="https://github.com/OtavioMendesSantos" target="_blank" rel="noreferrer noopen">
          <StyledBox>
            <GitHubIcon />
            <Typography>Github</Typography>
          </StyledBox>
        </Link>
      </Stack>
    </Box>
  )
}

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.5rem 1rem',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[200],
    color: theme.palette.grey[900],
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.3s ease, color 0.3s ease',
    '& svg': {
      color: theme.palette.grey[900],
      fontSize: '2rem',
      transition: 'color 0.3s ease',
      marginRight: '0.2rem',
    },
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
      transform: 'scale(1.05)',
      color: theme.palette.text.primary,
      'svg': {
        color: theme.palette.primary.main,
      },
      'a': {
        color: theme.palette.text.primary,
      },
    },
  }));

export default Footer
