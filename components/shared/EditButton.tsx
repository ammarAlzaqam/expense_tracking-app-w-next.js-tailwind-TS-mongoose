"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Edit, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { EditProfileTabs } from "@/constants";

export default function EditButton({
  username,
  email,
  image,
}: {
  username: string;
  email: string;
  image: string;
}) {
  const [open, set] = useState(false);
  return (
    <div className="">
      {/*//! Edit btn trigger */}
      <Button
        onClick={() => set(true)}
        className="text-white cursor-pointer bg-primary-800 hover:bg-primary-800/80 max-xs:size-8"
      >
        <Edit className="size-4.5" />
        <span className="max-xs:hidden">Edit</span>
      </Button>

      {/*//! Edit Profile Module */}
      {
        <div
          onClick={() => set(false)}
          className={`${
            open ? "scale-100" : "scale-0"
          } fixed inset-0 z-20 backdrop-blur-sm`}
        >
          <div
            data-state={open ? "open" : "close"}
            className="animate-open_close flex justify-center items-center h-full max-sm:mx-4"
          >
            {/*//! Edit profile */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl flex flex-col items-center gap-5 bg-dark-3 p-5 rounded-lg shadow-lg shadow-primary-800/50"
            >
              {/*//* Title */}
              <h1 className="text-heading2 xs:text-heading1 text-light-1">
                Edit Profile
              </h1>

              <Tabs className="w-full" defaultValue="image">
                <TabsList className="w-[80%] mx-auto bg-dark-4 flex flex-between items-center gap-3 p-1 min-h-[50px]">
                  {EditProfileTabs.map(({ value, label, Icon }) => (
                    <TabsTrigger
                      className="bg-dark-2 text-light-3 hover:bg-dark-2/50 transition cursor-pointer data-[state=active]:bg-primary-800 data-[state=active]:!text-light-1"
                      key={label}
                      value={value}
                    >
                      <div className="flex items-center gap-3 text-body">
                        <Icon />
                        <p className="max-sm:hidden">{label}</p>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {EditProfileTabs.map(({ value, label, EditForm }) => (
                  <TabsContent key={label} value={value} className="mt-3">
                    <h1 className="text-heading3 xs:text-heading2 text-light-2 text-center">
                      Update your <span className="text-primary-800">{value}</span>
                    </h1>
                    {/*//* Edit profile form */}
                    <div className="mt-5 w-full">
                      <EditForm
                        username={username}
                        email={email}
                        image={image}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/*//* Close Module Btn */}
              <button
                onClick={() => set(false)}
                className="absolute right-3 xs:right-5 top-3 xs:top-5 cursor-pointer"
              >
                <X className="text-logout-btn" />
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
