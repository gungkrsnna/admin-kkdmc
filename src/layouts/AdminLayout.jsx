import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

function AdminLayout({ children }) {
  return (
    <div className="h-screen bg-slate-100 overflow-hidden">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-72 z-40">
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="ml-72 h-screen flex flex-col">

        {/* Navbar */}
        <div className="fixed top-0 left-72 right-0 h-20 z-30">
          <Navbar />
        </div>

        {/* Page Content */}
        <main className="mt-20 flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;