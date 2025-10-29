"use client";

import { dashboardSidebarLinks } from "@/constants";
import { Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiTag } from "react-icons/bi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/actions/category.action";
import ConfirmDialog from "../shared/confirmDialog";
import { cn } from "@/lib/utils";
import slugify from "slugify";
import { useCategoriesStore } from "@/lib/zustand/categoriesStore";
import { ImSpinner9 } from "react-icons/im";
import { FaArrowsSpin } from "react-icons/fa6";
import Image from "next/image";

export default function Sidebar() {
  const [open, set] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/*//! Overlay */}
      <div
        onClick={() => set(false)}
        data-state={open}
        className="sidebar-overlay"
      />

      {/*//! Open Close Btn */}
      <button
        onClick={() => set((prev) => !prev)}
        data-state={open}
        className="sidebar-aside_btn"
      >
        <Menu
          data-state={open ? "close" : "open"}
          className="animate-open_close absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1"
        />
        <X
          data-state={open ? "open" : "close"}
          className="animate-open_close absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1"
        />
      </button>

      {/*//! Sidebar */}
      <section data-state={open} className="sidebar">
        <Aside open={open} set={set} />
      </section>
    </>
  );
}

const Aside = ({
  open,
  set,
}: {
  open: boolean;
  set: (value: boolean) => void;
}) => {
  const [edit, setEdit] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside data-state={open} className="sidebar-aside custom-scrollbar">
      {/*//! Bg image */}
      <img
        src="/ibrahem.jpg"
        alt="ibrahem_logo"
        className=" absolute top-0 left-0 w-full h-full object-cover opacity-15"
      />

      {/*//! Title */}
      <h3 className="translate-x-1.5 text-heading3 sm:text-heading2 text-light-1">
        Mora Tracker
      </h3>

      {/*//! Links */}
      <div className="!z-20">
        {dashboardSidebarLinks.map(({ label, Icon, route }) => {
          const isActive =
            (pathname.includes(route) && route !== "/dashboard") ||
            pathname === route;
          return (
            <button
              onClick={() => {
                router.push(route);
                set(false);
              }}
              key={label}
              data-state={isActive}
              className="sidebar-aside_link w-full !z-20"
            >
              <Icon className="size-5 !z-20" />
              <p className="text-body sm:text-heading4 !z-20">{label}</p>
            </button>
          );
        })}
      </div>

      {/*//! Head(title('category'), edit) Categories */}
      <div className="px-4 space-y-5">
        {/*//* Divider */}
        <div className="divider bg-light-3/50" />

        {/*//* Header (title, edit) */}
        <div className="flex gap-5 justify-between text-light-1">
          <p className="text-base z-20">Categories</p>
          <button
            onClick={() => setEdit((prev) => !prev)}
            data-state={edit}
            className="relative size-7 cursor-pointer"
          >
            <FaEdit
              data-state={edit ? "close" : "open"}
              className="animate-open_close size-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1"
            />
            <IoCheckmarkDoneOutline
              data-state={edit ? "open" : "close"}
              className="animate-open_close size-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1"
            />
          </button>
        </div>
      </div>

      {/*//! Categories */}
      <Categories edit={edit} setEdit={setEdit} set={set} open={open} />
    </aside>
  );
};

const Categories = ({
  edit,
  set,
  open,
  setEdit,
}: {
  edit: boolean;
  open: boolean;
  set: (value: boolean) => void;
  setEdit: (value: boolean) => void;
}) => {
  const [update, setUpdate] = useState("");
  const [create, setCreate] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = useCategoriesStore((state) => state.categories);
  const addCategory = useCategoriesStore((state) => state.addCategory);

  const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!edit || !open) {
      setUpdate("");
      setCreate(false);
      setCategoryName("");
    }

    if (!open) {
      setEdit(false);
    }
  }, [edit, open]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!categoryName) {
        setCreate(false);
        inputRef.current?.blur();
        return;
      }

      const slug = slugify(categoryName, {
        lower: true,
        strict: true,
      });

      const data = await createCategory({
        name: categoryName,
        slug,
        path: "/dashboard",
      });
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setCategoryName("");
      setCreate(false);
      inputRef.current?.blur();
      addCategory(data.category);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category: Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={searchParams.toString()}>
      <form
        onSubmit={onSubmit}
        onClick={() => {
          setCreate(true);
          inputRef.current?.focus();
          setUpdate("");
        }}
        className={cn(
          " sidebar-aside_category-form gap-0 rounded-none transition-all duration-200 overflow-hidden",
          edit
            ? "duration-300 max-h-[1000px] opacity-100 translate-y-0 rotate-x-0"
            : "duration-100 max-h-0 p-0 opacity-0 -translate-y-5 rotate-x-90",
          create ? "border-t border-b" : "border-t-0 border-b-0"
        )}
      >
        {/*//! left icons (+, X) */}
        <div className="me-5">
          <Plus
            className={`size-5 shrink-0 ${(create || loading) && "hidden"}`}
          />
          <X
            onClick={(e) => {
              e.stopPropagation();
              setCategoryName("");
              setCreate(false);
            }}
            className={`cursor-pointer size-5 shrink-0 ${
              (!create || loading) && "hidden"
            }`}
          />
          <ImSpinner9
            className={`size-5 shrink-0 animate-spin ${!loading && "hidden"}`}
          />
        </div>
        <input
          ref={inputRef}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="create new category"
          className="sidebar-aside_category-input"
        />
        <button
          type="submit"
          data-state={create}
          className="sidebar-aside_category-Edit"
          onClick={() => {
            setCreate(false);
          }}
        >
          <MdOutlineCheck className="size-7 p-1 cursor-pointer" />
        </button>
      </form>

      {categories?.map((category) => (
        <CategoryItem
          key={category._id}
          category={category}
          edit={edit}
          update={update}
          setUpdate={setUpdate}
          setCreate={setCreate}
          setCategoryName={setCategoryName}
          path={path}
          set={set}
        />
      ))}

      {/*//! Create category button */}
      <button
        onClick={() => {
          setEdit(true);
          setCreate(true);
          inputRef.current?.focus();
        }}
        className={`w-full sidebar-aside_link overflow-hidden transition-all duration-300
          ${
            edit
              ? "opacity-0 scale-70 -translate-x-24 rotate-x-90"
              : "opacity-100 scale-100 -translate-x-0 rotate-x-0"
          }
        `}
      >
        <Plus className="size-5 shrink-0" />
        <p className="text-start flex-1 text-body sm:text-heading4 whitespace-nowrap">
          create new category
        </p>
      </button>
    </div>
  );
};

