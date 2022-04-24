alter table "public"."users" add column "preferences" json
 null default json_build_object();
