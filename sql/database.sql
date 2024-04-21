-- This script was generated by the ERD tool in pgAdmin 4.
-- Tietokannan skeema ilman testidataa, PostgreSQL 
-- Ryhmä 9 - Leffaysi 

-- Poistetaan taulut, jos ne ovat olemassa
DROP TABLE IF EXISTS Favoritelist_ CASCADE;
DROP TABLE IF EXISTS Group_ CASCADE;
DROP TABLE IF EXISTS Memberlist_ CASCADE;
DROP TABLE IF EXISTS Message_ CASCADE;
DROP TABLE IF EXISTS Profile_ CASCADE;
DROP TABLE IF EXISTS Review_ CASCADE;

-- Käyttäjät
CREATE TABLE IF NOT EXISTS Profile_
(
    profileid SERIAL PRIMARY KEY,
    profilename VARCHAR(40) UNIQUE NOT NULL,
    hashedpassword VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    profilepicurl VARCHAR(400),
    is_private BOOLEAN DEFAULT FALSE, 
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(1000),
    usertype VARCHAR(10) DEFAULT 'user' CHECK (usertype IN ('admin', 'user'))
);

-- Ryhmät
CREATE TABLE IF NOT EXISTS Group_
(
    groupid SERIAL PRIMARY KEY,
    groupname VARCHAR(255) UNIQUE NOT NULL,
    groupexplanation VARCHAR(1000),
    timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    grouppicurl TEXT
);

-- Ryhmien jäsenet ja omistajat
CREATE TABLE IF NOT EXISTS Memberlist_
(
    memberlistid SERIAL PRIMARY KEY,
    profileid INTEGER NOT NULL,
    mainuser INTEGER NOT NULL DEFAULT 0,
    groupid INTEGER NOT NULL,
    pending INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (profileid) REFERENCES Profile_(profileid) ON DELETE CASCADE,
    FOREIGN KEY (groupid) REFERENCES Group_(groupid) ON DELETE CASCADE,
    CONSTRAINT unique_userInGroup UNIQUE (profileid, groupid)
);

-- Viestit (ryhmäkohtaiset)
CREATE TABLE IF NOT EXISTS Message_
(
    messageid SERIAL PRIMARY KEY,
    groupid INTEGER NOT NULL,
    profileid INTEGER NOT NULL,
    message VARCHAR(400) NOT NULL,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profileid) REFERENCES Profile_(profileid) ON DELETE CASCADE,
    FOREIGN KEY (groupid) REFERENCES Group_(groupid) ON DELETE CASCADE
);

-- Suosikkilistaukset
CREATE TABLE IF NOT EXISTS Favoritelist_
(
    idfavoritelist SERIAL PRIMARY KEY,
    profileid INTEGER,
    groupid INTEGER,
    favoriteditem TEXT,
    showtime TEXT,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profileid) REFERENCES Profile_(profileid) ON DELETE CASCADE,
    FOREIGN KEY (groupid) REFERENCES Group_(groupid) ON DELETE CASCADE
);

-- Arvostelut
CREATE TABLE IF NOT EXISTS Review_ (
    idreview SERIAL PRIMARY KEY,
    profileid INTEGER,
    revieweditem VARCHAR(40),
    review VARCHAR(2000),
    rating SMALLINT NOT NULL,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mediatype SMALLINT,
    FOREIGN KEY (profileid) REFERENCES Profile_(profileid) ON DELETE CASCADE,
    CONSTRAINT unique_review UNIQUE NULLS DISTINCT (profileid, revieweditem, mediatype),
    CONSTRAINT check_rating_range CHECK (rating >= 1 AND rating <= 5)
);

ALTER SEQUENCE public.profile__profileid_seq RESTART WITH 1;
ALTER SEQUENCE public.group__groupid_seq RESTART WITH 1;
ALTER SEQUENCE public.review__idreview_seq RESTART WITH 1;
ALTER SEQUENCE public.favoritelist__idfavoritelist_seq RESTART WITH 1;
ALTER SEQUENCE public.memberlist__memberlistid_seq RESTART WITH 1;
ALTER SEQUENCE public.message__messageid_seq RESTART WITH 1;

--ALTER TABLE Review_ 
--DROP CONSTRAINT unique_review,
--ADD CONSTRAINT unique_review UNIQUE NULLS DISTINCT (profileid, revieweditem, mediatype);

ALTER TABLE Group_ 
ALTER COLUMN timestamp SET DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN last_modified TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Memberlist_
ADD COLUMN join_timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP;