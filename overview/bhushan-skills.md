# Bhushan Rane — Comprehensive Skills & Experience Profile

> Last updated: March 2026

---

## Professional Identity

- **Current Role:** Sr DevOps/Platform Engineer at Ollion (CloudCover), Pune — since June 2022
- **Total Experience:** 10+ years (5+ years in cloud/platform engineering)
- **GitHub:** @drtinkerer
- **Portfolio:** cloudpoet.in
- **Brand:** "Hacker, Gamer, Musician and Ponderer"

---

## Certifications

### Kubernetes (CNCF)
- **Kubestronaut** — all 5 CNCF Kubernetes certifications (October 2025)
  - CKS (Certified Kubernetes Security Specialist)
  - CKA (Certified Kubernetes Administrator)
  - CKAD (Certified Kubernetes Application Developer)
  - KCNA (Kubernetes and Cloud Native Associate)
  - KCSA (Kubernetes and Cloud Native Security Associate)

### Google Cloud (4x Professional)
- Professional Cloud Architect (Dec 2024)
- Professional Cloud Security Engineer (Jan 2025)
- Professional Cloud Network Engineer (Jan 2025)
- Professional Cloud DevOps Engineer (Dec 2024)
- Associate Cloud Engineer (Feb 2023)

### AWS
- AWS Certified Solutions Architect — Associate (March 2024)

---

## Cloud Platform Experience

| Platform | Duration | Depth |
|----------|----------|-------|
| **GCP** | ~3 years | Primary platform. GKE clusters, Landing Zones, CI/CD, IAM, networking. 4 Professional certs. |
| **AWS** | ~1 year | Landing Zone Accelerator, Control Tower, CloudFormation/CDK, multi-account governance. |
| **OCI (Oracle Cloud)** | ~6 months | OKE clusters, Landing Zone deployment, compartment hierarchy, IAM, networking, Terraform. |
| **Azure** | Minimal | Migrated workloads *from* Azure to GCP. Not an Azure operator. |

---

## Kubernetes & Container Orchestration

### Production Experience
- **GKE:** Provisioned and operated clusters for Swiss WealthTech client (etops.com), multi-cluster management with Fleet API, fleet-level IAM for authentication, and fleet features for cross-cluster policy enforcement
- **On-premises K8s:** Bootstrapped 10-node bare metal Kubernetes cluster at Sugarbox Networks from scratch — full lifecycle including node provisioning, OS configuration, networking, and middleware upgrades
- **OKE (Oracle Kubernetes Engine):** Deployed and managed via Terraform, enhanced mode with OCI Native Pod Networking
- **Multi-cluster GitOps:** Managed 15+ GKE clusters from a single ArgoCD instance using ArgoCD Autopilot with automated configuration consistency across environments
- **Large-scale fleet operations:** Managed 200+ edge/CDN nodes with automated provisioning, monitoring, and incident response

### Kubernetes Ecosystem Tools (Production or Homelab)
- **GitOps:** ArgoCD, ArgoCD Autopilot, Kustomize overlays pattern
- **Service Mesh:** Istio (homelab, ramping up)
- **Gateway/Ingress:** Envoy Gateway (production at Ollion + homelab), Gateway API, HTTPRoute/GRPCRoute
- **Cert Management:** cert-manager with Let's Encrypt (cluster-issuers, automated TLS)
- **Secrets:** External Secrets Operator (OCI Vault integration)
- **Storage:** Longhorn, NFS subdir external provisioner
- **Databases:** CloudNativePG (PostgreSQL operator)
- **Monitoring:** kube-prometheus-stack (Prometheus + Grafana), metrics-server
- **Container Registry:** Harbor (with Terraform provider, OIDC via Zitadel)
- **CI/CD:** Dagger, Actions Runner Controller (ARC), Forgejo Actions
- **Developer Platform:** Backstage, Coder (cloud dev environments)
- **Policy/Security:** RBAC, namespace isolation, network policies
- **Autoscaling:** HPA, cluster autoscaler
- **Workflow Orchestration:** Argo Workflows, Kargo (progressive delivery)

---

## Infrastructure as Code

