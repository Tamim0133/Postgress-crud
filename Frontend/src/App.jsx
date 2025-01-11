import './App.css'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SuccessAlert from './components/SuccessAlert';




function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clients');
      const sortedData = response.data.sort((a, b) => a.id - b.id);
      setTableData(sortedData);

    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [tableData]);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  };

  const showAlertMsg = (msg) => {
    setShowAlert(true);
    setAlertMsg(`Client ${msg} successfully`);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMsg('');
    }, 3000);
  }


  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        setTableData((prevData) => [...prevData, response.data]);
        showAlertMsg('added');
      } catch (error) {
        console.error('Error adding client:', error);
      }
      console.log("All ok");

    } else {
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data : client))
        );
        showAlertMsg('updated');
      } catch (error) {
        console.error('Error updating client:', error);
      }

    }
  }


  return (
    <>
      {/* ++ py-5 px-5 */}
      <div className="py-5 px-5 ">
        {showAlert && <SuccessAlert msg={alertMsg} />}
        <Navbar
          onOpen={() => handleOpen('add')}
          onSearch={setSearchTerm} />
        <TableList
          setTableData={setTableData}
          tableData={tableData}
          handleOpen={handleOpen}
          searchTerm={searchTerm}
        />
        <ModalForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          OnSubmit={handleSubmit}
          clientData={clientData}
        />
      </div>

    </>
  )
}

export default App