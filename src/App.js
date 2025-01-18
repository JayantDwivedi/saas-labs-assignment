import './App.css';
import { useEffect, useState } from 'react';
import Table from './components/table';
import { TableColumns } from './constants';

function App() {
  const url = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
  const [tdata, setTdata] = useState([]);
  const pagination = { pageIndex: 0, pageSize: 5 };
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLoading(false);
        setTdata(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="container">
      <h2>Saas Labs assignment</h2>
      <Table columns={TableColumns} pagination={pagination} data={tdata}  loading={loading}/>
    </div>
  );
}

export default App;
