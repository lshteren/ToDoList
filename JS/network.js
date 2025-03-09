// import { UserServer } from './userServer.js';
// import { UserDatabaseAPI } from './api.js';

class Network {
    constructor() {
        this.userServer = new UserServer(new UserDatabaseAPI()); // accsess to the API
    }

    handleRequest(request) {
        console.log(" Network קיבל בקשה:", request);

        switch (request.server) {
            case "user":
                return this.userServer.handleRequest(request);
            default:
                return { success: false, message: "Invalid server." };
        }
    }
}

class FXMLHttpRequest {
    constructor(network) {
        this.network = network;//תכונה 1- רשת
        this.request = null;
    }

    open(method, server) {
        this.request = { method, server }; //תכונה3- בקשה
    }

    send(data, callback) {
        if (!this.request) {
            console.error("No request initialized!");
            return;
        }

        let fullRequest = { ...this.request, ...data };
        let response = this.network.handleRequest(fullRequest);

        if (callback) callback(response);
    }
}


const network = new Network(); // יצירת הרשת
