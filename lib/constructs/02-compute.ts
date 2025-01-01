import { StackProps } from "aws-cdk-lib";
import {
  AmazonLinuxGeneration,
  AmazonLinuxImage,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  SecurityGroup,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { Role, ServicePrincipal, ManagedPolicy } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export interface ComputeProps extends StackProps {
  vpc: Vpc;
  securityGroup: SecurityGroup;
}

export default function compute(
  scope: Construct,
  name: string,
  props: ComputeProps,
): void {
  const { vpc, securityGroup } = props;

  new Instance(scope, `${name}-Instance`, {
    vpc,
    securityGroup,
    role: new Role(scope, "Role", {
      assumedBy: new ServicePrincipal("ec2.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore"),
      ],
    }),
    instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
    machineImage: new AmazonLinuxImage({
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
    }),
  });
}
