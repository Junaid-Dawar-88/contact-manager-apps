import axios from "axios";
import React, { useEffect, useState } from "react";
import { X, Plus, Mail, Phone, MapPin, User } from "lucide-react";

const Contact_form = ({Contact , setContact , updateContact , setUpdateContact}: any) => {
const [Modal , setModal] = useState(false)
const OpenModal = () => setModal(true)
const CloseModal = () => setModal(false)
const [name , setName] = useState('')
const [email , setEmail] = useState('')
const [phone , setPhone] = useState('')
const [group , setGroup] = useState('Friends')
const [address , setAddress] = useState('')

 useEffect(() =>{
    if(updateContact) {
        setName(updateContact.name)
        setEmail(updateContact.email)
        setPhone(updateContact.phone)
        setGroup(updateContact.group)
        setAddress(updateContact.address)
        OpenModal()
    }
 } , [updateContact])
 
//  { ===================================== CLEAR INPUT FIELD FUNCTION ================================ }
 const clearConform = () => {
  setName('')
  setEmail('')
  setPhone('')
  setGroup('')
  setAddress('')
 }

//  { =================================== ADD DATA FUNCTION ========================== }
const handleSubmit = async () => {
    try{
    if(!name || !email || !phone || !address) return alert('please fill the input fields ')
      if(!email.includes('@')) return alert('email must be include ( @ ) ')
        if(phone.length > 11) return alert('phone number must have 11 character')
          
          const dublicat = Contact.some((dub: any) => dub.email === email || dub.phone === phone)
              if(dublicat) return alert('this email or phone is already exist! ')
            const contactData = {
               name,
               email,
               phone,
               group,
               address
            }
            const res = await axios.post('/api/Contact' , contactData)
           setContact([ ...Contact , res.data])
            clearConform()
      } catch (error){
        console.log("frondend error at post metho" , error)
      }
}

//  { ================================== UPDATE DATA FUNCTION =================================== }
 const handleUpdateContact = async () => {
    if(!updateContact) return
    try{
        const updateData = {name , email , phone , group , address}
        const res = await axios.put(`/api/Contact/${updateContact.id}` , updateData)
        setContact((prev: any) => prev.map((item: any) => item.id === res.data.id ? res.data : item))
    } catch (error) {
      console.log('frontend error at put method')
    }
     CloseModal()   
     clearConform()
 }

  return ( 
    <div className="p-6">
      {/* { ========================= OPEN MODAL BUTTON ============================= } */}
      <button
      onClick={OpenModal}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium" >
        <Plus size={20} />
        Add New Contact
      </button>

    {/* { ==================================== MODAL DATA ==================================} */}
      {Modal && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {updateContact ? 'Edit Contact' : 'Add New Contact'}
            </h1>
            <button
              onClick={() => {
                CloseModal()
                clearConform()
              }}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        {/* { ================================= FORM FIELD ===================================== } */}
          <form className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="+1 234 567 8900"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="Friends">Friends</option>
                <option value="Family">Family</option>
                <option value="Work">Work</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 h-28 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Enter your address here..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  CloseModal()
                  clearConform()
                }}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  // { =============== HERE HANDLEING TWO FUNCTION UPDATA ADN ADD FUNCTIONS ====================== }
                  { updateContact ? handleUpdateContact() : handleSubmit() }
                  CloseModal()
                  clearConform()
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                {updateContact ? 'Update' : 'Save'} Contact
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  );
};

export default Contact_form;