import * as React from 'react';
import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import "../../styles/custom.less";
import "../../styles/fonts.less";
import "./categoryIcon.less";

const CategoryIcon = ({from, type}) => {
  switch (type) {
    case 'sub-projects':
      return <ReactIcon.MdExtension className={`md-react-icon md-sub-projects ${from || "from-unspecified"}`} />;
    case 'blog':
      return <ReactIcon.MdLibraryBooks className={`md-react-icon md-blog ${from || "from-unspecified"}`} />;
    case 'task-ideas':
    case 'ideas':
      return <ReactIcon.MdLightbulbOutline className={`md-react-icon md-ideas ${from || "from-unspecified"}`} />;
    case 'task-development':
    case 'development':
      return <ReactIcon.MdCode className={`md-react-icon md-development ${from || "from-unspecified"}`} />;
    case 'task-bug-hunting':
    case 'bug-hunting':
      return <ReactIcon.MdBugReport className={`md-react-icon md-bug-hunting ${from || "from-unspecified"}`} />;
    case 'task-translations':
    case 'translations':
      return <ReactIcon.MdTranslate className={`md-react-icon md-translations ${from || "from-unspecified"}`} />;
    case 'task-analysis':
    case 'analysis':
      return <ReactIcon.MdInsertChart className={`md-react-icon md-analysis ${from || "from-unspecified"}`} />;
    case 'task-graphics':
    case 'graphics':
      return <ReactIcon.MdWeb className={`md-react-icon md-graphics ${from || "from-unspecified"}`} />;
    case 'task-social':
    case 'social':
      return <ReactIcon.MdShare  className={`md-react-icon md-social ${from || "from-unspecified"}`} />;
    case 'task-documentation':
    case 'documentation':
      return <ReactIcon.MdAssignment className={`md-react-icon md-documentation ${from || "from-unspecified"}`} />;
    case 'tutorials':
      return <ReactIcon.MdLiveHelp className={`md-react-icon md-tutorials ${from || "from-unspecified"}`} />;
    case 'video-tutorials':
      return <ReactIcon.MdOndemandVideo className={`md-react-icon md-video-tutorials ${from || "from-unspecified"}`} />;
    case 'copywriting':
      return <ReactIcon.MdTextsms className={`md-react-icon md-copywriting ${from || "from-unspecified"}`} />;
    default:
      return <ReactIcon.MdLocalAirport className={`md-react-icon ${from || "from-unspecified"}`} />;
  }
};

export default CategoryIcon;
