![release](https://img.shields.io/github/v/release/alcideio/skan?sort=semver)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Tweet](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Falcideio%2Fskan)

<img src="img/skan.png" alt="skan" width="160"/>

###### s**K**an is powered by the [Alcide Advisor](https://www.alcide.io/kubernetes-advisor) scan engine and [Open Policy Agent (OPA)](https://www.openpolicyagent.org)

# s**K**an

s**K**an is a tailor made Kubernetes configuration files and resources scanner that enables developers and devops team members to check whether their work is compliant with security & ops best practices.

<img src="img/skan-html-report.png" alt="skan" width="90%"/>

# Install s**K**an

s**K**an supports Linux, Mac & Windows and the latest release is available [here](https://github.com/alcideio/skan/releases/latest).

Or use

```sh
$ curl https://raw.githubusercontent.com/alcideio/skan/master/skan-download.sh | bash
```

# s**K**an Kubernetes file

```sh
$ skan manifest --report-passed -f kaudit_for_eks.yaml
```

```sh
[skan-this] Analyzing resources from '1' files/directories.
[skan-this] Loaded '9' objects
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

## s**K**an **Helm Chart**

```sh
$ helm template kaudit deploy/charts/kaudit --set k8sAuditEnvironment=eks | skan manifest -f -
```
## s**K**an **Kustomized Resources**

```sh
kubectl kustomize helloWorld | skan manifest -f -
```

### Command Line Example

```sh
Validate Kubernetes resource(s) handed as YAML.

YAML file with multiple resources are supported.
By default a HTML report is generated. To generate YAML based outformat use --output flag

skan manifest -f mydeployment.yaml

Usage:
  skan manifest [flags]

Aliases:
  manifest, file, Files, m, manifests, validate

Examples:

# Validate a YAML file. Multiple YAML files separated with '---' is supported
skan manifest -f mydeployment.yaml -f myotherdeployment.yaml

# Validate all the resources found under the namespace 'myns' of a cluster with 'kubectl get'
kubectl get all -n myns -o yaml | skan manifest --report-passed -f -

# Validate resource kustomization
kubectl kustomize helloWorld | skan manifest -f -

# Validate Helm Chart
helm template kaudit deploy/charts/kaudit --set k8sAuditEnvironment=eks | skan manifest -f -


Flags:
  -d, --debug               Debug trace level
  -f, --filename strings    One or more file names (or directories) that contain the configuration to sKan
  -h, --help                help for manifest
  -o, --output string       output format. Supported formats are html, yaml and json (default "html")
      --outputfile string   OutputFormat file (default "skan-result.html")
  -p, --report-passed       Report passed checks
```

## Contributing

### Bugs

If you think you have found a bug please follow the instructions below.

- Please spend a small amount of time giving due diligence to the issue tracker. Your issue might be a duplicate.
- Open a [new issue](https://github.com/alcideio/skan/issues/new) if a duplicate doesn't already exist.

### Features

If you have an idea to enhance rbac-tool follow the steps below.

- Open a [new issue](https://github.com/alcideio/skan/issues/new).
- Remember users might be searching for your issue in the future, so please give it a meaningful title to helps others.
- Clearly define the use case, using concrete examples.
- Feel free to include any technical design for your feature.

[![Stargazers over time](https://starchart.cc/alcideio/skan.svg)](https://starchart.cc/alcideio/skan)
