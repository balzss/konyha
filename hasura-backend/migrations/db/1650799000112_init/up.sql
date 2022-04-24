SET check_function_bodies = false;
CREATE TABLE public.recipes (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    ingredients text NOT NULL,
    instructions text NOT NULL,
    user_id uuid
);
CREATE TABLE public.users (
    email text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL
);
ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
