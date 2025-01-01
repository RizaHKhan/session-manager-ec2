import { SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export default function networking(
  scope: Construct,
  name: string,
): { vpc: Vpc; securityGroup: SecurityGroup } {
  const vpc = new Vpc(scope, `${name}-VPC`, {});
  const securityGroup = new SecurityGroup(scope, `${name}-SecurityGroup`, {
    vpc
  });

  return {
    vpc,
    securityGroup,
  };
}
