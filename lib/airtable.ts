const AT_URL = "https://api.airtable.com/v0";

function baseId() {
  const id = process.env.AIRTABLE_BASE_ID;
  if (!id) throw new Error("AIRTABLE_BASE_ID is not set");
  return id;
}

function headers(): HeadersInit {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) throw new Error("AIRTABLE_PAT is not set");
  return { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" };
}

export interface AtRecord<T> {
  id: string;
  createdTime: string;
  fields: T;
}

interface QueryParams {
  filterByFormula?: string;
  sort?: { field: string; direction: "asc" | "desc" }[];
  maxRecords?: number;
  fields?: string[];
}

async function atGet<T>(table: string, params?: QueryParams): Promise<AtRecord<T>[]> {
  const url = new URL(`${AT_URL}/${baseId()}/${encodeURIComponent(table)}`);
  if (params?.filterByFormula) url.searchParams.set("filterByFormula", params.filterByFormula);
  if (params?.maxRecords) url.searchParams.set("maxRecords", String(params.maxRecords));
  params?.fields?.forEach((f) => url.searchParams.append("fields[]", f));
  params?.sort?.forEach((s, i) => {
    url.searchParams.set(`sort[${i}][field]`, s.field);
    url.searchParams.set(`sort[${i}][direction]`, s.direction);
  });

  const res = await fetch(url.toString(), { headers: headers(), next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Airtable GET ${table}: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { records: AtRecord<T>[] };
  return data.records;
}

async function atGetOne<T>(table: string, id: string): Promise<AtRecord<T>> {
  const res = await fetch(`${AT_URL}/${baseId()}/${encodeURIComponent(table)}/${id}`, {
    headers: headers(),
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`Airtable GET ${table}/${id}: ${res.status}`);
  return res.json() as Promise<AtRecord<T>>;
}

async function atCreate<T>(table: string, fields: Partial<T>): Promise<AtRecord<T>> {
  const res = await fetch(`${AT_URL}/${baseId()}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`Airtable CREATE ${table}: ${res.status} ${await res.text()}`);
  return res.json() as Promise<AtRecord<T>>;
}

async function atUpdate<T>(table: string, id: string, fields: Partial<T>): Promise<AtRecord<T>> {
  const res = await fetch(`${AT_URL}/${baseId()}/${encodeURIComponent(table)}/${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(`Airtable UPDATE ${table}/${id}: ${res.status} ${await res.text()}`);
  return res.json() as Promise<AtRecord<T>>;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface MemberFields {
  member_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  status?: "Active" | "Inactive" | "Suspended";
  role?: "Member" | "Officer" | "Admin";
  chapter?: string;
  joined_date?: string;
  clerk_user_id?: string;
  avatar_url?: string;
  bio?: string;
}

export interface EventFields {
  event_id?: number;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  type?: "Meeting" | "Social" | "Community Service" | "Fundraiser";
  status?: "Upcoming" | "Completed" | "Cancelled";
  rsvp_members?: string[];
}

export interface AnnouncementFields {
  announcement_id?: number;
  title: string;
  body: string;
  published_at?: string;
  author?: string;
  pinned?: boolean;
}

export interface DuesFields {
  dues_id?: number;
  member?: string[];
  amount?: number;
  period?: string;
  status?: "Paid" | "Unpaid" | "Partial" | "Waived";
  paid_date?: string;
  payment_method?: string;
}

// ── Table helpers ──────────────────────────────────────────────────────────

export const Members = {
  getAll: (p?: QueryParams) => atGet<MemberFields>("Members", p),
  getById: (id: string) => atGetOne<MemberFields>("Members", id),
  findByEmail: (email: string) =>
    atGet<MemberFields>("Members", { filterByFormula: `{email}="${email}"` }),
  findByClerkId: (clerkId: string) =>
    atGet<MemberFields>("Members", { filterByFormula: `{clerk_user_id}="${clerkId}"` }),
  create: (fields: Partial<MemberFields>) => atCreate<MemberFields>("Members", fields),
  update: (id: string, fields: Partial<MemberFields>) =>
    atUpdate<MemberFields>("Members", id, fields),
};

export const Events = {
  getAll: (p?: QueryParams) => atGet<EventFields>("Events", p),
  getById: (id: string) => atGetOne<EventFields>("Events", id),
  create: (fields: Partial<EventFields>) => atCreate<EventFields>("Events", fields),
  update: (id: string, fields: Partial<EventFields>) =>
    atUpdate<EventFields>("Events", id, fields),
};

export const Announcements = {
  getAll: (p?: QueryParams) => atGet<AnnouncementFields>("Announcements", p),
  getById: (id: string) => atGetOne<AnnouncementFields>("Announcements", id),
  create: (fields: Partial<AnnouncementFields>) =>
    atCreate<AnnouncementFields>("Announcements", fields),
};

export const Dues = {
  getAll: (p?: QueryParams) => atGet<DuesFields>("Dues", p),
  getById: (id: string) => atGetOne<DuesFields>("Dues", id),
  forMember: (airtableId: string) =>
    atGet<DuesFields>("Dues", {
      filterByFormula: `FIND("${airtableId}", ARRAYJOIN(member))`,
    }),
  update: (id: string, fields: Partial<DuesFields>) =>
    atUpdate<DuesFields>("Dues", id, fields),
};
