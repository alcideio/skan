import React from 'react';
import ReactDOM from 'react-dom';

import AlcideSkanViewer from './AlcideSkanViewer';

var data = {
  "AdvisorReportHeader": {
    "CreationTimeStamp": "2020-05-10T10:01:29+03:00",
    "ReportUID": "08f55481-9440-4814-994f-de22a6d5a58a",
    "Info": "-",
    "ScannerVersion": ".",
    "MSTimeStamp": 1589094089936
  },
  "Reports": {
    "Ops Conformance": {
      "ResourceName": "Ops Conformance",
      "ResourceNamespace": "KubeAdvisor",
      "ResourceUID": "dops.1",
      "ResourceKind": "Ops Conformance",
      "Results": [
        {
          "CheckId": "dops.1.1.1.4429975745264558183",
          "Category": "Ops Conformance",
          "Severity": "Medium",
          "Action": "Alert",
          "Message": "'Pod default/alcide-advisor-cronjob-exportedprofile-1588283220-855hp', is missing at least one Liveness Probe - ",
          "Recommendation": "Pod default/alcide-advisor-cronjob-exportedprofile-1588283220-855hp - Configure liveness probe for your pod containers to ensure Pod liveness is managed and monitored by Kubernetes",
          "Url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
          "Platform": "Kubernetes",
          "References": [
            "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes"
          ],
          "ResultUID": "dops.1.1.1.4429975745264558183@4429975745264558183",
          "Resource": {
            "Kind": "Pod",
            "Version": "v1",
            "Name": "alcide-advisor-cronjob-exportedprofile-1588283220-855hp",
            "Namespace": "default",
            "Annotations": {
              "alcide.io/advisor": "cronjob"
            },
            "Labels": {
              "controller-uid": "252c5131-ab27-47fc-ab17-40b74f962701",
              "job-name": "alcide-advisor-cronjob-exportedprofile-1588283220"
            }
          },
          "Check": {
            "ModuleTitle": "Ops Conformance",
            "GroupTitle": "Workload Readiness \u0026 Liveness",
            "CheckTitle": "Liveness Probe Configured",
            "ModuleId": "dops.1",
            "GroupId": "1",
            "CheckId": "1"
          }
        },
      ],
    }
  },
};


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AlcideSkanViewer data={data}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
