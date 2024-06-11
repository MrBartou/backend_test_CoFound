--
-- PostgreSQL database dump
--

-- Dumped from database version 13.15 (Debian 13.15-1.pgdg120+1)
-- Dumped by pg_dump version 13.15 (Debian 13.15-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorie; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public.categorie (
    "categorieId" integer NOT NULL,
    name character varying NOT NULL,
    description text,
    type character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categorie OWNER TO cofound;

--
-- Name: categorie_categorieId_seq; Type: SEQUENCE; Schema: public; Owner: cofound
--

CREATE SEQUENCE public."categorie_categorieId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."categorie_categorieId_seq" OWNER TO cofound;

--
-- Name: categorie_categorieId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cofound
--

ALTER SEQUENCE public."categorie_categorieId_seq" OWNED BY public.categorie."categorieId";


--
-- Name: conversation; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public.conversation (
    "conversationId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.conversation OWNER TO cofound;

--
-- Name: conversation_conversationId_seq; Type: SEQUENCE; Schema: public; Owner: cofound
--

CREATE SEQUENCE public."conversation_conversationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."conversation_conversationId_seq" OWNER TO cofound;

--
-- Name: conversation_conversationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cofound
--

ALTER SEQUENCE public."conversation_conversationId_seq" OWNED BY public.conversation."conversationId";


--
-- Name: conversation_participants_user; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public.conversation_participants_user (
    "conversationConversationId" integer NOT NULL,
    "userUserId" integer NOT NULL
);


ALTER TABLE public.conversation_participants_user OWNER TO cofound;

--
-- Name: profile; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public.profile (
    "profileId" integer NOT NULL,
    skills text,
    experience json,
    offers json,
    "searchingFor" json,
    location json,
    interests json,
    roles json,
    "profileVisibility" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "userUserId" integer
);


ALTER TABLE public.profile OWNER TO cofound;

--
-- Name: profile_profileId_seq; Type: SEQUENCE; Schema: public; Owner: cofound
--

CREATE SEQUENCE public."profile_profileId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."profile_profileId_seq" OWNER TO cofound;

--
-- Name: profile_profileId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cofound
--

ALTER SEQUENCE public."profile_profileId_seq" OWNED BY public.profile."profileId";


--
-- Name: project; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public.project (
    "projectId" integer NOT NULL,
    title character varying NOT NULL,
    description text,
    status character varying(50),
    participants json,
    categories json,
    "requiredSkills" json,
    budget json,
    timeline json,
    "projectVisibility" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "ownerUserId" integer
);


ALTER TABLE public.project OWNER TO cofound;

--
-- Name: project_projectId_seq; Type: SEQUENCE; Schema: public; Owner: cofound
--

CREATE SEQUENCE public."project_projectId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."project_projectId_seq" OWNER TO cofound;

--
-- Name: project_projectId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cofound
--

ALTER SEQUENCE public."project_projectId_seq" OWNED BY public.project."projectId";


--
-- Name: review; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public.review (
    "reviewId" integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "reviewerUserId" integer,
    "subjectCategorieId" integer
);


ALTER TABLE public.review OWNER TO cofound;

--
-- Name: review_reviewId_seq; Type: SEQUENCE; Schema: public; Owner: cofound
--

CREATE SEQUENCE public."review_reviewId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."review_reviewId_seq" OWNER TO cofound;

--
-- Name: review_reviewId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cofound
--

ALTER SEQUENCE public."review_reviewId_seq" OWNED BY public.review."reviewId";


--
-- Name: role; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public.role (
    "roleId" integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.role OWNER TO cofound;

--
-- Name: role_roleId_seq; Type: SEQUENCE; Schema: public; Owner: cofound
--

CREATE SEQUENCE public."role_roleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."role_roleId_seq" OWNER TO cofound;

--
-- Name: role_roleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cofound
--

ALTER SEQUENCE public."role_roleId_seq" OWNED BY public.role."roleId";


--
-- Name: user; Type: TABLE; Schema: public; Owner: cofound
--

CREATE TABLE public."user" (
    "userId" integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    "passwordHash" character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "lastLogin" timestamp without time zone DEFAULT now() NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "roleId" integer
);


ALTER TABLE public."user" OWNER TO cofound;

--
-- Name: user_userId_seq; Type: SEQUENCE; Schema: public; Owner: cofound
--

CREATE SEQUENCE public."user_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."user_userId_seq" OWNER TO cofound;

--
-- Name: user_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cofound
--

ALTER SEQUENCE public."user_userId_seq" OWNED BY public."user"."userId";


--
-- Name: categorie categorieId; Type: DEFAULT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.categorie ALTER COLUMN "categorieId" SET DEFAULT nextval('public."categorie_categorieId_seq"'::regclass);


--
-- Name: conversation conversationId; Type: DEFAULT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.conversation ALTER COLUMN "conversationId" SET DEFAULT nextval('public."conversation_conversationId_seq"'::regclass);


--
-- Name: profile profileId; Type: DEFAULT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.profile ALTER COLUMN "profileId" SET DEFAULT nextval('public."profile_profileId_seq"'::regclass);


--
-- Name: project projectId; Type: DEFAULT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.project ALTER COLUMN "projectId" SET DEFAULT nextval('public."project_projectId_seq"'::regclass);


--
-- Name: review reviewId; Type: DEFAULT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.review ALTER COLUMN "reviewId" SET DEFAULT nextval('public."review_reviewId_seq"'::regclass);


--
-- Name: role roleId; Type: DEFAULT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.role ALTER COLUMN "roleId" SET DEFAULT nextval('public."role_roleId_seq"'::regclass);


--
-- Name: user userId; Type: DEFAULT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public."user" ALTER COLUMN "userId" SET DEFAULT nextval('public."user_userId_seq"'::regclass);


--
-- Data for Name: categorie; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public.categorie ("categorieId", name, description, type, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: conversation; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public.conversation ("conversationId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: conversation_participants_user; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public.conversation_participants_user ("conversationConversationId", "userUserId") FROM stdin;
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public.profile ("profileId", skills, experience, offers, "searchingFor", location, interests, roles, "profileVisibility", "createdAt", "updatedAt", "isActive", "userUserId") FROM stdin;
\.


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public.project ("projectId", title, description, status, participants, categories, "requiredSkills", budget, timeline, "projectVisibility", "createdAt", "updatedAt", "ownerUserId") FROM stdin;
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public.review ("reviewId", rating, comment, "createdAt", "reviewerUserId", "subjectCategorieId") FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public.role ("roleId", name, description) FROM stdin;
1	Administrateur	Administration du site
2	Modérateur	Modération du site
3	Utilisateur	Utilisateur du site
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: cofound
--

COPY public."user" ("userId", username, email, "passwordHash", "createdAt", "lastLogin", "isActive", "roleId") FROM stdin;
1	MrBartou	anthony.denin@outlook.com	$2b$10$knD80VgpsQ3qT72M2BMEBOh/yuRrSE.yeO4XydjPwMnRSZ0Ry3rL6	2024-06-11 11:40:58.559577	2024-06-11 11:42:40.237772	t	\N
\.


--
-- Name: categorie_categorieId_seq; Type: SEQUENCE SET; Schema: public; Owner: cofound
--

SELECT pg_catalog.setval('public."categorie_categorieId_seq"', 1, false);


--
-- Name: conversation_conversationId_seq; Type: SEQUENCE SET; Schema: public; Owner: cofound
--

SELECT pg_catalog.setval('public."conversation_conversationId_seq"', 1, false);


--
-- Name: profile_profileId_seq; Type: SEQUENCE SET; Schema: public; Owner: cofound
--

SELECT pg_catalog.setval('public."profile_profileId_seq"', 1, false);


--
-- Name: project_projectId_seq; Type: SEQUENCE SET; Schema: public; Owner: cofound
--

SELECT pg_catalog.setval('public."project_projectId_seq"', 1, false);


--
-- Name: review_reviewId_seq; Type: SEQUENCE SET; Schema: public; Owner: cofound
--

SELECT pg_catalog.setval('public."review_reviewId_seq"', 1, false);


--
-- Name: role_roleId_seq; Type: SEQUENCE SET; Schema: public; Owner: cofound
--

SELECT pg_catalog.setval('public."role_roleId_seq"', 1, false);


--
-- Name: user_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: cofound
--

SELECT pg_catalog.setval('public."user_userId_seq"', 1, true);


--
-- Name: conversation PK_03a1f787084f38eabbeb1c8dfcb; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "PK_03a1f787084f38eabbeb1c8dfcb" PRIMARY KEY ("conversationId");


--
-- Name: profile PK_61a193410d652adedb69f7ad680; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "PK_61a193410d652adedb69f7ad680" PRIMARY KEY ("profileId");


--
-- Name: review PK_6e1c269c269c0b470631bfde65c; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_6e1c269c269c0b470631bfde65c" PRIMARY KEY ("reviewId");


--
-- Name: role PK_703705ba862c2bb45250962c9e1; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_703705ba862c2bb45250962c9e1" PRIMARY KEY ("roleId");


--
-- Name: project PK_a9fd7b30180395df453f1373c28; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_a9fd7b30180395df453f1373c28" PRIMARY KEY ("projectId");


--
-- Name: user PK_d72ea127f30e21753c9e229891e; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId");


--
-- Name: conversation_participants_user PK_dabcbf16d1c52adb080092f1606; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.conversation_participants_user
    ADD CONSTRAINT "PK_dabcbf16d1c52adb080092f1606" PRIMARY KEY ("conversationConversationId", "userUserId");


--
-- Name: categorie PK_fa3e387286f137c47d699c4839a; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.categorie
    ADD CONSTRAINT "PK_fa3e387286f137c47d699c4839a" PRIMARY KEY ("categorieId");


--
-- Name: categorie UQ_bfa532987d4bcbe7d99ce731c7d; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.categorie
    ADD CONSTRAINT "UQ_bfa532987d4bcbe7d99ce731c7d" UNIQUE (name);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_36f67b5cf42c55a5da97044e79; Type: INDEX; Schema: public; Owner: cofound
--

CREATE INDEX "IDX_36f67b5cf42c55a5da97044e79" ON public.conversation_participants_user USING btree ("conversationConversationId");


--
-- Name: IDX_b0ddb2c9ced9c3f92b3553ec98; Type: INDEX; Schema: public; Owner: cofound
--

CREATE INDEX "IDX_b0ddb2c9ced9c3f92b3553ec98" ON public.conversation_participants_user USING btree ("userUserId");


--
-- Name: project FK_012eddc2ed8b2acd6e0118bac31; Type: FK CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_012eddc2ed8b2acd6e0118bac31" FOREIGN KEY ("ownerUserId") REFERENCES public."user"("userId");


--
-- Name: review FK_0b83dd899991eb3ac58fdc26756; Type: FK CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_0b83dd899991eb3ac58fdc26756" FOREIGN KEY ("subjectCategorieId") REFERENCES public.categorie("categorieId");


--
-- Name: review FK_32d294ff46129d3bc76f74c1574; Type: FK CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_32d294ff46129d3bc76f74c1574" FOREIGN KEY ("reviewerUserId") REFERENCES public."user"("userId");


--
-- Name: conversation_participants_user FK_36f67b5cf42c55a5da97044e79d; Type: FK CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.conversation_participants_user
    ADD CONSTRAINT "FK_36f67b5cf42c55a5da97044e79d" FOREIGN KEY ("conversationConversationId") REFERENCES public.conversation("conversationId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: conversation_participants_user FK_b0ddb2c9ced9c3f92b3553ec987; Type: FK CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.conversation_participants_user
    ADD CONSTRAINT "FK_b0ddb2c9ced9c3f92b3553ec987" FOREIGN KEY ("userUserId") REFERENCES public."user"("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role("roleId");


--
-- Name: profile FK_c645941c0a12a9e9934026e0189; Type: FK CONSTRAINT; Schema: public; Owner: cofound
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "FK_c645941c0a12a9e9934026e0189" FOREIGN KEY ("userUserId") REFERENCES public."user"("userId");


--
-- PostgreSQL database dump complete
--

