import React from 'react'
import ParentComponent from '@/components/doctorStepper/parentComponent'
import GetIdFromCookie from '@/components/getIdFromCookie/getIdFromCookie'
import appwriteCheckIfDoctorExists from '@/appwriteUtils/appwriteCheckIfDoctorExists'

const page = async() => {
  const id = await GetIdFromCookie()
  const  userId  = id.id
  const user = await appwriteCheckIfDoctorExists(userId)

  return (
    <>
      <ParentComponent userId={id}/>
    </>
  )
}

export default page
