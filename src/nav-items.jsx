import { HomeIcon, BrainCircuitIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Questions from "./pages/Questions.jsx";

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
];
