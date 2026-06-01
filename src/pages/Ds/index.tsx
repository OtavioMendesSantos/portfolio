import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, Collapse, Container, Divider, IconButton, IconButtonProps, Paper, PaperProps, styled, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';

const Ds = () => {
    const theme = useTheme();
    const [paperColapsed, setPaperColapsed] = useState({
        typography: false,
        button: false,
        box: false,
    })

    type PaperOptions = 'typography' | 'button' | 'box';

    const handleClick = (option: PaperOptions) => {
        setPaperColapsed({ ...paperColapsed, [option]: !paperColapsed[option] })
    }

    const colors = {
        background: { ...theme.palette.background },
        primary: { ...theme.palette.primary },
        secondary: { ...theme.palette.secondary },
        text: { ...theme.palette.text },
        error: { ...theme.palette.error },
        success: { ...theme.palette.success },
        info: { ...theme.palette.info },
        warning: { ...theme.palette.warning },
        grey: { ...theme.palette.grey }
    }

    const renderColorBoxes = (colorCategory: string, colorObj: Record<string, string>) => {
        return Object.entries(colorObj).map(([shade, value]) => (
            <Box
                key={`${colorCategory}-${shade}`}
                sx={{
                    backgroundColor: value,
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.getContrastText(value),
                    borderRadius: '8px',
                    my: 2,
                }}
            >
                <Typography variant="body2">
                    {colorCategory} - {shade}: {value}
                </Typography>
            </Box>
        ));
    };

    return (
        <Box>
            <Header position='sticky' />
            <Typography sx={{ my: 2, textAlign: 'center' }} variant="h1">Desing System</Typography>
            <Container sx={{ minHeight: 'calc(100vh - 60px)', height: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <StyledPaper>
                    <Typography sx={{ my: 2, textAlign: 'center' }} variant="h2">
                        Paleta de Cores - {theme.palette.mode} mode
                    </Typography>
                    <StyledIconButton onClick={() => handleClick('box')}>
                        {paperColapsed.box ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </StyledIconButton>
                    <Collapse in={paperColapsed.box}>
                        {Object.entries(colors).map(([colorCategory, colorObj]) => (
                            <React.Fragment key={colorCategory}>
                                <Divider textAlign="left" sx={{ my: 2 }}>
                                    <Chip label={colorCategory} size="small" />
                                </Divider>
                                {renderColorBoxes(colorCategory, colorObj)}
                            </React.Fragment>
                        ))}
                    </Collapse>
                </StyledPaper>
                <StyledPaper>
                    <Typography sx={{ my: 2, textAlign: 'center' }} variant="h2">Tipografia</Typography>
                    <StyledIconButton onClick={() => handleClick('typography')}>
                        {paperColapsed.typography ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </StyledIconButton>
                    <Collapse in={paperColapsed.typography}>
                        <Divider textAlign='left'>
                            <Chip label='variant = h1' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="h1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, accusamus?</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = h2' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="h2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, accusamus?</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = h3' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="h3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, accusamus?</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = h4' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="h4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, accusamus?</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = h5' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="h5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, accusamus?</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = h6' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="h6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, accusamus?</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = body1' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti iste hic qui eum vitae ducimus optio enim nostrum est.</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = body2' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti iste hic qui eum vitae ducimus optio enim nostrum est.</Typography>


                        <Divider textAlign='left'>
                            <Chip label='variant = subtitle1' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="subtitle1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti iste hic qui eum vitae ducimus optio enim nostrum est.</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = subtitle2' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="subtitle2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti iste hic qui eum vitae ducimus optio enim nostrum est.</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = button' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="button">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti iste hic qui eum vitae ducimus optio enim nostrum est.</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = caption' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti iste hic qui eum vitae ducimus optio enim nostrum est.</Typography>

                        <Divider textAlign='left'>
                            <Chip label='variant = overline' size="small" />
                        </Divider>
                        <Typography sx={{ my: 2 }} variant="overline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore corrupti iste hic qui eum vitae ducimus optio enim nostrum est.</Typography>
                    </Collapse>

                </StyledPaper>
                <StyledPaper>
                    <Typography sx={{ my: 2, textAlign: 'center' }} variant="h2">Botão</Typography>
                    <StyledIconButton onClick={() => handleClick('button')}>
                        {paperColapsed.button ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </StyledIconButton>
                    <Collapse in={paperColapsed.button}>
                        <Divider textAlign='left'>
                            <Chip label='variant = contained' size="small" />
                        </Divider>
                        <Button variant="contained" sx={{ my: 2 }}>Lorem ipsum dolor.</Button>

                        <Divider textAlign='left'>
                            <Chip label='variant = text' size="small" />
                        </Divider>
                        <Button variant="text" sx={{ my: 2 }}>Lorem ipsum dolor.</Button>

                        <Divider textAlign='left'>
                            <Chip label='variant = outlined' size="small" />
                        </Divider>
                        <Button variant="outlined" sx={{ my: 2 }}>Lorem ipsum dolor.</Button>
                    </Collapse>
                </StyledPaper>
            </Container>
            <Footer />
        </Box>
    )
}


const StyledIconButton = styled(({ children, ...props }: IconButtonProps) => (
    <IconButton color='primary' {...props}>{children}</IconButton>
))(({ }) => ({
    margin: 'auto',
    width: 'fit-content',
}))

const StyledPaper = styled(({ children, ...props }: PaperProps) => (
    <Paper {...props} elevation={3}>{children}</Paper>
))(({ }) => ({
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column'
}))

export default Ds
