import { HomeIcon, BrainCircuitIcon, ImageIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Questions from "./pages/Questions.jsx";
import PhotoWall from "./pages/PhotoWall.jsx";
import { getEncryptedRoute } from "./lib/hashUtils.js";

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
    page: <Questions />,
  },
  {
    title: "照片墙",
    to: "/photos",
    icon: <ImageIcon className="h-4 w-4" />,
    page: <PhotoWall />,
  },
];

// 隐藏路由已移除，Questions 页面现在直接通过导航访问
export const hiddenRoutes = [];
