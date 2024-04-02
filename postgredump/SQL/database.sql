--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2

-- Started on 2024-03-31 19:43:23

SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SELECT pg_catalog.set_config ('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: rysi
--

-- *not* creating schema, since initdb creates it

ALTER SCHEMA public OWNER TO rysi;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16397)
-- Name: Favoritelist; Type: TABLE; Schema: public; Owner: rysi
--

CREATE TABLE public."Favoritelist" (
    idfavoritelist integer NOT NULL, profilename text, groupname text, favoriteditem text NOT NULL, showtime text, "timestamp" timestamp without time zone NOT NULL
);

ALTER TABLE public."Favoritelist" OWNER TO rysi;

--
-- TOC entry 216 (class 1259 OID 16402)
-- Name: Favoritelist_idfavoritelist_seq; Type: SEQUENCE; Schema: public; Owner: rysi
--

CREATE SEQUENCE public."Favoritelist_idfavoritelist_seq" AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."Favoritelist_idfavoritelist_seq" OWNER TO rysi;

--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 216
-- Name: Favoritelist_idfavoritelist_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rysi
--

ALTER SEQUENCE public."Favoritelist_idfavoritelist_seq" OWNED BY public."Favoritelist".idfavoritelist;

--
-- TOC entry 217 (class 1259 OID 16403)
-- Name: Group; Type: TABLE; Schema: public; Owner: rysi
--

CREATE TABLE public."Group" (
    groupname text NOT NULL, groupexplanation text, "timestamp" timestamp without time zone NOT NULL
);

ALTER TABLE public."Group" OWNER TO rysi;

--
-- TOC entry 218 (class 1259 OID 16408)
-- Name: Memberlist; Type: TABLE; Schema: public; Owner: rysi
--

CREATE TABLE public."Memberlist" (
    memberlistid integer NOT NULL, profilename text NOT NULL, mainuser integer DEFAULT 0 NOT NULL, groupname text NOT NULL, pending integer DEFAULT 0 NOT NULL
);

ALTER TABLE public."Memberlist" OWNER TO rysi;

--
-- TOC entry 219 (class 1259 OID 16415)
-- Name: Memberlist_memberlistid_seq; Type: SEQUENCE; Schema: public; Owner: rysi
--

CREATE SEQUENCE public."Memberlist_memberlistid_seq" AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."Memberlist_memberlistid_seq" OWNER TO rysi;

--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 219
-- Name: Memberlist_memberlistid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rysi
--

ALTER SEQUENCE public."Memberlist_memberlistid_seq" OWNED BY public."Memberlist".memberlistid;

--
-- TOC entry 220 (class 1259 OID 16416)
-- Name: Message; Type: TABLE; Schema: public; Owner: rysi
--

CREATE TABLE public."Message" (
    messageid integer NOT NULL, groupname text NOT NULL, profilename text NOT NULL, message text NOT NULL, "timestamp" timestamp without time zone NOT NULL
);

ALTER TABLE public."Message" OWNER TO rysi;

--
-- TOC entry 221 (class 1259 OID 16421)
-- Name: Message_messageid_seq; Type: SEQUENCE; Schema: public; Owner: rysi
--

CREATE SEQUENCE public."Message_messageid_seq" AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."Message_messageid_seq" OWNER TO rysi;

--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 221
-- Name: Message_messageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rysi
--

ALTER SEQUENCE public."Message_messageid_seq" OWNED BY public."Message".messageid;

--
-- TOC entry 222 (class 1259 OID 16422)
-- Name: Profile; Type: TABLE; Schema: public; Owner: rysi
--

CREATE TABLE public."Profile" (
    profilename text NOT NULL, password text NOT NULL, email text, profilepicurl text, "timestamp" timestamp without time zone NOT NULL
);

ALTER TABLE public."Profile" OWNER TO rysi;

--
-- TOC entry 223 (class 1259 OID 16427)
-- Name: Review; Type: TABLE; Schema: public; Owner: rysi
--

CREATE TABLE public."Review" (
    idreview integer NOT NULL, profilename text NOT NULL, revieweditem text NOT NULL, review text, rating smallint NOT NULL, "timestamp" timestamp without time zone NOT NULL
);

ALTER TABLE public."Review" OWNER TO rysi;

