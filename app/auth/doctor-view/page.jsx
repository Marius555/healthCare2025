import React from 'react'
import DoctorView from '@/components/doctor_view/doctorView'
import appwriteGetDoctorList from '@/appwriteUtils/appwriteGetDoctorList'

const page = async() => {
  const doctorList = await appwriteGetDoctorList()
  return (
    <DoctorView doctorList={doctorList}/>
  )
}

export default page
