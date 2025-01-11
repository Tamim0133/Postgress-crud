import PropTypes from 'prop-types';

export default function Navbar({ onOpen, onSearch }) {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">ClientManager</a>
                </div>
                <div className="navbar-center">
                    <div className="form-control">
                        <input type="text" placeholder="Search" onChange={handleSearch} className=" input input-bordered w-48 md:w-auto" />
                    </div>

                </div>
                <div className="navbar-end">
                    <button onClick={onOpen} className="btn btn-primary">Add Client</button>

                </div>
            </div>
        </>
    );
}
Navbar.propTypes = {
    onOpen: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};     