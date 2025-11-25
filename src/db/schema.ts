import {
  pgTable,
  serial,
  text,
  timestamp,
  json,
  vector,
  index,
} from "drizzle-orm/pg-core";

// --- 1. LEADS (Beérkező űrlapok: Kapcsolat + Árajánlat) ---
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Teljes név (vezeték + kereszt)
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"), // Üzenet szövege
  // Ezek az Árajánlatkérő űrlaphoz kellenek (opcionálisak)
  projectType: text("project_type"), // Pl. "wooden", "metal"
  timing: text("timing"), // Pl. "asap", "3_6_months"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- 2. POSTS (Blog bejegyzések) ---
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(), // URL barát azonosító (pl. "uj-jatszoter-epult")
  title: text("title").notNull(),
  excerpt: text("excerpt"), // Rövid bevezető
  content: text("content"), // A teljes szöveg (HTML vagy Markdown)
  coverImage: text("cover_image"), // Borítókép URL-je
  publishedAt: timestamp("published_at").defaultNow(),
});

// --- 3. REFERENCES (Referencia munkák) ---
export const references = pgTable("references", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  location: text("location"), // Pl. "Budapest, XVIII. kerület"
  clientType: text("client_type"), // Pl. "Önkormányzat", "Óvoda", "Lakópark"
  description: text("description"), // Leírás a projektről
  category: text("category"), // Pl. "wooden", "metal" (szűréshez)
  // Képek listája JSON tömbként (pl. ["/ref-1.jpg", "/ref-2.jpg"])
  images: json("images").$type<string[]>(),
});

// --- 4. EMBEDDINGS (AI Tudásbázis) ---
// Ez tárolja a dokumentumok feldarabolt részeit és a vektorokat
export const embeddings = pgTable(
  "embeddings",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(), // A szöveges tartalom (chunk)
    embedding: vector("embedding", { dimensions: 1536 }), // OpenAI text-embedding-3-small dimenziója
    metadata: json("metadata"), // Pl. { fileName: "aszf.pdf", page: 1 }
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Index a gyors hasonlóság-kereséshez (HNSW index koszinusz hasonlósággal)
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);
