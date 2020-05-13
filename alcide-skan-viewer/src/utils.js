export function platformLogo(platform) {

	switch (platform) {
		case "Istio":
			return "https://istio.io/img/istio-bluelogo-whitebackground-unframed.svg"

		case "WorkerNode":
			return "https://raw.githubusercontent.com/kubernetes/community/master/icons/png/infrastructure_components/unlabeled/node-128.png"

		case "Master":
			return "https://raw.githubusercontent.com/kubernetes/community/master/icons/png/infrastructure_components/unlabeled/master-128.png"

		case "Etcd":
			return "https://raw.githubusercontent.com/cncf/artwork/master/etcd/icon/color/etcd-icon-color.png"

		case "EKS":
			return "https://s3-us-west-2.amazonaws.com/amazon-eks-docs/EKS.png"

		case "Ingress":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/ing-128.png?raw=true"

		case "Service":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/svc-128.png?raw=true"

		case "ConfigMap":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/cm-128.png?raw=true"

		case "Secret":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/secret-128.png?raw=true"

		case "Pod":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/pod-128.png?raw=true"

		case "Deployment":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/deploy-128.png?raw=true"

		case "Job":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/job-128.png?raw=true"

		case "CronJob":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/cronjob-128.png?raw=true"

		case "ReplicaSet":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/rs-128.png?raw=true"

		case "DaemonSet":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/ds-128.png?raw=true"

		case "StatefulSet":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/sts-128.png?raw=true"

		case "Volume":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/vol-128.png?raw=true"

		case "PersistentVolumeClaim":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/pvc-128.png?raw=true"

		case "PodSecurityPolicy":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/psp-128.png?raw=true"

		case "Namespace":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/ns-128.png?raw=true"

		case "Role":
			return "https://github.com/kubernetes/community/blob/master/icons/png/resources/unlabeled/role-128.png?raw=true"

		case "Prometheus":
			return "https://raw.githubusercontent.com/cncf/artwork/master/prometheus/icon/color/prometheus-icon-color.png"

		default:
			return "https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.png"
	}
}

export const SeverityLevel = {
	"Critical": "danger",
	"High": "warning",
	"Medium": "info",
	"Low": "primary",
	"Pass": "success",
}