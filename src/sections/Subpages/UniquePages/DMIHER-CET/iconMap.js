import {
  Users,
  Clock,
  FileText,
  BookOpen,
  Monitor,
  Target,
  Zap,
  Shield,
  Brain,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Download,
  Phone,
  Mail,
  Globe,
  CreditCard,
  GraduationCap,
  MapPin,
  Briefcase,
} from "lucide-react";

// Shared name → lucide-component resolver for the DMIHER-CET subpages. The
// backend stores icons as kebab-case names; unknown names fall back to a safe
// default so a typo never crashes the page.
const ICON_MAP = {
  users: Users,
  clock: Clock,
  "file-text": FileText,
  file: FileText,
  "book-open": BookOpen,
  book: BookOpen,
  monitor: Monitor,
  target: Target,
  zap: Zap,
  shield: Shield,
  brain: Brain,
  award: Award,
  "trending-up": TrendingUp,
  calendar: Calendar,
  "check-circle": CheckCircle,
  "alert-circle": AlertCircle,
  download: Download,
  phone: Phone,
  mail: Mail,
  globe: Globe,
  "credit-card": CreditCard,
  "graduation-cap": GraduationCap,
  "map-pin": MapPin,
  briefcase: Briefcase,
};

export const resolveIcon = (name, fallback = BookOpen) =>
  ICON_MAP[name] || fallback;

export default resolveIcon;
