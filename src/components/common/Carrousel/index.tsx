import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Box, Divider, Grid, IconButton, IconButtonProps, Stack, styled, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { handleOpacityColor } from "../../../utils/utils";

interface CarrouselProps<T> {
    items: T[];
    renderImage: (item: T, index: number, isActive: boolean, prevAnimation: "left" | "right" | null) => React.ReactNode;
    renderDescription: (item: T, index: number, isActive: boolean) => React.ReactNode;
}

const Carrousel = <T,>({ items, renderImage, renderDescription }: CarrouselProps<T>) => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(1);
    const [prevAnimation, setPrevAnimation] = useState<"left" | "right" | null>(null);
    const [autoClick, setAutoClick] = useState(true);
    const refAction = useRef<ReturnType<typeof setInterval> | null>(null);

    const handleClick = useCallback(
        (direction: "left" | "right", automatic: boolean = true) => {
            if (!automatic) {
                setAutoClick(false);
            }
            setPrevAnimation(direction);
            if (direction === "left") {
                setActiveIndex((prevState) => (prevState === 1 ? items.length : prevState - 1));
            } else if (direction === "right") {
                setActiveIndex((prevState) => (prevState === items.length ? 1 : prevState + 1));
            }
        },
        [items.length]
    );

    useEffect(() => {
        if (autoClick && items.length > 0) {
            refAction.current = setInterval(() => {
                handleClick("right");
            }, 5000);
        }

        return () => {
            if (refAction.current) {
                clearInterval(refAction.current);
            }
        };
    }, [autoClick, handleClick, items.length]);

    if (!items || items.length === 0) return null;

    return (
        <Grid container sx={{ minHeight: "50vh" }} spacing={2}>
            <Grid size={{ xs: 12, sm: 8, md: 6 }}>
                <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            zIndex: 2,
                        }}
                    >
                        {activeIndex} / {items.length}
                    </Typography>

                    <StyledIconButton sx={{ left: "8px", zIndex: 2 }} onClick={() => handleClick("left", false)}>
                        <KeyboardArrowLeftRoundedIcon />
                    </StyledIconButton>

                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                        }}
                    >
                        {items.map((item, index) => renderImage(item, index + 1, index + 1 === activeIndex, prevAnimation))}
                    </Box>

                    <StyledIconButton sx={{ right: "8px", zIndex: 2 }} onClick={() => handleClick("right", false)}>
                        <KeyboardArrowRightRoundedIcon />
                    </StyledIconButton>

                    <Stack
                        direction="row"
                        sx={{
                            position: "absolute",
                            bottom: "10px",
                            width: "100%",
                            justifyContent: "space-around",
                            alignItems: "center",
                            zIndex: 2,
                        }}
                        divider={<Divider orientation="vertical" sx={{ bgcolor: theme.palette.grey[400], height: "20px" }} />}
                    >
                        {items.map((_, index) => (
                            <Box
                                key={index + 1}
                                sx={{
                                    cursor: "pointer",
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "50%",
                                    bgcolor: index + 1 === activeIndex ? theme.palette.primary.main : theme.palette.grey[400],
                                    "&:hover": {
                                        bgcolor: theme.palette.primary.light,
                                    },
                                }}
                                onClick={() => {
                                    setActiveIndex(index + 1);
                                    setAutoClick(false);
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, md: 6 }} sx={{ flex: "1", position: "relative" }}>
                {items.map((item, index) => renderDescription(item, index + 1, index + 1 === activeIndex))}
            </Grid>
        </Grid>
    );
};

interface StyledIconButtonProps extends IconButtonProps {
    children?: React.ReactNode;
}

const StyledIconButton = styled(({ children, ...props }: StyledIconButtonProps) => (
    <IconButton color="primary" {...props}>
        {children}
    </IconButton>
))(({ theme }) => ({
    backgroundColor: handleOpacityColor(theme.palette.grey[50], 0.1),
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    "&:hover": {
        backgroundColor: handleOpacityColor(theme.palette.grey[700], 0.4),
    },
}));

export default Carrousel;
