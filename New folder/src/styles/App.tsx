import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/ChatGPT Image Jun 18, 2026, 03_09_40 PM copya.png";
import logoMark from "@/imports/ChatGPT Image Jun 18, 2026, 03_09_40 PM copyd.png";
import coffeeLogo from "./image/473782010_18488565829062189_2940925516075801837_n.jpg";
import EducationLogo from "./image/f5b82176-en.jpeg";
import FitnessLogo from "./image/1_1140.1.jpg";
import TechnologyLogo from "./image/The-10-Tech-Trends-That-Will-Transform-Our-World.jpg";
import ServicesLogo from "./image/821817_157617ห.jpeg";
import FoodandBeverageServicesLogo from "./image/1628518306fnb3.jpg";
import bgWelcome from "./image/ChatGPT Image Jun 20, 2026, 02_18_11 PM.png";
import {
  Home,
  Search,
  MessageCircle,
  User,
  Heart,
  BarChart2,
  ChevronRight,
  ChevronLeft,
  Bell,
  Filter,
  MapPin,
  DollarSign,
  CheckCircle,
  X,
  Plus,
  Calendar,
  Clock,
  Building2,
  Shield,
  Eye,
  Users,
  Settings,
  LogOut,
  Award,
  Target,
  TrendingUp,
  Globe,
  Send,
  Check,
  Package,
  AlertTriangle,
  BookMarked,
  Camera,
  Sliders,
  Mic,
  Upload,
  Phone,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
  Cell,
  PieChart as RPieChart,
  Pie,
} from "recharts";

// ── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "welcome"
  | "role-select"
  | "login"
  | "seeker-register"
  | "owner-register"
  | "seeker-home"
  | "seeker-search"
  | "seeker-detail"
  | "seeker-compare"
  | "seeker-chat"
  | "seeker-chat-detail"
  | "seeker-appointments"
  | "seeker-favorites"
  | "seeker-profile"
  | "owner-dashboard"
  | "owner-franchises"
  | "owner-add"
  | "owner-leads"
  | "owner-messages"
  | "owner-analytics"
  | "owner-profile"
  | "admin-home"
  | "admin-users"
  | "admin-verification"
  | "admin-approvals"
  | "admin-analytics";

interface Franchise {
  id: string;
  name: string;
  logoImg: string;
  category: string;
  investMin: number;
  investMax: number;
  roi: string;
  branches: number;
  rating: number;
  reviews: number;
  location: string;
  description: string;
  fee: number;
  verified: boolean;
  matchScore: number;
  featured: boolean;
  isNew: boolean;
  tags: string[];
  coverImg: string;

}
interface Lead {
  id: string;
  name: string;
  avatar: string;
  budget: string;
  category: string;
  status: "new" | "contacted" | "interested" | "converted";
  date: string;
  location: string;
}
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  franchise: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
}
interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const FRANCHISES: Franchise[] = [
  {
    id: "1",
    name: "CoffeeBreeze",
    logoImg: coffeeLogo,
    category: "Food & Beverage",
    investMin: 80000,
    investMax: 120000,
    roi: "18–24 mo",
    branches: 247,
    rating: 4.8,
    reviews: 312,
    location: "ขอนแก่น",
    description:
      "Thailand's fastest-growing specialty coffee franchise offering premium artisanal beverages. Founded in 2018, we've expanded to 247 outlets across Southeast Asia with a proven model and strong brand recognition.",
    fee: 15000,
    verified: true,
    matchScore: 94,
    featured: true,
    isNew: false,
    tags: ["Trending", "F&B", "Coffee"],
    coverImg:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "2",
    name: "EduKids Academy",
    logoImg: EducationLogo,
    category: "Education",
    investMin: 150000,
    investMax: 250000,
    roi: "24–36 mo",
    branches: 89,
    rating: 4.9,
    reviews: 198,
    location: "ภูเก็ต",
    description:
      "Award-winning early childhood education franchise with proprietary STEAM-based curriculum. Our centres rank among the top preschools in Malaysia since 2015.",
    fee: 25000,
    verified: true,
    matchScore: 87,
    featured: true,
    isNew: false,
    tags: ["Education", "Premium", "Award"],
    coverImg:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "3",
    name: "FitLife Gym",
    logoImg: FitnessLogo,
    category: "Fitness",
    investMin: 200000,
    investMax: 400000,
    roi: "30–42 mo",
    branches: 63,
    rating: 4.6,
    reviews: 144,
    location: "เชียงใหม่",
    description:
      "24/7 accessible fitness centre franchise with state-of-the-art equipment, group classes, and personal training. Malaysia's fastest-growing gym brand.",
    fee: 40000,
    verified: true,
    matchScore: 72,
    featured: false,
    isNew: false,
    tags: ["Fitness", "24/7", "Wellness"],
    coverImg:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "4",
    name: "QuickFix Tech",
    logoImg: TechnologyLogo,
    category: "Technology",
    investMin: 50000,
    investMax: 80000,
    roi: "12–18 mo",
    branches: 134,
    rating: 4.5,
    reviews: 267,
    location: "กรุงเทพมหานคร",
    description:
      "Premium device repair and tech services franchise. Low investment, high demand, fast ROI. Smartphones, laptops, and smart home devices.",
    fee: 8000,
    verified: true,
    matchScore: 89,
    featured: true,
    isNew: true,
    tags: ["Tech", "Low Investment", "Fast ROI"],
    coverImg:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "5",
    name: "FreshWash Laundry",
    logoImg: ServicesLogo,
    category: "Services",
    investMin: 40000,
    investMax: 60000,
    roi: "14–20 mo",
    branches: 321,
    rating: 4.4,
    reviews: 89,
    location: "อุดรธานี",
    description:
      "Self-service laundry franchise with automated management system. Minimal staffing needed. Operates in residential areas, universities, and commercial complexes.",
    fee: 6000,
    verified: false,
    matchScore: 81,
    featured: false,
    isNew: true,
    tags: ["Services", "Passive Income", "Low Staff"],
    coverImg:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "6",
    name: "NutriMart",
    logoImg: FoodandBeverageServicesLogo,
    category: "Food & Beverage",
    investMin: 60000,
    investMax: 100000,
    roi: "16–22 mo",
    branches: 178,
    rating: 4.7,
    reviews: 203,
    location: "ขอนแก่น",
    description:
      "Healthy food and supplement retail franchise. Over 3,000 health products with in-store nutritional consulting. Catering to the growing wellness market.",
    fee: 12000,
    verified: true,
    matchScore: 78,
    featured: false,
    isNew: false,
    tags: ["Health", "Wellness", "Retail"],
    coverImg:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop&auto=format",
  },
];

const LEADS: Lead[] = [
  {
    id: "1",
    name: "ชิสณะพงษ์ ชัยพิพัฒนมงคล",
    avatar: "AR",
    budget: "฿ 100K–150K",
    category: "F&B",
    status: "new",
    date: "Today, 9:42 AM",
    location: "สงขลา",
  },
  {
    id: "2",
    name: "ชลธิชา ธาตุวิสัย",
    avatar: "PN",
    budget: "฿ 80K–120K",
    category: "F&B",
    status: "contacted",
    date: "Yesterday",
    location: "ขอนแก่น",
  },
  {
    id: "3",
    name: "ก้องภพ ชัยเจริญ",
    avatar: "LW",
    budget: "฿ 200K+",
    category: "Any",
    status: "interested",
    date: "Jun 15",
    location: "อุดรธานี",
  },
  {
    id: "4",
    name: "ณัฐนนท์ธีรเมธา เหลี่ยมเคลือบ",
    avatar: "SH",
    budget: "฿ 80K–100K",
    category: "F&B",
    status: "converted",
    date: "Jun 12",
    location: "เชียงใหม่",
  },
  {
    id: "5",
    name: "ธีรภัทร สุวรรณ",
    avatar: "RK",
    budget: "฿ 150K–200K",
    category: "Education",
    status: "new",
    date: "Jun 18",
    location: "กรุงเทพมหานคร",
  },
];

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "ชิสณะพงษ์ ชัยพิพัฒนมงคล",
    avatar: "AR",
    franchise: "CoffeeBreeze",
    lastMsg: "I'm very interested in the franchise package",
    time: "9:42 AM",
    unread: 3,
    online: true,
  },
  {
    id: "2",
    name: "ชลธิชา ธาตุวิสัย",
    avatar: "PN",
    franchise: "CoffeeBreeze",
    lastMsg: "Can we schedule a site visit?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "ก้องภพ ชัยเจริญ",
    avatar: "LW",
    franchise: "CoffeeBreeze",
    lastMsg: "What support do you provide?",
    time: "Jun 15",
    unread: 1,
    online: false,
  },
  {
    id: "4",
    name: "ณัฐนนท์ธีรเมธา เหลี่ยมเคลือบ",
    avatar: "SH",
    franchise: "EduKids",
    lastMsg: "Thank you for the detailed info!",
    time: "Jun 12",
    unread: 0,
    online: true,
  },
];

const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    sender: "them",
    text: "Hello! I'm interested in CoffeeBreeze. Can you share the investment packages?",
    time: "9:30 AM",
  },
  {
    id: "2",
    sender: "me",
    text: "Hi Ahmad! Great to hear from you. We have two packages starting from ฿ 80,000. Shall I walk you through?",
    time: "9:32 AM",
  },
  {
    id: "3",
    sender: "them",
    text: "Yes please! Also, what post-opening support do you provide?",
    time: "9:35 AM",
  },
  {
    id: "4",
    sender: "me",
    text: "Full setup, 3-week staff training, marketing kit, and monthly operational visits. Plus a dedicated helpdesk.",
    time: "9:37 AM",
  },
  {
    id: "5",
    sender: "them",
    text: "That sounds great! I'm very interested in the franchise package.",
    time: "9:42 AM",
  },
];

const ANALYTICS_DATA = {
  views: [
    { date: "Jun 12", value: 234 },
    { date: "Jun 13", value: 312 },
    { date: "Jun 14", value: 289 },
    { date: "Jun 15", value: 401 },
    { date: "Jun 16", value: 367 },
    { date: "Jun 17", value: 445 },
    { date: "Jun 18", value: 512 },
  ],
  leads: [
    { month: "Mar", value: 12 },
    { month: "Apr", value: 19 },
    { month: "May", value: 28 },
    { month: "Jun", value: 34 },
  ],
  categories: [
    { name: "F&B", value: 42, color: "#2563EB" },
    { name: "Education", value: 28, color: "#0F3D9E" },
    { name: "Fitness", value: 18, color: "#60A5FA" },
    { name: "Other", value: 12, color: "#BFDBFE" },
  ],
  growth: [
    { month: "Jan", users: 3200, revenue: 42 },
    { month: "Feb", users: 4100, revenue: 56 },
    { month: "Mar", users: 5300, revenue: 63 },
    { month: "Apr", users: 6100, revenue: 71 },
    { month: "May", users: 7200, revenue: 78 },
    { month: "Jun", users: 8247, revenue: 84 },
  ],
};

const APPOINTMENTS = [
  {
    id: "1",
    franchise: "CoffeeBreeze",
    date: "Jun 20, 2025",
    time: "10:00 AM",
    type: "online" as const,
    status: "confirmed" as const,
  },
  {
    id: "2",
    franchise: "EduKids Academy",
    date: "Jun 22, 2025",
    time: "2:30 PM",
    type: "onsite" as const,
    status: "pending" as const,
  },
];

// ── Utilities & Micro-components ──────────────────────────────────────────────

function fmt(n: number) {
  return n >= 1000 ? `฿ ${(n / 1000).toFixed(0)}K` : `฿ ${n}`;
}

function Stars({ r, sz = 11 }: { r: number; sz?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={sz}
          height={sz}
          viewBox="0 0 12 12"
          fill={i <= Math.floor(r) ? "#F59E0B" : "#E5E7EB"}
        >
          <path d="M6 1l1.4 2.9 3.2.5-2.3 2.2.5 3.2L6 8.3l-2.8 1.5.5-3.2L1.4 4.4l3.2-.5z" />
        </svg>
      ))}
    </div>
  );
}

