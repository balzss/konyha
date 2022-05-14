import type { NextRouter } from 'next/router';

export default function getTagsFromUrl(router: NextRouter): string[] {
  const selectedTags = router?.query?.tags?.toString().split(' ') ?? [];
  return selectedTags;
}
