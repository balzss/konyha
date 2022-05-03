alter table "public"."tags" drop constraint "tags_owner_id_fkey",
  add constraint "tags_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
