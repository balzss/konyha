alter table "public"."tags"
  add constraint "tags_owner_id_fkey"
  foreign key ("owner_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
