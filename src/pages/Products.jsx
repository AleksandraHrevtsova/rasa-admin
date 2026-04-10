import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';

import { useLocale } from "../contexts/LocaleContext";

import { getUsers } from "../services/user.service";

import { NAV } from "../constants/navigation";
import DataTable from "../components/DataTable";
import { Loading } from "../components/Loading";
import { Button } from "../components/Button";

export default function Products() {
  const { t } = useLocale();

  const location = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // const { data } = await getProducts();
      // setProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);
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
      <h1>{t["products.title"]}</h1>
      {/* <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary text-blue-950">{t["products.title"]}</h1>
        <Button
          label={t['users.create']} 
          handleClick={() => navigateToUserPage()} 
          action='create' 
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <DataTable
          data={users}
          columns={columns}
          onRowClick={(row) => console.log(row)}
          showActiveToggle
          entityLabel="users"
        />
      )} */}
    </div>
  );
}