import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';

import { useLocale } from "../contexts/LocaleContext";

import { getUsers } from "../services/user.service";

import { NAV } from "../constants/navigation";
import Table from "../components/Table";
import { Loading } from "../components/Loading";
import { Button } from "../components/Button";

export default function Users() {
  const { t } = useLocale();

  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const navigateToUserPage = (userId) => {
    let path = userId ? NAV.users + '/' + userId : NAV.newUser;
    navigate(path, { state: { from: location.pathname } });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary text-blue-950">{t["users.title"]}</h1>
        <Button
          label={t['users.create']} 
          handleClick={() => navigateToUserPage()} 
          action='create' 
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <Table
          data={users}
          navigateTo={navigateToUserPage}
        />
      )}
    </div>
  );
}