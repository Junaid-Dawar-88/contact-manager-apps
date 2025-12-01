import React, { useEffect, useState } from "react";
import { Mail, MapIcon, MapPin, Pencil, Phone, Trash2, Users } from "lucide-react";
import ContactForm from "../contact-form/Contact_form";
import axios from "axios";
import ContactFilter from "../contact-filter/Contact_filter";

interface contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  group: string;
  address: string;
}
const Contact_list = () => {
  const [Contact, setContact] = useState<contact[]>([]);
  const [updateContact, setUpdateContact] = useState<contact | null>(null);
  const [selectContact , setSelectContact] = useState('all')
  const [search , setSearch] = useState('')

    const filteredFn = Contact.filter((item) => {
  // ============ SEARCH FILTER ============
  const handleSearch =
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase());

  // ============ GROUP FILTER ============ 
  const handleGroup = selectContact === "all" || item.group === selectContact;

  return handleSearch && handleGroup;
});



  // {========================== GET ALL DATA ============================ }
  const getAllData = async () => {
    const res = await axios.get("/api/Contact");
    setContact(res.data);
  };

  useEffect(() => {
    getAllData();
  }, []);

  // { ========================= HANDLE DELETE FUNCTION ======================== }
  const handleDelete = async (id: number) => {
    try{
      const inform = confirm("Are you sure to delete")
      if(!inform) return 
      const res = await axios.delete(`/api/Contact/${id}`)
      setContact((prev: any) => prev.filter((item: any) => item.id !== res.data.id ))
    } catch (error) {
      alert('Delete method error')
    }
   }
 
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* ================================== Header ================================== */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Users size={28} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">My Contacts</h1>
            </div>
            <p className="text-slate-600">Manage and organize your contact list</p>
          </div>

          {/* ============================== Filter Section =============================== */}
          <div className="mb-6 w-full">
            <ContactFilter 
              search={search} 
              setSearch={setSearch} 
              selectContact={selectContact} 
              setSelectContact={setSelectContact} 
            />
          </div>

          {/* =============================== Contact Form ================================= */}
          <div className="mb-8 w-full">
            <ContactForm
              Contact={Contact}
              setContact={setContact}
              updateContact={updateContact}
              setUpdateContact={setUpdateContact}
            />
          </div>

          {/* ===================================== Contact List ================================= */}
          <div className="w-full">
            {filteredFn.length === 0 ? (
              <div className="flex items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-slate-200 w-full">
                <div className="text-center">
                  <Users size={48} className="text-slate-300 mx-auto mb-2" />
                  <h2 className="text-xl font-semibold text-slate-700">No contacts found</h2>
                  <p className="text-slate-500 mt-1">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between w-full">
                  <span className="text-sm bg-white text-blue-600 shadow-sm p-3 rounded-full font-medium text-slate-600">
                    Totall: <span className="font-semibold text-slate-900">{filteredFn.length}</span> contact{filteredFn.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredFn.map((item) => (
                    <div
                      key={item.id}
                      className="group w-full rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {/*==================================== Card Header ================================ */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold text-slate-900 break-words flex-1">{item.name}</h3>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
                            <button
                              onClick={() => setUpdateContact(item)}
                              className="p-1.5 hover:bg-blue-600 hover:text-white text-blue-600 rounded-lg transition-colors"
                              title="Edit contact"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-colors"
                              title="Delete contact"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <span className="inline-block px-3 py-1 bg-white text-blue-600 text-xs font-semibold rounded-full border border-blue-200">
                          {item.group}
                        </span>
                      </div>

                      {/* ================================= Card Body ====================================== */}
                      <div className="p-4 space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1"><Mail /></p>
                          <a
                            href={`mailto:${item.email}`}
                            className="text-blue-600 hover:text-blue-700 hover:underline text-sm break-all"
                          >
                            {item.email}
                          </a>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1"><Phone /></p>
                          <a
                            href={`tel:${item.phone}`}
                            className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                          >
                            {item.phone}
                          </a>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1"><MapPin /></p>
                          <p className="text-slate-700 text-sm line-clamp-2">{item.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact_list;