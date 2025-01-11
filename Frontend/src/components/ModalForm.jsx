import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


// ModalForm.js
export default function ModalForm({ isOpen, onClose, mode, OnSubmit, clientData }) {
    const [rate, setRate] = useState('');
    const [name, setName] = useState(''); // State for Name
    const [email, setEmail] = useState(''); // State for Email
    const [job, setJob] = useState(''); // State for Job
    const [status, setStatus] = useState(''); // State for Status

    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Active'); // Set status as boolean
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const clientData = { name, email, job, rate: Number(rate), isactive: status }
            await OnSubmit(clientData)
            onClose();
        } catch (err) {
            console.error("Error adding client", err);
        }

    }

    useEffect(() => {
        console.log(clientData);
        if (mode === 'edit' && clientData) {
            setName(clientData.name);
            setEmail(clientData.email);
            setJob(clientData.job);
            setRate(clientData.rate);
            setStatus(clientData.isActive); // Assuming isActive is a boolean
        } else {
            // Reset fields when adding a new client
            setName('');
            setEmail('');
            setJob('');
            setRate('');
            setStatus(false);
        }
    }, [mode, clientData]);


    return (
        <>

            <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
                <div className="modal-box">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                    <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Client Details'}</h3>

                    <form method="dialog" onSubmit={handleSubmit} >

                        <label className="input input-bordered flex items-center my-4 gap-2" >
                            <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
                        </label>
                        <label className="input input-bordered flex items-center my-4 gap-2">
                            <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center my-4 gap-2">

                            <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Job" />
                        </label>

                        {/* ++ made this anumber */}
                        <div className="flex mb-4 justify-between">
                            <label className="input input-bordered flex mr-4 items-center gap-2">
                                <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Rate" />
                            </label>

                            <select className="select select-bordered w-full max-w-xs" onChange={handleStatusChange}>
                                <option>Inactive</option>
                                <option>Active</option>
                            </select>

                        </div>

                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>

                        <button type="submit" className="btn btn-success"> {mode === 'edit' ? 'Save Changes' : 'Add Client'}</button>
                    </form>

                </div>
            </dialog>

        </>

    );
}

ModalForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    OnSubmit: PropTypes.func.isRequired,
    clientData: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        job: PropTypes.string,
        rate: PropTypes.number,
        isActive: PropTypes.bool
    })
};