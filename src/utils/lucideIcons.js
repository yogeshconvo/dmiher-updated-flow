/**
 * Curated Lucide icon map for CMS-driven dynamic icons.
 *
 * Several sections resolve a Lucide icon by CMS name at runtime via
 * `import * as Icons from "lucide-react"; Icons[name]`. That namespace import
 * pulls the ENTIRE lucide set (~587 kB / 146 kB gzip) into the bundle because
 * tree-shaking can't see which icons are actually referenced.
 *
 * Importing a generous-but-bounded set by name lets Rollup drop the rest.
 * Anything the CMS asks for that isn't here resolves to `undefined` and the
 * caller's existing fallback (Users / Star / null) takes over — the same
 * behaviour as an unknown name today.
 *
 * If a needed icon is missing, add its named import below and to the map.
 */
import {
  // navigation / UI
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  ArrowRight, ArrowLeft, ArrowUpRight, ArrowUp, ArrowDown,
  Menu, X, Plus, Minus, Check, CheckCheck, ExternalLink,
  Search, Filter, Download, Upload, Link, Link2, Share2, MoreHorizontal,
  // people
  Users, UsersRound, User, UserCheck, UserPlus, UserCog, Contact,
  GraduationCap, PersonStanding,
  // education / documents
  BookOpen, Book, BookMarked, Library, School, NotebookPen, NotebookText,
  Award, Trophy, Medal, FileText, FileCheck, FileBadge, Files, Folder,
  ClipboardList, ClipboardCheck, PenTool, Pencil, Backpack, Presentation,
  ScrollText, BadgeCheck, Bookmark,
  // contact / place
  Phone, PhoneCall, Mail, MapPin, MapPinned, Clock, Clock3, Globe, Globe2,
  Building, Building2, Home, Navigation, Send, MessageSquare, MessageCircle,
  AtSign, Map, Route, Milestone, Locate,
  // symbols / values
  Star, Heart, HeartHandshake, HandHeart, Handshake, Shield, ShieldCheck,
  CheckCircle, CircleCheck, Target, Flag, Lightbulb, Eye, Zap, Sparkles,
  Rocket, Compass, Gem, Crown, ThumbsUp, Scale, Gavel, Landmark, Info,
  HelpCircle, AlertCircle, CircleDot, Quote, Megaphone, Bell,
  // health / science
  Stethoscope, HeartPulse, Activity, Cross, Pill, Microscope, FlaskConical,
  Dna, Brain, Syringe, TestTube, Beaker, Atom,
  // media / tech
  Newspaper, Video, Camera, Image, Play, PlayCircle, Monitor, Laptop, Wifi,
  Database, Server, Cpu, Code, Terminal,
  // nature / campus
  Leaf, TreePine, Sprout, Sun, Droplet, Recycle,
  // transport
  Bus, Car, Plane, Train, Bike,
  // data / business
  TrendingUp, BarChart, BarChart3, PieChart, LineChart, DollarSign,
  CreditCard, Wallet, Briefcase, Package, Truck, Store,
  // time / calendar
  Calendar, CalendarDays, CalendarCheck,
  // layout / misc
  Layers, LayoutGrid, Grid, List, Settings, Cog, Wrench, Factory,
} from "lucide-react";

const ICONS = {
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  ArrowRight, ArrowLeft, ArrowUpRight, ArrowUp, ArrowDown,
  Menu, X, Plus, Minus, Check, CheckCheck, ExternalLink,
  Search, Filter, Download, Upload, Link, Link2, Share2, MoreHorizontal,
  Users, UsersRound, User, UserCheck, UserPlus, UserCog, Contact,
  GraduationCap, PersonStanding,
  BookOpen, Book, BookMarked, Library, School, NotebookPen, NotebookText,
  Award, Trophy, Medal, FileText, FileCheck, FileBadge, Files, Folder,
  ClipboardList, ClipboardCheck, PenTool, Pencil, Backpack, Presentation,
  ScrollText, BadgeCheck, Bookmark,
  Phone, PhoneCall, Mail, MapPin, MapPinned, Clock, Clock3, Globe, Globe2,
  Building, Building2, Home, Navigation, Send, MessageSquare, MessageCircle,
  AtSign, Map, Route, Milestone, Locate,
  Star, Heart, HeartHandshake, HandHeart, Handshake, Shield, ShieldCheck,
  CheckCircle, CircleCheck, Target, Flag, Lightbulb, Eye, Zap, Sparkles,
  Rocket, Compass, Gem, Crown, ThumbsUp, Scale, Gavel, Landmark, Info,
  HelpCircle, AlertCircle, CircleDot, Quote, Megaphone, Bell,
  Stethoscope, HeartPulse, Activity, Cross, Pill, Microscope, FlaskConical,
  Dna, Brain, Syringe, TestTube, Beaker, Atom,
  Newspaper, Video, Camera, Image, Play, PlayCircle, Monitor, Laptop, Wifi,
  Database, Server, Cpu, Code, Terminal,
  Leaf, TreePine, Sprout, Sun, Droplet, Recycle,
  Bus, Car, Plane, Train, Bike,
  TrendingUp, BarChart, BarChart3, PieChart, LineChart, DollarSign,
  CreditCard, Wallet, Briefcase, Package, Truck, Store,
  Calendar, CalendarDays, CalendarCheck,
  Layers, LayoutGrid, Grid, List, Settings, Cog, Wrench, Factory,
};

export default ICONS;
