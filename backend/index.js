const express = require("express");
const app = express()


app.get("/stats", async (req, res) => {
    try { const apiKey = `8aab5fa1-1971-4a31-b913-f95fe8fde5aa`;

        const response = await fetch(`https://hackatime.hackclub.com/api/hackatime/v1/users/current/statusbar/today`, {
                headers: { "Authorization": `Bearer ${apiKey}`} 
            });
            
            const text = await response.text(); // read raw text
            console.log("API returned:", text)

        if (!response.ok) {
            return res.status(response.status).send(text);
        } 

        let data;
        
        try {
            data = JSON.parse(text);
        } catch (err) {
            return res.status(500).send("API did not return valid JSON");
        }

        res.json(data); 
    }
        
    catch (error) {
        console.error(error);
        console.log(error); // log full error
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

app.listen(3000, () => console.log("server running at localhost:3000"));