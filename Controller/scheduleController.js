

const connectdb = require("../Db/db");
const sendEmail = require("../Service/email");
const schedule = require('node-schedule');


async function createSchedule(req, resp) {
    console.log(req.body);
    
    let { employees, date, time, comment } = req.body;
    const {userId}=req.body;
    console.log('employees ',employees);
    
    const scheduleQuery = 'INSERT INTO schedules(date, time, comment) VALUES(?, ?, ?)';
    const adminQuery='SELECT * FROM users WHERE id = ?'
    let obj;
    try {
        const result = await new Promise((resolve, reject) => {
            connectdb.query(scheduleQuery, [date, time, comment],(error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });

        const adminResult = await new Promise((resolve, reject) => {
            connectdb.query(adminQuery, [userId],(error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
         obj=adminResult[0];

        // Log the result for debugging
        // console.log('result in db connection',result);
        // console.log('Admin',adminResult);


        const scheduleId = result.insertId;
      
      
    }
    catch (error) {
        console.error('Database Connection Error:', error);
        return resp.status(500).json({ success: false, message: 'Database Connection Error' });
    }
      // Calculate the scheduled time
    const scheduledTime = new Date(`${date}T${time}`); // Combine date and time into a Date object
    const emailTimes = [
        new Date(scheduledTime.getTime() -  1 * 60 * 1000), // 1 minutes before
        new Date(scheduledTime.getTime() - 2 * 60 * 1000), // 2 minutes before
    ];
       // Schedule emails to be sent at 1 hour, 30 minutes, and 15 minutes before the scheduled time
            // new Date(scheduledTime.getTime() - 60 * 60 * 1000), // 1 hour before
            // new Date(scheduledTime.getTime() - 30 * 60 * 1000), // 30 minutes before
            // new Date(scheduledTime.getTime() - 15 * 60 * 1000)  // 15 minutes before
    let count=0;

    emailTimes.forEach((emailTime) => {
        emailTime.setSeconds(0); // Set seconds to 0 for cleaner scheduling
        
        
        schedule.scheduleJob(emailTime, async () => {
            console.log(`Sending reminder email at ${emailTime}`);
            //Send Email To Selected
            const emailPromises = employees.map(emp => sendEmail(emp.email, comment, date, time));
    console.log('all email sending');
        try {
            await Promise.all(emailPromises); // Wait for all emails to be sent
            console.log('all email sent');

            count=count+1;
            console.log('count',count);

            //To send Email to admin at last time
            if (count==1){
                employees.push(obj);
            }
            // console.log('employees',employees);
            if (count==2) {
                return resp.json({ success: true, scheduleId:'emailSent' });
            }
            // return resp.json({ success: true, scheduleId:'emailSent' });
        } catch (emailError) {
            console.error('Error sending emails:', emailError);
            return resp.json({ success: false, message: 'Error in sending emails' });
        }         
        });   
    });
}

module.exports = createSchedule;