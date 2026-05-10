import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#8B1D1D] mb-6">
        Purohit Admin Panel
      </h1>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/profile" className="admin-card">Manage Profile</Link>
        <Link to="/admin/availability" className="admin-card">Availability</Link>
        <Link to="/admin/pricing" className="admin-card">Pricing</Link>
      </div>
    </div>
  );
}
