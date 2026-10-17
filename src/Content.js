import { RiStarSLine, RiHome8Line, RiUser6Line, RiLightbulbFlashLine, RiSurveyLine, RiPsychotherapyLine, RiBookOpenLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";
export const content = {
    nav: [
        { link: "#home",      icon: RiHome8Line,                label: "Home"       },
        { link: "#about",     icon: RiUser6Line,                label: "About"      },
        { link: "#experience",icon: RiLightbulbFlashLine,       label: "Experience" },
        { link: "#skill",     icon: RiPsychotherapyLine,        label: "Skills"     },
        { link: "#portfolio", icon: RiSurveyLine,               label: "Portfolio"  },
        { link: "#education", icon: RiBookOpenLine,             label: "Education"  },
        { link: "#love-todo", icon: RiStarSLine,                label: "Interests"  },
        { link: "#contact",   icon: MdOutlinePermContactCalendar,label: "Contact"   },
      ],
}