import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import { useState } from 'react'

const Dashboard = () => {
  const [dashboardURL, setDashboardURL] = useState<string>()
  const [dashboard, setDashboard] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (isLoading)
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )

  return (
    <>
      <CContainer fluid>
        <CRow>
          <CCol className="pb-4">
            <CCard>
              <CCardBody></CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard
