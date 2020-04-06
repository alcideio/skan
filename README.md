![release](https://img.shields.io/github/v/release/alcideio/skan?sort=semver)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Tweet](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Falcideio%2Fskan)

<img src="img/skan.png" alt="skan" width="120"/>

###### s**K**an is powered by [Alcide Advisor](https://www.alcide.io/kubernetes-advisor) scan engine and OPA

# s**K**an

s**K**an is a tailor made Kubernetes configuration files and resources that enable developers and devops to to check whether their work follows security & ops best practices.

s**K**an supports Linux, Mac & Windows and the latest release is available here. ![release](https://img.shields.io/github/v/release/alcideio/skan?sort=semver)

## s**K**an Kubernetes file

```sh
$ skan manifest mydeployment.yaml
```

```sh
[skan-this] Analyzing manifest file '10' resource(s) - '9' objects
[skan-this] Ops Conformance | Workload Readiness & Liveness
[skan-this] Ops Conformance | Workload Capacity Planning
[skan-this] Workload Software Supply Chain | Image Registry Whitelist
[skan-this] Ingress Controllers & Services | Ingress Security & Hardening Configuration
[skan-this] Ingress Controllers & Services | Ingress Controller (nginx) 
[skan-this] Ingress Controllers & Services | Service Resource Checks
[skan-this] Pod Security | Workload Hardening
[skan-this] API Server Access Privileges | Privileged Kubernetes API Server Access
[skan-this] Secret Hunting | Find Secrets in ConfigMaps
[skan-this] Secret Hunting | Find Secrets in Pod Environment Variables
[skan-this] Admission Controllers | Validating Admission Controllers
[skan-this] Admission Controllers | Mutating Admission Controllers
[skan-this] Generating report (html) and saving as 'skan-result.html'
[skan-this] Summary:
[skan-this] Critical .... 0
[skan-this] High ........ 4
[skan-this] Medium ...... 2
[skan-this] Low ......... 0
[skan-this] Pass ........ 21
```

```sh
$ open skan-result.html
```

## s**K**an Helm Chart

```sh
$ helm3 template kaudit deploy/charts/kaudit --set k8sAuditEnvironment=eks >  kaudit_for_eks.yaml 
$ skan manifest mydeployment.yaml
```

### Command Line Example

```sh

Validate Kubernetes resource manifest by analyzing the deployment file YAML.

YAML file with multiple resources are supported.
By default a HTML report is generated. To generate YAML based outformat use --output flag

#Examples

skan manifest mydeployment.yaml

Usage:
  skan manifest [flags]

Examples:
skan manifest somepod.yaml

Flags:
      --debug            debug trace level
  -h, --help             help for manifest
      --outfile string   output file (default "skan-result.html")
      --output string    output as html or yaml (default "html")
```