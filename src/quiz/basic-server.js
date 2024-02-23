#! /opt/homebrew/bin/node
const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 8000;

const incidents = [
    {
        id: "MABOS001",
        date: "20170617",
        time: "1437",
        road_id: "A90",
        place: "Stonehaven",
        direction: "north",
        description: "Broken-down T on north and park station."

    },
    {
        id: "MABOS002",
        date: "20221217",
        time: "0937",
        road_id: "A90",
        place: "Stonehaven",
        direction: "north",
        description: "Car in West Village broken down."

    }
]

const server = http.createServer((req, res) => {
    // Parse the request URL to extract parameters
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    // Check if the request is for the specified endpoint
    if (pathname.startsWith('/incidents/')) {
        // Extract parameters from the URL
        const [, , road, location, direction, id] = pathname.split('/');
        console.log(road,location,direction,id);

        // Check if all parameters are provided
        if (road && location && direction && id) {
            // Send response with the extracted parameters
            filteredIncident = incidents.filter((incident) => {
               return (
                incident.road_id.toLowerCase() === road.toLowerCase() &&
                incident.place.toLowerCase() === location.toLowerCase() &&
                incident.direction.toLowerCase() === direction.toLowerCase() &&
                incident.id === `MABOS00${id}`)
            });

            console.log(filteredIncident);

            if (filteredIncident.length > 0){
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(filteredIncident));
            } else {
                res.writeHead(204, { 'Content-Type': 'text/plain' });
                res.end('No Matching Incident');
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing Paramenters in the URL');
        }
    } else {
        // If the request is for an unsupported endpoint, send a not found response
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Endpoint not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})