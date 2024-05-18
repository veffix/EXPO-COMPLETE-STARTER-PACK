import axiosInstance from './axiosInstance';    

export const getContacts = ({firstname, page}) => axiosInstance.get(`/contacts`,{
    params: {
        firstname,
        page
    }})

export const getContact = ({id}) => axiosInstance.get(`/contacts/${id}`
)

export const addContact = (contact) => axiosInstance.post(`/contacts`, contact)

export const updateContact = ({id, params}) => axiosInstance.patch(`/contacts/${id}`, params)

export const deleteContact = ({id}) => axiosInstance.delete(`/contacts/${id}`)