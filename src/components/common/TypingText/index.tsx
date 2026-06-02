import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const TYPING_SPEED = 80;
const DELETING_SPEED = 42;
const WORD_PAUSE = 1300;

interface TypingTextProps {
  words: string[];
}

const TypingText = ({ words }: TypingTextProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleText, setVisibleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex] || '';
    const isWordComplete = !isDeleting && visibleText === currentWord;
    const isWordDeleted = isDeleting && visibleText === '';

    const timeout = window.setTimeout(
      () => {
        if (isWordComplete) {
          setIsDeleting(true);
          return;
        }

        if (isWordDeleted) {
          setIsDeleting(false);
          setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
          return;
        }

        setVisibleText((currentText) => {
          const nextLength = currentText.length + (isDeleting ? -1 : 1);
          return currentWord.slice(0, nextLength);
        });
      },
      isWordComplete ? WORD_PAUSE : isDeleting ? DELETING_SPEED : TYPING_SPEED
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, visibleText, wordIndex, words]);

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        minWidth: { xs: '11ch', sm: '13ch' },
      }}
    >
      {visibleText}
      <Box
        component="span"
        aria-hidden="true"
        sx={(theme) => ({
          width: '2px',
          height: '0.9em',
          ml: 0.5,
          backgroundColor: theme.palette.primary.main,
          animation: 'typingCursor 1s step-end infinite',
          '@keyframes typingCursor': {
            '0%, 45%': { opacity: 1 },
            '46%, 100%': { opacity: 0 },
          },
        })}
      />
    </Box>
  );
};

export default TypingText;
