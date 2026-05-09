import imgLeadership from "@/assets/course-leadership.jpg";
import imgManagement from "@/assets/course-management.jpg";
import imgDev from "@/assets/course-development.jpg";
import imgTech from "@/assets/course-tech.jpg";

export type Lesson = { id: string; title: string; duration: string; preview?: boolean };
export type Module = { title: string; lessons: Lesson[] };

export type Course = {
  id: string;
  title: string;
  instructor: string;
  instructorBio: string;
  rating: number;
  img: string;
  badge?: "best" | "new";
  duration: string;
  cat: string;
  students: number;
  price: number;
  level: "مبتدئ" | "متوسط" | "متقدم";
  description: string;
  outcomes: string[];
  modules: Module[];
};

export const categories = ["الكل", "الإدارة", "القيادة", "تطوير الذات", "التكنولوجيا"];

const baseModules = (subj: string): Module[] => [
  {
    title: `الوحدة الأولى: مقدمة في ${subj}`,
    lessons: [
      { id: "l1", title: "نظرة عامة وأهداف الدورة", duration: "08:25", preview: true },
      { id: "l2", title: `المفاهيم الأساسية في ${subj}`, duration: "12:40", preview: true },
      { id: "l3", title: "أمثلة من الواقع العملي", duration: "15:10" },
    ],
  },
  {
    title: "الوحدة الثانية: المهارات التطبيقية",
    lessons: [
      { id: "l4", title: "أدوات وتقنيات حديثة", duration: "18:30" },
      { id: "l5", title: "ورشة عمل تطبيقية", duration: "22:15" },
      { id: "l6", title: "دراسة حالة مفصّلة", duration: "16:45" },
    ],
  },
  {
    title: "الوحدة الثالثة: التطبيق المتقدم",
    lessons: [
      { id: "l7", title: "استراتيجيات متقدمة", duration: "20:00" },
      { id: "l8", title: "تجنّب الأخطاء الشائعة", duration: "14:35" },
      { id: "l9", title: "خطة عمل شخصية", duration: "11:20" },
    ],
  },
  {
    title: "الوحدة الرابعة: المشروع الختامي",
    lessons: [
      { id: "l10", title: "تنفيذ المشروع خطوة بخطوة", duration: "25:00" },
      { id: "l11", title: "مراجعة ونقاش", duration: "13:50" },
      { id: "l12", title: "الاختبار والشهادة", duration: "10:00" },
    ],
  },
];

const baseOutcomes = (subj: string) => [
  `إتقان أساسيات ${subj} وتطبيقها فوراً`,
  "بناء خطة عمل واضحة قابلة للتنفيذ",
  "اكتساب أدوات احترافية تستخدمها كبرى الشركات",
  "الحصول على شهادة معتمدة عند الإتمام",
];

const make = (
  i: number,
  partial: Omit<Course, "id" | "description" | "outcomes" | "modules" | "instructorBio">,
  subj: string,
  bio: string,
): Course => ({
  ...partial,
  id: `c-${i}`,
  instructorBio: bio,
  description: `دورة شاملة وعملية في ${subj} مصمَّمة للمحترفين العرب الذين يسعون للتميّز. تجمع بين الأسس النظرية والتطبيق العملي عبر دراسات حالة من السوق العربي والعالمي.`,
  outcomes: baseOutcomes(subj),
  modules: baseModules(subj),
});