### Terraform
- **GCP Landing Zone** — CI/CD pipelines on GitLab for multi-project, multi-environment deployments
- **AWS Landing Zone** — Led team of 4, open-source (github.com/ollionorg/aws-landing-zone)
- **OCI Landing Zone** — Compartment hierarchy, IAM, networking, security baselines
- **OKE Cluster** — Oracle's official OKE Terraform module (v5.3.3) with enhanced mode
- **Zitadel Terraform** — Identity provider configuration with JWT profile auth, multi-region OCI support
- **NetBird Terraform** — Network automation for multiple homelabs and client environments
- **Harbor Terraform** — Container registry infrastructure management
- **Slack Terraform** — Workspace automation

### Other IaC
- **AWS CloudFormation/CDK** — Landing Zone Accelerator deployment (TypeScript CDK)
- **Ansible** — Node provisioning, configuration management across edge fleet (200+ nodes)
- **Salt Stack** — Configuration management at Sugarbox

---

## Networking & Security

### Zero Trust
- **Cloudflare Tunnels** — Initial remote access solution at Ollion
- **NetBird** — Self-hosted VPN, migrated from Cloudflare. Also built open-source Python client library
- **Pangolin** — Reverse proxy tunneling (homelab)

### Identity & Access Management
- **Zitadel** — Self-hosted OIDC/OAuth 2.0 identity provider. Extensive Terraform automation. Integrated with 10+ services (Grafana, Harbor, Coder, Forgejo, ArgoCD, Longhorn, Open-WebUI, etc.)
- **OAuth 2.0 / OIDC** — Implemented across multiple platforms: Zitadel (homelab), OAuth SSO at Sugarbox, NextAuth in sandbox provisioner
- **PKCE flows** — CloudPoet CLI implements PKCE-based OAuth2 with local callback server
- **JWT token exchange** — RFC 8693 implementation for service-to-service auth
- **Workload Identity** — OKE workload identity with custom IAM policies

### Networking
- **HA VPN → Dedicated Interconnect** — Set up HA VPN to connect Equinix data center in Frankfurt to Google Cloud, then migrated to Dedicated Partner Interconnect achieving ~1ms latency
- **Envoy Gateway** — Production SNI-based multi-tenant routing with 9+ HTTPS hostnames, OCI NLB integration, source IP preservation
- **Gateway API** — HTTPRoute, GRPCRoute, BackendTrafficPolicy, ProxyProtocolPolicy
- **HAProxy** — Homelab load balancing
- **OPNsense** — Firewall integration with Envoy Gateway external backends
- **DNS:** External-DNS for automated DNS management

---

## Observability & Monitoring

- **Prometheus + Grafana** — kube-prometheus-stack in homelab, standalone at Sugarbox for 200+ edge nodes
- **ELK Stack** — Elasticsearch, Logstash, Kibana for log aggregation
- **Apache NiFi** — Data ingestion pipelines for edge telemetry
- **Alerting** — Built HealthD (Python) for automated edge failure detection with JIRA integration, 70% MTTR reduction

---

## Data Engineering

- **Hadoop** — Bootstrapped 15-node cluster on-premises at Sugarbox
- **Apache Kafka** — Event streaming, Kafka Connect, Debezium CDC
- **Apache Airflow** — Workflow orchestration on Kubernetes
- **Apache NiFi** — Data ingestion and routing
- **PySpark** — Data processing applications
- **Dagster** — Data orchestration on Kubernetes
- **Argo Workflows** — Data processing platform on Kubernetes
- **Debezium** — Real-time change data capture from MySQL via Kafka Connect

---

## AI & LLM Infrastructure

### AI Sandbox Provisioner (Ollion — flagship project)
- **Architecture:** Multi-cloud (GCP, AWS, Azure, OCI) with conversational AI interface
- **Backend:** Python FastAPI with async processing
- **Frontend:** Next.js 15 + React 19 with server components
- **LLM Gateway:** LiteLLM Proxy for multi-provider support (Gemini, GPT, Claude)
- **Cloud Executors:** Go binaries per cloud provider with isolated guardrails
- **Security:** 6-layer guardrail system (LLM prompt → intent parser → command validator → approval gate → execution sandbox → cloud IAM)
- **Auth:** NextAuth.js v5 with Google OAuth, federated identity, no stored credentials
- **Clients:** Web UI, Slack Bot, CLI, REST API — all sharing same backend
- **Features:** Approval workflows, audit trails, cost tracking per user/team, browser-based cloud shell (XTerm.js + Go PTY)

