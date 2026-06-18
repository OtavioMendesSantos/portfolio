import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import {
  Box,
  IconButton,
  IconButtonProps,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { handleOpacityColor } from "../../../utils/utils";

interface CarouselProps<T> {
  items: T[];
  renderItem: (
    item: T,
    isActive: boolean,
    direction: number,
  ) => React.ReactNode;
  autoPlaySpeed?: number;
}

const Carousel = <T,>({
  items,
  renderItem,
  autoPlaySpeed = 5000,
}: CarouselProps<T>) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoClick, setAutoClick] = useState(true);
  const refAction = useRef<ReturnType<typeof setInterval> | null>(null);

  const itemsLength = items?.length || 0;

  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    const itemsChanged = !((a, b) => {
      if (a === b) return true;
      if (!a || !b) return false;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    })(items, prevItems);

    if (itemsChanged) {
      setPage([0, 0]);
      setAutoClick(true);
    }
  }

  const activeIndex =
    itemsLength > 0 ? ((page % itemsLength) + itemsLength) % itemsLength : 0;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const handleNext = useCallback(() => paginate(1), [paginate]);
  const handlePrev = useCallback(() => paginate(-1), [paginate]);

  useEffect(() => {
    if (autoClick && itemsLength > 1) {
      refAction.current = setInterval(handleNext, autoPlaySpeed);
    }
    return () => {
      if (refAction.current) clearInterval(refAction.current);
    };
  }, [autoClick, handleNext, itemsLength, autoPlaySpeed]);

  if (itemsLength === 0) return null;

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "600px", sm: "400px" },
          display: "flex",
          alignItems: "center",
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ width: "100%" }}
          >
            {renderItem(items[activeIndex], true, direction)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <StyledIconButton
          sx={{ left: { xs: "5px", md: "" } }}
          onClick={() => {
            handlePrev();
            setAutoClick(false);
          }}
        >
          <KeyboardArrowLeftRoundedIcon />
        </StyledIconButton>

        <StyledIconButton
          sx={{ right: { xs: "5px", md: "" } }}
          onClick={() => {
            handleNext();
            setAutoClick(false);
          }}
        >
          <KeyboardArrowRightRoundedIcon />
        </StyledIconButton>
      </Box>

      {/* Pagination Controls */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography
          variant="caption"
          sx={{ mr: 1, opacity: 0.7, fontWeight: "bold" }}
        >
          {activeIndex + 1} / {items.length}
        </Typography>
        {items.map((_, index) => (
          <Box
            key={index}
            sx={{
              cursor: "pointer",
              width: index === activeIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              bgcolor: index === activeIndex ? "primary.main" : "grey.500",
              transition: "all 0.3s ease",
              opacity: index === activeIndex ? 1 : 0.5,
              "&:hover": {
                bgcolor: "primary.light",
                opacity: 1,
              },
            }}
            onClick={() => {
              const diff = index - activeIndex;
              if (diff !== 0) {
                setPage(([prevPage]) => [prevPage + diff, diff > 0 ? 1 : -1]);
                setAutoClick(false);
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

interface StyledIconButtonProps extends IconButtonProps {
  children?: React.ReactNode;
}

const StyledIconButton = styled(
  ({ children, ...props }: StyledIconButtonProps) => (
    <IconButton color="primary" {...props}>
      {children}
    </IconButton>
  ),
)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? handleOpacityColor(theme.palette.grey[800], 0.9)
      : handleOpacityColor(theme.palette.common.white, 0.9),
  boxShadow: theme.shadows[8],
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 0,
  width: 45,
  height: 45,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transform: "translateY(-50%) scale(1.15)",
    boxShadow: theme.shadows[12],
  },
  "&:active": {
    transform: "translateY(-50%) scale(0.95)",
  },
  [theme.breakpoints.down("md")]: {
    width: 40,
    height: 40,
    backgroundColor: handleOpacityColor(theme.palette.background.paper, 0.7),
  },
}));

export default Carousel;
