const safeString = (value) => (typeof value === "string" ? value : "");
const safeArray = (value) => (Array.isArray(value) ? value : []);

const normalizeCtaList = (cta) => {
  if (Array.isArray(cta)) return cta;
  if (cta && typeof cta === "object") {
    if ("cta_key" in cta || "label" in cta || "has_micro_page" in cta) {
      return [cta];
    }
    return Object.values(cta);
  }
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
    icon: safeString(phase.icon),
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
  icon: safeString(program.icon),
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

const mapSyllabusTopics = (raw) => {
  const list = safeArray(raw);
  const flattened = list.flatMap((entry) =>
    Array.isArray(entry) ? entry : [entry]
  );
  return flattened.map(mapSyllabusTopic).filter(Boolean);
};

const mapFeature = (feature = {}) => ({
  icon: safeString(feature.icon),
  title: safeString(feature.title),
  description: safeString(feature.description),
});

export const mapDmiherCetSectionData = (data = {}) => {
  const hero = data.hero || {};
  const tl = data.timeline || {};
  const pat = data.pattern_header || {};
  const prog = data.programs_header || {};
  const syl = data.syllabus_header || {};
  const feat = data.features_header || {};

  return {
    hero: {
      heading: safeString(hero.heading),
      description: safeString(hero.description),
    },
    timeline: {
      enabled: tl._section_enabled !== false,
      header: { heading: safeString(tl.heading) },
      bannerText: safeString(tl.banner_text),
      bannerIcon: safeString(tl.banner_icon),
      phases: safeArray(tl.timeline_phases).map(mapTimelinePhase),
    },
    pattern: {
      enabled: pat._section_enabled !== false,
      header: {
        heading: safeString(pat.heading),
        description: safeString(pat.description),
      },
      stats: safeArray(pat.pattern_stats).map(mapPatternStat),
    },
    programs: {
      enabled: prog._section_enabled !== false,
      header: { heading: safeString(prog.heading) },
      sections: safeArray(prog.program_sections).map(mapProgramSection),
    },
    syllabus: {
      enabled: syl._section_enabled !== false,
      header: {
        heading: safeString(syl.heading),
        description: safeString(syl.description),
      },
      topics: mapSyllabusTopics(syl.syllabus_topics),
    },
    features: {
      enabled: feat._section_enabled !== false,
      header: { heading: safeString(feat.heading) },
      items: safeArray(feat.key_features).map(mapFeature),
    },
  };
};
