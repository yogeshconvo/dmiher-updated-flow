/**
 * Transforms the raw DMIHER-CET API payload into the shape consumed by the UI layer.
 *
 * Defensive — every field defaults to a safe empty value so partial API responses
 * never crash the UI. The shape below is intentionally close to the original
 * hardcoded structure used by `DMIHER-CET.jsx` to minimize rendering changes.
 */

const safeString = (value) => (typeof value === "string" ? value : "");
const safeArray = (value) => (Array.isArray(value) ? value : []);

/**
 * The API ships `cta` as either an array OR an object keyed by index strings
 * (e.g. {"1": {...}}). Normalize both shapes into a flat array.
 */
const normalizeCtaList = (cta) => {
  if (Array.isArray(cta)) return cta;
  if (cta && typeof cta === "object") return Object.values(cta);
  return [];
};

const mapCta = (cta = {}) => ({
  label: safeString(cta.label),
  ctaKey: safeString(cta.cta_key),
  hasMicroPage: Boolean(cta.has_micro_page),
});

const mapTimelinePhase = (phase = {}) => {
  const ctas = normalizeCtaList(phase.cta).map(mapCta);
  return {
    phase: safeString(phase.phase),
    month: safeString(phase.month),
    ctas,
    primaryCta: ctas[0] || null,
  };
};

const mapPatternStat = (stat = {}) => ({
  icon: safeString(stat.icon),
  title: safeString(stat.title),
  description: safeString(stat.description),
  stat: safeString(stat.stat),
  statLabel: safeString(stat.stat_label),
});

const mapProgramSection = (program = {}) => ({
  title: safeString(program.title),
  subjects: safeArray(program.subjects).map((subject) =>
    typeof subject === "string"
      ? { name: subject }
      : { name: safeString(subject?.name) }
  ),
});

const mapSyllabusTopic = (topic) => {
  if (!topic) return null;
  if (typeof topic === "string") return { subject: topic, topics: [] };

  const subject = safeString(topic.subject) || safeString(topic.name);
  const topics = safeArray(topic.topics).map((t) =>
    typeof t === "string" ? t : safeString(t?.name)
  );
  if (!subject && topics.length === 0) return null;
  return { subject, topics, icon: safeString(topic.icon) };
};

/**
 * `syllabus_topics` may arrive as a flat list of topics OR as a list of lists
 * (one list per subject group). Flatten one level deep so we always end up
 * with a flat array of topic objects.
 */
const mapSyllabusTopics = (raw) => {
  const list = safeArray(raw);
  const flattened = list.flatMap((entry) =>
    Array.isArray(entry) ? entry : [entry]
  );
  return flattened.map(mapSyllabusTopic).filter(Boolean);
};

const mapHeader = (header) => {
  if (!header) return { heading: "", description: "" };
  // syllabus_header arrives as an array of one header object
  const source = Array.isArray(header) ? header[0] || {} : header;
  return {
    heading: safeString(source.heading),
    description: safeString(source.description),
  };
};

const mapHero = (hero = {}) => ({
  heading: safeString(hero.heading),
  description: safeString(hero.description),
  bannerText: safeString(hero.banner_text),
});

export const mapDmiherCetSectionData = (data = {}) => ({
  hero: mapHero(data.hero),
  timeline: {
    header: mapHeader(data.timeline_header),
    phases: safeArray(data.timeline_phases).map(mapTimelinePhase),
  },
  pattern: {
    header: mapHeader(data.pattern_header),
    stats: safeArray(data.pattern_stats).map(mapPatternStat),
  },
  programs: {
    header: mapHeader(data.programs_header),
    sections: safeArray(data.program_sections).map(mapProgramSection),
  },
  syllabus: {
    header: mapHeader(data.syllabus_header),
    topics: mapSyllabusTopics(data.syllabus_topics),
  },
});
