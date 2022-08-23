---
sidebar_position: 1
---

# Official Docker images

Use the [official Docker images](https://hub.docker.com/u/konyha).
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

4. If everything went right the manager app should be live at `$MANAGER_DOMAIN`, the home page and docs at
   `$SITEGEN_DOMAIN` and the published recipes at `$SITEGEN_DOMAIN/<user id>`. Read about usage
   [here](/docs/category/usage).

### Reverse proxy

Use the `reverse-proxy` profile to run with traefik:

```
docker compose --profile reverse-proxy up
```
