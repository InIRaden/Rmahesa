CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE "UserRole" AS ENUM ('ADMIN');

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Settings" (
  "id" INTEGER PRIMARY KEY DEFAULT 1,
  "siteTitle" TEXT NOT NULL DEFAULT 'Rmahesa',
  "siteDescription" TEXT NOT NULL DEFAULT 'A calm portfolio for a developer who writes poetry and documents life.',
  "logoUrl" TEXT,
  "faviconUrl" TEXT,
  "footerText" TEXT NOT NULL DEFAULT 'A digital journal of code, poems, and moments.',
  "themeColor" TEXT NOT NULL DEFAULT '#171717',
  "socialLinks" TEXT NOT NULL DEFAULT '[]',
  "navItems" TEXT NOT NULL DEFAULT '[]',
  "heroHeadline" TEXT NOT NULL DEFAULT 'I build digital experiences and capture moments in words',
  "heroSubheadline" TEXT NOT NULL DEFAULT 'A web developer and poetry writer shaping quiet, expressive experiences for the web.',
  "heroProfileImage" TEXT,
  "heroPrimaryLabel" TEXT NOT NULL DEFAULT 'Explore Portfolio',
  "heroPrimaryHref" TEXT NOT NULL DEFAULT '/portfolio',
  "heroSecondaryLabel" TEXT NOT NULL DEFAULT 'Read My Poetry',
  "heroSecondaryHref" TEXT NOT NULL DEFAULT '/poetry',
  "aboutTitle" TEXT NOT NULL DEFAULT 'About',
  "aboutSummary" TEXT NOT NULL DEFAULT 'I write code with structure, but I live by feeling. My work sits at the intersection of craft, memory, and meaning.',
  "aboutBody" TEXT NOT NULL DEFAULT 'I build interfaces that feel calm, intentional, and human. Outside of development, I write poetry and document the small, meaningful moments that shape a life.',
  "aboutImageUrl" TEXT,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT,
  "techStack" TEXT NOT NULL DEFAULT '[]',
  "githubUrl" TEXT,
  "liveUrl" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT FALSE,
  "published" BOOLEAN NOT NULL DEFAULT TRUE,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Poem" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "content" TEXT NOT NULL,
  "excerpt" TEXT,
  "category" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT TRUE,
  "poemDate" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Documentation" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT,
  "date" TIMESTAMP(3) NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Certificate" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "issuer" TEXT NOT NULL,
  "imageUrl" TEXT,
  "date" TIMESTAMP(3) NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Message" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'unread',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS user_set_updated_at ON "User";
CREATE TRIGGER user_set_updated_at
BEFORE UPDATE ON "User"
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS settings_set_updated_at ON "Settings";
CREATE TRIGGER settings_set_updated_at
BEFORE UPDATE ON "Settings"
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS project_set_updated_at ON "Project";
CREATE TRIGGER project_set_updated_at
BEFORE UPDATE ON "Project"
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS poem_set_updated_at ON "Poem";
CREATE TRIGGER poem_set_updated_at
BEFORE UPDATE ON "Poem"
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS documentation_set_updated_at ON "Documentation";
CREATE TRIGGER documentation_set_updated_at
BEFORE UPDATE ON "Documentation"
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS certificate_set_updated_at ON "Certificate";
CREATE TRIGGER certificate_set_updated_at
BEFORE UPDATE ON "Certificate"
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

INSERT INTO "User" ("id", "name", "email", "passwordHash", "role")
VALUES (
  'seed-admin',
  'Admin',
  'admin@example.com',
  crypt('ChangeMe123!', gen_salt('bf')),
  'ADMIN'
)
ON CONFLICT ("email") DO UPDATE
SET "name" = EXCLUDED."name",
    "passwordHash" = EXCLUDED."passwordHash",
    "role" = EXCLUDED."role",
    "updatedAt" = NOW();

