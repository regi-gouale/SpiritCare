import { Button } from "@/components/ui/button";

export const AddMemberPage = () => {
  return (
    <form className="flex flex-col space-y-4 p-2">
      <label>
        <span>Email</span>
        <input type="email" />
      </label>
      <label>
        <span>Role</span>
        <select>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
      </label>
      <Button type="submit" className="rounded-full">
        Ajouter
      </Button>
    </form>
  );
};

export default AddMemberPage;
