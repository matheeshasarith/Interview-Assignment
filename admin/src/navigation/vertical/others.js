import { Menu, Circle, EyeOff, Folder, LifeBuoy, Shield, Mail, Home, PieChart, User, FileText } from 'react-feather'
export default [
  {
    header: 'Misc'
  },

  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  
  {
    id: 'crud',
    title: 'Crud',
    icon: <FileText size={20} />,
    action: 'manage',
    resource: 'ACL',
    navLink: '/event-view-business'
  }
  
]