### Other AI Work
- **GCP IAM Analyser AI** — Python tool for analyzing GCP IAM with AI
- **GCP Security Comply 360** — Security compliance with Gen AI, MCP, LLM integration (NIST/CIS benchmarking)
- **n8n** — Self-hosted workflow automation (homelab)
- **Open-WebUI** — Self-hosted LLM interface (homelab)
- **RAG/MCP** — Applied in security compliance tooling
- **Agentic AI** — Sandbox provisioner uses autonomous agent that interprets intent and executes cloud operations

---

## Programming Languages

| Language | Usage |
|----------|-------|
| **Python** | Primary. FastAPI backends, automation, NetBird client library (98% test coverage, PyPI published), data processing |
| **Bash** | Infrastructure automation, CI/CD scripts, system administration |
| **Go** | Cloud executors for sandbox provisioner, CloudPoet CLI (Cobra/Viper), CloudPoet Shell |
| **SQL** | Data engineering, PostgreSQL, MySQL |
| **HCL** | Terraform modules across GCP, AWS, OCI, Zitadel, NetBird, Harbor |
| **TypeScript/JavaScript** | Next.js portfolio site, sandbox provisioner frontend (personal/internal projects) |

---

## Homelab Infrastructure ("The Self Hosted Engineer")

### Platform: OKE (Oracle Kubernetes Engine) on Oracle Cloud free/low-cost tier

### 30+ Components (GitOps managed via ArgoCD + Kustomize overlays):

**Platform Core:**
- ArgoCD (GitOps controller)
- Envoy Gateway (ingress with Gateway API)
- cert-manager (TLS automation)
- External Secrets (OCI Vault integration)
- Longhorn (distributed storage)
- CloudNativePG (PostgreSQL operator)
- kube-prometheus-stack (monitoring)
- metrics-server

**Identity & Networking:**
- Zitadel (OIDC identity provider)
- NetBird (zero-trust VPN — server + peer + operator)
- Pangolin/Newt (reverse proxy tunnels)
- External-DNS
- HAProxy

**Developer Tools:**
- Backstage (developer portal)
- Coder (cloud dev environments)
- Forgejo (self-hosted Git)
- Dagger (CI/CD)
- Actions Runner Controller (GitHub Actions on K8s)
- Docker Registry
- Harbor (container registry)

**Applications:**
- n8n (workflow automation)
- Docmost (documentation)
- Homepage (dashboard)
- OwnCloud Infinite Scale (file storage)
- RustDesk (remote desktop)
- Vaultwarden (password manager)
- Infisical (secrets management)
- Valkey (Redis alternative)
- Termix (terminal sharing)

### Multi-Machine Setup
- Dell server + Lenovo server with Komodo for orchestration
- Docker Compose stacks across multiple machines
- Centralized GitOps deployment strategy

### Networking Architecture
- Envoy Gateway with SNI-based multi-tenant TLS termination (9+ hostnames)
- OCI Network Load Balancer with source IP preservation
- Let's Encrypt automated certificate provisioning
- Internal + External gateway separation
- OPNsense firewall integration (dual instances)
- Private DNS server

---

## Open Source Projects

| Project | Tech | Description |
|---------|------|-------------|
| **NetBird Python Client** | Python, Pydantic, PyPI | Unofficial client library for NetBird API. 11 resources, 98% test coverage, network visualization (Mermaid, Graphviz). Published on PyPI. |
| **AWS Landing Zone** | Terraform | Led team of 4. Multi-account, multi-regional AWS environments with secure defaults. github.com/ollionorg/aws-landing-zone |
| **The Self Hosted Engineer** | K8s, Terraform, ArgoCD | Homelab guide — Raspberry Pi clusters, OKE, Oracle Cloud, NetBird, Cloudflare. In progress. |
| **NetBird Terraform Module** | Terraform, HCL | Network automation for NetBird with advanced routing and access policies |
| **GCP Security Comply 360** | Python, Gen AI, MCP | Security compliance monitoring with NIST/CIS benchmarking (private) |

