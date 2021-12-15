CREATE TABLE "app_user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "artist" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(100) NOT NULL UNIQUE,
  "spotify_id" VARCHAR(50)
);

CREATE TABLE "track" (
  "id" SERIAL PRIMARY KEY,
  "artist_id" INT NOT NULL REFERENCES "artist"("id"),
  "title" VARCHAR(100) NOT NULL,
  "spotify_id" VARCHAR(50),
  UNIQUE("artist_id", "title")
);

CREATE TABLE "day_item" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "app_user"("id"),
  "date" DATE NOT NULL DEFAULT CURRENT_DATE,
  "track_id" INT NOT NULL REFERENCES "track"("id"),
  UNIQUE("user_id", "date", "track_id")
);







