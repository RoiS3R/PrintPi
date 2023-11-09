# Email Processing Service

This project is a Node.js application designed to connect to an IMAP server, search for unseen emails with a specific subject, process them, and save any attachments to a local directory.

## Getting Started

These instructions will guide you on how to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Before running the project, you will need:

- Node.js installed on your machine.
- An IMAP email account credentials and server details.

### Installing

A step by step series of examples that tell you how to get a development environment running.

#### Clone the repository to your local machine:

```bash
mkdir your-project-name && cd your-project-name
git clone https://github.com/RoiS3R/PrintPi.git
npm install
```

#### Set up your environment variables by renaming the .env.example file to .env and filling in the details:

```bash
SMTP_USER=your_email_username
SMTP_PASS=your_email_password
SMTP_HOST=your_email_imap_host
SMTP_PORT=your_email_imap_port
SMTP_TLS=use_tls_true_or_false
SMTP_IGNORETLS=ignore_tls_true_or_false
```

#### Run the application

```bash
npm start
```

## Folder Structure

The project has a set of predefined folder structures:

- src/config: Contains configuration settings for the IMAP server.
- src/services: Contains the business logic for processing emails and saving files.
- src/utils: Utility functions used across the project.

### Running the tests

Explain how to run the automated tests for this system (if applicable).

### Deployment

Add additional notes about how to deploy this on a live system.

### Built With

* Node.js - The runtime server environment.
* Imap - An IMAP client library for Node.js.
* Mailparser - For parsing the emails.

### License
MIT License
