import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
export default function TableList({ handleOpen, tableData, setTableData, searchTerm }) {

    const [error, setError] = useState(null);

    const filterData = tableData.filter((Client) =>
        Client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/clients/${id}`); // API call to delete client
                setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };

    return (
        <>
            {error && <div className="alert alert-danger">{error.message}</div>}
            {/* ++mt-10 */}
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            {/* ++status rate */}
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>


                        </tr>
                    </thead>
                    {/* ++ hover */}
                    <tbody className="hover">
                        {/* row 1 */}
                        {filterData.map((item) => (
                            <tr key={item.id} className="hover">
                                <th>{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.job}</td>
                                <td>{item.rate}</td>
                                {/* ++button logic ++rounded-full w-20  */}
                                <td>
                                    <button
                                        className={`btn rounded-full w-20 ${item.isactive ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                                        {item.isactive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOpen('edit', item)} className="btn btn-secondary">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-accent" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}


TableList.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
};