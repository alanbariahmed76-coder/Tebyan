import imgLeadership from "@/assets/course-leadership.jpg";
import imgManagement from "@/assets/course-management.jpg";
import imgDev from "@/assets/course-development.jpg";
import imgTech from "@/assets/course-tech.jpg";

export type Course = {
  title: string;
  instructor: string;
  rating: number;
  img: string;
  badge?: "best" | "new";
  duration: string;
  cat: string;
  students: number;
  price: number;
  level: "مبتدئ" | "متوسط" | "متقدم";
};

export const categories = ["الكل", "الإدارة", "القيادة", "تطوير الذات", "التكنولوجيا"];

export const courses: Course[] = [
  { title: "أساسيات الإدارة الحديثة للقادة", instructor: "د. سلمى الراشد", rating: 4.9, img: imgManagement, badge: "best", duration: "3 س 45 د", cat: "الإدارة", students: 12450, price: 199, level: "متوسط" },
  { title: "القيادة الملهمة وبناء الفرق", instructor: "أحمد خليل", rating: 4.8, img: imgLeadership, badge: "best", duration: "2 س 30 د", cat: "القيادة", students: 9870, price: 179, level: "متوسط" },
  { title: "عقلية النمو والذكاء العاطفي", instructor: "د. هند العنزي", rating: 4.9, img: imgDev, badge: "new", duration: "1 س 50 د", cat: "تطوير الذات", students: 7320, price: 149, level: "مبتدئ" },
  { title: "الذكاء الاصطناعي للمحترفين", instructor: "م. يوسف ناصر", rating: 4.7, img: imgTech, badge: "new", duration: "4 س 10 د", cat: "التكنولوجيا", students: 6540, price: 249, level: "متقدم" },
  { title: "إدارة المشاريع الاحترافية PMP", instructor: "م. خالد العتيبي", rating: 4.8, img: imgManagement, duration: "5 س 20 د", cat: "الإدارة", students: 8210, price: 229, level: "متقدم" },
  { title: "فن التفاوض وإدارة الأزمات", instructor: "د. ليلى الحسن", rating: 4.9, img: imgLeadership, badge: "best", duration: "2 س 15 د", cat: "القيادة", students: 5430, price: 169, level: "متوسط" },
  { title: "إدارة الوقت والإنتاجية القصوى", instructor: "ماجد الشمري", rating: 4.7, img: imgDev, duration: "1 س 30 د", cat: "تطوير الذات", students: 11200, price: 129, level: "مبتدئ" },
  { title: "تحليل البيانات بـ Python", instructor: "م. ريم القحطاني", rating: 4.8, img: imgTech, badge: "new", duration: "6 س 00 د", cat: "التكنولوجيا", students: 4310, price: 279, level: "متوسط" },
  { title: "التسويق الرقمي للمدراء", instructor: "نورة الدوسري", rating: 4.6, img: imgManagement, duration: "3 س 10 د", cat: "الإدارة", students: 6780, price: 189, level: "متوسط" },
  { title: "بناء الثقة بالنفس والكاريزما", instructor: "د. فهد الزهراني", rating: 4.9, img: imgDev, badge: "best", duration: "2 س 00 د", cat: "تطوير الذات", students: 9450, price: 159, level: "مبتدئ" },
  { title: "القيادة في زمن التحول الرقمي", instructor: "م. سارة المطيري", rating: 4.7, img: imgLeadership, duration: "3 س 30 د", cat: "القيادة", students: 3890, price: 199, level: "متقدم" },
  { title: "تطوير تطبيقات الويب الحديثة", instructor: "م. أنس البلوي", rating: 4.8, img: imgTech, duration: "7 س 45 د", cat: "التكنولوجيا", students: 5120, price: 299, level: "متقدم" },
];

export const dashboardStats = {
  student: {
    coursesInProgress: 3,
    completed: 7,
    certificates: 5,
    learningHours: 42,
  },
  admin: {
    totalUsers: 12480,
    activeCourses: 156,
    monthlyRevenue: 284500,
    completionRate: 78,
  },
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
