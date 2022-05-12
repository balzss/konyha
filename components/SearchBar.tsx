import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Paper,
  IconButton,
  InputBase,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

// Generic reusable hook
const useDebouncedSearch = (searchFunction) => {

  // Handle the input text state
  const [inputText, setInputText] = useState('');

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 300)
  );

  // The async callback is run each time the text changes,
  // but as the search function is debounced, it does not
  // fire a new request on each keystroke
  const searchResults = useAsync(
    async () => {
      if (inputText.length === 0) {
        return [];
      } else {
        return debouncedSearchFunction(inputText);
      }
    },
    [debouncedSearchFunction, inputText]
  );

  // Return everything needed for the hook consumer
  return {
    inputText,
    setInputText,
    searchResults,
  };
};

const useSearchStarwarsHero = () => useDebouncedSearch((text) => {
  console.log(text);
  return Math.random();
});

type SearchBarProps = {
};

export default function SearchBar({
}: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleClickBack = (_e: React.SyntheticEvent) => {
    router.push('/');
  };

  const handleChangeQuery = (e: any) => {
    setSearchQuery(e.target.value);
  }

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
      <IconButton onClick={handleClickBack} aria-label="vissza">
        <ArrowBackIcon/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, lineHeight: 1.5 }}
        placeholder="Keresés"
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
