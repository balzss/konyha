-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE VIEW recipe_tags_view AS
--   SELECT recipe_id, tags.*
--     FROM recipe_tag LEFT JOIN tags
--       ON recipe_tag.tag_id = tags.id;