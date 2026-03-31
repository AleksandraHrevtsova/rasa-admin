import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";
import { getUsers } from "../services/user.service";
// import Modal from "../components/Modal";
import Table from "../components/Table";
import { NAV } from "../constants/navigation";

import { useLocation, useNavigate } from 'react-router';

export default function Users() {
  const { user } = useAuth();
  const { t, locale } = useLocale();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || NAV.home;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // const data = await getUsers();
      // console.log('User data:', data);
      // localStorage.setItem('users', JSON.stringify(data))
      // setUsers(data);
      const d = localStorage.getItem('users');
      const u = JSON.parse(d);
      console.log('U:', u);
      setUsers(u);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    // setModalOpen(true);
    navigate(NAV.newUser, { state: { from: location.pathname } });
  };

  const handleDeactivate = async (userId) => {
    if (!confirm(t["users.confirmDeactivate"])) return;
    try {
      await apiFetcher(`users/${userId}/deactivate`, { method: "POST" }, user.token, locale);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary text-blue-950">{t["users.title"]}</h1>
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-accent"
          onClick={handleCreate}
        >
          {t["users.create"]}
        </button>
      </div>

      {loading ? (
        <p>{t["loading"]}...</p>
      ) : (
        <Table
          data={users}
          edit={handleEdit}
          deactivate={handleDeactivate}
        />
      )}

      {/* {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div>Modal window</div>
        </Modal>
      )} */}
    </div>
  );
}