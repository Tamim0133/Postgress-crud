import * as clientService from '../services/clientServices.js';

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createClient = async (req, res) => {
    try {
        const client = req.body;
        const newClient = await clientService.createClient(client);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;
        const updatedClient = await clientService.updateClient(clientId, clientData);
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(updatedClient);

    } catch (err) {
        console.error('Error updating client:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteClient = async (req, res) => {
    console.log("Delete Client called ");
    try {
        const clientId = req.params.id;
        const deleted = await clientService.deleteClient(clientId);
        console.log(deleted);
        if (!deleted) {
            return res.status(404).json({ message: 'Client not found' });
        }
        console.log('Client deleted successfully');
        res.status(200).send();

    } catch (err) {
        console.error('Error deleting client:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchClients = async (req, res) => {
    try {
        const searchTerm = req.query.q; // Get the search term from the query parameters
        const clients = await clientService.searchClients(searchTerm);
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error searching clients:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

