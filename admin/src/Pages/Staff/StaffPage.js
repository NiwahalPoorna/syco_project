import React, { useState, useEffect, useCallback } from "react";
import UserTable from "../../Components/UserTable";
import axios from "axios";
import { Link } from "react-router-dom";

function BusRootPage() {
  const [userData, setUserData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/staff/all-staff");
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:3000/staff/staff-emp/${id}`);

        fetchData();
        alert("Bus deleted successfully.");
      } catch (error) {
        console.log(error);
      }
    },
    [fetchData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: " ID",
        accessor: "_id",
      },
      {
        Header: "Sraff ID",
        accessor: "staffId",
      },
      {
        Header: "Full Name",
        accessor: "name",
      },
      {
        Header: "NIC",
        accessor: "nic",
      },
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Email Address",
        accessor: "email",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <Link to={`/dashboard/staff/EditStaff/${row.original._id}`}>
              <button>update</button>
            </Link>
            {"  "}
            <button onClick={() => handleDelete(row.original._id)}>
              delete
            </button>
          </>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <div style={{ marginLeft: "240px" ,marginTop:"100px  "}}>
      <h1>Staff Table</h1>
      <Link to="/dashboard/staff/AddStaff">
        <button>Add Root</button>
      </Link>
      <UserTable columns={columns} data={userData} />
    </div>
  );
}

export default BusRootPage;
