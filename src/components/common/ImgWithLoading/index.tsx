import { Box, BoxProps, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface ImageProps {
    src: string;
    alt: string;
    boxProps?: BoxProps;
    imgProps?: React.ComponentProps<"img">;
    href?: string
}

const ImgWithLoading = ({ src, alt, boxProps, imgProps, href }: ImageProps) => {
    const [loading, setLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setLoading(true);
    }, [src]);

    useEffect(() => {
        const img = imgRef.current;

        if (img?.complete) {
            setLoading(false);
        }
    }, [src]);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setLoading(false);
        imgProps?.onLoad?.(event);
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setLoading(false);
        imgProps?.onError?.(event);
    };

    const image = (
        <img
            {...imgProps}
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'all 0.3s ease-in-out',
                display: loading ? 'none' : 'block',
                ...imgProps?.style
            }}
        />
    );

    return (
        <Box
            {...boxProps}
            sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...boxProps?.sx
            }}
        >
            {loading && <CircularProgress color="primary" />}
            {href ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                >
                    {image}
                </a>
            ) : image}

        </Box>
    )
}

export default ImgWithLoading
