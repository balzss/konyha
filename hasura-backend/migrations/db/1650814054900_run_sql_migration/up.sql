CREATE VIEW recipe_tags_view AS
  SELECT recipe_id, tags.*
    FROM recipe_tag LEFT JOIN tags
      ON recipe_tag.tag_id = tags.id;
