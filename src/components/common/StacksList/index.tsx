import { Box, BoxProps, Container, ContainerProps, IconButton, IconButtonProps, styled, Tooltip } from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import { StyledTypography } from '../../Styled/StyledComponents';
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { applyOpacity } from '../../../utils/utils';
import ImgWithLoading from '../ImgWithLoading';

interface StackItem {
  name: string;
  href?: string;
}

interface StacksListProps {
  title?: string,
  itens: StackItem[],
  indicate?: boolean,
  boxProps?: BoxProps,
  containerProps?: ContainerProps,
}

const StacksList = (
  { title, itens, indicate, boxProps, containerProps }: StacksListProps
) => {
  const { isMobile } = useResponsive();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      setShowArrows(container.scrollWidth > container.clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => window.removeEventListener('resize', checkScroll);
  }, [itens]);

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box>
      {title &&
        <StyledTypography
          variant="h2"
          indicate={indicate}
        >
          {title}
        </StyledTypography>
      }
      <Box sx={{ position: 'relative', padding: '0' }}>
        {showArrows && (
          <StyledIconButton
            aria-label='scroll left'
            sx={{ left: '0' }}
            onClick={handleScrollLeft}
          >
            <KeyboardArrowLeftRoundedIcon />
          </StyledIconButton>
        )}
        <Container
          ref={containerRef}
          component="ul"
          {...containerProps}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            padding: 0,
            overflow: 'hidden',
            listStyle: 'none',
            ...containerProps?.sx
          }}
        >
          {showArrows && <Box />}
          {itens.map((item, index) => (
            <Box
              key={`${item.name}-${index}`}
              component="li"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Tooltip title={isMobile ? '' : item.name.toUpperCase()} arrow>
                <Box>
                  <ImgWithLoading
                    src={`/assets/svgs/${item.name}-original.svg`}
                    alt={`${item.name} - logo`}
                    href={item.href}
                    imgProps={{
                      style: {
                        maxWidth: '60px',
                        minWidth: '46px',
                        width: isMobile ? '46px' : '100%',
                        userSelect: 'none'
                      },
                      onDragStart: (e: React.DragEvent<HTMLImageElement>) => { e.preventDefault() },
                    }}
                    boxProps={{ ...boxProps }}
                  />
                </Box>
              </Tooltip>
              {isMobile &&
                <StyledTypography variant="caption">
                  {item.name.toUpperCase()}
                </StyledTypography>}
            </Box>
          ))}
          {showArrows && <Box />}
        </Container>
        {showArrows && (
          <StyledIconButton
            aria-label='scroll right'
            sx={{ right: '0' }}
            onClick={handleScrollRight}
          >
            <KeyboardArrowRightRoundedIcon />
          </StyledIconButton>
        )}
      </Box>
    </Box>
  );
};

interface StyledIconButtonProps extends IconButtonProps {
  children?: React.ReactNode;
}

const StyledIconButton = styled(({ children, ...props }: StyledIconButtonProps) => (
  <IconButton color='primary' {...props}>
    {children}
  </IconButton>
))(({ theme }) => ({
  backgroundColor: applyOpacity(theme.palette.grey[50], 0.1),
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  '&:hover': {
    backgroundColor: applyOpacity(theme.palette.grey[700], 0.4),
  }
}));

export default StacksList;