//! Category Item
type Category = {
  _id: string;
  name: string;
  slug: string;
};
interface CategoryItemProps {
  category: Category;
  edit: boolean;
  update: string;
  setUpdate: React.Dispatch<React.SetStateAction<string>>;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  path: string;
  set: (value: boolean) => void;
}
function CategoryItem({
  category,
  edit,
  update,
  setUpdate,
  setCreate,
  setCategoryName,
  path,
  set,
}: CategoryItemProps) {
  const { _id, name, slug } = category;

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(name);
  const [categoryNameAfterUpdate, setCategoryNameAfterUpdate] = useState("");

  const editCategory = useCategoriesStore((state) => state.editCategory);
  const removeCategory = useCategoriesStore((state) => state.removeCategory);

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = searchParams.get("category") === slug;
  const handleCategory = () => {
    if (edit) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    if (isActive) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    set(false);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setUpdateLoading(true);
      setUpdate("");
      inputRef.current?.blur();

      if (name.trim() === newCategoryName) {
        return;
      }

      const data = await updateCategory({
        name: newCategoryName,
        slug,
        path,
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      editCategory(data.category);
      setCategoryNameAfterUpdate(newCategoryName);
      toast.success(data.message);
    } catch (error) {
      console.error("handel update category error: ", error);
      toast.error("Something went wrong. Please try again");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      setDeleteLoading(true);
      setUpdate("");
      inputRef.current?.blur();

      const data = await deleteCategory({
        slug,
        path,
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      removeCategory(data.category);
      toast.success(data.message);
    } catch (error) {
      console.error("handel delete category error: ", error);
      toast.error("Something went wrong. Please try again");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (update === slug && inputRef.current) {
      inputRef.current.focus();
    }
  }, [update]);

  useEffect(() => {
    if (
      update === "" &&
      newCategoryName.trim() !== categoryNameAfterUpdate.trim()
    ) {
      setNewCategoryName(
        categoryNameAfterUpdate.trim() ? categoryNameAfterUpdate : name
      );
    }
  }, [update, categoryNameAfterUpdate]);

  return (
    <form
      key={_id}
      onClick={handleCategory}
      data-state={isActive && !edit}
      className={`sidebar-aside_category-form ${!edit && "cursor-pointer"}
              ${edit && update === slug && "border-t border-b rounded-none"}
              `}
      onSubmit={handleUpdateCategory}
    >
      {/*//! delete and tag icon */}
      <div>
        <BiTag
          className={`size-5 shrink-0 ${
            ((edit && update === slug) || deleteLoading) && "hidden"
          }`}
        />
        <ConfirmDialog onConfirm={handleDeleteCategory}>
          <FaRegTrashAlt
            className={`cursor-pointer size-5 shrink-0 hidden transition hover:scale-110 ${
              edit && update === slug && !deleteLoading && "!flex"
            }`}
          />
        </ConfirmDialog>
        <ImSpinner9
          className={`animate-spin size-5 shrink-0 ${
            !deleteLoading && "hidden"
          }`}
        />
      </div>

      {/*//! Update Input */}
      <div className="flex-1 flex items-center">
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          ref={inputRef}
          data-state={edit && update === slug}
          className="sidebar-aside_category-input"
        />
        <button
          type="button"
          onClick={(e) => {
            if (update === slug) {
              e.currentTarget.form?.requestSubmit();
              setUpdate("");
              inputRef.current?.blur();
            } else {
              setUpdate(slug);
              setCreate(false);
              setCategoryName("");
            }
          }}
          data-state={edit}
          className="sidebar-aside_category-Edit"
        >
          <RiEdit2Fill
            data-state={
              updateLoading ? "close" : update === slug ? "close" : "open"
            }
            className="animate-open_close absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1"
          />
          <MdOutlineCheck
            data-state={
              updateLoading ? "close" : update === slug ? "open" : "close"
            }
            className="animate-open_close absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1"
          />
          <FaArrowsSpin
            data-state={updateLoading ? "open" : "close"}
            className="animate-spin animate-open_close !duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1"
          />
        </button>
      </div>
    </form>
  );
}
