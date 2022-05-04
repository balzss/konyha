alter table "public"."recipe_tag" drop constraint "recipe_tag_recipe_id_fkey",
  add constraint "recipe_tag_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipes"
  ("id") on update restrict on delete cascade;
