PGDMP                      |            Leffasovellustietokanta    16.2    16.2 -               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    Leffasovellustietokanta    DATABASE     �   CREATE DATABASE "Leffasovellustietokanta" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Finnish_Finland.1252';
 )   DROP DATABASE "Leffasovellustietokanta";
                postgres    false            �            1259    16431    Favoritelist    TABLE     �   CREATE TABLE public."Favoritelist" (
    idfavoritelist integer NOT NULL,
    profilename text,
    groupname text,
    favoriteditem text NOT NULL,
    showtime text,
    "timestamp" timestamp without time zone NOT NULL
);
 "   DROP TABLE public."Favoritelist";
       public         heap    postgres    false            �            1259    16430    Favoritelist_idfavoritelist_seq    SEQUENCE     �   CREATE SEQUENCE public."Favoritelist_idfavoritelist_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."Favoritelist_idfavoritelist_seq";
       public          postgres    false    220                       0    0    Favoritelist_idfavoritelist_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."Favoritelist_idfavoritelist_seq" OWNED BY public."Favoritelist".idfavoritelist;
          public          postgres    false    219            �            1259    16423    Group    TABLE     �   CREATE TABLE public."Group" (
    groupname text NOT NULL,
    groupexplanation text,
    "timestamp" timestamp without time zone NOT NULL
);
    DROP TABLE public."Group";
       public         heap    postgres    false            �            1259    16450 
   Memberlist    TABLE     �   CREATE TABLE public."Memberlist" (
    memberlistid integer NOT NULL,
    profilename text NOT NULL,
    mainuser integer DEFAULT 0 NOT NULL,
    groupname text NOT NULL,
    pending integer DEFAULT 0 NOT NULL
);
     DROP TABLE public."Memberlist";
       public         heap    postgres    false            �            1259    16449    Memberlist_memberlistid_seq    SEQUENCE     �   CREATE SEQUENCE public."Memberlist_memberlistid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."Memberlist_memberlistid_seq";
       public          postgres    false    222                        0    0    Memberlist_memberlistid_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Memberlist_memberlistid_seq" OWNED BY public."Memberlist".memberlistid;
          public          postgres    false    221            �            1259    16471    Message    TABLE     �   CREATE TABLE public."Message" (
    messageid integer NOT NULL,
    groupname text NOT NULL,
    profilename text NOT NULL,
    message text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL
);
    DROP TABLE public."Message";
       public         heap    postgres    false            �            1259    16470    Message_messageid_seq    SEQUENCE     �   CREATE SEQUENCE public."Message_messageid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Message_messageid_seq";
       public          postgres    false    224            !           0    0    Message_messageid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Message_messageid_seq" OWNED BY public."Message".messageid;
          public          postgres    false    223            �            1259    16399    Profile    TABLE     �   CREATE TABLE public."Profile" (
    profilename text NOT NULL,
    password text NOT NULL,
    email text,
    profilepicurl text,
    "timestamp" timestamp without time zone NOT NULL
);
    DROP TABLE public."Profile";
       public         heap    postgres    false            �            1259    16410    Review    TABLE     �   CREATE TABLE public."Review" (
    idreview integer NOT NULL,
    profilename text NOT NULL,
    revieweditem text NOT NULL,
    review text,
    rating smallint NOT NULL,
    "timestamp" timestamp without time zone NOT NULL
);
    DROP TABLE public."Review";
       public         heap    postgres    false            �            1259    16409    Review_idreview_seq    SEQUENCE     �   CREATE SEQUENCE public."Review_idreview_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Review_idreview_seq";
       public          postgres    false    217            "           0    0    Review_idreview_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Review_idreview_seq" OWNED BY public."Review".idreview;
          public          postgres    false    216            h           2604    16434    Favoritelist idfavoritelist    DEFAULT     �   ALTER TABLE ONLY public."Favoritelist" ALTER COLUMN idfavoritelist SET DEFAULT nextval('public."Favoritelist_idfavoritelist_seq"'::regclass);
 L   ALTER TABLE public."Favoritelist" ALTER COLUMN idfavoritelist DROP DEFAULT;
       public          postgres    false    220    219    220            i           2604    16453    Memberlist memberlistid    DEFAULT     �   ALTER TABLE ONLY public."Memberlist" ALTER COLUMN memberlistid SET DEFAULT nextval('public."Memberlist_memberlistid_seq"'::regclass);
 H   ALTER TABLE public."Memberlist" ALTER COLUMN memberlistid DROP DEFAULT;
       public          postgres    false    222    221    222            l           2604    16474    Message messageid    DEFAULT     z   ALTER TABLE ONLY public."Message" ALTER COLUMN messageid SET DEFAULT nextval('public."Message_messageid_seq"'::regclass);
 B   ALTER TABLE public."Message" ALTER COLUMN messageid DROP DEFAULT;
       public          postgres    false    223    224    224            g           2604    16413    Review idreview    DEFAULT     v   ALTER TABLE ONLY public."Review" ALTER COLUMN idreview SET DEFAULT nextval('public."Review_idreview_seq"'::regclass);
 @   ALTER TABLE public."Review" ALTER COLUMN idreview DROP DEFAULT;
       public          postgres    false    216    217    217                      0    16431    Favoritelist 
   TABLE DATA           v   COPY public."Favoritelist" (idfavoritelist, profilename, groupname, favoriteditem, showtime, "timestamp") FROM stdin;
    public          postgres    false    220   �6                 0    16423    Group 
   TABLE DATA           K   COPY public."Group" (groupname, groupexplanation, "timestamp") FROM stdin;
    public          postgres    false    218    7                 0    16450 
   Memberlist 
   TABLE DATA           _   COPY public."Memberlist" (memberlistid, profilename, mainuser, groupname, pending) FROM stdin;
    public          postgres    false    222   7                 0    16471    Message 
   TABLE DATA           \   COPY public."Message" (messageid, groupname, profilename, message, "timestamp") FROM stdin;
    public          postgres    false    224   :7                 0    16399    Profile 
   TABLE DATA           ]   COPY public."Profile" (profilename, password, email, profilepicurl, "timestamp") FROM stdin;
    public          postgres    false    215   W7                 0    16410    Review 
   TABLE DATA           d   COPY public."Review" (idreview, profilename, revieweditem, review, rating, "timestamp") FROM stdin;
    public          postgres    false    217   t7       #           0    0    Favoritelist_idfavoritelist_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Favoritelist_idfavoritelist_seq"', 1, false);
          public          postgres    false    219            $           0    0    Memberlist_memberlistid_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Memberlist_memberlistid_seq"', 1, false);
          public          postgres    false    221            %           0    0    Message_messageid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Message_messageid_seq"', 1, false);
          public          postgres    false    223            &           0    0    Review_idreview_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Review_idreview_seq"', 1, false);
          public          postgres    false    216            t           2606    16438    Favoritelist Favoritelist_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Favoritelist"
    ADD CONSTRAINT "Favoritelist_pkey" PRIMARY KEY (idfavoritelist);
 L   ALTER TABLE ONLY public."Favoritelist" DROP CONSTRAINT "Favoritelist_pkey";
       public            postgres    false    220            r           2606    16429    Group Group_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (groupname);
 >   ALTER TABLE ONLY public."Group" DROP CONSTRAINT "Group_pkey";
       public            postgres    false    218            v           2606    16459    Memberlist Memberlist_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Memberlist"
    ADD CONSTRAINT "Memberlist_pkey" PRIMARY KEY (memberlistid);
 H   ALTER TABLE ONLY public."Memberlist" DROP CONSTRAINT "Memberlist_pkey";
       public            postgres    false    222            x           2606    16478    Message Message_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (messageid);
 B   ALTER TABLE ONLY public."Message" DROP CONSTRAINT "Message_pkey";
       public            postgres    false    224            n           2606    16405    Profile Profile_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (profilename);
 B   ALTER TABLE ONLY public."Profile" DROP CONSTRAINT "Profile_pkey";
       public            postgres    false    215            p           2606    16417    Review Review_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (idreview);
 @   ALTER TABLE ONLY public."Review" DROP CONSTRAINT "Review_pkey";
       public            postgres    false    217            z           2606    16444    Favoritelist grouname    FK CONSTRAINT     �   ALTER TABLE ONLY public."Favoritelist"
    ADD CONSTRAINT grouname FOREIGN KEY (groupname) REFERENCES public."Group"(groupname) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public."Favoritelist" DROP CONSTRAINT grouname;
       public          postgres    false    220    4722    218            |           2606    16465    Memberlist groupname    FK CONSTRAINT     �   ALTER TABLE ONLY public."Memberlist"
    ADD CONSTRAINT groupname FOREIGN KEY (groupname) REFERENCES public."Group"(groupname) ON UPDATE CASCADE ON DELETE CASCADE;
 @   ALTER TABLE ONLY public."Memberlist" DROP CONSTRAINT groupname;
       public          postgres    false    218    222    4722            ~           2606    16479    Message groupname    FK CONSTRAINT     �   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT groupname FOREIGN KEY (groupname) REFERENCES public."Group"(groupname) ON UPDATE CASCADE ON DELETE CASCADE;
 =   ALTER TABLE ONLY public."Message" DROP CONSTRAINT groupname;
       public          postgres    false    224    218    4722            y           2606    16418    Review profilename    FK CONSTRAINT     �   ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile"(profilename) ON UPDATE CASCADE ON DELETE CASCADE;
 >   ALTER TABLE ONLY public."Review" DROP CONSTRAINT profilename;
       public          postgres    false    215    4718    217            {           2606    16439    Favoritelist profilename    FK CONSTRAINT     �   ALTER TABLE ONLY public."Favoritelist"
    ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile"(profilename) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public."Favoritelist" DROP CONSTRAINT profilename;
       public          postgres    false    215    4718    220            }           2606    16460    Memberlist profilename    FK CONSTRAINT     �   ALTER TABLE ONLY public."Memberlist"
    ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile"(profilename) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY public."Memberlist" DROP CONSTRAINT profilename;
       public          postgres    false    215    4718    222                       2606    16484    Message profilename    FK CONSTRAINT     �   ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT profilename FOREIGN KEY (profilename) REFERENCES public."Profile"(profilename) ON UPDATE CASCADE ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public."Message" DROP CONSTRAINT profilename;
       public          postgres    false    215    4718    224                  x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �     