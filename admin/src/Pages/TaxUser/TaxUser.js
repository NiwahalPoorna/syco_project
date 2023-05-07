import React, { useState, useEffect, useCallback } from "react";
import UserTable from "../../Components/UserTable";
import axios from "axios";
// import { Link } from "react-router-dom";

function TaxUser() {
  const [userData, setUserData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/all-users");
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
        await axios.delete(`http://localhost:3000/user/user/${id}`);

        fetchData();
        alert("Tax user deleted successfully.");
      } catch (error) {
        console.log(error);
      }
    },
    [fetchData]
  );


//   gender: 'male',
//   mobileNumber: '0768501693',
//   firstName: 'Ravindu',
//   lastName: 'Ranasinghe',
//   email: 'hirupurna1@gmail.com',
//   companyName: 'Ravindu Construction pvt/ltd',
//   nicNumber: '200034201234',
//   password: 'sandu17303',
//   rePassword: 'sandu17303',
//   agree: true

  const columns = React.useMemo(
    () => [
      {
        Header: " ID",
        accessor: "_id",
      },
      {
        Header: "E-mail",
        accessor: "email",
      },
      {
        Header: "FirstName",
        accessor: "firstname",
      },
      {
        Header: "LastName ",
        accessor: "lastname",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Nic Number",
        accessor: "nicNumber",
      },
      {
        Header: "Mobile Number ",
        accessor: "mobileNumber",
      },
      {
        Header: "Company Name",
        accessor: "companyName",
      },
      {
        Header: "Agree",
        accessor: "agree",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            {/* <Link to={`/dashboard/staff/EditStaff/${row.original._id}`}>
              <button>update</button>
            </Link> */}
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
      <h1>Tax User Table</h1>
      {/* <Link to="/dashboard/staff/AddStaff">
        <button>Add Root</button>
      </Link> */}
      <UserTable columns={columns} data={userData} />
    </div>
  );
}

export default TaxUser;
