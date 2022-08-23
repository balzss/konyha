---
sidebar_position: 1
---

# Official Docker images

Run the [official images](https://hub.docker.com/u/konyha) from Docker Hub.
This is the recommended way of running Konyha.

### Prerequisites

- Docker and Docker Compose

## Setup

1. Clone the [konyha-hosting](https://github.com/balzss/konyha-hosting) repository to your local machine or server

```
git clone https://github.com/balzss/konyha-hosting && cd konyha-hosting
```

2. Copy the `.env.example` file to `.env` and add your variables

3. Start containers with docker compose

```
docker compose up
```

### Reverse proxy

Use the `reverse-proxy` profile to run with traefik:

```
docker compose --profile reverse-proxy up
```
