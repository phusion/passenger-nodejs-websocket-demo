# Phusion Passenger: Node.js WebSocket demo

This application demonstrates WebSocket support in [the Phusion Passenger application server for Node.js](https://www.phusionpassenger.com/), through the use of the awesome [Socket.io library](http://socket.io/). Passenger supports all major modern web technologies, such as WebSockets, entirely out of the box. You don't have to do anything: WebSocket support just works.

<center><a href="https://www.phusionpassenger.com"><img src="http://blog.phusion.nl/wp-content/uploads/2014/01/Passenger_chair_256x256.png" width="196" height="196" alt="Phusion Passenger"></a></center>

## Getting started

### Preparations

 1. [Install Phusion Passenger](https://www.phusionpassenger.com/) 4.0.35 or later.
 2. Clone this repository:

        git clone https://github.com/phusion/passenger-nodejs-websocket-demo.git
        cd passenger-nodejs-websocket-demo

 3. Install dependencies:

        npm install socket.io

### Running the demo in Passenger Standalone

Run:

    passenger start

Access the demo application at http://0.0.0.0:3000/ and see it in action.

### Running the demo in Passenger for Nginx

Create a virtual host in your Nginx configuration file:

    server {
        listen 3000;
        server_name passenger-nodejs-websocket.demo;
        root /path-to/passenger-nodejs-websocket-demo/public;
        passenger_enabled on;
    }

Add `passenger-nodejs-websocket.demo` to your `/etc/hosts`:

    echo 127.0.0.1 passenger-nodejs-websocket.demo | sudo tee -a /etc/hosts

Then restart Nginx, and access the demo application at http://passenger-nodejs-websocket.demo:3000/

### Running the demo in Passenger for Apache

Apache itself doesn't work very well with WebSockets, so running in Apache is not recommended. Having said that, Socket.io gracefully falls back to polling when run on Apache, so the demo still works.

Create a virtual host in your Apache configuration file:

    # Comment out if you already have a "Listen 3000" directive somewhere.
    Listen 3000
    # Comment out when using Apache >= 2.4.
    NameVirtualHost *:3000

    <VirtualHost *:3000>
        ServerName passenger-nodejs-websocket.demo
        DocumentRoot /path-to/passenger-nodejs-websocket-demo/public
    </VirtualHost>

Add `passenger-nodejs-websocket.demo` to your `/etc/hosts`:

    echo 127.0.0.1 passenger-nodejs-websocket.demo | sudo tee -a /etc/hosts

Then restart Apache, and access the demo application at http://passenger-nodejs-websocket.demo:3000/

### Running the demo in Node.js without Passenger

Run:

    node app.js

Then access the demo application at http://0.0.0.0:3000/

## About Phusion Passenger

<a href="http://vimeo.com/phusionnl/review/80475623/c16e940d1f"><img src="http://blog.phusion.nl/wp-content/uploads/2014/01/gameofthrones.jpg"></a>

[Phusion Passenger™](https://www.phusionpassenger.com/) is a web server and application server, designed to be fast, robust and lightweight. It takes a lot of complexity out of deploying web apps, adds powerful enterprise-grade features that are useful in production, and makes administration much easier and less complex. Phusion Passenger supports Ruby, Python, Node.js and Meteor, and is being used by high-profile companies such as **Apple, Pixar, New York Times, AirBnB, Juniper** etc as well as [over 350.000 websites](http://trends.builtwith.com/Web-Server/Phusion-Passenger).
