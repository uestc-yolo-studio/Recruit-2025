import { HomeIcon, BrainCircuitIcon, ImageIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import CountdownPage from "./pages/CountdownPage.jsx";
import Questions from "./pages/Questions.jsx";
import PhotoWall from "./pages/PhotoWall.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Questions",
    to: "/questions",
    icon: <BrainCircuitIcon className="h-4 w-4" />,
    page: <CountdownPage />,
  },
  {
    title: "照片墙",
    to: "/photos",
    icon: <ImageIcon className="h-4 w-4" />,
    page: <PhotoWall />,
  },
];

// 添加真正的招新题页面路由（不显示在导航中）
export const hiddenRoutes = [
  {
    to: "/recruit-questions",
    page: <Questions />,
  },
];
