
const connectdb = require("../Db/db");

async function getEmployee(req, resp) {
    const query = 'SELECT * FROM employee';
    
    try {
        const result = await new Promise((resolve, reject) => {
            connectdb.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });

        // Log the result for debugging
        // console.log(result);

        // Return the result as JSON
        return resp.json({ success: true, result: result });
    } catch (error) {
        console.error('Database Connection Error:', error);
        return resp.status(500).json({ success: false, message: 'Database Connection Error' });
    }
}

module.exports = getEmployee;