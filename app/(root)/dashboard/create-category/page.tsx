import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import { fetchAllCategories } from "@/lib/actions/category.action";

export default async function CreateCategoryPage() {
  return (
    <section>
      <div className="max-w-lg mx-auto">
        <h1 className="text-heading2 sm:text-heading1 text-light-1">
          Create Category
        </h1>

        <div className="mt-10">
          <CreateCategoryForm
          />
        </div>
      </div>
    </section>
  );
}
