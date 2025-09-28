import { EditProfileData, EditProfileImage, EditProfilePassword } from "@/components/forms/EditProfileForm";
import {
  Aperture,
  Home,
  LayoutDashboard,
  UserCircle,
  UserLock,
  UserRoundPen,
} from "lucide-react";

export const sidebarLinks = [
  {
    Icon: Home,
    route: "/",
    label: "Home",
  },
  {
    Icon: LayoutDashboard,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    Icon: UserCircle,
    route: "/profile",
    label: "Profile",
  },
];

export const EditProfileTabs = [
  {
    value: "image",
    label: "Photo",
    Icon: Aperture,
    EditForm: EditProfileImage,
  },
  {
    value: "data",
    label: "Data",
    Icon: UserRoundPen,
    EditForm: EditProfileData,
  },
  {
    value: "password",
    label: "password",
    Icon: UserLock,
    EditForm: EditProfilePassword,
  },
];
