
class Network {
    constructor() {
        this.userServer = new UserServer(new UserDatabaseAPI()); // accsess to the contact API
        this.taskServer = new TaskServer(new TaskDatabaseAPI()); // accsess to the tasks API
    }

    handleRequest(request) {
        console.log(" Network קיבל בקשה:", request);

        //checks which sevrver should handle the request : 
        switch (request.server) {
            case "user":
                return this.userServer.handleRequest(request);
            case "tasks":
                return this.taskServer.handleRequest(request); 
            default: 
            //if none of them - the request is wrong - "invalid server"
                return { success: false, message: "Invalid server." }; 
        }
    }
}

class FXMLHttpRequest {
    constructor(network) {
        this.network = network;//תכונה 1- רשת
        this.request = null; // תכונה 2- הבקשה : אתחול ל-null
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

        if (callback) callback(response); //delay
    }
}

//once the page has loaded - we create the network 
const network = new Network(); 
