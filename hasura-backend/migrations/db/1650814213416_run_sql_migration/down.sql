-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE VIEW tag_recipes_view AS
--   SELECT tag_id, recipes.*
--     FROM recipe_tag LEFT JOIN recipes
--       ON recipe_tag.recipe_id = recipes.id;