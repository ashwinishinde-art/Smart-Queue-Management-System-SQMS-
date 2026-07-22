================================================================================
                     SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
                     SMART QUEUE MANAGEMENT SYSTEM (SQMS)
================================================================================

1. INTRODUCTION
--------------------------------------------------------------------------------
The Smart Queue Management System (SQMS) is a web-based application developed to
modernize and automate traditional physical queue management systems. Instead of
standing in long physical queues, users can join virtual queues, receive digital
token numbers, monitor their real-time queue position, and track estimated
waiting times.

The system is designed to improve service efficiency, reduce overcrowding,
minimize waiting friction, and provide a seamless experience for both customers
and administrators. SQMS is built to scale across various industries, including
educational institutions, hospitals, banks, government offices, libraries, and
busy service centers.

Key Objectives:
* Eliminate Long Physical Lines: Shift physical crowds into structured virtual
  waiting environments.
* Automate Token Generation: Remove manual ticketing workflows with instant,
  sequential digital token assignment.
* Real-Time Queue Tracking: Provide transparent, live tracking of queue positions
  and dynamic waiting time estimates.
* Improve Service Efficiency: Empower administrators with intuitive workflow tools
  to process lines and reduce service bottlenecks.
* Secure Access Control: Ensure strict data integrity via secure authentication
  and role-based authorization rules.


2. SCOPE & TARGET ARCHITECTURE
--------------------------------------------------------------------------------
The SQMS provides a comprehensive digital ecosystem for modern queue operations:

[Customer/Student] ---> (Join Virtual Queue) ---> [Live Tracking Dashboard]
                                                           |
                                                    (Processed By)
                                                           |
[System Backend] <---- (Manage & Call Operations) <---- [Administrator]

* User Capabilities: Register accounts, log in securely, browse open service desks,
  join available queues, view real-time queue placement, and track waiting metrics.
* Administrative Capabilities: Build and configure new service windows, call the
  next customer inline, close out completed tasks, and monitor active analytics.
* Future Roadmap: While initially developed as a web application, its decoupled,
  modular REST API architecture allows seamless future expansion into native
  mobile applications and persistent real-time communication protocols.


3. SYSTEM FEATURES & MODULES
--------------------------------------------------------------------------------

Authentication Module
- User Lifecycle: Self-serve user registration and login interface.
- Security Protocol: Secure password encryption using industry-standard hashing.
- Session Management: JSON Web Token (JWT) issuance for authenticated API routing.
- Profile Control: Independent user profile management dashboard.

Queue Management Module
- Queue Lifecycle: Dynamic creation, configuration, and status toggle (Active/
  Inactive) of service lines.
- Token Engine: Automatic, sequential, thread-safe token creation upon entry.
- Concurrency Guard: Duplicate entry prevention to ensure a single user cannot
  occupy multiple slots in the same queue simultaneously.
- Analytics Engine: Live calculation of absolute position and dynamic waiting
  time remaining.

Administrator & Dashboard Module
- Workflow Operations: "Call Next Customer" and "Complete Current Service" mechanics.
- Role-Based Access Control (RBAC): Restricting configuration and workflow APIs 
  solely to authorized personnel.
- Operational Dashboard: Visual metrics tracking active queues, currently served
  tokens, overall waiting customer count, and total completed service counts.


4. USERS AND USER ROLES
--------------------------------------------------------------------------------

1. STUDENT / CUSTOMER
   Core Responsibilities:
   - Create an account and authenticate securely.
   - View available queues and active service points.
   - Join queues to instantly receive a sequential token number.
   - Monitor live queue position and dynamic estimated waiting time.
   - Gracefully leave/forfeit an active queue position if necessary.
   Key System Permissions:
   - Read-only access to available queues.
   - Write access to create/delete their own active queue entries.

2. ADMINISTRATOR
   Core Responsibilities:
   - Log in securely via authorized staff portals.
   - Create, configure, and manage service queues.
   - Advance lines by calling the next customer in sequence.
   - Complete ongoing customer services to clear active tokens.
   - Monitor live queue activities and toggle queue availability statuses.
   - Access aggregate dashboard metrics and performance statistics.
   Key System Permissions:
   - Full CRUD access to queue configurations.
   - Execution rights on workflow hooks (Call Next, Complete Service).
   - Full access to administrative metrics dashboards.

3. SYSTEM BACKEND
   Core Responsibilities:
   - Authenticate users and authorize restricted requests.
   - Manage accurate, sequential, non-duplicate token generation.
   - Maintain strict queue order integrity (First-In, First-Out).
   - Dynamically compute waiting time and position updates.
   - Securely execute database operations and manage session states.
   Key System Permissions:
   - Full system automation and infrastructure management rights.


5. SYSTEM REQUIREMENTS
--------------------------------------------------------------------------------

Functional Requirements:
- Security & Auth: The system must hash passwords before database storage. It must
  issue a secure JWT upon successful login. Protected APIs must reject requests
  lacking a valid authorization header token.
- State Management: Administrators must be able to initialize, pause, or terminate
  queues. The system must prevent users from joining inactive queues. Users must
  be allowed to leave a queue gracefully before being called, automatically
  shifting upstream tokens up.
- Operational Rules: The token generation engine must be thread-safe to avoid 
  assigning identical token numbers to different users. Waiting time estimates
  must dynamically scale based on historical processing times or static averages
  multiplied by remaining positions.

Non-Functional Requirements:
- Performance: API response times must remain highly efficient under load,
  leveraging optimized database indexing for rapid sorting.
- Reliability: The system must guarantee consistent, sequential array ordering
  with robust error handling and zero dropped entries.
- Scalability: The architecture must be decoupled, modular, and capable of
  supporting hundreds of concurrent lines and thousands of active users.
- Usability: The frontend must provide an intuitive, responsive design with
  simple navigation, optimized for mobile layout tracking.


6. TECHNOLOGY STACK
--------------------------------------------------------------------------------
Frontend Architecture:
- Core Library: React.js
- Build Tool: Vite
- Styling Engine: Tailwind CSS
- HTTP Client: Axios

Backend Architecture:
- Runtime Environment: Node.js
- Application Framework: Express.js
- Database System: MongoDB
- Object Data Modeling (ODM): Mongoose

Authentication & Development Tools:
- Security: JWT (JSON Web Tokens), bcrypt
- IDE / Control: Visual Studio Code, Git, GitHub
- Testing & Hosting: Postman (API Testing), MongoDB Atlas (Cloud Database)


7. FUTURE ENHANCEMENTS ROADMAP
--------------------------------------------------------------------------------
- Real-Time Synchronization: Transition from HTTP polling to full duplex real-
  time communication using Socket.IO.
- Contactless Check-In: Integrate QR Code based queue joining at physical storefronts.
- Omnichannel Notifications: Automated SMS, email, and native push notifications
  when a user's token is approaching service.
- Standalone Clients: Dedicated mobile applications for Android and iOS.
- Intelligent Analytics: Deploy AI-based waiting time prediction algorithms factoring
  in time-of-day, staff changes, and historical throughput.
- Advanced Enterprise Features: Appointment booking integration, feedback/rating
  systems, historical reporting metrics, multi-language translation support,
  and multi-branch organizational management tools.

================================================================================
                   END OF SOFTWARE REQUIREMENTS SPECIFICATION
================================================================================