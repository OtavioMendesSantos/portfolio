import { Button, Container } from '@mui/material'
import Loader from '../../components/common/Loader/Loader'
import { StyledTypography } from '../../components/Styled/StyledComponents'

const NotFound = () => {
  return (
    <Container sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <StyledTypography variant="h1">
        <StyledTypography variant="inherit" color='primary'>Error 404:</StyledTypography> NotFound
      </StyledTypography>
      <Loader />
      <Button component="a" href="/">Navegar Para Home</Button>
    </Container>
  )
}

export default NotFound
