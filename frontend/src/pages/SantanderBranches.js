import React, { useState, useEffect } from "react";
import axios from "axios";

const SantanderBranches = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const getBranches = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/proxy/sanuk/external/open-banking/v2.2/branches"
        );

        const data = response.data.data;

        const branchNames = [];
        data.forEach((item) => {
          item.Brand[0].Branch.forEach((branch) => {
            branchNames.push(branch.Name);
          });
        });

        setBranches(branchNames);
      } catch (err) {
        setError(err.message);
      }
    };

    getBranches();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // if (!data.data || !data.data[0].Brand[0].Branch) {
  //   return <div>No branches data found.</div>;
  // }

  return (
    <div>
      <div>
        <p>{branches}</p>
        {/* Render more branch details here */}
      </div>
    </div>
  );
};

export default SantanderBranches;