---

## CloudPoet Platform (Personal SaaS Project)

A multi-service platform built for managing self-hosted infrastructure:
- **CloudPoet CLI** — Go-based CLI (Cobra/Viper) with PKCE OAuth2, token exchange (RFC 8693), macOS Keychain storage, multi-service discovery
- **CloudPoet API** — Python backend with Kubernetes deployment
- **CloudPoet Shell** — Go-based shell tool
- **GitOps Main** — Kustomize-based GitOps repository managing 30+ components on OKE
- **Infrastructure Terraform repos** — Zitadel, NetBird, Harbor, Slack — all managed as code
- **ARC Runner** — GitHub Actions self-hosted runner on Kubernetes

---

## Professional Experience Summary

### Ollion (CloudCover) — Sr DevOps/Platform Engineer (June 2022 – Present)
- Led end-to-end migration of multi-tiered applications from Hetzner and Azure to Google Cloud for a Swiss WealthTech client — provisioned and operated GKE clusters, configured Envoy Gateway for production traffic routing, and established HA VPN to Equinix Frankfurt, later upgrading to Dedicated Partner Interconnect (~1ms latency)
- Operated and optimized 15+ GKE clusters using Fleet API for centralized management, fleet-level IAM for authentication, and fleet features for cross-cluster policy enforcement — deployed via GitOps using ArgoCD Autopilot from a single instance with automated configuration consistency across environments
- Built CI/CD automation pipelines on GitLab for Terraform-based GCP infrastructure provisioning, enabling multi-project, multi-environment deployments with documented governance and approval workflows
- Developed internal tooling in Go (CLI tools, cloud executors) and Python (automation frameworks, API clients) to streamline platform operations and self-service provisioning for engineering teams
- Conducted risk assessments and managed production releases for client environments, including infrastructure security hardening, node upgrades, and incident response with defined SOP documentation
- Functioned as sole engineer and technical lead on a 2-year client engagement, driving architecture decisions, stakeholder communication, and delivering $200K+ revenue

### Sugarbox Networks — Sr DevOps Engineer (Feb 2021 – June 2022)
- Bootstrapped a 10-node on-premises Kubernetes cluster on bare metal alongside a 15-node Hadoop cluster, operating the full platform lifecycle including node provisioning, OS configuration, networking, and middleware upgrades
- Managed Kubernetes workloads (Airflow, Jupyter, Kafka, NiFi) with GitOps delivery using ArgoCD, implementing OAuth 2.0 SSO for platform-wide authentication and RBAC
- Built HealthD, an automated incident detection and remediation system in Python that monitored 200+ edge nodes, identified failures, and auto-created JIRA tickets — reducing mean time to resolution by 70%

### Sugarbox Networks — Systems Engineer (April 2020 – Feb 2021)
- Managed fleet of 200+ edge/CDN nodes with Prometheus, Grafana, and ELK monitoring, using Ansible and Salt Stack for configuration management and automated provisioning
- Built custom Debian OS images for standardized fleet provisioning across edge infrastructure
- Designed edge telemetry pipelines (NiFi, PySpark) for centralized data collection from distributed nodes

### Alfa Laval India — Sr Support Quality Engineer (July 2015 – April 2020)
- Heavy mechanical industry, manufacturing domain
- Career foundation before transitioning to cloud/DevOps

---

## Awards
- **The Trendsetter Recognition** (Nov 2025) — Leading successful migration of multiple business units to Google Cloud, $200K+ revenue as sole engineer
- **Rising Nova Superstar** (Oct 2022) — High-impact delivery as newcomer at Ollion

---

## Education
- **B.Tech, Production Engineering** — Veermata Jijabai Technological Institute (VJTI), Mumbai (2011–2015)

---

## Technical Knowledge Categories
DevSecOps, Microservices, Agentic AI, GitOps, CI/CD, Service Mesh, Platform Engineering, Zero Trust Architecture, LLM, AI Infrastructure, Cloud Computing, Data Engineering, Distributed Systems, Linux Internals, OAuth 2.0 / OIDC, RAG/MCP
