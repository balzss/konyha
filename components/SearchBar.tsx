import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';
import { Paper, IconButton, InputBase } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Close as CloseIcon } from '@mui/icons-material';

type SearchBarProps = {
  onDebouncedChange: (query: string) => void;
  delay: number;
};

export default function SearchBar({ onDebouncedChange, delay }: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debounce = useDebouncedCallback((value: string) => {
    onDebouncedChange(value);
  }, delay);

  const handleClickBack = (_e: React.SyntheticEvent) => {
    router.push('/');
  };

  const handleChangeQuery = (e: any) => {
    setSearchQuery(e.target.value);
    debounce(e.target.value);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        maxWidth: '900px',
        margin: 'auto',
        zIndex: 1999,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        px: 1,
      }}
      square
    >
      <IconButton onClick={handleClickBack} aria-label="back">
        <ArrowBackIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 2, flex: 1, lineHeight: 1.5 }}
        placeholder="Search"
        autoFocus
        value={searchQuery}
        onChange={handleChangeQuery}
      />
      <IconButton onClick={() => setSearchQuery('')}>
        <CloseIcon />
      </IconButton>
    </Paper>
  );
}
