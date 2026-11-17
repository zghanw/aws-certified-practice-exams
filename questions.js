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
  "q": "A company has 60 AWS accounts in an organization in AWS Organizations and creates about five new accounts each month. Amazon GuardDuty is enabled only in the management account today. The security team must enable GuardDuty in every existing and future account in all active Regions, and must review all findings from a dedicated security tooling account. The management account must not be used for daily security operations.\n\nWhich solution will meet these requirements?",
  "o": [
   "From the management account, designate the security tooling account as the GuardDuty delegated administrator in each Region. Set auto-enable to all accounts there.",
   "From the management account, designate the security tooling account as the GuardDuty delegated administrator in each Region. In that account, set auto-enable to new accounts only.",
   "Keep the management account as the GuardDuty administrator account. Set auto-enable to all accounts in the organization, and give the security team a role in the management account.",
   "From the management account, designate the security tooling account as the GuardDuty delegated administrator in the home Region only. In that account, set auto-enable to all accounts."
  ],
  "a": 0,
  "r": [
   "GuardDuty is a Regional service, so the delegated administrator is designated in each Region. The setting that auto-enables all accounts turns on GuardDuty for existing members and for accounts that join later, and all findings appear in the security tooling account.",
   "The new-accounts-only setting enables GuardDuty for accounts that join later, but it leaves the existing 60 accounts without GuardDuty.",
   "This covers every account, but the security team would work in the management account, which the company does not allow.",
   "A delegated administrator in one Region manages GuardDuty only in that Region, so the other active Regions stay unprotected."
  ]
 },
 {
  "k": "saa",
  "q": "A company uses one AWS account for development and another AWS account for production. Members of the operations team sign in to the development account as IAM users. The team must be able to start, stop, and reboot Amazon EC2 instances in the production account. The company does not want team members to keep a second set of long-term credentials for the production account.\n\nWhat should a solutions architect do to meet these requirements?",
  "o": [
   "In the production account, add an IAM role with EC2 permissions and a trust policy for the development account. Allow the team to assume the role.",
   "In the development account, add an IAM role with EC2 permissions that name the production instance ARNs. Attach the role to the team's IAM group.",
   "Create IAM users for the team in the production account with EC2 permissions. Store each user's access key in AWS Secrets Manager in the development account.",
   "Share the production EC2 instances with the development account by using AWS Resource Access Manager (AWS RAM). Grant the team EC2 permissions in the development account."
  ],
  "a": 0,
  "r": [
   "A role in the production account holds the EC2 permissions, and its trust policy lets principals from the development account assume it. Team members switch to the role and get temporary credentials, so they keep only their existing sign-in.",
   "A policy in the development account cannot grant access to resources in another account on its own. The production account must trust the caller, which needs a role or a resource policy in the production account.",
   "This creates a second set of long-term credentials for each team member, which the company wants to avoid. Storing the keys in Secrets Manager does not change that they are long-term keys.",
   "AWS RAM shares resources such as subnets and transit gateways. It does not share EC2 instances, so the team would still have no access to the production instances."
  ]
 }
];
