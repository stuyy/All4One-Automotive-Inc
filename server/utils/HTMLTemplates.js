module.exports.jobApplicationReceived = function (application) {
    return `
    <html>
        <head>
            <style>
                * {
                    padding: 0;
                    margin: 0;
                }
                header {
                    width: 100%;
                    height: 150px;
                    background-color: #212121;
                    display: flex;
                    justify-content: space-between !important;
                    color: #DB162F;
                }
                .logo {
                    width: 350px;
                }
                .email-message-body {
                    background-color: #DB162F;
                    color: white;
                    padding: 50px;
                    font-size: 1.5em;
                }
                footer {
                    text-align: center;
                    background-color: #212121;
                    height: 70px;
                    width: 100%;
                    padding: 10px;
                    color: #DB162F;
                    font-size: 1.5em;
                }
            </style>
        </head>
        <body>
            <header>
                <div>
                    <img class="logo" src="https://www.all4oneautomotiveinc.com/assets/logo.png">
                </div>
                <div>
                    <h1>Job Application</h1>
                </div>
            </header>
            <section class="email-message-body">
                <h2>You recevied a new application for ${application.job.jobTitle}</h2>
                <h3>Details</h3>
                <h4>Position: ${application.job.jobTitle} - ${application.job._id}</h4>
                <h4>Name: ${application.name}</h4>
                <h4>Email: ${application.email}</h4>
                <h4>Phone Number: <a href="tel:${application.phone}">${application.phone}</a></h4>
                <br>
                <hr>
                <h4>Question #1: ${application.questions.questionOne.question}</h4>
                <h4>Response: ${application.questions.questionOne.response}</h4>
                <hr>
                <h4>Question #2: ${application.questions.questionTwo.question}</h4>
                <h4>Response: ${application.questions.questionTwo.response}</h4>
                <hr>
                <h4>Question #3: ${application.questions.questionThree.question}</h4>
                <h4>Response: ${application.questions.questionThree.response}</h4>
            </section>
            <footer>
                <h1>All 4 One Automotive Inc. 2019</h1>
            </footer>
        </body>
    </html>`
}