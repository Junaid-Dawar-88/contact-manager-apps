import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  selectContact: string;
  setSelectContact: (v: string) => void;
}

const ContactFilter = ({ search, setSearch, selectContact, setSelectContact }: Props) => {
  return (
    <div className="flex items-center gap-4 my-4">

      {/* ========================== SEARCH FIELD =================================== */}
      <div className="flex items-center p-2 bg-white rounded-lg">
      <Search/>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="border px-4 py-2 rounded-lg w-[250px]"
        />
        </div>

      {/* =============================== GROUP SELECT ===================================== */}
      <select
        value={selectContact}
        onChange={(e) => setSelectContact(e.target.value)}
        className="border px-4 py-2 rounded-lg w-[200px]"
      >
        <option value="all">All</option>
        <option value="Work">Work</option>
        <option value="Family">Family</option>
        <option value="Friends">Friends</option>
      </select>

    </div>
  );
};

export default ContactFilter;