const STATUS: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  new: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "New",
  },
  contacted: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Contacted",
  },
  interested: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    label: "Interested",
  },
  converted: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    label: "Converted",
  },
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    label: "Pending",
  },
  confirmed: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Confirmed",
  },
  completed: {
    bg: "bg-gray-100",
    text: "text-gray-500",
    label: "Completed",
  },
};

function Pill({ s }: { s: keyof typeof STATUS }) {
  const c = STATUS[s];
  return (
    <span
      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}

function MatchBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "#059669"
      : score >= 75
        ? "#2563EB"
        : "#F59E0B";
  return (
    <div className="flex items-center gap-1">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: color }}
      >
        <span className="text-[8px] font-black text-white">
          {score}%
        </span>
      </div>
      <span
        className="text-[10px] font-semibold"
        style={{ color }}
      >
        Match
      </span>
    </div>
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-5 pt-3 pb-1 text-[11px] font-semibold select-none ${dark ? "text-white" : "text-gray-800"}`}
    >
      <span>9:41</span>
      <div className="w-28 h-4" />
      <div className="flex items-center gap-1">
        <svg
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="currentColor"
          opacity={0.75}
        >
          <rect x="0" y="5" width="2.5" height="5" rx="0.5" />
          <rect x="4" y="3" width="2.5" height="7" rx="0.5" />
          <rect x="8" y="1" width="2.5" height="9" rx="0.5" />
          <rect x="12" y="0" width="3" height="10" rx="0.5" />
        </svg>
        <svg
          width="13"
          height="10"
          viewBox="0 0 14 10"
          fill="currentColor"
          opacity={0.75}
        >
          <path d="M7 2.5C9.2 2.5 11.1 3.5 12.4 5L14 3.3C12.2 1.2 9.8 0 7 0S1.8 1.2 0 3.3L1.6 5C2.9 3.5 4.8 2.5 7 2.5Z" />
          <path d="M7 5.5C8.3 5.5 9.5 6 10.4 6.9L12 5.2C10.6 3.9 8.9 3 7 3S3.4 3.9 2 5.2L3.6 6.9C4.5 6 5.7 5.5 7 5.5Z" />
          <circle cx="7" cy="9" r="1.5" />
        </svg>
        <div
          className={`flex items-center w-[22px] h-[11px] border rounded-[2px] p-[2px] ${dark ? "border-white/70" : "border-gray-600"}`}
        >
          <div
            className="h-full rounded-[1px] bg-current"
            style={{ width: "72%" }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Franchise Cards ───────────────────────────────────────────────────────────

function FranchiseCard({
  f,
  onPress,
}: {
  f: Franchise;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-start gap-3 bg-white rounded-2xl p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 text-left active:scale-[0.98] transition-transform"
    >
      <div className="w-13 h-13 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden shrink-0">
  <img 
    src={f.logoImg} 
    alt={f.name} 
    className="w-full h-full object-cover" 
  />
</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="text-sm font-bold text-gray-900 truncate"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            {f.name}
          </span>
          {f.verified && (
            <CheckCircle
              size={12}
              className="text-blue-600 shrink-0"
            />
          )}
          {f.isNew && (
            <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded-full shrink-0">
              NEW
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mb-1.5">
          <Stars r={f.rating} />
          <span className="text-[10px] text-gray-400">
            {f.rating} ({f.reviews})
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          <span className="flex items-center gap-0.5">
            <MapPin size={10} />
            {f.location}
          </span>
          <span className="flex items-center gap-0.5">
            <DollarSign size={10} />
            From {fmt(f.investMin)}
          </span>
        </div>
      </div>
      <div className="shrink-0">
        <MatchBadge score={f.matchScore} />
      </div>
    </button>
  );
}

function FeaturedCard({
  f,
  onPress,
}: {
  f: Franchise;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="w-48 shrink-0 rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-left active:scale-[0.97] transition-transform"
    >
      <div className="h-24 relative bg-blue-100">
        <img
          src={f.coverImg}
          alt={f.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2.5">
          <p
            className="text-xs font-black text-white leading-tight"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            {f.name}
          </p>
          <p className="text-[9px] text-white/75">
            {f.category}
          </p>
        </div>
        {f.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[8px] font-black px-1.5 py-0.5 rounded-full">
            ★ TOP
          </div>
        )}
      </div>
      <div className="px-3 py-2.5">
        <div className="flex items-center justify-between mb-1">
          <Stars r={f.rating} sz={9} />
          <span className="text-[9px] text-gray-400">
            {f.branches} outlets
          </span>
        </div>
        <p className="text-[11px] font-black text-blue-700">
          From {fmt(f.investMin)}
        </p>
      </div>
    </button>
  );
}

// ── Bottom Navigation Bars ────────────────────────────────────────────────────

function SeekerNav({
  active,
  go,
}: {
  active: string;
  go: (s: Screen) => void;
}) {
  const items: {
    icon: React.ElementType;
    label: string;
    screen: Screen;
  }[] = [
    { icon: Home, label: "Home", screen: "seeker-home" },
    { icon: Search, label: "Search", screen: "seeker-search" },
    {
      icon: BookMarked,
      label: "Compare",
      screen: "seeker-compare",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      screen: "seeker-chat",
    },
    { icon: User, label: "Profile", screen: "seeker-profile" },
  ];
  return (
    <div className="flex items-center border-t border-gray-100 bg-white px-1 pb-2 pt-2 shrink-0">
      {items.map((item) => {
        const on = active === item.screen;
        return (
          <button
            key={item.screen}
            onClick={() => go(item.screen)}
            className="flex-1 flex flex-col items-center gap-0.5"
          >
            <item.icon
              size={20}
              strokeWidth={on ? 2.5 : 1.8}
              className={
                on
                  ? "text-blue-600"
                  : "text-gray-350 text-gray-400"
              }
            />
            <span
              className={`text-[9px] font-semibold ${on ? "text-blue-600" : "text-gray-400"}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function OwnerNav({
  active,
  go,
}: {
  active: string;
  go: (s: Screen) => void;
}) {
  const items: {
    icon: React.ElementType;
    label: string;
    screen: Screen;
  }[] = [
    {
      icon: BarChart2,
      label: "Dashboard",
      screen: "owner-dashboard",
    },
    {
      icon: Building2,
      label: "Franchise",
      screen: "owner-franchises",
    },
    { icon: Users, label: "Leads", screen: "owner-leads" },
    {
      icon: MessageCircle,
      label: "Messages",
      screen: "owner-messages",
    },
    { icon: User, label: "Profile", screen: "owner-profile" },
  ];
  return (
    <div className="flex items-center border-t border-gray-100 bg-white px-1 pb-2 pt-2 shrink-0">
      {items.map((item) => {
        const on = active === item.screen;
        return (
          <button
            key={item.screen}
            onClick={() => go(item.screen)}
            className="flex-1 flex flex-col items-center gap-0.5"
          >
            <item.icon
              size={20}
              strokeWidth={on ? 2.5 : 1.8}
              className={on ? "text-blue-800" : "text-gray-400"}
            />
            <span
              className={`text-[9px] font-semibold ${on ? "text-blue-800" : "text-gray-400"}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AdminNav({
  active,
  go,
}: {
  active: string;
  go: (s: Screen) => void;
}) {
  const items: {
    icon: React.ElementType;
    label: string;
    screen: Screen;
  }[] = [
    { icon: Home, label: "Home", screen: "admin-home" },
    { icon: Users, label: "Users", screen: "admin-users" },
    {
      icon: Shield,
      label: "Verify",
      screen: "admin-verification",
    },
    {
      icon: Building2,
      label: "Listings",
      screen: "admin-approvals",
    },
    {
      icon: BarChart2,
      label: "Analytics",
      screen: "admin-analytics",
    },
  ];
  return (
    <div className="flex items-center border-t border-gray-100 bg-white px-1 pb-2 pt-2 shrink-0">
      {items.map((item) => {
        const on = active === item.screen;
        return (
          <button
            key={item.screen}
            onClick={() => go(item.screen)}
            className="flex-1 flex flex-col items-center gap-0.5"
          >
            <item.icon
              size={20}
              strokeWidth={on ? 2.5 : 1.8}
              className={
                on ? "text-indigo-700" : "text-gray-400"
              }
            />
            <span
              className={`text-[9px] font-semibold ${on ? "text-indigo-700" : "text-gray-400"}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── SCREEN: Welcome ───────────────────────────────────────────────────────────

function WelcomeScreen({ go }: { go: (s: Screen) => void }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      title: "Welcome to\nMa Dealer",
      sub: "Connecting Through Trust",
      body: "Discover thousands of verified franchise opportunities perfectly matched to your goals and budget.",
      icon: "🤝",
    },
    {
      title: "Find Your Perfect\nFranchise",
      sub: "Smart Matching Technology",
      body: "AI-powered matching connects you with franchises that align with your investment capacity and preferences.",
      icon: "🎯",
    },
    {
      title: "Build With\nConfidence",
      sub: "Verified & Trusted",
      body: "Every listing is verified for authenticity. Connect with real owners and get transparent information.",
      icon: "🛡️",
    },
  ];
  const s = slides[slide];
  return (
    <div
      className="size-full flex flex-col relative"
  style={{
    backgroundImage: `url(${bgWelcome})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-blue-900/60" />
      <StatusBar dark />
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center mb-8 shadow-xl">
          <ImageWithFallback
            src={logoMark}
            alt="Ma Dealer logo mark"
            className="w-20 h-20 object-contain"
          />
        </div>
        <div className="text-center">
          <div className="text-5xl mb-5">{s.icon}</div>
          <h1
            className="text-[26px] font-black text-white whitespace-pre-line mb-2 leading-tight"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            {s.title}
          </h1>
          <p className="text-sm font-semibold text-blue-300 mb-4">
            {s.sub}
          </p>
          <p className="text-sm text-blue-100/80 leading-relaxed max-w-xs mx-auto">
            {s.body}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "w-7 bg-white" : "w-2 bg-white/35"}`}
            />
          ))}
        </div>
      </div>
      <div className="px-6 pb-10 space-y-3">
        {slide < slides.length - 1 ? (
          <button
            onClick={() => setSlide((s) => s + 1)}
            className="w-full py-4 bg-white rounded-2xl text-blue-700 font-black text-base shadow-lg active:scale-[0.97] transition-transform"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => go("role-select")}
            className="w-full py-4 bg-white rounded-2xl text-blue-700 font-black text-base shadow-lg active:scale-[0.97] transition-transform"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Get Started
          </button>
        )}
        <button
          onClick={() => go("login")}
          className="w-full py-3 text-white/65 text-sm font-medium"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}

// ── SCREEN: Role Select ───────────────────────────────────────────────────────

function RoleSelectScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-6 pt-10 pb-5">
        <h1
          className="text-2xl font-black text-gray-900 mb-1"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Who are you?
        </h1>
        <p className="text-sm text-gray-400">
          Choose your role to personalise your experience
        </p>
      </div>
      <div className="px-6 space-y-4 flex-1">
        <button
          onClick={() => go("seeker-register")}
          className="w-full rounded-2xl p-5 border-2 border-blue-100 hover:border-blue-400 shadow-[0_2px_20px_rgba(37,99,235,0.08)] text-left active:scale-[0.97] transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-2xl transition-colors shrink-0">
              🔍
            </div>
            <div className="flex-1">
              <p
                className="font-black text-gray-900 text-[15px] mb-1"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                Franchise Seeker
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Looking to invest? Browse verified opportunities
                and find your perfect business match.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-[10px] text-blue-600 font-semibold">
                  <Target size={10} /> Smart Matching
                </span>
                <span className="flex items-center gap-1 text-[10px] text-blue-600 font-semibold">
                  <Shield size={10} /> Verified Listings
                </span>
              </div>
            </div>
            <ChevronRight
              size={17}
              className="text-gray-300 group-hover:text-blue-500 mt-0.5 transition-colors"
            />
          </div>
        </button>

        <button
          onClick={() => go("owner-register")}
          className="w-full rounded-2xl p-5 text-left active:scale-[0.97] transition-all border border-blue-900/20"
          style={{
            background:
              "linear-gradient(135deg,#0B2154 0%,#1e3a8a 100%)",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl shrink-0">
              🏢
            </div>
            <div className="flex-1">
              <p
                className="font-black text-white text-[15px] mb-1"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                Franchise Owner
              </p>
              <p className="text-xs text-blue-200 leading-relaxed">
                Own a franchise brand? List your opportunity and
                connect with serious investors.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-[10px] text-blue-300 font-semibold">
                  <Users size={10} /> Reach Investors
                </span>
                <span className="flex items-center gap-1 text-[10px] text-blue-300 font-semibold">
                  <TrendingUp size={10} /> Grow Network
                </span>
              </div>
            </div>
            <ChevronRight
              size={17}
              className="text-blue-300 mt-0.5"
            />
          </div>
        </button>

        <div className="text-center pt-2">
          <button
            onClick={() => go("admin-home")}
            className="text-xs text-gray-400 underline"
          >
            Admin Portal →
          </button>
        </div>
      </div>
      <div className="px-6 pb-8 text-center">
         <ImageWithFallback
    src={logoFull}
    alt="Ma Dealer"
    className="h-40 object-contain mx-auto mb-3"
    style={{ maxWidth: 300 }}
  />
        <p className="text-[11px] text-gray-400">
          By continuing you agree to our{" "}
          <span className="text-blue-600 underline">Terms</span>{" "}
          and{" "}
          <span className="text-blue-600 underline">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}

// ── SCREEN: Seeker Register ───────────────────────────────────────────────────

function SeekerRegisterScreen({
  go,
  back,
}: {
  go: (s: Screen) => void;
  back: () => void;
}) {
  const [step, setStep] = useState(1);
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-2 pb-3 flex items-center gap-3">
        <button
          onClick={
            step === 1 ? back : () => setStep((s) => s - 1)
          }
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] text-gray-400">
            Step {step} of 2
          </p>
          <p
            className="text-sm font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Create Seeker Account
          </p>
        </div>
      </div>
      <div className="mx-5 mb-4 h-1.5 bg-gray-100 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${step * 50}%` }}
        />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {step === 1 ? (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900 mb-1"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Personal Information
            </h3>
            {[
              {
                label: "Full Name",
                placeholder: "ชื่อ นามสกุล",
                type: "text",
              },
              {
                label: "Phone Number",
                placeholder: "+66 12-345 6789",
                type: "tel",
              },
              {
                label: "Email Address",
                placeholder: "@email.com",
                type: "email",
              },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900 mb-1"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Investment Profile
            </h3>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Investment Budget
              </label>
              <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-blue-500">
                <option>฿ 50,000 – ฿ 100,000</option>
                <option>฿ 100,000 – ฿ 200,000</option>
                <option>฿ 200,000 – ฿ 500,000</option>
                <option>฿ 500,000+</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-2">
                Preferred Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "F&B",
                  "Education",
                  "Fitness",
                  "Technology",
                  "Services",
                  "Retail",
                  "Healthcare",
                ].map((cat) => (
                  <button
                    key={cat}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 active:bg-blue-600 active:text-white transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Preferred Location
              </label>
              <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-blue-500">
                <option>กรุงเทพมหานคร</option>
                <option>เชียงใหม่</option>
                <option>ขอนแก่น</option>
                <option>ภูเก็ต</option>
                <option>ชลบุรี</option>
                <option>นครราชสีมา</option>
                <option>สงขลา</option>
                <option>อุดรธานี</option>
                <option>สุราษฎร์ธานี</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="px-5 pb-8 space-y-3">
        {step === 1 ? (
          <button
            onClick={() => setStep(2)}
            className="w-full py-4 bg-blue-600 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => go("seeker-home")}
            className="w-full py-4 bg-blue-600 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Create Account
          </button>
        )}
        <p className="text-center text-xs text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => go("login")}
            className="text-blue-600 font-semibold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

// ── SCREEN: Owner Register ────────────────────────────────────────────────────

function OwnerRegisterScreen({
  go,
  back,
}: {
  go: (s: Screen) => void;
  back: () => void;
}) {
  const [step, setStep] = useState(1);
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-2 pb-3 flex items-center gap-3">
        <button
          onClick={
            step === 1 ? back : () => setStep((s) => s - 1)
          }
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] text-gray-400">
            Step {step} of 3
          </p>
          <p
            className="text-sm font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Register as Owner
          </p>
        </div>
      </div>
      <div className="mx-5 mb-4 h-1.5 bg-gray-100 rounded-full">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(step / 3) * 100}%`,
            background:
              "linear-gradient(90deg,#0B2154,#2563EB)",
          }}
        />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {step === 1 && (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Business Information
            </h3>
            {[
              "Business Name",
              "Franchise Brand Name",
              "Business Registration No.",
              "Contact Person Name",
            ].map((label) => (
              <div key={label}>
                <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                  {label}
                </label>
                <input
                  placeholder={label}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-800"
                />
              </div>
            ))}
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Business Category
              </label>
              <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-800">
                <option>Food & Beverage</option>
                <option>Education</option>
                <option>Fitness & Wellness</option>
                <option>Technology</option>
                <option>Services</option>
              </select>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Investment Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Min Investment (฿)",
                "Max Investment (฿)",
                "Franchise Fee (฿)",
                "Royalty Fee (%)",
              ].map((f) => (
                <div key={f}>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">
                    {f}
                  </label>
                  <input
                    placeholder="0"
                    className="w-full px-3 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-800"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Expected ROI Period
              </label>
              <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none">
                <option>12–18 months</option>
                <option>18–24 months</option>
                <option>24–36 months</option>
                <option>36+ months</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Franchise Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe your franchise opportunity..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none resize-none"
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Verification Documents
            </h3>
            <p className="text-xs text-gray-400 -mt-1">
              Upload your documents to receive the Verified
              badge and increase investor trust.
            </p>
            {[
              {
                label: "Business Registration Certificate",
                icon: "📄",
              },
              {
                label: "Brand Certificate / Trademark",
                icon: "™️",
              },
              {
                label: "Financial Statements (Last 2 Years)",
                icon: "📊",
              },
              { label: "Director IC / Passport", icon: "🪪" },
            ].map((doc) => (
              <div
                key={doc.label}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200"
              >
                <span className="text-xl">{doc.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">
                    {doc.label}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    PDF, JPG, PNG · max 5 MB
                  </p>
                </div>
                <button className="p-2 bg-blue-700 rounded-lg">
                  <Upload size={13} className="text-white" />
                </button>
              </div>
            ))}
            <div className="bg-blue-50 rounded-xl p-3 flex gap-2 border border-blue-100">
              <Shield
                size={14}
                className="text-blue-600 shrink-0 mt-0.5"
              />
              <p className="text-[11px] text-blue-700">
                Documents are encrypted and reviewed by our team
                within 1–2 business days.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="px-5 pb-8">
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="w-full py-4 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{
              background:
                "linear-gradient(135deg,#0B2154,#2563EB)",
              fontFamily: "'Manrope',sans-serif",
            }}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => go("owner-dashboard")}
            className="w-full py-4 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{
              background:
                "linear-gradient(135deg,#0B2154,#2563EB)",
              fontFamily: "'Manrope',sans-serif",
            }}
          >
            Submit for Review
          </button>
        )}
      </div>
    </div>
  );
}

// ── SCREEN: Login ─────────────────────────────────────────────────────────────

function LoginScreen({
  go,
  back,
}: {
  go: (s: Screen) => void;
  back: () => void;
}) {
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-2 pb-4 flex items-center gap-3">
        <button
          onClick={back}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <span
          className="font-bold text-gray-900"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Sign In
        </span>
      </div>
      <div className="flex-1 px-6 pt-4">
        <ImageWithFallback
          src={logoFull}
          alt="Ma Dealer"
          className="h-10 object-contain mb-6"
          style={{ maxWidth: 180 }}
        />
        <h1
          className="text-2xl font-black text-gray-900 mb-1"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Welcome back!
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Sign in to continue to Ma Dealer
        </p>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
              Email / Phone
            </label>
            <input
              type="email"
              placeholder="sarah@email.com"
              defaultValue="sarah@email.com"
              className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
              Password
            </label>
            <input
              type="password"
              defaultValue="password123"
              className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex justify-end">
            <button className="text-xs text-blue-600 font-semibold">
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => go("seeker-home")}
            className="w-full py-4 bg-blue-600 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Sign In as Seeker
          </button>
          <button
            onClick={() => go("owner-dashboard")}
            className="w-full py-4 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{
              background:
                "linear-gradient(135deg,#0B2154,#1e3a8a)",
              fontFamily: "'Manrope',sans-serif",
            }}
          >
            Sign In as Owner
          </button>
          <button
            onClick={() => go("admin-home")}
            className="w-full py-3.5 rounded-2xl font-black text-sm active:scale-[0.97] transition-transform border border-indigo-200 text-indigo-700 bg-indigo-50"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Admin Portal
          </button>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          {"Don't have an account? "}
          <button
            onClick={() => go("role-select")}
            className="text-blue-600 font-semibold"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

// ── SCREEN: Seeker Home ───────────────────────────────────────────────────────

function SeekerHomeScreen({ go }: { go: (s: Screen) => void }) {
  const categories = [
    { icon: "✨", label: "All" },
    { icon: "☕", label: "F&B" },
    { icon: "📚", label: "Education" },
    { icon: "💪", label: "Fitness" },
    { icon: "💻", label: "Tech" },
    { icon: "🔧", label: "Services" },
  ];
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400">
                Good morning,
              </p>
              <h1
                className="text-lg font-black text-gray-900"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                Teeraphat Suwan 👋
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                <Bell size={17} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-[11px] font-black text-white">
                  SA
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => go("seeker-search")}
            className="w-full flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3"
          >
            <Search
              size={17}
              className="text-gray-400 shrink-0"
            />
            <span className="text-sm text-gray-400 flex-1 text-left">
              Search franchises, brands...
            </span>
            <div className="bg-blue-600 rounded-xl p-1.5">
              <Sliders size={13} className="text-white" />
            </div>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-5 pt-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((c, i) => (
              <button
                key={c.label}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shrink-0 border transition-colors ${i === 0 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200"}`}
              >
                <span>{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 pb-3">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2
              className="text-sm font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              ⭐ Featured
            </h2>
            <button className="text-xs text-blue-600 font-semibold">
              See all
            </button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto pb-1 no-scrollbar">
            {FRANCHISES.filter((f) => f.featured).map((f) => (
              <FeaturedCard
                key={f.id}
                f={f}
                onPress={() => go("seeker-detail")}
              />
            ))}
          </div>
        </div>

        <div
          className="mx-5 mb-4 rounded-2xl p-4 flex items-center gap-3"
          style={{
            background:
              "linear-gradient(135deg,#0B2154,#2563EB)",
          }}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
            🎯
          </div>
          <div>
            <p className="text-xs font-black text-white">
              Your Matches Are Ready
            </p>
            <p className="text-[10px] text-blue-200">
              94% match found for F&B · KL
            </p>
          </div>
          <button className="ml-auto bg-white text-blue-700 text-xs font-black px-3 py-1.5 rounded-full shrink-0">
            View
          </button>
        </div>

        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-sm font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Recommended for You
            </h2>
            <button className="text-xs text-blue-600 font-semibold">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {FRANCHISES.map((f) => (
              <FranchiseCard
                key={f.id}
                f={f}
                onPress={() => go("seeker-detail")}
              />
            ))}
          </div>
        </div>
      </div>
      <SeekerNav active="seeker-home" go={go} />
    </div>
  );
}

// ── SCREEN: Search ────────────────────────────────────────────────────────────

function SeekerSearchScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
            <Search
              size={17}
              className="text-gray-400 shrink-0"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search franchises, brands..."
              className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={15} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${showFilters ? "bg-blue-600" : "bg-gray-100"}`}
          >
            <Filter
              size={17}
              className={
                showFilters ? "text-white" : "text-gray-600"
              }
            />
          </button>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
          {[
            "All",
            "F&B",
            "Education",
            "Fitness",
            "Technology",
            "Services",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {showFilters && (
        <div className="mx-5 mb-3 bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <p className="text-xs font-black text-gray-700 mb-3">
            Filter Options
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                label: "Budget Range",
                opts: [
                  "Any Budget",
                  "Under ฿ 80K",
                  "฿ 80K–200K",
                  "฿ 200K+",
                ],
              },
              {
                label: "Location",
                opts: [
                  "All States",                
                  "กรุงเทพมหานคร",
                  "เชียงใหม่",
                  "ชลบุรี",
                  "ภูเก็ต",
                  "ขอนแก่น",
                  "นครราชสีมา",
                  "สงขลา",
                  "อุดรธานี",
                  "สุราษฎร์ธานี",
                        ]
              },
              {
                label: "Min Rating",
                opts: ["Any", "4.0+", "4.5+"],
              },
              {
                label: "Sort By",
                opts: [
                  "Match Score",
                  "Rating",
                  "Investment ↑",
                  "Investment ↓",
                ],
              },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-[10px] font-bold text-gray-500 block mb-1">
                  {f.label}
                </label>
                <select className="w-full px-3 py-2 bg-white rounded-xl border border-blue-200 text-xs text-gray-700 outline-none">
                  {f.opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-5 pb-4 no-scrollbar">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400">
            {FRANCHISES.length} results found
          </p>
          <span className="text-xs text-blue-600 font-medium">
            Sorted by: Match
          </span>
        </div>
        <div className="space-y-3">
          {FRANCHISES.map((f) => (
            <FranchiseCard
              key={f.id}
              f={f}
              onPress={() => go("seeker-detail")}
            />
          ))}
        </div>
      </div>
      <SeekerNav active="seeker-search" go={go} />
    </div>
  );
}

// ── SCREEN: Franchise Detail ──────────────────────────────────────────────────

function FranchiseDetailScreen({
  go,
  back,
}: {
  go: (s: Screen) => void;
  back: () => void;
}) {
  const f = FRANCHISES[0];
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("overview");
  return (
    <div className="size-full flex flex-col">
      <div className="relative h-52 shrink-0 bg-blue-200">
        <img
          src={f.coverImg}
          alt={f.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute top-0 left-0 right-0">
          <StatusBar dark />
        </div>
        <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-4">
          <button
            onClick={back}
            className="w-9 h-9 bg-black/25 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`w-9 h-9 backdrop-blur rounded-full flex items-center justify-center transition-colors ${saved ? "bg-red-500" : "bg-black/25"}`}
            >
              <Heart
                size={17}
                className="text-white"
                fill={saved ? "white" : "none"}
              />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 right-4">
          <div className="bg-white rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-black text-gray-900">
              {f.matchScore}% Match
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-white no-scrollbar">
        <div className="px-5 pt-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center overflow-hidden shrink-0">
  <img 
    src={f.logoImg} 
    alt={f.name} 
    className="w-full h-full object-cover" 
  />
</div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h1
                  className="text-[17px] font-black text-gray-900"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {f.name}
                </h1>
                {f.verified && (
                  <div className="flex items-center gap-0.5 bg-blue-100 px-1.5 py-0.5 rounded-full">
                    <CheckCircle
                      size={9}
                      className="text-blue-600"
                    />
                    <span className="text-[8px] font-black text-blue-600">
                      VERIFIED
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mb-1">
                {f.category} · {f.location}
              </p>
              <div className="flex items-center gap-1.5">
                <Stars r={f.rating} />
                <span className="text-xs font-bold text-gray-700">
                  {f.rating}
                </span>
                <span className="text-xs text-gray-400">
                  ({f.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              {
                label: "Investment",
                value: `${fmt(f.investMin)}+`,
                color: "#2563EB",
                bg: "#EFF6FF",
              },
              {
                label: "Est. ROI",
                value: f.roi,
                color: "#059669",
                bg: "#F0FDF4",
              },
              {
                label: "Branches",
                value: `${f.branches}`,
                color: "#7C3AED",
                bg: "#F5F3FF",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-3 text-center"
                style={{ background: stat.bg }}
              >
                <p
                  className="text-xs font-black text-gray-900 mb-0.5"
                  style={{
                    fontFamily: "'Manrope',sans-serif",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-[9px] text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
            {["overview", "reviews", "gallery"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${tab === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="space-y-4 pb-4">
              <div>
                <h3
                  className="text-sm font-black text-gray-900 mb-2"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  About
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
              <div>
                <h3
                  className="text-sm font-black text-gray-900 mb-2"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  Investment Package
                </h3>
                <div className="space-y-0">
                  {[
                    ["Franchise Fee", fmt(f.fee)],
                    [
                      "Setup Cost",
                      `${fmt(f.investMin)} – ${fmt(f.investMax)}`,
                    ],
                    ["Royalty Fee", "5% of monthly gross"],
                    ["Marketing Fee", "2% of monthly gross"],
                    ["Contract Period", "5 years (renewable)"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-xs text-gray-400">
                        {k}
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3
                  className="text-sm font-black text-gray-900 mb-2"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {"What's Included"}
                </h3>
                <div className="space-y-2">
                  {[
                    "Full brand licence & rights",
                    "Complete setup & fit-out support",
                    "3-week staff training programme",
                    "Marketing toolkit & launch campaign",
                    "Monthly operational support visits",
                    "Dedicated franchisee helpdesk",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check
                          size={9}
                          className="text-emerald-600"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-16" />
            </div>
          )}
          {tab === "reviews" && (
            <div className="space-y-3 pb-4">
              {[
                {
                  name: "Tan Wei Ming",
                  rating: 5,
                  date: "Jun 10",
                  text: "Excellent support. My outlet has been profitable since month 8!",
                  avatar: "TW",
                },
                {
                  name: "Nurul Ain",
                  rating: 5,
                  date: "May 28",
                  text: "Comprehensive training. Very happy with my decision to join.",
                  avatar: "NA",
                },
                {
                  name: "David Lim",
                  rating: 4,
                  date: "May 15",
                  text: "Great brand recognition. Marketing support could improve but overall excellent.",
                  avatar: "DL",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white">
                        {r.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900">
                        {r.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Stars r={r.rating} sz={9} />
                        <span className="text-[9px] text-gray-400">
                          {r.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
              <div className="h-16" />
            </div>
          )}
          {tab === "gallery" && (
            <div className="grid grid-cols-2 gap-2 pb-4">
              {[
                "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=300&h=200&fit=crop&auto=format",
              ].map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden bg-gray-100 aspect-square"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="h-16" />
            </div>
          )}
        </div>
      </div>
      <div className="px-5 pb-7 pt-3 bg-white border-t border-gray-100 flex gap-3 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <button
          onClick={() => go("seeker-appointments")}
          className="flex-1 py-3.5 border-2 border-blue-600 rounded-2xl text-blue-600 font-black text-sm active:scale-[0.97] transition-transform"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Schedule
        </button>
        <button
          onClick={() => go("seeker-chat-detail")}
          className="flex-1 py-3.5 bg-blue-600 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Contact Now
        </button>
      </div>
    </div>
  );
}

// ── SCREEN: Compare ───────────────────────────────────────────────────────────

function CompareScreen({
  go,
  back,
}: {
  go: (s: Screen) => void;
  back: () => void;
}) {
  const [f1, f2] = [FRANCHISES[0], FRANCHISES[1]];
  const rows = [
    { label: "Category", v1: f1.category, v2: f2.category },
    {
      label: "Investment",
      v1: `${fmt(f1.investMin)}–${fmt(f1.investMax)}`,
      v2: `${fmt(f2.investMin)}–${fmt(f2.investMax)}`,
    },
    {
      label: "Franchise Fee",
      v1: fmt(f1.fee),
      v2: fmt(f2.fee),
    },
    { label: "Est. ROI", v1: f1.roi, v2: f2.roi },
    {
      label: "Branches",
      v1: `${f1.branches}`,
      v2: `${f2.branches}`,
    },
    {
      label: "Rating",
      v1: `${f1.rating} ★`,
      v2: `${f2.rating} ★`,
    },
    {
      label: "Reviews",
      v1: `${f1.reviews}`,
      v2: `${f2.reviews}`,
    },
    {
      label: "Verified",
      v1: f1.verified ? "✅ Yes" : "❌ No",
      v2: f2.verified ? "✅ Yes" : "❌ No",
    },
    { label: "Location", v1: f1.location, v2: f2.location },
  ];
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-3 pt-1 flex items-center gap-3">
          <button
            onClick={back}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <h1
            className="font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Compare Franchises
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-4">
        <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="grid grid-cols-3 px-4 py-3 gap-2">
            <div className="text-[10px] font-bold text-gray-400 self-center">
              Details
            </div>
            {[f1, f2].map((f) => (
              <div key={f.id} className="text-center">
               <div className="w-12 h-12 mx-auto mb-0.5 rounded-xl overflow-hidden bg-gray-50">
  <img 
    src={f.logoImg} 
    alt={f.name} 
    className="w-full h-full object-cover" 
  />
</div>
                <p
                  className="text-[11px] font-black text-gray-900"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {f.name}
                </p>
                <Stars r={f.rating} sz={8} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 px-4 py-3 gap-2 bg-blue-50 border-b border-blue-100">
          <div className="text-[10px] font-black text-blue-700 self-center">
            Your Match
          </div>
          {[f1, f2].map((f) => (
            <div key={f.id} className="text-center">
              <p
                className="text-2xl font-black"
                style={{
                  fontFamily: "'Manrope',sans-serif",
                  color:
                    f.matchScore >= 90 ? "#059669" : "#2563EB",
                }}
              >
                {f.matchScore}%
              </p>
              <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${f.matchScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-3 px-4 py-2.5 gap-2 border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
          >
            <div className="text-[10px] text-gray-400 self-center">
              {row.label}
            </div>
            <div className="text-[11px] font-bold text-gray-800 text-center self-center">
              {row.v1}
            </div>
            <div className="text-[11px] font-bold text-gray-800 text-center self-center">
              {row.v2}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 px-4 mt-4">
          {[f1, f2].map((f) => (
            <button
              key={f.id}
              onClick={() => go("seeker-detail")}
              className="py-3 rounded-2xl text-xs font-black text-white active:scale-[0.97] transition-transform"
              style={{
                background:
                  "linear-gradient(135deg,#0B2154,#2563EB)",
                fontFamily: "'Manrope',sans-serif",
              }}
            >
              View {f.name}
            </button>
          ))}
        </div>
      </div>
      <SeekerNav active="seeker-compare" go={go} />
    </div>
  );
}

// ── SCREEN: Chat List (Seeker) ────────────────────────────────────────────────

function SeekerChatScreen({ go }: { go: (s: Screen) => void }) {
  const convos = [
    {
      name: "CoffeeBreeze Official",
      emoji: "☕",
      msg: "Thank you for your inquiry! We'd love to connect.",
      time: "9:42 AM",
      unread: 2,
    },
    {
      name: "EduKids Academy",
      emoji: "📚",
      msg: "When are you available for a meeting?",
      time: "Yesterday",
      unread: 0,
    },
    {
      name: "QuickFix Tech",
      emoji: "💻",
      msg: "Our investment package brochure is attached.",
      time: "Jun 16",
      unread: 0,
    },
  ];
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-1 pb-4">
        <h1
          className="text-lg font-black text-gray-900"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Messages
        </h1>
        <p className="text-xs text-gray-400">
          Your conversations with franchise owners
        </p>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {convos.map((c, i) => (
          <button
            key={i}
            onClick={() => go("seeker-chat-detail")}
            className="w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 text-left"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-xl shrink-0">
                {c.emoji}
              </div>
              {c.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">
                    {c.unread}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className="text-sm font-black text-gray-900 truncate"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {c.name}
                </span>
                <span className="text-[10px] text-gray-400 shrink-0">
                  {c.time}
                </span>
              </div>
              <p
                className={`text-xs truncate ${c.unread > 0 ? "font-semibold text-gray-700" : "text-gray-400"}`}
              >
                {c.msg}
              </p>
            </div>
          </button>
        ))}
        <div className="mx-5 mt-4 bg-blue-50 rounded-2xl p-4 flex gap-3 border border-blue-100">
          <div className="text-2xl shrink-0">💬</div>
          <div>
            <p className="text-xs font-bold text-gray-800 mb-1">
              Start a Conversation
            </p>
            <p className="text-xs text-gray-400">
              Browse franchises and tap "Contact Now" to chat
              with owners directly.
            </p>
            <button
              onClick={() => go("seeker-home")}
              className="mt-2 text-xs text-blue-600 font-bold"
            >
              Browse Franchises →
            </button>
          </div>
        </div>
      </div>
      <SeekerNav active="seeker-chat" go={go} />
    </div>
  );
}

// ── SCREEN: Chat Detail ───────────────────────────────────────────────────────

function ChatDetailScreen({ back }: { back: () => void }) {
  const [text, setText] = useState("");
  return (
    <div className="size-full flex flex-col">
      <div className="bg-white border-b border-gray-100 shrink-0">
        <StatusBar />
        <div className="px-4 pb-3 flex items-center gap-3">
          <button
            onClick={back}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-base">
            ☕
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              CoffeeBreeze Official
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-semibold">
                Online
              </span>
            </div>
          </div>
          <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Phone size={14} className="text-gray-600" />
          </button>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar"
        style={{ background: "#F7FAFF" }}
      >
        {CHAT_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl ${msg.sender === "me" ? "bg-blue-600 text-white rounded-br-sm" : "bg-white text-gray-900 rounded-bl-sm shadow-sm border border-gray-100"}`}
            >
              <p className="text-xs leading-relaxed">
                {msg.text}
              </p>
              <p
                className={`text-[9px] mt-1 text-right ${msg.sender === "me" ? "text-blue-200" : "text-gray-400"}`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div className="flex justify-start">
          <div className="bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-300"
                style={{
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-6 flex items-end gap-2 shrink-0">
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-2.5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
          />
          <Mic size={17} className="text-gray-400 shrink-0" />
        </div>
        <button className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
          <Send size={15} className="text-white" />
        </button>
      </div>
    </div>
  );
}

// ── SCREEN: Appointments (Seeker) ─────────────────────────────────────────────

function SeekerAppointmentsScreen({
  back,
}: {
  back: () => void;
}) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1 flex items-center gap-3">
          <button
            onClick={back}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <h1
            className="font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Appointments
          </h1>
        </div>
      </div>
      <div
        className="mx-5 mt-4 rounded-2xl p-4 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg,#0B2154,#2563EB)",
        }}
      >
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <Calendar size={19} className="text-white" />
        </div>
        <div>
          <p
            className="text-sm font-black text-white"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Book a Consultation
          </p>
          <p className="text-[11px] text-blue-200">
            Schedule a meeting with any franchise owner
          </p>
        </div>
        <button className="ml-auto bg-white text-blue-700 text-xs font-black px-3 py-1.5 rounded-full shrink-0">
          Book Now
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 no-scrollbar">
        <h2
          className="text-sm font-black text-gray-700 mb-3"
          style={{ fontFamily: "'Manrope',sans-serif" }}
        >
          Upcoming
        </h2>
        <div className="space-y-3">
          {APPOINTMENTS.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    {apt.type === "online" ? (
                      <Globe
                        size={15}
                        className="text-blue-600"
                      />
                    ) : (
                      <Building2
                        size={15}
                        className="text-blue-600"
                      />
                    )}
                  </div>
                  <div>
                    <p
                      className="text-sm font-black text-gray-900"
                      style={{
                        fontFamily: "'Manrope',sans-serif",
                      }}
                    >
                      {apt.franchise}
                    </p>
                    <p className="text-[10px] text-gray-400 capitalize">
                      {apt.type} meeting
                    </p>
                  </div>
                </div>
                <Pill s={apt.status} />
              </div>
              <div className="flex items-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {apt.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {apt.time}
                </span>
              </div>
              {apt.status === "confirmed" && (
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl">
                    Join Meeting
                  </button>
                  <button className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl">
                    Reschedule
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-gray-200 flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Plus size={18} className="text-gray-400" />
            </div>
            <p className="text-sm font-bold text-gray-500">
              Schedule New Meeting
            </p>
            <p className="text-xs text-gray-400">
              Choose a franchise and pick a convenient slot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN: Favorites ─────────────────────────────────────────────────────────

function FavoritesScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1">
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Saved Franchises
          </h1>
          <p className="text-xs text-gray-400">
            3 franchises saved
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-3 no-scrollbar">
        {FRANCHISES.slice(0, 3).map((f) => (
          <div key={f.id} className="relative">
            <FranchiseCard
              f={f}
              onPress={() => go("seeker-detail")}
            />
            <button className="absolute top-3 right-3 w-7 h-7 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
              <Heart
                size={13}
                className="text-red-500"
                fill="#EF4444"
              />
            </button>
          </div>
        ))}
      </div>
      <SeekerNav active="" go={go} />
    </div>
  );
}

// ── SCREEN: Seeker Profile ────────────────────────────────────────────────────

function SeekerProfileScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div
        style={{
          background: "linear-gradient(135deg,#0B2154,#1A56DB)",
        }}
      >
        <StatusBar dark />
        <div className="px-5 pb-5 pt-1">
          <div className="flex items-center justify-between mb-4">
            <h1
              className="text-base font-black text-white"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              My Profile
            </h1>
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Settings size={15} className="text-white" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                SA
              </span>
            </div>
            <div>
              <p
                className="font-black text-white text-lg"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                Teeraphat Suwan
              </p>
              <p className="text-blue-200 text-xs">
                Franchise Seeker · กรุงเทพมหานคร
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-[9px] font-bold text-white">
                  ฿ 80K–120K
                </span>
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-[9px] font-bold text-white">
                  F&B · Education
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              ["12", "Saved"],
              ["3", "Inquiries"],
              ["94%", "Top Match"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="bg-white/15 rounded-2xl p-3 text-center"
              >
                <p
                  className="text-lg font-black text-white"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {v}
                </p>
                <p className="text-[9px] text-blue-200">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 no-scrollbar">
        {[
          {
            icon: User,
            label: "Personal Information",
            sub: "Name, phone, email",
          },
          {
            icon: Target,
            label: "Investment Preferences",
            sub: "Budget, categories, location",
          },
          {
            icon: BookMarked,
            label: "Saved Searches",
            sub: "3 saved filters",
          },
          {
            icon: Calendar,
            label: "My Appointments",
            sub: "2 upcoming",
          },
          {
            icon: MessageCircle,
            label: "Message History",
            sub: "3 conversations",
          },
          {
            icon: Shield,
            label: "Privacy & Security",
            sub: "Password, 2FA",
          },
          {
            icon: Bell,
            label: "Notifications",
            sub: "Alerts, updates",
          },
          {
            icon: Award,
            label: "Help & Support",
            sub: "FAQ, contact",
          },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 bg-white rounded-xl p-3.5 mb-2 border border-gray-100 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <item.icon size={16} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {item.label}
              </p>
              <p className="text-[10px] text-gray-400">
                {item.sub}
              </p>
            </div>
            <ChevronRight size={15} className="text-gray-300" />
          </button>
        ))}
        <button
          onClick={() => go("role-select")}
          className="w-full flex items-center justify-center gap-2 mt-2 py-3.5 bg-red-50 rounded-xl border border-red-100"
        >
          <LogOut size={15} className="text-red-500" />
          <span className="text-sm font-semibold text-red-500">
            Sign Out
          </span>
        </button>
      </div>
      <SeekerNav active="seeker-profile" go={go} />
    </div>
  );
}

// ── SCREEN: Owner Dashboard ───────────────────────────────────────────────────

function OwnerDashboardScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div
        style={{
          background:
            "linear-gradient(135deg,#071535 0%,#0F3D9E 100%)",
        }}
      >
        <StatusBar dark />
        <div className="px-5 pb-5 pt-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-300 text-xs">
                Welcome back,
              </p>
              <h1
                className="text-lg font-black text-white"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                Ahmad Karim 👋
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bell size={16} className="text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center">
                <span className="text-xs font-black text-white">
                  AK
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Total Views",
                value: "2,847",
                change: "+12%",
                icon: Eye,
                up: true,
              },
              {
                label: "New Leads",
                value: "34",
                change: "+8 today",
                icon: Users,
                up: true,
              },
              {
                label: "Messages",
                value: "18",
                change: "5 unread",
                icon: MessageCircle,
                up: false,
              },
              {
                label: "Appointments",
                value: "7",
                change: "2 today",
                icon: Calendar,
                up: true,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/15 rounded-2xl p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <s.icon size={14} className="text-blue-200" />
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${s.up ? "bg-emerald-400/25 text-emerald-300" : "bg-white/15 text-blue-200"}`}
                  >
                    {s.change}
                  </span>
                </div>
                <p
                  className="text-xl font-black text-white"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] text-blue-300">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 no-scrollbar">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            {
              icon: Plus,
              label: "Add",
              screen: "owner-add" as Screen,
            },
            {
              icon: Users,
              label: "Leads",
              screen: "owner-leads" as Screen,
            },
            {
              icon: BarChart2,
              label: "Analytics",
              screen: "owner-analytics" as Screen,
            },
            {
              icon: Shield,
              label: "Verify",
              screen: "admin-verification" as Screen,
            },
          ].map((qa) => (
            <button
              key={qa.label}
              onClick={() => go(qa.screen)}
              className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 active:scale-[0.95] transition-transform"
            >
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <qa.icon size={17} className="text-blue-800" />
              </div>
              <span className="text-[10px] font-semibold text-gray-500">
                {qa.label}
              </span>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-2">
            <p
              className="text-sm font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Conversion Rate
            </p>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              +2.4%
            </span>
          </div>
          <p
            className="text-2xl font-black text-gray-900 mb-1"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            8.3%
          </p>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-full rounded-full"
              style={{
                width: "8.3%",
                background:
                  "linear-gradient(90deg,#0B2154,#2563EB)",
              }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            of 34 leads → 3 converted
          </p>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-sm font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Recent Leads
            </p>
            <button
              onClick={() => go("owner-leads")}
              className="text-xs text-blue-700 font-bold"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {LEADS.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100 shadow-[0_1px_5px_rgba(0,0,0,0.04)]"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-800 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-white">
                    {lead.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-gray-900 truncate">
                    {lead.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {lead.budget} · {lead.location}
                  </p>
                </div>
                <Pill s={lead.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-sm font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Views (7 days)
            </p>
            <button
              onClick={() => go("owner-analytics")}
              className="text-xs text-blue-700 font-bold"
            >
              Details
            </button>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart
              data={ANALYTICS_DATA.views}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: -30,
              }}
            >
              <defs>
                <linearGradient
                  id="vGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563EB"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 8, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 10,
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2}
                fill="url(#vGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <OwnerNav active="owner-dashboard" go={go} />
    </div>
  );
}

// ── SCREEN: Owner Franchises ──────────────────────────────────────────────────

function OwnerFranchisesScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1 flex items-center justify-between">
          <div>
            <h1
              className="text-lg font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              My Franchises
            </h1>
            <p className="text-xs text-gray-400">
              2 active listings
            </p>
          </div>
          <button
            onClick={() => go("owner-add")}
            className="flex items-center gap-1.5 bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl"
          >
            <Plus size={13} /> Add New
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-3 no-scrollbar">
        {FRANCHISES.slice(0, 2).map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100"
          >
            <div className="h-28 relative bg-blue-100">
              <img
                src={f.coverImg}
                alt={f.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <div className="absolute top-2 right-2">
                <span className="bg-emerald-400 text-emerald-900 text-[9px] font-black px-2 py-0.5 rounded-full">
                  ● ACTIVE
                </span>
              </div>
              <div className="absolute bottom-2 left-3 text-white">
                <p
                  className="text-sm font-black"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {f.name}
                </p>
                <p className="text-[10px] opacity-75">
                  {f.category}
                </p>
              </div>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  ["1,234", "Views"],
                  ["18", "Leads"],
                  ["67", "Saved"],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    className="text-center bg-gray-50 rounded-xl py-2"
                  >
                    <p
                      className="text-sm font-black text-gray-900"
                      style={{
                        fontFamily: "'Manrope',sans-serif",
                      }}
                    >
                      {v}
                    </p>
                    <p className="text-[9px] text-gray-400">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-xs font-bold text-blue-700 border border-blue-200 rounded-xl bg-blue-50">
                  Edit
                </button>
                <button
                  onClick={() => go("owner-leads")}
                  className="flex-1 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl"
                >
                  View Leads
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => go("owner-add")}
          className="w-full border-2 border-dashed border-blue-200 rounded-2xl p-6 flex flex-col items-center gap-2 bg-blue-50/50 active:bg-blue-50 transition-colors"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Plus size={19} className="text-blue-600" />
          </div>
          <p
            className="text-sm font-black text-blue-700"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Add New Franchise
          </p>
          <p className="text-xs text-blue-400 text-center">
            Reach thousands of serious investors
          </p>
        </button>
      </div>
      <OwnerNav active="owner-franchises" go={go} />
    </div>
  );
}

// ── SCREEN: Add Franchise ─────────────────────────────────────────────────────

function AddFranchiseScreen({ back }: { back: () => void }) {
  const [step, setStep] = useState(1);
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-2 pb-3 flex items-center gap-3 border-b border-gray-100">
        <button
          onClick={
            step === 1 ? back : () => setStep((s) => s - 1)
          }
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <p className="text-[10px] text-gray-400">
            Step {step} of 4
          </p>
          <p
            className="text-sm font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            {
              ["Basic Info", "Investment", "Media", "Preview"][
                step - 1
              ]
            }
          </p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i <= step ? "bg-blue-700" : "bg-gray-200"}`}
              style={{ width: i <= step ? 16 : 8 }}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 no-scrollbar">
        {step === 1 && (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Basic Information
            </h3>
            {["Franchise Name", "Brand Tagline"].map(
              (label) => (
                <div key={label}>
                  <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                    {label}
                  </label>
                  <input
                    placeholder={label}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-700"
                  />
                </div>
              ),
            )}
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Business Category
              </label>
              <select className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-700">
                <option>Food & Beverage</option>
                <option>Education</option>
                <option>Fitness</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe your franchise..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none resize-none"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Investment Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Min Investment",
                "Max Investment",
                "Franchise Fee",
                "Royalty %",
                "ROI (months)",
                "Contract (yrs)",
              ].map((f) => (
                <div key={f}>
                  <label className="text-[10px] font-bold text-gray-500 block mb-1">
                    {f}
                  </label>
                  <input
                    placeholder="0"
                    className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-700"
                  />
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-700 mb-2">
                Support Included
              </h4>
              {[
                "Training & onboarding",
                "Marketing support",
                "Setup assistance",
                "Ongoing operational support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 py-2 border-b border-gray-100"
                >
                  <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center shrink-0">
                    <Check
                      size={9}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-xs text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Photos & Media
            </h3>
            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 flex flex-col items-center gap-2 bg-blue-50">
              <Camera size={26} className="text-blue-400" />
              <p className="text-sm font-bold text-blue-700">
                Upload Cover Photo
              </p>
              <p className="text-xs text-blue-400 text-center">
                1200×600px · JPG or PNG
              </p>
              <button className="mt-1 px-4 py-2 bg-blue-700 text-white text-xs font-bold rounded-xl">
                Choose File
              </button>
            </div>
            <div>
              <p className="text-xs font-black text-gray-700 mb-2">
                Gallery (up to 6 photos)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl overflow-hidden flex items-center justify-center ${i < 2 ? "bg-blue-100" : "bg-gray-100 border-2 border-dashed border-gray-200"}`}
                  >
                    {i < 2 ? (
                      <img
                        src={FRANCHISES[0].coverImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Plus
                        size={19}
                        className="text-gray-300"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h3
              className="text-base font-black text-gray-900"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              Preview & Submit
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="h-28 bg-blue-200 relative">
                <img
                  src={FRANCHISES[0].coverImg}
                  alt=""
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div
                  className="absolute bottom-2 left-3 text-white text-sm font-black"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  My New Franchise
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                    Food & Beverage
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                    Pending Review
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Investment: ฿ 80K – 120K · ROI: 18–24 months
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
              <AlertTriangle
                size={14}
                className="text-amber-600 shrink-0 mt-0.5"
              />
              <p className="text-xs text-amber-700">
                Your listing will be reviewed by our team within
                1–2 business days before going live.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="px-5 pb-7 pt-3 border-t border-gray-100">
        {step < 4 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="w-full py-4 bg-blue-700 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={back}
            className="w-full py-4 rounded-2xl text-white font-black text-sm active:scale-[0.97] transition-transform"
            style={{
              background:
                "linear-gradient(135deg,#0B2154,#2563EB)",
              fontFamily: "'Manrope',sans-serif",
            }}
          >
            Submit for Approval
          </button>
        )}
      </div>
    </div>
  );
}

// ── SCREEN: Lead Management ───────────────────────────────────────────────────

function LeadsScreen({ go }: { go: (s: Screen) => void }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    "all",
    "new",
    "contacted",
    "interested",
    "converted",
  ];
  const filtered =
    filter === "all"
      ? LEADS
      : LEADS.filter((l) => l.status === filter);
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-2 pt-1">
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Lead Management
          </h1>
          <p className="text-xs text-gray-400">
            {LEADS.length} total leads
          </p>
        </div>
        <div className="flex gap-2 px-5 pb-3 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 capitalize transition-colors ${filter === f ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              {f} (
              {f === "all"
                ? LEADS.length
                : LEADS.filter((l) => l.status === f).length}
              )
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 space-y-2 no-scrollbar">
        {filtered.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center shrink-0">
                <span className="text-xs font-black text-white">
                  {lead.avatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p
                    className="text-sm font-black text-gray-900 truncate"
                    style={{
                      fontFamily: "'Manrope',sans-serif",
                    }}
                  >
                    {lead.name}
                  </p>
                  <Pill s={lead.status} />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="flex items-center gap-0.5">
                    <DollarSign size={9} />
                    {lead.budget}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MapPin size={9} />
                    {lead.location}
                  </span>
                </div>
                <p className="text-[10px] text-gray-300 mt-0.5">
                  {lead.date}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => go("owner-messages")}
                className="flex-1 py-2 text-xs font-bold text-blue-700 bg-blue-50 rounded-xl border border-blue-100"
              >
                Message
              </button>
              <button className="flex-1 py-2 text-xs font-bold text-white bg-blue-800 rounded-xl">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
      <OwnerNav active="owner-leads" go={go} />
    </div>
  );
}

// ── SCREEN: Owner Messages ────────────────────────────────────────────────────

function OwnerMessagesScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  return (
    <div className="size-full flex flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-1 pb-4 flex items-center justify-between">
        <div>
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Messages
          </h1>
          <p className="text-xs text-gray-400">
            Investor inquiries
          </p>
        </div>
        <div className="relative">
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
            <MessageCircle size={14} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-[9px] font-black text-white">
              5
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {CONVERSATIONS.map((conv) => (
          <button
            key={conv.id}
            onClick={() => go("seeker-chat-detail")}
            className="w-full flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 text-left"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-blue-800 flex items-center justify-center shrink-0">
                <span className="text-xs font-black text-white">
                  {conv.avatar}
                </span>
              </div>
              {conv.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className="text-sm font-black text-gray-900 truncate"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {conv.name}
                </span>
                <span className="text-[10px] text-gray-400 shrink-0">
                  {conv.time}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 truncate">
                {conv.franchise}
              </p>
              <p
                className={`text-xs truncate ${conv.unread > 0 ? "font-semibold text-gray-800" : "text-gray-400"}`}
              >
                {conv.lastMsg}
              </p>
            </div>
            {conv.unread > 0 && (
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-[9px] font-black text-white">
                  {conv.unread}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
      <OwnerNav active="owner-messages" go={go} />
    </div>
  );
}

// ── SCREEN: Owner Analytics ───────────────────────────────────────────────────

function OwnerAnalyticsScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1">
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Analytics
          </h1>
          <p className="text-xs text-gray-400">
            Last 30 days performance
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4 no-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Total Views",
              value: "12,847",
              change: "+18%",
            },
            {
              label: "Total Leads",
              value: "156",
              change: "+24%",
            },
            {
              label: "Avg. Match %",
              value: "82%",
              change: "+3%",
            },
            {
              label: "Conversion",
              value: "8.3%",
              change: "+2.4%",
            },
          ].map((k) => (
            <div
              key={k.label}
              className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-400">
                  {k.label}
                </span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  {k.change}
                </span>
              </div>
              <p
                className="text-lg font-black text-gray-900"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                {k.value}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p
            className="text-sm font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Views Trend
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart
              data={ANALYTICS_DATA.views}
              margin={{
                top: 5,
                right: 0,
                bottom: 0,
                left: -30,
              }}
            >
              <defs>
                <linearGradient
                  id="vG2"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563EB"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 10,
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2.5}
                fill="url(#vG2)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p
            className="text-sm font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Monthly Leads
          </p>
          <ResponsiveContainer width="100%" height={100}>
            <RBarChart
              data={ANALYTICS_DATA.leads}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: -30,
              }}
            >
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 10,
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              />
              <Bar
                dataKey="value"
                fill="#0F3D9E"
                radius={[4, 4, 0, 0]}
              />
            </RBarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p
            className="text-sm font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Inquiries by Category
          </p>
          <div className="flex items-center gap-4">
            <RPieChart width={100} height={100}>
              <Pie
                data={ANALYTICS_DATA.categories}
                cx={45}
                cy={45}
                innerRadius={28}
                outerRadius={45}
                dataKey="value"
                strokeWidth={0}
              >
                {ANALYTICS_DATA.categories.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </RPieChart>
            <div className="flex-1 space-y-2">
              {ANALYTICS_DATA.categories.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: c.color }}
                  />
                  <span className="text-[11px] text-gray-500 flex-1">
                    {c.name}
                  </span>
                  <span className="text-[11px] font-black text-gray-900">
                    {c.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <OwnerNav active="owner-analytics" go={go} />
    </div>
  );
}

// ── SCREEN: Owner Profile ─────────────────────────────────────────────────────

function OwnerProfileScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div
        style={{
          background: "linear-gradient(135deg,#071535,#0F3D9E)",
        }}
      >
        <StatusBar dark />
        <div className="px-5 pb-5 pt-1">
          <div className="flex items-center justify-between mb-4">
            <h1
              className="text-base font-black text-white"
              style={{ fontFamily: "'Manrope',sans-serif" }}
            >
              My Profile
            </h1>
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Settings size={15} className="text-white" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                AK
              </span>
            </div>
            <div>
              <p
                className="font-black text-white text-base"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                Ahmad Karim
              </p>
              <p className="text-blue-200 text-xs">
                CoffeeBreeze Sdn. Bhd.
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="bg-emerald-400/20 border border-emerald-400/30 rounded-full px-2 py-0.5 flex items-center gap-0.5">
                  <CheckCircle
                    size={9}
                    className="text-emerald-400"
                  />
                  <span className="text-[9px] font-black text-emerald-300">
                    VERIFIED
                  </span>
                </div>
                <div className="bg-yellow-400/20 rounded-full px-2 py-0.5">
                  <span className="text-[9px] font-black text-yellow-300">
                    PRO
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              ["2", "Listings"],
              ["156", "Leads"],
              ["8.3%", "Conv. Rate"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="bg-white/15 rounded-2xl p-3 text-center"
              >
                <p
                  className="text-lg font-black text-white"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {v}
                </p>
                <p className="text-[9px] text-blue-200">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 no-scrollbar">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-3 flex items-center gap-3 mb-3">
          <Award size={19} className="text-white shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-black text-white">
              Pro Plan · Active
            </p>
            <p className="text-[10px] text-amber-100">
              Renews Aug 1, 2025 · 2 listings
            </p>
          </div>
          <button className="bg-white text-orange-600 text-[10px] font-black px-2.5 py-1 rounded-full">
            Upgrade
          </button>
        </div>
        {[
          { icon: Building2, label: "Company Information" },
          { icon: Shield, label: "Verification Status" },
          { icon: Package, label: "Subscription & Billing" },
          { icon: BarChart2, label: "Analytics Overview" },
          { icon: Bell, label: "Notifications" },
          { icon: Settings, label: "Account Settings" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 bg-white rounded-xl p-3.5 mb-2 border border-gray-100 text-left"
          >
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <item.icon size={16} className="text-blue-800" />
            </div>
            <span className="flex-1 text-sm font-semibold text-gray-900">
              {item.label}
            </span>
            <ChevronRight size={14} className="text-gray-300" />
          </button>
        ))}
        <button
          onClick={() => go("role-select")}
          className="w-full flex items-center justify-center gap-2 mt-2 py-3.5 bg-red-50 rounded-xl border border-red-100"
        >
          <LogOut size={15} className="text-red-500" />
          <span className="text-sm font-semibold text-red-500">
            Sign Out
          </span>
        </button>
      </div>
      <OwnerNav active="owner-profile" go={go} />
    </div>
  );
}

// ── SCREEN: Admin Home ────────────────────────────────────────────────────────

function AdminHomeScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div
        style={{
          background: "linear-gradient(135deg,#030B1A,#0A1F4E)",
        }}
      >
        <StatusBar dark />
        <div className="px-5 pb-5 pt-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-[9px] mb-1">
                Admin Panel
              </p>
              <div className="bg-white rounded-xl px-2 py-1 inline-flex items-center">
                <ImageWithFallback
                  src={logoFull}
                  alt="Ma Dealer"
                  className="h-6 object-contain"
                  style={{ maxWidth: 120 }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Bell size={14} className="text-gray-300" />
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-[10px] font-black text-white">
                  AD
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Total Users",
                value: "8,247",
                icon: Users,
                change: "+142 today",
              },
              {
                label: "Active Listings",
                value: "634",
                icon: Building2,
                change: "+12 today",
              },
              {
                label: "Pending Verify",
                value: "23",
                icon: Shield,
                change: "Action needed",
              },
              {
                label: "Monthly Revenue",
                value: "฿ 84K",
                icon: TrendingUp,
                change: "+22% MoM",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 rounded-2xl p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <s.icon
                    size={14}
                    className="text-indigo-300"
                  />
                  <span className="text-[9px] text-gray-400">
                    {s.change}
                  </span>
                </div>
                <p
                  className="text-xl font-black text-white"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] text-gray-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 no-scrollbar">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {
              icon: Shield,
              label: "Review Verifications",
              count: 23,
              screen: "admin-verification" as Screen,
              urgent: true,
            },
            {
              icon: Building2,
              label: "Approve Listings",
              count: 8,
              screen: "admin-approvals" as Screen,
              urgent: false,
            },
            {
              icon: Users,
              label: "User Management",
              count: null,
              screen: "admin-users" as Screen,
              urgent: false,
            },
            {
              icon: BarChart2,
              label: "Platform Analytics",
              count: null,
              screen: "admin-analytics" as Screen,
              urgent: false,
            },
          ].map((qa) => (
            <button
              key={qa.label}
              onClick={() => go(qa.screen)}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] text-left active:scale-[0.97] transition-transform relative"
            >
              {qa.urgent && qa.count && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">
                    {qa.count}
                  </span>
                </div>
              )}
              <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center mb-2">
                <qa.icon
                  size={17}
                  className="text-indigo-700"
                />
              </div>
              <p
                className="text-xs font-black text-gray-900"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                {qa.label}
              </p>
              {qa.count && !qa.urgent && (
                <p className="text-[10px] text-gray-400">
                  {qa.count} pending
                </p>
              )}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p
            className="text-sm font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Recent Activity
          </p>
          <div className="space-y-3">
            {[
              {
                icon: "✅",
                text: "CoffeeBreeze listing approved",
                time: "2m ago",
              },
              {
                icon: "⚠️",
                text: "EduKids documents need review",
                time: "15m ago",
              },
              {
                icon: "👤",
                text: "New franchise owner registered",
                time: "1h ago",
              },
              {
                icon: "🚫",
                text: "User report: Listing #234",
                time: "2h ago",
              },
              {
                icon: "💰",
                text: "New Pro subscription: FitLife Gym",
                time: "3h ago",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0"
              >
                <span className="text-base shrink-0">
                  {a.icon}
                </span>
                <p className="text-xs font-medium text-gray-600 flex-1 truncate">
                  {a.text}
                </p>
                <span className="text-[10px] text-gray-300 shrink-0">
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdminNav active="admin-home" go={go} />
    </div>
  );
}

// ── SCREEN: Admin Users ───────────────────────────────────────────────────────

function AdminUsersScreen({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState<"owners" | "seekers">(
    "owners",
  );
  const owners = [
    {
      name: "Ahmad Karim",
      company: "CoffeeBreeze Sdn Bhd",
      status: "verified",
      listings: 2,
    },
    {
      name: "Lisa Tan",
      company: "EduKids Academy Sdn Bhd",
      status: "verified",
      listings: 1,
    },
    {
      name: "Raj Patel",
      company: "FitLife Holdings Bhd",
      status: "pending",
      listings: 1,
    },
    {
      name: "Nurul Hidayah",
      company: "QuickFix Tech Sdn Bhd",
      status: "verified",
      listings: 1,
    },
  ];
  const seekers = [
    {
      name: "Sarah Abdullah",
      budget: "฿ 80K–120K",
      status: "active",
      category: "F&B",
    },
    {
      name: "Chen Wei Ming",
      budget: "฿ 150K–250K",
      status: "active",
      category: "Education",
    },
    {
      name: "Priya Krishnan",
      budget: "฿ 50K–80K",
      status: "inactive",
      category: "Services",
    },
  ];
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-2 pt-1">
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            User Management
          </h1>
          <p className="text-xs text-gray-400">
            8,247 total users
          </p>
        </div>
        <div className="flex mx-5 mb-3 bg-gray-100 rounded-xl p-1">
          {(["owners", "seekers"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${tab === t ? "bg-white text-indigo-700 shadow-sm" : "text-gray-400"}`}
            >
              {t === "owners"
                ? "Franchise Owners"
                : "Seekers / Investors"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 no-scrollbar">
        <div className="space-y-2">
          {tab === "owners"
            ? owners.map((u) => (
                <div
                  key={u.name}
                  className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 shadow-[0_1px_5px_rgba(0,0,0,0.04)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-700 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-white">
                      {u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-black text-gray-900 truncate"
                      style={{
                        fontFamily: "'Manrope',sans-serif",
                      }}
                    >
                      {u.name}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {u.company}
                    </p>
                    <p className="text-[10px] text-gray-300">
                      {u.listings} listing
                      {u.listings > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full ${u.status === "verified" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {u.status.toUpperCase()}
                    </span>
                    <button className="text-[10px] text-indigo-600 font-bold">
                      Manage
                    </button>
                  </div>
                </div>
              ))
            : seekers.map((u) => (
                <div
                  key={u.name}
                  className="bg-white rounded-2xl p-3 flex items-center gap-3 border border-gray-100 shadow-[0_1px_5px_rgba(0,0,0,0.04)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-white">
                      {u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-black text-gray-900 truncate"
                      style={{
                        fontFamily: "'Manrope',sans-serif",
                      }}
                    >
                      {u.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {u.budget} · {u.category}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {u.status.toUpperCase()}
                    </span>
                    <button className="text-[10px] text-indigo-600 font-bold">
                      View
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <AdminNav active="admin-users" go={go} />
    </div>
  );
}

// ── SCREEN: Admin Verification ────────────────────────────────────────────────

function AdminVerificationScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  const queue = [
    {
      name: "FreshWash Laundry",
      owner: "Zulkifli Hamid",
      docs: 3,
      submitted: "Jun 16, 2025",
      status: "pending",
    },
    {
      name: "StyleZone Fashion",
      owner: "Melissa Ong",
      docs: 2,
      submitted: "Jun 15, 2025",
      status: "pending",
    },
    {
      name: "KidsBright Learning",
      owner: "Dr. Lim Cheng Huat",
      docs: 4,
      submitted: "Jun 14, 2025",
      status: "reviewing",
    },
  ];
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1">
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Verification Queue
          </h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <p className="text-xs text-gray-400">
              23 applications pending review
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 space-y-3 no-scrollbar">
        {queue.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p
                  className="text-sm font-black text-gray-900"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400">
                  {item.owner}
                </p>
              </div>
              <span
                className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}
              >
                {item.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-2 mb-3">
              {[
                ["Business Registration", true],
                ["Brand Certificate", item.docs >= 2],
                ["Financial Statements", item.docs >= 3],
                ["Director IC / Passport", item.docs >= 4],
              ].map(([name, ok]) => (
                <div
                  key={name as string}
                  className="flex items-center gap-2"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${ok ? "bg-emerald-100" : "bg-gray-100"}`}
                  >
                    {ok ? (
                      <Check
                        size={9}
                        className="text-emerald-600"
                        strokeWidth={3}
                      />
                    ) : (
                      <span className="text-[8px] text-gray-300">
                        –
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500">
                    {name as string}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-300 mb-3 flex items-center gap-1">
              <Calendar size={9} /> Submitted {item.submitted}
            </p>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 text-xs font-black text-white bg-emerald-600 rounded-xl flex items-center justify-center gap-1">
                <Check size={11} strokeWidth={3} /> Approve
              </button>
              <button className="flex-1 py-2.5 text-xs font-black text-red-600 bg-red-50 rounded-xl border border-red-100">
                Reject
              </button>
              <button className="px-3 py-2.5 text-xs font-bold text-gray-500 bg-gray-100 rounded-xl">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
      <AdminNav active="admin-verification" go={go} />
    </div>
  );
}

// ── SCREEN: Admin Approvals ───────────────────────────────────────────────────

function AdminApprovalsScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  const listings = [
    {
      name: "FreshWash Express",
      owner: "Zulkifli Hamid",
      category: "Services",
      investment: "฿ 40K–60K",
      submitted: "Jun 17",
    },
    {
      name: "StyleZone Boutique",
      owner: "Melissa Ong",
      category: "Retail",
      investment: "฿ 80K–150K",
      submitted: "Jun 16",
    },
    {
      name: "NutriBlend Shakes",
      owner: "Haziq Rahman",
      category: "F&B",
      investment: "฿ 50K–80K",
      submitted: "Jun 15",
    },
  ];
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1">
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Franchise Approvals
          </h1>
          <p className="text-xs text-gray-400">
            8 listings pending approval
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-4 space-y-3 no-scrollbar">
        {listings.map((l, i) => (
          <div
            key={l.name}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
          >
            <div className="h-24 bg-blue-100 relative">
              <img
                src={FRANCHISES[i % FRANCHISES.length].coverImg}
                alt=""
                className="w-full h-full object-cover opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-3 text-white">
                <p
                  className="text-sm font-black"
                  style={{ fontFamily: "'Manrope',sans-serif" }}
                >
                  {l.name}
                </p>
                <p className="text-[10px] opacity-75">
                  {l.category} · {l.investment}
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-full">
                PENDING
              </div>
            </div>
            <div className="p-3">
              <p className="text-[11px] text-gray-400 mb-3">
                By{" "}
                <span className="font-black text-gray-700">
                  {l.owner}
                </span>{" "}
                · Submitted {l.submitted}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 text-xs font-black text-white bg-emerald-600 rounded-xl">
                  ✓ Approve
                </button>
                <button className="flex-1 py-2.5 text-xs font-black text-red-600 bg-red-50 rounded-xl border border-red-100">
                  ✗ Reject
                </button>
                <button className="px-3 py-2.5 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdminNav active="admin-approvals" go={go} />
    </div>
  );
}

// ── SCREEN: Admin Analytics ───────────────────────────────────────────────────

function AdminAnalyticsScreen({
  go,
}: {
  go: (s: Screen) => void;
}) {
  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="bg-white">
        <StatusBar />
        <div className="px-5 pb-4 pt-1">
          <h1
            className="text-lg font-black text-gray-900"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Platform Analytics
          </h1>
          <p className="text-xs text-gray-400">
            June 2025 · Year to date
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 space-y-4 no-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Total Revenue",
              value: "฿ 84K",
              change: "+22%",
            },
            {
              label: "Active Users",
              value: "8,247",
              change: "+18%",
            },
            { label: "Listings", value: "634", change: "+12%" },
            {
              label: "Transactions",
              value: "342",
              change: "+31%",
            },
          ].map((k) => (
            <div
              key={k.label}
              className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-400">
                  {k.label}
                </span>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  {k.change}
                </span>
              </div>
              <p
                className="text-lg font-black text-gray-900"
                style={{ fontFamily: "'Manrope',sans-serif" }}
              >
                {k.value}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p
            className="text-sm font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            User Growth
          </p>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart
              data={ANALYTICS_DATA.growth}
              margin={{
                top: 5,
                right: 0,
                bottom: 0,
                left: -25,
              }}
            >
              <defs>
                <linearGradient
                  id="uGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#4F46E5"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="#4F46E5"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 10,
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="#4F46E5"
                strokeWidth={2}
                fill="url(#uGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p
            className="text-sm font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Revenue (฿ K)
          </p>
          <ResponsiveContainer width="100%" height={100}>
            <RBarChart
              data={ANALYTICS_DATA.growth}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: -25,
              }}
            >
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 10,
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              />
              <Bar
                dataKey="revenue"
                name="Revenue (K)"
                radius={[4, 4, 0, 0]}
              >
                {ANALYTICS_DATA.growth.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      i === ANALYTICS_DATA.growth.length - 1
                        ? "#0F3D9E"
                        : "#BFDBFE"
                    }
                  />
                ))}
              </Bar>
            </RBarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p
            className="text-sm font-black text-gray-900 mb-3"
            style={{ fontFamily: "'Manrope',sans-serif" }}
          >
            Revenue Breakdown
          </p>
          <div className="space-y-3">
            {[
              {
                label: "Pro Subscriptions",
                value: "฿ 48K",
                pct: 57,
              },
              {
                label: "Premium Listings",
                value: "฿ 22K",
                pct: 26,
              },
              {
                label: "Advertising Packages",
                value: "฿ 14K",
                pct: 17,
              },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">
                    {r.label}
                  </span>
                  <span className="text-xs font-black text-gray-900">
                    {r.value}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${r.pct}%`,
                      background:
                        "linear-gradient(90deg,#0B2154,#2563EB)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdminNav active="admin-analytics" go={go} />
    </div>
  );
}

// ── Phone Frame ───────────────────────────────────────────────────────────────

function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: 390, height: 844 }}
    >
      <div
        className="absolute inset-0 rounded-[52px]"
        style={{
          background: "#141414",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.4), 0 0 0 10px #1c1c1c, 0 0 0 11px #0a0a0a",
        }}
      />
      <div className="absolute inset-[5px] rounded-[47px] overflow-hidden bg-white">
        {children}
      </div>
      {/* Dynamic island */}
      <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[118px] h-[34px] bg-[#141414] rounded-b-[20px] rounded-t-[14px] z-50 flex items-center justify-center gap-2">
        <div className="w-[10px] h-[10px] rounded-full bg-[#2a2a2a]" />
        <div className="w-[12px] h-[12px] rounded-full bg-[#252525]" />
      </div>
      {/* Physical buttons */}
      <div className="absolute left-[-4px] top-[116px] w-[4px] h-[30px] bg-[#1c1c1c] rounded-l-sm" />
      <div className="absolute left-[-4px] top-[160px] w-[4px] h-[50px] bg-[#1c1c1c] rounded-l-sm" />
      <div className="absolute left-[-4px] top-[222px] w-[4px] h-[50px] bg-[#1c1c1c] rounded-l-sm" />
      <div className="absolute right-[-4px] top-[152px] w-[4px] h-[70px] bg-[#1c1c1c] rounded-r-sm" />
      {/* Home indicator */}
      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[130px] h-[4px] bg-white/25 rounded-full z-50" />
    </div>
  );
}

// ── Prototype Navigator ───────────────────────────────────────────────────────

const GROUPS = [
  {
    label: "Onboarding",
    color: {
      sel: "bg-gray-100 text-gray-800",
      dot: "bg-gray-500",
    },
    screens: [
      { id: "welcome" as Screen, label: "Welcome / Splash" },
      { id: "role-select" as Screen, label: "Role Selection" },
      { id: "login" as Screen, label: "Login" },
      {
        id: "seeker-register" as Screen,
        label: "Seeker Register",
      },
      {
        id: "owner-register" as Screen,
        label: "Owner Register",
      },
    ],
  },
  {
    label: "Seeker (Consumer)",
    color: {
      sel: "bg-blue-50 text-blue-700",
      dot: "bg-blue-500",
    },
    screens: [
      { id: "seeker-home" as Screen, label: "Home" },
      {
        id: "seeker-search" as Screen,
        label: "Search & Filter",
      },
      {
        id: "seeker-detail" as Screen,
        label: "Franchise Detail",
      },
      { id: "seeker-compare" as Screen, label: "Compare" },
      { id: "seeker-chat" as Screen, label: "Messages" },
      { id: "seeker-chat-detail" as Screen, label: "Chat" },
      {
        id: "seeker-appointments" as Screen,
        label: "Appointments",
      },
      { id: "seeker-favorites" as Screen, label: "Favorites" },
      { id: "seeker-profile" as Screen, label: "Profile" },
    ],
  },
  {
    label: "Owner (Producer)",
    color: {
      sel: "bg-blue-900/10 text-blue-900",
      dot: "bg-blue-900",
    },
    screens: [
      { id: "owner-dashboard" as Screen, label: "Dashboard" },
      {
        id: "owner-franchises" as Screen,
        label: "My Franchises",
      },
      { id: "owner-add" as Screen, label: "Add Franchise" },
      { id: "owner-leads" as Screen, label: "Lead Management" },
      { id: "owner-messages" as Screen, label: "Messages" },
      { id: "owner-analytics" as Screen, label: "Analytics" },
      { id: "owner-profile" as Screen, label: "Profile" },
    ],
  },
  {
    label: "Admin",
    color: {
      sel: "bg-indigo-50 text-indigo-700",
      dot: "bg-indigo-600",
    },
    screens: [
      { id: "admin-home" as Screen, label: "Admin Home" },
      { id: "admin-users" as Screen, label: "User Management" },
      {
        id: "admin-verification" as Screen,
        label: "Verification Queue",
      },
      {
        id: "admin-approvals" as Screen,
        label: "Franchise Approvals",
      },
      {
        id: "admin-analytics" as Screen,
        label: "Platform Analytics",
      },
    ],
  },
];

function PrototypeNav({
  current,
  onSelect,
}: {
  current: Screen;
  onSelect: (s: Screen) => void;
}) {
  const total = GROUPS.reduce(
    (a, g) => a + g.screens.length,
    0,
  );
  return (
    <div className="w-52 shrink-0 flex flex-col h-full bg-white border-r border-gray-200">
      <div className="px-4 py-3 border-b border-gray-100">
        <ImageWithFallback
          src={logoFull}
          alt="Ma Dealer"
          className="h-8 object-contain mb-0.5"
          style={{ maxWidth: 148 }}
        />
        <p className="text-[9px] text-gray-400">
          Prototype · {total} screens
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4 no-scrollbar">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-wider px-1 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${current === s.id ? group.color.sel : "text-gray-400 hover:bg-gray-50"}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${current === s.id ? group.color.dot : "bg-gray-200"}`}
                  />
                  <span
                    className={`text-[11px] leading-snug ${current === s.id ? "font-bold" : "font-medium"}`}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-[9px] text-gray-300 leading-relaxed">
          Click any screen to preview · 3 user roles
        </p>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [history, setHistory] = useState<Screen[]>([]);

  function go(s: Screen) {
    setHistory((h) => [...h, screen]);
    setScreen(s);
  }

  function back() {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setScreen(prev);
    }
  }

  function renderScreen() {
    switch (screen) {
      case "welcome":
        return <WelcomeScreen go={go} />;
      case "role-select":
        return <RoleSelectScreen go={go} />;
      case "login":
        return <LoginScreen go={go} back={back} />;
      case "seeker-register":
        return <SeekerRegisterScreen go={go} back={back} />;
      case "owner-register":
        return <OwnerRegisterScreen go={go} back={back} />;
      case "seeker-home":
        return <SeekerHomeScreen go={go} />;
      case "seeker-search":
        return <SeekerSearchScreen go={go} />;
      case "seeker-detail":
        return <FranchiseDetailScreen go={go} back={back} />;
      case "seeker-compare":
        return <CompareScreen go={go} back={back} />;
      case "seeker-chat":
        return <SeekerChatScreen go={go} />;
      case "seeker-chat-detail":
        return <ChatDetailScreen back={back} />;
      case "seeker-appointments":
        return <SeekerAppointmentsScreen back={back} />;
      case "seeker-favorites":
        return <FavoritesScreen go={go} />;
      case "seeker-profile":
        return <SeekerProfileScreen go={go} />;
      case "owner-dashboard":
        return <OwnerDashboardScreen go={go} />;
      case "owner-franchises":
        return <OwnerFranchisesScreen go={go} />;
      case "owner-add":
        return <AddFranchiseScreen back={back} />;
      case "owner-leads":
        return <LeadsScreen go={go} />;
      case "owner-messages":
        return <OwnerMessagesScreen go={go} />;
      case "owner-analytics":
        return <OwnerAnalyticsScreen go={go} />;
      case "owner-profile":
        return <OwnerProfileScreen go={go} />;
      case "admin-home":
        return <AdminHomeScreen go={go} />;
      case "admin-users":
        return <AdminUsersScreen go={go} />;
      case "admin-verification":
        return <AdminVerificationScreen go={go} />;
      case "admin-approvals":
        return <AdminApprovalsScreen go={go} />;
      case "admin-analytics":
        return <AdminAnalyticsScreen go={go} />;
      default:
        return <WelcomeScreen go={go} />;
    }
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        fontFamily: "'DM Sans',sans-serif",
        background: "#EEF2F8",
      }}
    >
      <PrototypeNav
        current={screen}
        onSelect={(s) => {
          setHistory([]);
          setScreen(s);
        }}
      />
      <div className="flex-1 flex flex-col items-center justify-start overflow-auto py-8">
        <div className="mb-5 flex flex-col items-center gap-1">
          <ImageWithFallback
            src={logoFull}
            alt="Ma Dealer"
            className="h-10 object-contain"
            style={{ maxWidth: 200 }}
          />
          <p className="text-xs text-gray-400">
            Interactive Prototype
          </p>
        </div>
        <PhoneFrame>
          <div className="size-full overflow-hidden">
            {renderScreen()}
          </div>
        </PhoneFrame>
        <p className="mt-5 text-[11px] text-gray-400">
          26 screens · 3 user roles · Complete franchise
          marketplace ecosystem
        </p>
      </div>
    </div>
  );
}