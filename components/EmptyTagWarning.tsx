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
        <AlertTitle>Üres {plural ? 'kategóriák' : 'kategória'}</AlertTitle>
        {plural
          ? 'Ezekben a kategóriákban nincsenek receptjeid. Szeretnéd törölni ezeket a címkéket?'
          : 'Ebben a kategóriában nincsenek receptjeid. Szeretnéd törölni ezt a címkét?'
        }
        <br /><br />
        <Link variant="body2" underline="hover" component="button" onClick={() => setDeleteConfirmOpen(true)}>
          {plural ? 'Címkék' : 'Címke'} törlése
        </Link>
      </Alert>
      <ConfirmModal
        open={deleteConfirmOpen}
        title={`${plural ? 'Címkék' : 'Címke'} törlése`}
        desription={`Biztosan törlöd a következő ${tags.length < 2 ? 'címkét' : 'címkéket'}: ${tags.map((t) => t.name).join(', ')}?`}
        handleClose={() => setDeleteConfirmOpen(false)}
        handleConfirm={handleDelete}
        confirmText={'Igen'}
      />
    </>
  );
}
