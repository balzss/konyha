import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  AlertTitle,
  Link,
} from '@mui/material';
import {
  ConfirmModal,
} from './';
import { useDeleteTags } from '../dataHooks';
import type { Tag } from '../graphql/generated';

type EmptyTagWarningProps = {
  tags: Tag[];
};

export default function EmptyTagWarning({tags}: EmptyTagWarningProps) {
  const router = useRouter();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [deleteTags, { error: deleteError }] = useDeleteTags();
  const plural = tags.length > 1;

  const handleDelete = async () => {
    await deleteTags({
      variables: {
        tagIds: tags.map((t) => t.id),
      }
    });
    router.push('/');
  };

  return (
    <>
      <Alert variant="outlined" severity="info">
        <AlertTitle>Empty {plural ? 'categories' : 'category'}</AlertTitle>
        {plural
          ? 'You don\'t have any recipes in this category. Do you want to delete it?'
          : 'You don\'t have any recipes in these categories. Do you want to delete them?'
        }
        <br /><br />
        <Link variant="body2" underline="hover" component="button" onClick={() => setDeleteConfirmOpen(true)}>
          Delete {plural ? 'tags' : 'tag'}
        </Link>
      </Alert>
      <ConfirmModal
        open={deleteConfirmOpen}
        title={`Delete ${plural ? 'tags' : 'tag'}`}
        description={`Are you sure to delete the following ${tags.length < 2 ? 'tag' : 'tags'}: ${tags.map((t) => t.name).join(', ')}?`}
        handleClose={() => setDeleteConfirmOpen(false)}
        handleConfirm={handleDelete}
        confirmText={'Delete'}
      />
    </>
  );
}
