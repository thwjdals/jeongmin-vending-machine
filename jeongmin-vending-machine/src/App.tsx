import './App.css'
import AdminController from './component/admin/AdminController'
import AdminPanel from './component/admin/AdminPanel'
import CustomerPanel from './component/customer/CustomerPanel'
import CustomerController from './component/customer/CustomerController'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '320px', gap: '10px' }}>
      <CustomerPanel />
      <CustomerController />
      <AdminPanel />
      <AdminController />
    </div>
  )
}

export default App
