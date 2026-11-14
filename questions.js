// One real question per exam, copied from each exam repo (data/d1.js, first question). Used by the terminal's quiz command.
window.QUIZ = [
 {
  "k": "aib",
  "q": "A board member reviews an AI strategy proposal. The proposal uses the terms artificial intelligence (AI), machine learning (ML), and generative AI (GenAI). The board member asks how the three terms relate to each other.\n\nWhich statement MOST accurately describes the relationship?",
  "o": [
   "GenAI is a subset of ML, and ML is a subset of AI.",
   "ML is a subset of GenAI, and GenAI is a subset of AI.",
   "AI is a subset of ML, and GenAI is a separate field from both.",
   "GenAI and ML are separate subsets of AI that do not overlap."
  ],
  "a": 0,
  "r": [
   "AI is the broad field of systems that perform tasks that normally require human intelligence. ML is the subset of AI that learns patterns from data. GenAI is built on deep learning, which is a type of ML. Therefore, the three terms are nested.",
   "This statement reverses the relationship between ML and GenAI. GenAI models are trained by using ML techniques. ML also includes many non-generative tasks, such as classification and forecasting. Therefore, ML is the broader category.",
   "AI is the broadest of the three terms, not a subset of ML. GenAI also depends on ML techniques, so it is not a separate field.",
   "GenAI models learn from data by using deep learning, which is an ML technique. Therefore, GenAI is part of ML, not a separate branch that sits beside it."
  ]
 },
 {
  "k": "soa",
  "q": "A company runs a Java application on a fleet of Amazon EC2 Linux instances. The company needs an alarm when memory utilization on any instance exceeds 85%. A CloudOps engineer cannot find a memory metric in the AWS/EC2 namespace.\n\nWhat should the CloudOps engineer do to meet this requirement?",
  "o": [
   "Install the Amazon CloudWatch agent on the instances. Configure it to collect the mem_used_percent metric.",
   "Enable detailed monitoring on each instance to publish memory metrics at 1-minute intervals.",
   "Enable EC2 Instance Connect to allow Amazon CloudWatch to read memory statistics from each instance.",
   "Create an Amazon CloudWatch metric math expression that derives memory usage from the CPUUtilization metric."
  ],
  "a": 0,
  "r": [
   "Amazon EC2 cannot see inside the guest operating system, so memory is not a default EC2 metric. The CloudWatch agent runs on the instance and publishes OS-level metrics such as mem_used_percent to the CWAgent namespace, where you can alarm on them.",
   "Detailed monitoring only increases the frequency of the default hypervisor-level metrics to 1 minute. It does not add memory metrics, because the hypervisor cannot see guest memory usage.",
   "EC2 Instance Connect provides SSH access to an instance. It does not publish any metrics to CloudWatch.",
   "CPU utilization and memory utilization are independent. Metric math can only combine metrics that already exist, so it cannot derive memory usage from CPU data."
  ]
 },
 {
  "k": "scs",
  "q": "A company has 60 AWS accounts in an organization in AWS Organizations. The company's security team must enable Amazon GuardDuty in every account, including accounts that are created later. The security team must manage findings from a dedicated security tooling account instead of the management account.\n\nWhich solution will meet these requirements with the LEAST operational overhead?",
  "o": [
   "Designate the security tooling account as the GuardDuty delegated administrator. Configure GuardDuty to enable automatically for all accounts in the organization.",
   "Enable GuardDuty in each account by using an AWS CloudFormation StackSet. Send findings from every account to an Amazon S3 bucket in the security tooling account.",
   "Enable GuardDuty in the management account. Invite each member account from the management account, and accept each invitation in the member account.",
   "Create an AWS Lambda function in each account that enables GuardDuty. Run the function from an Amazon EventBridge rule when a new account is created."
  ],
  "a": 0,
  "r": [
   "A GuardDuty delegated administrator manages GuardDuty for the whole organization, and the auto-enable setting turns on GuardDuty for existing and new member accounts. Findings from all members appear in the delegated administrator account, so the management account is not used for daily work.",
   "StackSets can enable GuardDuty, but findings in an S3 bucket are not a managed multi-account view, and the company must keep the deployment and the bucket working.",
   "Invitations are the legacy method for accounts outside an organization. Each new account would need a manual invitation, and the management account would hold the findings.",
   "This is custom code that the company must build and maintain for a feature that GuardDuty provides through its organization settings."
  ]
 }
];
