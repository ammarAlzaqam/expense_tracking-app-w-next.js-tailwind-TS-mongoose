import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  EditDataValidationSchema,
  EditImageValidationSchema,
  EditPasswordValidationSchema,
} from "@/lib/validation";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname } from "next/navigation";
import {
  updateProfileData,
  updateProfileImg,
  updateProfilePassword,
} from "@/lib/actions/user.action";
import { LoaderPinwheel, TriangleAlert } from "lucide-react";
import { useUserStore } from "@/lib/zustand/userStore";
import { deleteUploadthingFile } from "@/lib/actions/uploadthing.action";

interface User {
  username: string;
  email: string;
  image: string;
}

export function EditProfileImage({ image }: User) {
  const [loading, setLoading] = useState(false);
  // const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const path = usePathname();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm({
    defaultValues: {
      image,
    },
    resolver: zodResolver(EditImageValidationSchema),
  });

  const onSubmit = async (
    files: File[],
    imageChange: (value: string) => void
  ) => {
    try {
      setLoading(true);
      const oldImage = image;

      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0]) {
        imageChange(imgRes[0].ufsUrl);
      } else {
        toast("Failed to upload profile image: Please try again later", {
          icon: <TriangleAlert className="text-yellow-400" />,
        });
        return;
      }
      const data = await updateProfileImg(imgRes[0].ufsUrl, path);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      if (oldImage && oldImage.includes("/f/")) {
        const fileKey = oldImage.split("/f/")[1];
        await deleteUploadthingFile(fileKey);
      }

      setUser(data?.user);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile photo");
    } finally {
      setLoading(false);
    }
  };

  const handelImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageChange: (value: string) => void
  ) => {
    const files = e.target.files;
    if (!files?.length || !files[0]?.type.includes("image")) {
      toast("no selected images", {
        icon: <TriangleAlert className="text-yellow-400" />,
      });
      return;
    }

    await onSubmit(Array.from(files), imageChange);
  };

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center xs:gap-4">
                <FormLabel>
                  <div className="relative w-16 h-16 xs:w-24 xs:h-24 rounded-full bg-dark-4 flex justify-center items-center">
                    <Image
                      src={field.value}
                      alt="profile-img"
                      fill
                      className={`rounded-full object-contain cursor-pointer ${
                        field.value === "/assets/user.svg" && "p-2"
                      } ${loading && "animate-caret-blink"}`}
                    />
                  </div>
                </FormLabel>
                <FormControl className="">
                  <Input
                    disabled={loading}
                    type="file"
                    accept="image/*"
                    className={`${
                      loading && "animate-bounce"
                    } border-none file:text-primary-800 !text-light-2 text-small xs:text-base cursor-pointer file:cursor-pointer`}
                    onChange={(e) => handelImage(e, field.onChange)}
                  />
                </FormControl>
              </div>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export function EditProfileData({ username, email }: User) {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm({
    defaultValues: {
      username,
      email,
    },
    resolver: zodResolver(EditDataValidationSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setLoading(true);
      if (values.email === email && values.username === username) {
        toast("No change", {
          icon: <TriangleAlert className="text-yellow-400" />,
        });
        return;
      }
      const data = await updateProfileData({ ...values, path });
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setUser(data?.user);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="form">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Username</FormLabel>
              <FormControl>
                <Input className="form-input" {...field} />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Email</FormLabel>
              <FormControl>
                <Input className="form-input" {...field} />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="form-btn">
          {loading ? <LoaderPinwheel /> : "Edit"}
        </Button>
      </form>
    </Form>
  );
}

export function EditProfilePassword({ username, email }: User) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(EditPasswordValidationSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setLoading(true);
      if (values.currentPassword === values.newPassword) {
        toast("No change", {
          icon: <TriangleAlert className="text-yellow-400" />,
        });
        return;
      }

      const data = await updateProfilePassword(values);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="form">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Current_Password</FormLabel>
              <FormControl>
                <Input type="password" className="form-input" {...field} />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">New_Password</FormLabel>
              <FormControl>
                <Input type="password" className="form-input" {...field} />
              </FormControl>
              <FormMessage className="form-msg" />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="form-btn">
          {loading ? <LoaderPinwheel /> : "Edit"}
        </Button>
      </form>
    </Form>
  );
}