INSERT INTO "Settings" (
  "id", "navItems", "socialLinks", "heroHeadline", "heroSubheadline", "heroProfileImage",
  "aboutImageUrl", "seoTitle", "seoDescription"
)
VALUES (
  1,
  '[{"label":"Home","href":"/"},{"label":"About","href":"/about"},{"label":"Portfolio","href":"/portfolio"},{"label":"Poetry","href":"/poetry"},{"label":"Journey","href":"/journey"},{"label":"Certificates","href":"/certificates"},{"label":"Contact","href":"/contact"}]',
  '[{"label":"GitHub","href":"https://github.com"},{"label":"Instagram","href":"https://instagram.com"},{"label":"LinkedIn","href":"https://linkedin.com"}]',
  'I build digital experiences and capture moments in words',
  'A web developer and poetry writer shaping quiet, expressive experiences for the web.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80',
  'Rmahesa | Portfolio, Poetry, and Journey',
  'A premium personal website for a developer, poet, and life documentarian.'
)
ON CONFLICT ("id") DO UPDATE
SET "navItems" = EXCLUDED."navItems",
    "socialLinks" = EXCLUDED."socialLinks",
    "heroHeadline" = EXCLUDED."heroHeadline",
    "heroSubheadline" = EXCLUDED."heroSubheadline",
    "heroProfileImage" = EXCLUDED."heroProfileImage",
    "aboutImageUrl" = EXCLUDED."aboutImageUrl",
    "seoTitle" = EXCLUDED."seoTitle",
    "seoDescription" = EXCLUDED."seoDescription",
    "updatedAt" = NOW();

INSERT INTO "Project" ("id", "title", "slug", "description", "imageUrl", "techStack", "githubUrl", "liveUrl", "featured", "sortOrder")
VALUES
  (
    'project-atlas-journal',
    'Atlas Journal',
    'atlas-journal',
    'A quiet editorial portfolio that blends journal notes, projects, and reflective storytelling.',
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
    '["Next.js","Prisma","Tailwind"]',
    'https://github.com',
    'https://vercel.com',
    TRUE,
    1
  ),
  (
    'project-poem-room',
    'Poem Room',
    'poem-room',
    'An intimate poetry reading space with elegant typography and soft transitions.',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    '["Next.js","PostgreSQL","MDX"]',
    NULL,
    NULL,
    TRUE,
    2
  ),
  (
    'project-life-notes',
    'Life Notes',
    'life-notes',
    'A documentation timeline for travel, milestones, and small moments worth keeping.',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    '["Next.js","Framer","Neon"]',
    NULL,
    NULL,
    TRUE,
    3
  )
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "Poem" ("id", "title", "slug", "content", "excerpt", "category", "published", "poemDate")
VALUES
  ('poem-1', 'Still Water', 'still-water', 'The quietest rooms still remember us\n\nEven when the windows close', 'The quietest rooms still remember us.', 'Reflection', TRUE, '2026-05-01T00:00:00Z'),
  ('poem-2', 'Paper Light', 'paper-light', 'I keep the day folded in my pocket\n\nLike a letter waiting for the right morning', 'I keep the day folded in my pocket.', 'Daily', TRUE, '2026-04-18T00:00:00Z')
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "Documentation" ("id", "title", "slug", "description", "imageUrl", "date", "published")
VALUES
  ('doc-1', 'Sketching a landing page concept', 'sketching-a-landing-page-concept', 'Exploring typography, spacing, and motion for the portfolio home page.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', '2026-04-25T00:00:00Z', TRUE),
  ('doc-2', 'Writing late at night', 'writing-late-at-night', 'A quiet evening note about how code and poetry can share the same pacing.', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80', '2026-04-12T00:00:00Z', TRUE)
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "Certificate" ("id", "title", "slug", "issuer", "imageUrl", "date", "published")
VALUES
  ('cert-1', 'Frontend Development', 'frontend-development', 'Neon Academy', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80', '2026-03-01T00:00:00Z', TRUE),
  ('cert-2', 'Database Design', 'database-design', 'Prisma School', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80', '2026-02-14T00:00:00Z', TRUE)
ON CONFLICT ("slug") DO NOTHING;