--
-- TOC entry 224 (class 1259 OID 16432)
-- Name: Review_idreview_seq; Type: SEQUENCE; Schema: public; Owner: rysi
--

CREATE SEQUENCE public."Review_idreview_seq" AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."Review_idreview_seq" OWNER TO rysi;

--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 224
-- Name: Review_idreview_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rysi
--

ALTER SEQUENCE public."Review_idreview_seq" OWNED BY public."Review".idreview;

--
-- TOC entry 3230 (class 2604 OID 16572)
-- Name: Favoritelist idfavoritelist; Type: DEFAULT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Favoritelist"
ALTER COLUMN idfavoritelist
SET DEFAULT nextval(
    'public."Favoritelist_idfavoritelist_seq"'::regclass
);

--
-- TOC entry 3231 (class 2604 OID 16573)
-- Name: Memberlist memberlistid; Type: DEFAULT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Memberlist"
ALTER COLUMN memberlistid
SET DEFAULT nextval(
    'public."Memberlist_memberlistid_seq"'::regclass
);

--
-- TOC entry 3234 (class 2604 OID 16574)
-- Name: Message messageid; Type: DEFAULT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Message"
ALTER COLUMN messageid
SET DEFAULT nextval(
    'public."Message_messageid_seq"'::regclass
);

--
-- TOC entry 3235 (class 2604 OID 16575)
-- Name: Review idreview; Type: DEFAULT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Review"
ALTER COLUMN idreview
SET DEFAULT nextval(
    'public."Review_idreview_seq"'::regclass
);

--
-- TOC entry 3237 (class 2606 OID 16438)
-- Name: Favoritelist Favoritelist_pkey; Type: CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Favoritelist"
ADD CONSTRAINT "Favoritelist_pkey" PRIMARY KEY (idfavoritelist);

--
-- TOC entry 3239 (class 2606 OID 16440)
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Group"
ADD CONSTRAINT "Group_pkey" PRIMARY KEY (groupname);

--
-- TOC entry 3241 (class 2606 OID 16442)
-- Name: Memberlist Memberlist_pkey; Type: CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Memberlist"
ADD CONSTRAINT "Memberlist_pkey" PRIMARY KEY (memberlistid);

--
-- TOC entry 3243 (class 2606 OID 16444)
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Message"
ADD CONSTRAINT "Message_pkey" PRIMARY KEY (messageid);

--
-- TOC entry 3245 (class 2606 OID 16446)
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Profile"
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (profilename);

--
-- TOC entry 3247 (class 2606 OID 16448)
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Review"
ADD CONSTRAINT "Review_pkey" PRIMARY KEY (idreview);

--
-- TOC entry 3248 (class 2606 OID 16449)
-- Name: Favoritelist grouname; Type: FK CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Favoritelist"
ADD CONSTRAINT grouname FOREIGN KEY (groupname) REFERENCES public."Group" (groupname) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 3250 (class 2606 OID 16454)
-- Name: Memberlist groupname; Type: FK CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Memberlist"
ADD CONSTRAINT groupname FOREIGN KEY (groupname) REFERENCES public."Group" (groupname) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 3252 (class 2606 OID 16459)
-- Name: Message groupname; Type: FK CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Message"
ADD CONSTRAINT groupname FOREIGN KEY (groupname) REFERENCES public."Group" (groupname) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 3254 (class 2606 OID 16464)
-- Name: Review profilename; Type: FK CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Review"
ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile" (profilename) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 3249 (class 2606 OID 16469)
-- Name: Favoritelist profilename; Type: FK CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Favoritelist"
ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile" (profilename) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 3251 (class 2606 OID 16474)
-- Name: Memberlist profilename; Type: FK CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Memberlist"
ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile" (profilename) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 3253 (class 2606 OID 16479)
-- Name: Message profilename; Type: FK CONSTRAINT; Schema: public; Owner: rysi
--

ALTER TABLE ONLY public."Message"
ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile" (profilename) ON UPDATE CASCADE ON DELETE CASCADE;

--
-- TOC entry 2062 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON SEQUENCES TO rysi;

--
-- TOC entry 2064 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON TYPES TO rysi;

--
-- TOC entry 2063 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON FUNCTIONS TO rysi;

--
-- TOC entry 2061 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON TABLES TO rysi;

-- Completed on 2024-03-31 19:43:28

--
-- PostgreSQL database dump complete
--