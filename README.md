## About The Project

This repository is the frontend of the [ValoGraphs](https://valographs.com) project bootstrapped with [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/). 

## Getting Started

### Prerequisites

To get this project running locally, you will need to have the backend API running locally, you can do this by either cloning the [vg-backend](https://github.com/jfang324/vg-backend) repository or by pulling the latest docker image from [Docker Hub](https://hub.docker.com/repository/docker/jfang324/vg-backend). Follow the instructions in the vg-backend repository to get the backend running.

### Installation

1. Clone the repository

```bash
git clone https://github.com/jfang324/vg-frontend.git
```

2. Install dependencies

```bash
npm install
```

3. Generate the API clients using the OpenAPI Generator

```bash
npm run generate-api-client
```

4. Create a ```.env``` file following the example in ```.env.example```.


5. Run the development server:

```bash
npm run dev
```

## Tools & Technologies

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)
- [Vercel](https://vercel.com/)