export const courses: Course[] = [
  make(1, { title: "أساسيات الإدارة الحديثة للقادة", instructor: "د. سلمى الراشد", rating: 4.9, img: imgManagement, badge: "best", duration: "3 س 45 د", cat: "الإدارة", students: 12450, price: 199, level: "متوسط" }, "الإدارة الحديثة", "خبيرة إدارة استراتيجية بخبرة 15 عاماً، استشارية لشركات مدرجة في تداول."),
  make(2, { title: "القيادة الملهمة وبناء الفرق", instructor: "أحمد خليل", rating: 4.8, img: imgLeadership, badge: "best", duration: "2 س 30 د", cat: "القيادة", students: 9870, price: 179, level: "متوسط" }, "القيادة وبناء الفرق", "مدرب قيادة معتمد من ICF، عمل مع +200 منظمة في الشرق الأوسط."),
  make(3, { title: "عقلية النمو والذكاء العاطفي", instructor: "د. هند العنزي", rating: 4.9, img: imgDev, badge: "new", duration: "1 س 50 د", cat: "تطوير الذات", students: 7320, price: 149, level: "مبتدئ" }, "تطوير الذات", "دكتوراه في علم النفس الإيجابي، مؤلفة كتب الأكثر مبيعاً."),
  make(4, { title: "الذكاء الاصطناعي للمحترفين", instructor: "م. يوسف ناصر", rating: 4.7, img: imgTech, badge: "new", duration: "4 س 10 د", cat: "التكنولوجيا", students: 6540, price: 249, level: "متقدم" }, "الذكاء الاصطناعي", "مهندس AI سابق في Google، يحاضر في جامعات إقليمية."),
  make(5, { title: "إدارة المشاريع الاحترافية PMP", instructor: "م. خالد العتيبي", rating: 4.8, img: imgManagement, duration: "5 س 20 د", cat: "الإدارة", students: 8210, price: 229, level: "متقدم" }, "إدارة المشاريع", "حاصل على PMP و PgMP، أدار مشاريع بقيمة +500 مليون ر.س."),
  make(6, { title: "فن التفاوض وإدارة الأزمات", instructor: "د. ليلى الحسن", rating: 4.9, img: imgLeadership, badge: "best", duration: "2 س 15 د", cat: "القيادة", students: 5430, price: 169, level: "متوسط" }, "التفاوض وإدارة الأزمات", "مفاوضة دولية، درّبت قياديين في +30 دولة."),
  make(7, { title: "إدارة الوقت والإنتاجية القصوى", instructor: "ماجد الشمري", rating: 4.7, img: imgDev, duration: "1 س 30 د", cat: "تطوير الذات", students: 11200, price: 129, level: "مبتدئ" }, "إدارة الوقت", "خبير إنتاجية، مؤلف منهج 'الساعة الذهبية'."),
  make(8, { title: "تحليل البيانات بـ Python", instructor: "م. ريم القحطاني", rating: 4.8, img: imgTech, badge: "new", duration: "6 س 00 د", cat: "التكنولوجيا", students: 4310, price: 279, level: "متوسط" }, "تحليل البيانات", "Data Scientist في شركة تقنية رائدة، حاصلة على ماجستير من MIT."),
  make(9, { title: "التسويق الرقمي للمدراء", instructor: "نورة الدوسري", rating: 4.6, img: imgManagement, duration: "3 س 10 د", cat: "الإدارة", students: 6780, price: 189, level: "متوسط" }, "التسويق الرقمي", "خبيرة تسويق رقمي، أطلقت حملات بميزانيات +50 مليون ر.س."),
  make(10, { title: "بناء الثقة بالنفس والكاريزما", instructor: "د. فهد الزهراني", rating: 4.9, img: imgDev, badge: "best", duration: "2 س 00 د", cat: "تطوير الذات", students: 9450, price: 159, level: "مبتدئ" }, "الثقة والكاريزما", "متحدث TEDx، مدرب تنمية ذاتية لـ +100 ألف متدرب."),
  make(11, { title: "القيادة في زمن التحول الرقمي", instructor: "م. سارة المطيري", rating: 4.7, img: imgLeadership, duration: "3 س 30 د", cat: "القيادة", students: 3890, price: 199, level: "متقدم" }, "القيادة الرقمية", "مديرة تحول رقمي سابقة في قطاع البنوك."),
  make(12, { title: "تطوير تطبيقات الويب الحديثة", instructor: "م. أنس البلوي", rating: 4.8, img: imgTech, duration: "7 س 45 د", cat: "التكنولوجيا", students: 5120, price: 299, level: "متقدم" }, "تطوير الويب", "Senior Full-Stack Engineer، مساهم في مشاريع مفتوحة المصدر."),
];

export const totalLessons = (c: Course) => c.modules.reduce((n, m) => n + m.lessons.length, 0);

export const getCourseById = (id: string) => courses.find((c) => c.id === id);

export const dashboardStats = {
  student: { coursesInProgress: 3, completed: 7, certificates: 5, learningHours: 42 },
  admin: { totalUsers: 12480, activeCourses: 156, monthlyRevenue: 284500, completionRate: 78 },
};

export const recentActivity = [
  { user: "محمد العلي", action: "أكمل دورة", target: "إدارة المشاريع", time: "قبل 5 د" },
  { user: "سارة الخالد", action: "اشترك في", target: "الذكاء الاصطناعي", time: "قبل 12 د" },
  { user: "أحمد الشهري", action: "حصل على شهادة", target: "القيادة الملهمة", time: "قبل 30 د" },
  { user: "نورة الفهد", action: "بدأت دورة", target: "تحليل البيانات", time: "قبل ساعة" },
  { user: "خالد العنزي", action: "جدّد اشتراكه", target: "الباقة السنوية", time: "قبل ساعتين" },
];

export const monthlyEnrollment = [
  { m: "يناير", v: 320 }, { m: "فبراير", v: 410 }, { m: "مارس", v: 520 },
  { m: "أبريل", v: 480 }, { m: "مايو", v: 640 }, { m: "يونيو", v: 720 },
];
