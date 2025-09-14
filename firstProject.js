const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    if (req.method === "GET") {
        // Show the form
        res.end(`
            <form action="/submit" method="POST">
                <label>Enter your name: </label>
                <input type="text" name="username" />
                <button type="submit">Submit</button>
            </form>
        `);
    } 
    else if (req.method === "POST" && req.url === "/submit") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const name = body.split("=")[1]; // extract name value
            res.end(`<h1>Hello, ${name} 👋</h1>`);
        });
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
